// Smooth scrolling for navigation links
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

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.8)';
    }
});

// Scroll to top function
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Theme toggle (basic implementation)
document.querySelector('.theme-toggle').addEventListener('click', function() {
    // This would toggle between light and dark themes
    console.log('Theme toggle clicked');
    this.textContent = this.textContent === '🌙' ? '☀️' : '🌙';
});

// Add hover effects to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
            
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

 // Add click effects to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Mascot interactions
let mascotClickCount = 0;
document.querySelector('.mascot').addEventListener('click', function() {
    mascotClickCount++;
            
    if (mascotClickCount === 1) {
        scrollToTop();
    } else if (mascotClickCount === 3) {
        // Easter egg - change mascot emoji
        this.textContent = '🎉';
        setTimeout(() => {
            this.textContent = '🚀';
            mascotClickCount = 0;
        }, 2000);
    }
});

// Typing animation for hero subtitle
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
            
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            // Add blinking cursor
            element.innerHTML += '<span style="animation: blink 1s infinite;">|</span>';
        }
    }
            
    type();
}

// Initialize typing animation after page load
window.addEventListener('load', () => {
    setTimeout(() => {
        const subtitle = document.querySelector('.hero-subtitle');
        const originalText = subtitle.textContent;
        typeWriter(subtitle, originalText, 80);
    }, 1000);
});

// Add CSS for ripple effect
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
            
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
            
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
            
    @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }
            
    .skill-category:hover {
        transform: translateY(-5px);
        box-shadow: 0 15px 30px rgba(102, 126, 234, 0.2);
    }
            
    .update-item:hover .update-icon {
        transform: scale(1.1) rotate(5deg);
    }
            
    /* Enhanced parallax effect */
    .hero::before {
        animation: float 20s infinite linear, pulse 4s infinite ease-in-out;
    }
            
    @keyframes pulse {
        0%, 100% { opacity: 0.3; }
        50% { opacity: 0.6; }
    }
            
    /* Progress bars for skills (optional enhancement) */
    .skill-progress {
        width: 100%;
        height: 6px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 3px;
        margin: 8px 0;
        overflow: hidden;
    }
            
    .skill-progress-bar {
        height: 100%;
        background: var(--primary-gradient);
        border-radius: 3px;
        transform: translateX(-100%);
        transition: transform 1s ease-out;
    }
            
    .skill-progress-bar.animate {
        transform: translateX(0);
    }
            
    /* Floating elements */
    .floating-element {
        position: absolute;
        pointer-events: none;
        opacity: 0.1;
        animation: float-elements 15s infinite ease-in-out;
    }
            
    @keyframes float-elements {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        33% { transform: translateY(-30px) rotate(120deg); }
        66% { transform: translateY(-15px) rotate(240deg); }
    }
            
    /* Enhanced hover states */
    .social-link:hover {
        background: var(--primary-gradient);
        transform: translateY(-3px) rotate(5deg);
    }
            
    .nav-links a:hover {
        text-shadow: 0 0 10px rgba(102, 126, 234, 0.5);
    }
            
    /* Custom scrollbar */
    ::-webkit-scrollbar {
        width: 8px;
    }
            
    ::-webkit-scrollbar-track {
        background: var(--dark-bg);
    }
            
    ::-webkit-scrollbar-thumb {
        background: var(--primary-gradient);
        border-radius: 4px;
    }
            
    ::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%);
    }
`;
document.head.appendChild(rippleStyle);

// Add floating elements to hero
function createFloatingElements() {
    const hero = document.querySelector('.hero');
    const elements = ['⚡', '💻', '🎨', '🚀', '✨'];
            
    elements.forEach((emoji, index) => {
        const element = document.createElement('div');
        element.className = 'floating-element';
        element.textContent = emoji;
        element.style.left = Math.random() * 100 + '%';
        element.style.top = Math.random() * 100 + '%';
        element.style.fontSize = '2rem';
        element.style.animationDelay = index * 3 + 's';
        hero.appendChild(element);
    });
}

// Initialize floating elements
createFloatingElements();

// Smooth reveal animations for sections
const revealElements = document.querySelectorAll('.section');
revealElements.forEach((element, index) => {
    element.style.animationDelay = index * 0.2 + 's';
});

// Add intersection observer for skill progress bars
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Skills are now auto-scrolling, no need for progress bars
            console.log('Skills section visible');
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.skills-container').forEach(container => {
    skillObserver.observe(container);
});

// Enhanced theme toggle functionality
let isDarkMode = true;
document.querySelector('.theme-toggle').addEventListener('click', function() {
    isDarkMode = !isDarkMode;
            
    if (isDarkMode) {
        document.body.style.background = 'var(--dark-bg)';
        document.body.style.color = 'var(--text-light)';
        this.textContent = '🌙';
    } else {
        document.body.style.background = 'linear-gradient(135deg, #dadadaff 0%, #b3b3b3ff 100%)';
        document.body.style.color = 'var(--text-dark)';
        this.textContent = '☀️';
    }
            
    // Animate the transition
    document.body.style.transition = 'all 0.3s ease';
});

// Contact form handling (if you want to add a contact form)
function handleContactForm() {
    // This would handle contact form submissions
    console.log('Contact form submitted');
}

// Performance optimization: Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Close any open modals or return to top
        scrollToTop();
    }
});

console.log('🚀 Kai Shi Portfolio loaded successfully!');
console.log('💡 Try clicking the mascot 3 times for a surprise!');

// Skills Slider
const slider = document.querySelector('.skills-slider');
const slides = document.querySelectorAll('.skill-card');
const prevBtn = document.querySelector('.slider-btn.prev');
const nextBtn = document.querySelector('.slider-btn.next');

let currentIndex = 0;

// Clone slides untuk infinite effect
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);
slider.appendChild(firstClone);
slider.insertBefore(lastClone, slides[0]);

let slideWidth = slides[0].offsetWidth + 20; // termasuk gap
let totalSlides = slider.children.length;

slider.style.transform = `translateX(${-slideWidth}px)`;

// Next slide
function goNext() {
  if (currentIndex >= totalSlides - 2) return;
  currentIndex++;
  slider.style.transition = "transform 0.5s ease";
  slider.style.transform = `translateX(${-(slideWidth * (currentIndex + 1))}px)`;
}

// Prev slide
function goPrev() {
  if (currentIndex <= -1) return;
  currentIndex--;
  slider.style.transition = "transform 0.5s ease";
  slider.style.transform = `translateX(${-(slideWidth * (currentIndex + 1))}px)`;
}

// Reset kalau di clone
slider.addEventListener("transitionend", () => {
  if (currentIndex === totalSlides - 2) {
    slider.style.transition = "none";
    currentIndex = 0;
    slider.style.transform = `translateX(${-slideWidth}px)`;
  }
  if (currentIndex === -1) {
    slider.style.transition = "none";
    currentIndex = totalSlides - 3;
    slider.style.transform = `translateX(${-(slideWidth * (currentIndex + 1))}px)`;
  }
});

// Event listener tombol
nextBtn.addEventListener('click', goNext);
prevBtn.addEventListener('click', goPrev);

// Auto-slide
setInterval(goNext, 3000);

