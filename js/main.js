// Initialize AOS (Animate on Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Lottie player is now handled by the web component in HTML
// No JavaScript needed - it auto-plays!

// Active nav link highlight
const currentLocation = window.location.pathname.split('/').pop() || 'index.html';
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentLocation) {
        link.classList.add('active');
    }
});

// Mobile menu close on link click
const navbarCollapse = document.querySelector('.navbar-collapse');
const navLinks2 = document.querySelectorAll('.nav-link');

navLinks2.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth < 992) {
            navbarCollapse.classList.remove('show');
        }
    });
});

// ========================================
// Enhanced UI/UX Features
// ========================================

// Back to Top Button
const backToTopBtn = document.createElement('div');
backToTopBtn.className = 'back-to-top';
backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
document.body.appendChild(backToTopBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Reading Progress Bar
const progressBar = document.createElement('div');
progressBar.className = 'progress-bar-custom';
progressBar.innerHTML = '<div class="progress-bar-fill"></div>';
document.body.insertBefore(progressBar, document.body.firstChild);

window.addEventListener('scroll', () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    const scrolled = window.scrollY;
    const progress = (scrolled / documentHeight) * 100;
    document.querySelector('.progress-bar-fill').style.width = progress + '%';
});

// Toast Notification System
const toastContainer = document.createElement('div');
toastContainer.className = 'toast-container';
document.body.appendChild(toastContainer);

window.showToast = function(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    let icon = 'fa-check-circle';
    if (type === 'error') icon = 'fa-exclamation-circle';
    if (type === 'info') icon = 'fa-info-circle';
    
    toast.innerHTML = `
        <i class="fas ${icon}"></i>
        <span class="toast-message">${message}</span>
        <i class="fas fa-times toast-close"></i>
    `;
    
    toastContainer.appendChild(toast);
    
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => {
        toast.remove();
    });
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
};

// Image Lazy Loading with Blur Effect
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add Ripple Effect to Buttons
document.querySelectorAll('.btn').forEach(button => {
    button.classList.add('btn-ripple');
});

// Add Tilt Effect to Cards
document.querySelectorAll('.feature-card, .service-card, .team-card, .menu-item, .room-card').forEach(card => {
    card.classList.add('tilt-card');
});

// Add Shine Effect to Images
document.querySelectorAll('.feature-card img, .service-card img, .menu-item img').forEach(img => {
    img.classList.add('shine-effect');
});

// Enhanced Form Submission (for contact forms)
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.classList.add('btn-loading');
            submitBtn.disabled = true;
            
            // Remove loading state after form is submitted (demo)
            setTimeout(() => {
                submitBtn.classList.remove('btn-loading');
                submitBtn.disabled = false;
            }, 2000);
        }
    });
});

// Add Enhanced Shadow to Cards on Scroll
if ('IntersectionObserver' in window) {
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('card-enhanced');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.card, .feature-card, .service-card').forEach(card => {
        cardObserver.observe(card);
    });
}

// Improved Image Loading
document.querySelectorAll('img').forEach(img => {
    img.decoding = 'async';
});

// Keyboard Accessibility Enhancement
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});

// Performance: Debounce Scroll Events
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = window.requestAnimationFrame(() => {
        // Your scroll-dependent code here (already handled above)
    });
}, { passive: true });

// Console Welcome Message
console.log('%c🍽️ Welcome to Chandan Ka Dhaba!', 'color: #6F4E37; font-size: 20px; font-weight: bold;');
console.log('%cBuilt with ❤️ by Chandan, Krish & Yashoda', 'color: #D4A656; font-size: 14px;');

// ========================================
// Professional Website Features
// ========================================

// Copy offer code functionality
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('offer-code')) {
        const code = e.target.textContent;
        navigator.clipboard.writeText(code).then(() => {
            showToast(`Code "${code}" copied to clipboard! 🎉`, 'success');
        });
    }
});



// Table Reservation Widget (appears on home page)
if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
    const reservationWidget = document.createElement('div');
    reservationWidget.className = 'reservation-widget';
    reservationWidget.innerHTML = `
        <h4>🍽️ Quick Reservation</h4>
        <form class="reservation-form">
            <input type="text" placeholder="Your Name" required>
            <input type="tel" placeholder="Phone Number" required>
            <input type="date" required>
            <input type="time" required>
            <select required>
                <option value="">Select Guests</option>
                <option value="1">1 Person</option>
                <option value="2">2 People</option>
                <option value="3-4">3-4 People</option>
                <option value="5+">5+ People</option>
            </select>
            <button type="submit">Reserve Table</button>
        </form>
    `;
    document.body.appendChild(reservationWidget);
    
    // Show after 15 seconds
    setTimeout(() => {
        if (!sessionStorage.getItem('reservationShown')) {
            reservationWidget.classList.add('show');
            sessionStorage.setItem('reservationShown', 'true');
        }
    }, 15000);
    
    reservationWidget.querySelector('.reservation-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        showToast('Reservation request sent! We\'ll confirm shortly. 🎉', 'success');
        reservationWidget.classList.remove('show');
        // Here you can send data to backend
    });
}

// ========================================
// Hero Slideshow
// ========================================

let slideIndex = 1;
let slideInterval;

function showSlides(n) {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.dot');
    
    if (!slides.length) return;
    
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    slides[slideIndex - 1].classList.add('active');
    if (dots[slideIndex - 1]) {
        dots[slideIndex - 1].classList.add('active');
    }
}

function currentSlide(n) {
    clearInterval(slideInterval);
    showSlides(slideIndex = n);
    startSlideshow();
}

function nextSlide() {
    showSlides(slideIndex += 1);
}

function startSlideshow() {
    slideInterval = setInterval(nextSlide, 4000); // Change image every 4 seconds
}

// Initialize slideshow if hero section exists
if (document.querySelector('.hero-slideshow')) {
    showSlides(slideIndex);
    startSlideshow();
}

// Pause slideshow on hover
const heroSlideshow = document.querySelector('.hero-slideshow');
if (heroSlideshow) {
    heroSlideshow.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    heroSlideshow.addEventListener('mouseleave', () => {
        startSlideshow();
    });
}

// Make functions globally available
window.currentSlide = currentSlide;

// ========================================
// Nearby Places Filter Functionality
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const nearbyItems = document.querySelectorAll('.nearby-item');
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get filter value
                const filterValue = this.getAttribute('data-filter');
                
                // Filter items with animation
                nearbyItems.forEach((item, index) => {
                    const category = item.getAttribute('data-category');
                    
                    if (filterValue === 'all' || category === filterValue) {
                        setTimeout(() => {
                            item.classList.remove('hide');
                            item.style.animation = 'fadeInUp 0.5s ease forwards';
                        }, index * 50);
                    } else {
                        item.classList.add('hide');
                    }
                });
                
                // Show count of visible items
                setTimeout(() => {
                    const visibleItems = document.querySelectorAll('.nearby-item:not(.hide)').length;
                    if (visibleItems === 0) {
                        // Show no results message
                        console.log('No places found in this category');
                    }
                }, 500);
            });
        });
    }
});

// Add fadeInUp animation keyframes via JavaScript if not in CSS
if (!document.querySelector('#nearbyAnimation')) {
    const style = document.createElement('style');
    style.id = 'nearbyAnimation';
    style.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
}

