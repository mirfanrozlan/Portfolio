// DOM Elements
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const header = document.querySelector('.header');

// Mobile Menu Toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Smooth Scrolling for Navigation Links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const headerHeight = header.offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header Background Change on Scroll
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    if (scrolled > 50) {
        header.style.background = 'rgba(0, 0, 0, 0.98)';
        header.style.backdropFilter = 'blur(25px)';
        header.style.borderBottom = '1px solid rgba(255, 255, 255, 0.15)';
        header.style.transform = 'translateY(0)';
    } else {
        header.style.background = 'rgba(0, 0, 0, 0.95)';
        header.style.backdropFilter = 'blur(20px)';
        header.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
        header.style.transform = 'translateY(0)';
    }
});

// Intersection Observer for Animation on Scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animations
const animateElements = document.querySelectorAll('.project-card, .about-text, .contact-content');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Active Navigation Link Highlighting
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.pageYOffset + header.offsetHeight + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Form Submission Handler
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        // Simple validation
        if (!name || !email || !message) {
            alert('Please fill in all fields.');
            return;
        }
        
        // Simulate form submission
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            alert('Thank you for your message! I\'ll get back to you soon.');
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Project Card Hover Effects
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Smooth scroll to top functionality
const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};

// Add scroll to top button (optional)
const createScrollToTopButton = () => {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.className = 'scroll-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #667eea;
        color: white;
        border: none;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: 1000;
    `;
    
    button.addEventListener('click', scrollToTop);
    document.body.appendChild(button);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            button.style.opacity = '1';
        } else {
            button.style.opacity = '0';
        }
    });
};

// Initialize scroll to top button
createScrollToTopButton();

// Parallax effect for hero section
const hero = document.querySelector('.hero');
if (hero) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    });
}

// Enhanced typing animation for hero subtitle
function typeWriter() {
    const texts = [
        'Software Developer',
        'Mobile Developer',
        'AI Developer'
    ];
    const typingElement = document.getElementById('typing-text');
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500; // Pause before next word
        }
        
        setTimeout(type, typeSpeed);
    }
    
    type();
}

// Real-time clock
function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit'
    });
    const clockElement = document.getElementById('current-time');
    if (clockElement) {
        clockElement.textContent = timeString;
    }
}

// Animated counters
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// Initialize counters
function initCounters() {
    const experienceCounter = document.getElementById('experience-counter');
    const commitsCounter = document.getElementById('commits-counter');
    const linesCounter = document.getElementById('lines-counter');
    const coffeeCounter = document.getElementById('coffee-counter');
    
    if (experienceCounter) animateCounter(experienceCounter, 15, 2000);
    if (commitsCounter) animateCounter(commitsCounter, 127, 2500);
    if (linesCounter) animateCounter(linesCounter, 5420, 3000);
    if (coffeeCounter) animateCounter(coffeeCounter, 342, 2800);
}

// Dynamic skills generation
function generateSkills() {
    const skills = [
        'JavaScript', 'Python', 'React', 'Node.js', 'HTML5', 'CSS3',
        'Git', 'MongoDB', 'Express.js', 'SQL', 'Java', 'C++'
    ];
    
    const skillsContainer = document.getElementById('skills-container');
    if (skillsContainer) {
        skillsContainer.innerHTML = '';
        
        skills.forEach((skill, index) => {
            const skillTag = document.createElement('div');
            skillTag.className = 'skill-tag';
            skillTag.textContent = skill;
            skillTag.style.animationDelay = `${index * 0.1}s`;
            
            // Add click interaction
            skillTag.addEventListener('click', () => {
                skillTag.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    skillTag.style.transform = '';
                }, 200);
            });
            
            skillsContainer.appendChild(skillTag);
        });
    }
}

// Get user location (with fallback)
function getUserLocation() {
    const locationElement = document.getElementById('location');
    
    if (!locationElement) return; // Exit if element doesn't exist
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                // For demo purposes, we'll use a static location
                // In a real app, you'd use a reverse geocoding service
                locationElement.textContent = 'Temerloh, Pahang';
            },
            (error) => {
                locationElement.textContent = 'Temerloh, Pahang';
            }
        );
    } else {
        locationElement.textContent = 'Temerloh, Pahang';
    }
}

// Parallax effect for floating elements
function initParallax() {
    const floatingElements = document.querySelector('.floating-elements');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (floatingElements) {
            floatingElements.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Interactive info cards
function initInfoCards() {
    const infoCards = document.querySelectorAll('.info-card');
    
    infoCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Status indicator animation
function initStatusIndicator() {
    const statusDot = document.querySelector('.status-dot');
    const statusText = document.getElementById('availability-status');
    
    if (statusDot && statusText) {
        setInterval(() => {
            statusDot.style.boxShadow = '0 0 10px #00ff88';
            setTimeout(() => {
                statusDot.style.boxShadow = '';
            }, 500);
        }, 3000);
    }
}

// Initialize all dynamic functionality on page load
window.addEventListener('load', () => {
    // Initialize typing animation
    setTimeout(() => {
        typeWriter();
    }, 1000);
    
    // Initialize real-time clock
    updateClock();
    setInterval(updateClock, 1000);
    
    // Initialize counters
    setTimeout(() => {
        initCounters();
    }, 2000);
    
    // Generate skills
    generateSkills();
    
    // Get user location
    getUserLocation();
    
    // Initialize parallax
    initParallax();
    
    // Initialize info cards
    initInfoCards();
    
    // Initialize status indicator
    initStatusIndicator();
});

// Skill tags animation
const skillTags = document.querySelectorAll('.skill-tag');
skillTags.forEach((tag, index) => {
    tag.style.animationDelay = `${index * 0.1}s`;
    tag.style.animation = 'fadeInUp 0.6s ease forwards';
});

// Add CSS for active nav link
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: #64ffda !important;
    }
    .nav-link.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(style);

// Performance optimization: Throttle scroll events
const throttle = (func, limit) => {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
};

// Apply throttling to scroll events
const throttledScrollHandler = throttle(() => {
    // Scroll-based animations and effects are already handled above
}, 16); // ~60fps

window.addEventListener('scroll', throttledScrollHandler);

console.log('Portfolio website loaded successfully! 🚀');