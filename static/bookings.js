fetch('/api/bookings')
  .then(response => response.json())
  .then(bookings => {
    showBookingsTable(bookings);
  });

function showBookingsTable(bookings) {
  const table = document.createElement('table');
  table.innerHTML = `
    <thead>
      <tr>
        <th>Court ID</th>
        <th>User Name</th>
        <th>Date</th>
        <th>Start Hour</th>
        <th>End Hour</th>
      </tr>
    </thead>
    <tbody>
      ${bookings.map(booking => `
        <tr>
          <td>${booking.court_id}</td>
          <td>${booking.user_name}</td>
          <td>${booking.date}</td>
          <td>${booking.start_hour}</td>
          <td>${booking.end_hour}</td>
        </tr>
      `).join('')}
    </tbody>
  `;
  document.getElementById('bookings-table').appendChild(table);
}