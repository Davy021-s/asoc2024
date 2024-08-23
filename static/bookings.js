fetch('/api/bookings')
  .then(response => response.json())
  .then(bookings => {
    showBookingsTable(bookings);
  });

  function showBookingsTable(bookings) {
    const bookingsDiv = document.getElementById('bookings-table');
    bookingsDiv.innerHTML = ''; // Clear previous results
  
    bookings.forEach(booking => {
      const bookingDiv = document.createElement('div');
      bookingDiv.classList.add('booking-rectangle'); // Add a class for styling
  
      bookingDiv.innerHTML = `
        <p>ID Campo: ${booking.court_id}</p>
        <p>Nome Utente: ${booking.user_name}</p>
        <p>Data: ${booking.date}</p>
        <p>Ora d'inzio: ${booking.start_hour}</p>
        <p>Ora di Fine: ${booking.end_hour}</p>
      `;
  
      bookingsDiv.appendChild(bookingDiv);
    });
  }
  
function getBookings() {
  const username = document.getElementById('username').value;

  fetch(`/api/user/${username}`)
    .then(response => response.json())
    .then(bookings => {
      const bookingsDiv = document.getElementById('bookings');
      bookingsDiv.innerHTML = ''; // Clear previous results

      if (bookings.error) {
        bookingsDiv.innerHTML = `<p>Error: ${bookings.error}</p>`;
        return;
      }

      if (bookings.length === 0) {
        bookingsDiv.innerHTML = `<p>No bookings found for ${username}</p>`;
        return;
      }

      const table = document.createElement('table');
      table.innerHTML = `
        <tr>
          <th>Booking ID</th>
          <th>Court ID</th>
          <th>User Name</th>
          <th>Date</th>
          <th>Start Hour</th>
          <th>End Hour</th>
        </tr>
      `;

      bookings.forEach(booking => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${booking.booking_id}</td>
          <td>${booking.court_id}</td>
          <td>${booking.user_name}</td>
          <td>${booking.date}</td>
          <td>${booking.start_hour}</td>
          <td>${booking.end_hour}</td>
        `;
        table.appendChild(row);
      });

      bookingsDiv.appendChild(table);
    })
    .catch(error => {
      console.error('Error:', error);
      document.getElementById('bookings').innerHTML = `<p>Error: ${error.message}</p>`;
    });
}