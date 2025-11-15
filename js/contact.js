document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            // Format WhatsApp message
            let whatsappMessage = `📧 *Contact Form Message*\n\n`;
            whatsappMessage += `👤 *Name:* ${name}\n`;
            whatsappMessage += `📧 *Email:* ${email}\n`;
            whatsappMessage += `📱 *Phone:* ${phone}\n`;
            whatsappMessage += `📋 *Subject:* ${subject}\n`;
        whatsappMessage += `💬 *Message:*\n${message}`;

        const encodedMessage = encodeURIComponent(whatsappMessage);        const whatsappNumber = '919876543210';        window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');        successMessage.style.display = 'block';        contactForm.reset();            // Hide success message after 5 seconds
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000);

            // Scroll to success message
            successMessage.scrollIntoView({ behavior: 'smooth' });
        });
    }
});
