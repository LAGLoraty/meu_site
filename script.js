// Mobile menu toggle
document.querySelector('.mobile-menu-btn').addEventListener('click', function() {
    document.querySelector('nav ul').classList.toggle('show');
});

// Smooth scroll for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Form submission
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Basic form validation
    const inputs = this.querySelectorAll('input, select, textarea');
    let isValid = true;
    
    inputs.forEach(input => {
        if (input.hasAttribute('required') && !input.value.trim()) {
            input.style.borderColor = 'red';
            isValid = false;
        } else {
            input.style.borderColor = '#e9ecef';
        }
    });

    if (isValid) {
        alert('Solicitação enviada com sucesso! Entraremos em contato em até 24 horas.');
        this.reset();
        
        // Scroll to top
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    } else {
        alert('Por favor, preencha todos os campos obrigatórios.');
    }
});

// Add animation on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.service-card, .testimonial-card');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initialize animations
window.addEventListener('scroll', animateOnScroll);

// Set initial styles for animation
document.querySelectorAll('.service-card, .testimonial-card').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

// Trigger initial check
animateOnScroll();

// Lightbox functionality
const galleryItems = document.querySelectorAll('.gallery-item img');
const lightbox = document.createElement('div');
lightbox.className = 'lightbox';
lightbox.innerHTML = `
    <div class="lightbox-content">
        <span class="lightbox-close">&times;</span>
        <img src="" alt="">
        <div class="lightbox-nav">
            <span class="lightbox-prev">&#10094;</span>
            <span class="lightbox-next">&#10095;</span>
        </div>
    </div>
`;
document.body.appendChild(lightbox);

let currentImageIndex = 0;
const images = Array.from(galleryItems).map(img => img.src);

galleryItems.forEach((img, index) => {
    img.addEventListener('click', () => {
        currentImageIndex = index;
        showLightbox();
    });
});

function showLightbox() {
    const lightboxImg = lightbox.querySelector('img');
    lightboxImg.src = images[currentImageIndex];
    lightbox.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function hideLightbox() {
    lightbox.classList.remove('show');
    document.body.style.overflow = 'auto';
}

lightbox.querySelector('.lightbox-close').addEventListener('click', hideLightbox);
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) hideLightbox();
});

lightbox.querySelector('.lightbox-prev').addEventListener('click', (e) => {
    e.stopPropagation();
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    showLightbox();
});

lightbox.querySelector('.lightbox-next').addEventListener('click', (e) => {
    e.stopPropagation();
    currentImageIndex = (currentImageIndex + 1) % images.length;
    showLightbox();
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('show')) {
        if (e.key === 'Escape') hideLightbox();
        if (e.key === 'ArrowLeft') {
            currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
            showLightbox();
        }
        if (e.key === 'ArrowRight') {
            currentImageIndex = (currentImageIndex + 1) % images.length;
            showLightbox();
        }
    }
});

// Add pulse animation to CTA button
const ctaButton = document.querySelector('.cta-button');
setInterval(() => {
    ctaButton.style.boxShadow = '0 0 20px rgba(0, 123, 255, 0.6)';
    setTimeout(() => {
        ctaButton.style.boxShadow = '0 4px 15px rgba(0, 123, 255, 0.3)';
    }, 500);
}, 2000);

// Add floating animation to service cards
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.2}s`;
    card.style.animation = 'float 3s ease-in-out infinite';
});

// Add keyframes for floating animation
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
    }
    
    @keyframes pulse {
        0%, 100% { box-shadow: 0 4px 15px rgba(0, 123, 255, 0.3); }
        50% { box-shadow: 0 0 20px rgba(0, 123, 255, 0.6); }
    }
`;
document.head.appendChild(style);