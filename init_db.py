import sqlite3

# Connect to the database (or create it if it doesn't exist)
conn = sqlite3.connect('bookings.db')
cursor = conn.cursor()

# Create the bookings table with booking_id as PRIMARY KEY
cursor.execute('''
    CREATE TABLE IF NOT EXISTS bookings (
        booking_id INTEGER PRIMARY KEY, 
        court_id INTEGER,
        user_name TEXT,
        date DATE,
        start_hour INTEGER,
        end_hour INTEGER
    )
''')

# Sample booking data for the weeks of August 19th and 26th
bookings = [
    (1, 1, 'Alice', '2024-08-19', 9, 10),
    (2, 2, 'Bob', '2024-08-19', 10, 11),
    (3, 1, 'Charlie', '2024-08-20', 14, 16),
    (4, 1, 'David', '2024-08-21', 17, 18),
    (5, 2, 'Eve', '2024-08-22', 8, 10),
    (6, 1, 'Alice', '2024-08-26', 9, 10),
    (7, 2, 'Frank', '2024-08-27', 11, 13),
    (8, 1, 'Charlie', '2024-08-28', 16, 18),
]

# Insert booking data into the table using DATE() function
cursor.executemany('INSERT INTO bookings VALUES (?,?,?,DATE(?),?,?)', bookings)

# Commit the changes and close the connection
conn.commit()
conn.close()
