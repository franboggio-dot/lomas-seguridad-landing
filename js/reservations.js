/* 
  Lomas Sistemas de Seguridad - Technical Visit Booking Logic
*/

document.addEventListener('DOMContentLoaded', () => {
    const bookingForm = document.getElementById('booking-form');
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            console.log('Procesando reserva de visita técnica...');
        });
    }
});
