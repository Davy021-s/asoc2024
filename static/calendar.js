// Questo codice è solo un esempio e potrebbe richiedere adattamenti 
// in base al tuo backend e framework.

// Funzione per ottenere i dati degli appuntamenti dal backend
async function getBookings() {
    const response = await fetch('/api/bookings');
    return await response.json();
  }
  
  // Funzione per creare il calendario
  function createCalendar(bookings) {
    const calendar = document.getElementById('calendar');
    const orari = Array.from({ length: 16 }, (_, i) => `${i + 8}:00`); 
    const oggi = new Date().toISOString().split('T')[0]; // Ottieni la data odierna (YYYY-MM-DD)
    const dataodierna= document.getElementById('oggi');
    dataodierna.textContent = oggi;
  
    orari.forEach(orario => {
      const row = document.createElement('tr');
      const timeCell = document.createElement('td');
      timeCell.textContent = orario;
      row.appendChild(timeCell);
  
      const booking = bookings.find(b => b.start_hour === orario && b.date === oggi); // Controlla data e ora
      const statusCell = document.createElement('td');
  
      if (booking) {
        statusCell.textContent = 'Nome Utente: ' + booking.user_name;
        statusCell.style.backgroundColor = 'red';
      } else {
        statusCell.textContent = 'Libero';
        statusCell.style.backgroundColor = 'green';
        const button = document.createElement('button');
        button.textContent = 'Prenota';
       
        // Aggiungi event listener al bottone per gestire la prenotazione
        button.addEventListener('click', () => {
          // Implementa la logica di prenotazione qui
          console.log(`Prenotazione per ${orario}`);
        });
        statusCell.appendChild(button);
        button.style.backgroundColor = 'blue';
        button.style.color = 'white';
        button.style.border = 'none';
        button.style.padding = '5px 10px';
        button.style.borderRadius = '5px';
        button.style.cursor = 'pointer';
      }
  
      row.appendChild(statusCell);
      calendar.appendChild(row);
    });
  }
  
  // Ottieni i dati e crea il calendario
  getBookings().then(bookings => {
    createCalendar(bookings);
  });
  