import logging
import os
import sqlite3
import json

from flask import Flask, send_file, request, jsonify

app = Flask(__name__)

def get_bookings_as_json():
  conn = sqlite3.connect('bookings.db')
  cursor = conn.cursor()
  cursor.execute('SELECT * FROM bookings')
  rows = cursor.fetchall()
  bookings = []
  for row in rows:
    booking = {
        'booking_id': row[0],
        'court_id': row[1],
        'user_name': row[2],
        'date': row[3],
        'start_hour': row[4],
        'end_hour': row[5]
    }
    bookings.append(booking)
  conn.close()
  return json.dumps(bookings)

@app.route("/book")
def book():
    return send_file('src/book.html')

@app.route("/bookings")
def bookings():
    return send_file('src/bookings.html')

@app.route("/api/bookings")
def api_bookings():
  return get_bookings_as_json()

@app.route("/api/delete", methods=['POST'])
def api_delete():
  conn = sqlite3.connect('bookings.db')
  cursor = conn.cursor()
  user_name = request.form.get('user_name')
  start_hour = request.form.get('start_hour')
  end_hour = request.form.get('end_hour')
  court_id = request.form.get('court_id')
  date = request.form.get('date')
  cursor.execute('''
  DELETE FROM bookings
  WHERE court_id = ?
  AND user_name = ?
  AND date = ?
  AND start_hour = ?
  AND end_hour = ?;
  ''', (court_id, user_name, date, start_hour, end_hour))
  conn.commit()
  conn.close()
  return jsonify({'message': 'Cancellazione effettuata! {} {} {} {} {}'.format(user_name,  start_hour, end_hour, court_id, date)})

@app.route("/api/user/<username>")
def get_user_bookings(username):
    try:
        conn = sqlite3.connect('bookings.db')
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM bookings WHERE user_name=?", (username,))
        rows = cursor.fetchall()
        conn.close()

        bookings = []
        for row in rows:
            booking = {
                'booking_id': row[0],
                'court_id': row[1],
                'user_name': row[2],
                'date': row[3],
                'start_hour': row[4],
                'end_hour': row[5]
            }
            bookings.append(booking)
        return jsonify(bookings)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/book', methods=['POST'])
def api_book():
  conn = sqlite3.connect('bookings.db')
  cursor = conn.cursor()
  user_name = request.form.get('user_name')
  start_hour = request.form.get('start_hour')
  end_hour = request.form.get('end_hour')
  court_id = request.form.get('court_id')
  date = request.form.get('date')
  for m in range(int(start_hour.split(':')[0]), int(end_hour.split(':')[0])):
    shour = str(m) + ':00'
    ehour = str(m + 1) + ':00'
    cursor.execute('''
      INSERT INTO bookings (court_id, user_name, date, start_hour, end_hour)
      VALUES (?, ?, ?, ?, ?)
    ''', (court_id, user_name, date, shour, ehour))
    conn.commit()
  conn.close()
  return jsonify({'message': 'Prenotazione effettuata!'})

@app.route("/")
def index():
    return send_file('src/index.html')

def main():
    app.run(port=int(os.environ.get('PORT', 80)))

if __name__ == "__main__":
    main()
