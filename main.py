import os
import sqlite3
import json

from flask import Flask, send_file

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

@app.route("/bookings")
def bookings():
  return get_bookings_as_json()

@app.route("/")
def index():
    return send_file('src/index.html')

def main():
    app.run(port=int(os.environ.get('PORT', 80)))

if __name__ == "__main__":
    main()
