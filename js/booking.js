document.addEventListener('DOMContentLoaded', function() {
    const bookingModal = document.getElementById('bookingModal');
    if (bookingModal) {
        bookingModal.addEventListener('show.bs.modal', function(event) {
            const button = event.relatedTarget;
            const roomType = button.getAttribute('data-room');
            const roomSelect = document.getElementById('roomType');
            
            if (roomType && roomSelect) {
                const options = roomSelect.options;
                for (let i = 0; i < options.length; i++) {
                    if (options[i].value.includes(roomType)) {
                        roomSelect.selectedIndex = i;
                        break;
                    }
                }
            }
        });
    }

    const checkInInput = document.getElementById('checkIn');
    const checkOutInput = document.getElementById('checkOut');
    
    if (checkInInput && checkOutInput) {
        const today = new Date().toISOString().split('T')[0];
        checkInInput.setAttribute('min', today);
        checkOutInput.setAttribute('min', today);

        checkInInput.addEventListener('change', function() {
            checkOutInput.setAttribute('min', this.value);
        });
    }
});

function submitBooking() {
    const form = document.getElementById('bookingForm');
    
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    const name = document.getElementById('guestName').value;
    const phone = document.getElementById('guestPhone').value;
    const checkIn = document.getElementById('checkIn').value;
    const checkOut = document.getElementById('checkOut').value;
    const roomType = document.getElementById('roomType').value;
    const guests = document.getElementById('guests').value;
    const specialRequests = document.getElementById('specialRequests').value;

    let message = `🏨 *Room Booking Request*\n\n`;
    message += `👤 *Name:* ${name}\n`;
    message += `📱 *Phone:* ${phone}\n`;
    message += `📅 *Check-in:* ${checkIn}\n`;
    message += `📅 *Check-out:* ${checkOut}\n`;
    message += `🛏️ *Room Type:* ${roomType}\n`;
    message += `👥 *Guests:* ${guests}\n`;
    
    if (specialRequests) {
        message += `📝 *Special Requests:* ${specialRequests}\n`;
    }

    const encodedMessage = encodeURIComponent(message);
    
    const whatsappNumber = '919876543210';
    
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
    
    const bookingModalEl = document.getElementById('bookingModal');
    const bookingModal = bootstrap.Modal.getInstance(bookingModalEl);
    bookingModal.hide();
    
    const successModal = new bootstrap.Modal(document.getElementById('successModal'));
    successModal.show();
    
    form.reset();
}
