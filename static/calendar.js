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
  
      const booking = bookings.find(b => 
        b.date === oggi && 
        parseInt(orario) >= parseInt(b.start_hour) && 
        parseInt(orario) < parseInt(b.end_hour)// Controlla data e ora
      ); 
      const statusCell = document.createElement('td');

      if (booking) {
        statusCell.textContent = 'Nome Utente: ' + booking.user_name;
        statusCell.style.backgroundColor = 'purple';
        const button = document.createElement('button');
        button.textContent = 'Cancella'; 
        statusCell.appendChild(button);
        button.style.backgroundColor = 'black';
        button.style.color = 'white';
        button.style.border = 'none';
        button.style.padding = '5px 10px';
        button.style.borderRadius = '5px';
        button.style.cursor = 'pointer';
        console.log(booking.start_hour)
        button.addEventListener('click', () => {
          // Implementa la logica di cancellazione qui
          cancella(booking.user_name, booking.date, orario, incrementa_orario(orario), booking.court_id);
        }, false);
      } else {
        statusCell.textContent = 'Libero';
        statusCell.style.backgroundColor = 'pink';
        const button = document.createElement('button');
        button.textContent = 'Prenota';
       
        // Aggiungi event listener al bottone per gestire la prenotazione
        button.addEventListener('click', () => {
          book();
          // Implementa la logica di prenotazione qui
          console.log(`Prenotazione per ${orario}`);
        });
        statusCell.appendChild(button);
        button.style.backgroundColor = 'black';
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
  
  function cancella(username, date, start, end, court) {
    // Implementa la logica di cancellazione qui
    console.log('Cancella');
    console.log(username, date, start, end, court)
  
    fetch('/api/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `user_name=${username}&court_id=${court}&date=${date}&start_hour=${start}&end_hour=${end}`,
    })
    .then(response => response.json())
    .then(data => {
      alert(data.message);
      location.reload();
    })
    .catch(error => {
      console.error('Errore:', error);
      alert('Si è verificato un errore durante la prenotazione.');
    });
  }

function incrementa_orario(orario) {
  orario_successivo = orario.split(':');
  orario_successivo[0] = parseInt(orario_successivo[0]) + 1;
  orario_successivo = orario_successivo.join(':');
  return orario_successivo;
}

function book(username, date, start, end, court) {
  // Implementa la logica di prenotazione qui
  console.log('Prenota');
//redirect alla pagina book.html
  window.location.href = '/book';
}