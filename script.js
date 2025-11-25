// DOM Elements
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const header = document.querySelector('.header') || document.querySelector('header');

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
        const href = link.getAttribute('href') || '';
        if (href.startsWith('#')) {
            e.preventDefault();
            const targetSection = document.querySelector(href);
            if (targetSection) {
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = targetSection.offsetTop - headerHeight;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
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
    const scrollPosition = window.pageYOffset + (header ? header.offsetHeight : 0) + 100;
    
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

// Direct WhatsApp CTA is used; no form handler required here

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
        'Website Dev',
        'Artificial Intelligent',
        'Mobile Apps',
        'UI UX',
        'Assignment Helper'
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
    renderProjects();
    renderProjectDetail();
    initRevealAnimations();
    initTiltEffects();
    initStackLogos();
    initTechScroll();
    window.addEventListener('resize', throttle(() => { initTechScroll(); }, 200));
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
    
    .stack-item {
        display: inline-flex;
        align-items: center;
        margin-right: 0.75rem;
    }
    .stack-logo {
        width: 32px;
        height: 32px;
        object-fit: contain;
        display: block;
        filter: brightness(0) invert(1);
        opacity: 0.92;
    }
    .tech-stack-section { position: relative; }
    .tech-scroll { overflow: hidden; }
    .tech-track { display: inline-flex; align-items: center; gap: 0.9rem; white-space: nowrap; animation: tech-track-scroll 36s linear infinite; }
    @keyframes tech-track-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
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

function renderProjects() {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;
    const render = (data) => {
        const html = (data.projects || []).map(p => {
            const theme = p.theme;
            const badgeText = theme === 'primary' ? 'text-black' : 'text-white';
            const hoverBorder = `hover:border-${theme}/50`;
            const gradient = `bg-gradient-to-br from-${p.gradientFrom}/25 to-${p.gradientTo}/25`;
            const titleHover = `group-hover:text-${theme}`;
            const badgeBg = `bg-${theme}/90 ${badgeText}`;
            const viewClasses = `w-full px-6 py-3 text-${theme} border border-${theme}/50 rounded-xl hover:bg-${theme}/10 transition-all duration-300 font-bold inline-flex items-center justify-center gap-2`;
            const placeholder = '<div class="absolute inset-2 bg-gray-800/50 rounded-lg border border-dashed border-gray-600 flex items-center justify-center"><div class="text-center text-gray-400"><svg class="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg><p class="text-xs">Project Image</p></div></div>';
            const visual = p.imageSrc ? `<img src="${p.imageSrc}" alt="${p.imageAlt || ''}" class="absolute inset-0 w-full h-full object-cover">` : placeholder;
            return `<div class="bg-gray-900/60 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden ${hoverBorder} transition-all duration-300 group hover:transform hover:scale-105"><div class="h-48 ${gradient} relative overflow-hidden">${visual}<div class="absolute bottom-2 left-2"><span class="px-3 py-1 ${badgeBg} text-sm font-medium rounded-full">${p.categoryLabel}</span></div></div><div class="p-6"><h3 class="text-xl font-bold text-white mb-3 ${titleHover} transition-colors duration-300">${p.title}</h3><p class="text-gray-300 mb-4 leading-relaxed text-sm">${p.description}</p><div class="flex flex-wrap gap-2 mb-6">${(p.tags || []).map(t => `<span class=\"px-3 py-1 bg-gray-800 text-gray-300 text-xs rounded-full border border-gray-600\">${t}</span>`).join('')}</div><a class="${viewClasses}" href="${p.viewUrl || '#'}"><svg class=\"w-5 h-5\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M13 7l5 5m0 0l-5 5m5-5H6\"></path></svg><span>View Project</span></a></div></div>`;
        }).join('');
        grid.innerHTML = html;
    };
    const renderMessage = () => {
        grid.innerHTML = `<div class=\"col-span-full bg-gray-900/60 border border-gray-700/50 rounded-2xl p-8 text-center\"><p class=\"text-gray-300\">Unable to load projects. Start a local server and open this page via <span class=\"text-primary\">http://</span> or <span class=\"text-secondary\">https://</span>. Alternatively add inline JSON in a <span class=\"text-accent\">script#projects-data</span> tag.</p></div>`;
    };
    const tryInline = () => {
        const inline = document.getElementById('projects-data');
        if (!inline) return false;
        try {
            const data = JSON.parse(inline.textContent || '{}');
            render(data);
            return true;
        } catch (e) {
            return false;
        }
    };
    if (location.protocol === 'file:') {
        if (!tryInline()) renderMessage();
        return;
    }
    fetch('projects.json')
        .then(r => r.json())
        .then(render)
        .catch(() => {
            if (!tryInline()) renderMessage();
        });
}

function renderProjectDetail() {
    const container = document.getElementById('project-detail');
    if (!container) return;
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const render = (data) => {
        const project = (data.projects || []).find(p => p.id === id) || null;
        if (!project) {
            container.innerHTML = `<div class=\"bg-gray-900/60 border border-gray-700/50 rounded-2xl p-8\"><p class=\"text-gray-300\">Project not found.</p><a class=\"inline-block mt-4 px-4 py-2 text-primary border border-primary/50 rounded-lg hover:bg-primary/10\" href=\"index.html#projects\">Back to Projects</a></div>`;
            return;
        }
        document.title = `${project.title} - Project Detail`;
        const theme = project.theme;
        const badgeText = theme === 'primary' ? 'text-black' : 'text-white';
        const gradient = `bg-gradient-to-br from-${project.gradientFrom}/25 to-${project.gradientTo}/25`;
        const badgeBg = `bg-${theme}/90 ${badgeText}`;
        const heroSrc = project.imageSrc || ((project.images || [])[0] || '');
        const heroAlt = project.imageAlt || project.title || '';
        const heroImg = heroSrc ? `<img src=\"${heroSrc}\" alt=\"${heroAlt}\" class=\"w-full h-full object-cover max-h-[420px]\">` : `<div class=\"w-full h-full ${gradient}\"></div>`;
        const tags = (project.tags || []).map(t => `<span class=\"px-3 py-1 bg-gray-900/60 text-gray-300 text-xs rounded-full border border-gray-700\">${t}</span>`).join('');
        const video = '';
        const features = (project.features || []).length ? project.features : (project.tags || []).slice(0,4).map(t => ({ title: t, description: 'Key capability enabled by this technology.' }));
        const metrics = (project.metrics || []).length ? project.metrics : [
            { label: 'Users', value: '1.2k+', description: 'Active test users' },
            { label: 'Accuracy', value: '95%', description: 'Model performance' },
            { label: 'Latency', value: '120ms', description: 'Avg. inference time' }
        ];
        const gallery = (project.images || []).slice(0,2);
        const testimonial = '';
        const marquee = (project.tags || []).map(t => {
            const normalized = t.toLowerCase();
            const map = {
                'vue.js':'vuedotjs',
                'vue':'vuedotjs',
                'next.js':'nextdotjs',
                'next':'nextdotjs',
                'tailwind css':'tailwindcss',
                'tailwind':'tailwindcss',
                'aws':'amazonaws',
                'amazon web services':'amazonaws',
                'web3.js':'web3dotjs',
                'web3':'web3dotjs',
                'raspberry pi':'raspberrypi',
                'css':'css3',
                'css3':'css3',
                'html':'html5',
                'html5':'html5',
            };
            const mapped = map[normalized] || normalized.replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');
            const cdn = `https://cdn.jsdelivr.net/npm/simple-icons@15/icons/${mapped}.svg`;
            return `<span class=\"stack-item\"><img class=\"stack-logo\" data-tag=\"${t}\" src=\"${cdn}\" alt=\"${t}\"/></span>`;
        }).join('');
        container.innerHTML = `
            <section class="pt-10 md:pt-16 lg:pt-20 pb-8 md:pb-12">
                <div class="grid md:grid-cols-2 gap-8 items-center">
                    <div class="md:order-first" data-reveal>
                        <div class="flex gap-2 mb-4">
                            <span class="px-3 py-1 rounded-full text-xs font-semibold bg-${theme}/10 text-${theme} border border-${theme}/30">${project.subtitle || project.categoryLabel || ''}</span>
                            ${project.categoryLabel ? `<span class="px-3 py-1 rounded-full text-xs font-semibold bg-secondary/10 text-secondary border border-secondary/30">${project.categoryLabel}</span>` : ''}
                        </div>
                        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 animated-gradient-text">${project.title}</h1>
                        <p class="text-gray-300 text-base sm:text-lg leading-relaxed max-w-xl">${project.description}</p>
                        <div class="mt-6 flex flex-wrap gap-4" data-reveal>
                            <a href="#gallery" class="px-6 py-3 rounded-xl bg-${theme} text-black font-bold hover:brightness-110 active:scale-95 transition hover-scale">View Demo</a>
                            <a href="#description" class="px-6 py-3 rounded-xl border border-gray-700 text-gray-300 hover:border-gray-500 transition">How It Works</a>
                        </div>
                    </div>
                    <div class="relative md:order-last md:justify-self-end" data-reveal>
                        <div class="rounded-3xl overflow-hidden border border-${theme}/20 shadow-2xl shadow-${theme}/10 tilt-will-change hover-scale" data-tilt>${heroImg}</div>
                    </div>
                </div>
            </section>
            ${gallery.length ? `
            <section id="gallery" class="py-12 md:py-16">
                <h2 class="text-2xl md:text-3xl font-bold mb-8" data-reveal>Project Gallery</h2>
                <div class="grid md:grid-cols-2 gap-6" data-stagger>
                    ${gallery.map(src => `
                        <div class="group rounded-2xl overflow-hidden border border-gray-800 bg-gray-900/50 hover:border-${theme}/40 transition relative hover-lift" data-reveal>
                            <div class="aspect-[16/9] overflow-hidden bg-black/40">
                                <img src="${src}" class="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500">
                            </div>
                        </div>
                    `).join('')}
                </div>
            </section>
            ` : ''}
            <section id="description" class="py-12 md:py-16">
                <h2 class="text-2xl md:text-3xl font-bold mb-8" data-reveal>Project Description</h2>
                <div class="p-6 rounded-2xl bg-gray-900/60 border border-gray-800 hover:border-${theme}/40 transition hover-lift" data-reveal>
                    <p class="text-gray-300 leading-relaxed">${project.description}</p>
                </div>
            </section>
            <section class=\"py-12 md:py-16\">
                <h2 class=\"text-2xl md:text-3xl font-bold mb-8\" data-reveal>Tech Stack</h2>
                <div class=\"tech-stack-section\" data-reveal>
                    <div class=\"tech-scroll\">
                        <div class=\"tech-track\">${marquee}${marquee}</div>
                    </div>
                </div>
            </section>
            <section class="py-12 md:py-16">
                <div class="p-6 rounded-2xl bg-gray-900/60 border border-gray-800 hover:border-${theme}/40 transition hover-lift text-center" data-reveal>
                    <div class="text-gray-300 mb-4">Interested in building something similar?</div>
                    <a href="index.html#home" class="inline-flex items-center gap-2 px-6 py-3 text-${theme} border border-${theme}/50 rounded-xl hover:bg-${theme}/10 font-bold">Hire Us</a>
                </div>
            </section>
        `;
        initRevealAnimations();
    };
    const renderMessage = () => {
        container.innerHTML = `<div class=\"bg-gray-900/60 border border-gray-700/50 rounded-2xl p-8\"><p class=\"text-gray-300\">Unable to load project detail. Start a local server or add inline JSON under <span class=\"text-accent\">script#projects-data</span>.</p></div>`;
    };
    const tryInline = () => {
        const inline = document.getElementById('projects-data');
        if (!inline) return false;
        try {
            const data = JSON.parse(inline.textContent || '{}');
            render(data);
            return true;
        } catch (e) {
            return false;
        }
    };
    if (location.protocol === 'file:') {
        if (!tryInline()) renderMessage();
        return;
    }
    fetch('projects.json')
        .then(r => r.json())
        .then(render)
        .catch(() => {
            if (!tryInline()) renderMessage();
        });
}

function initRevealAnimations() {
    const nodes = document.querySelectorAll('[data-reveal]');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('show');
        });
    }, { threshold: 0.1 });
    nodes.forEach((n, i) => {
        n.style.setProperty('--delay', `${i * 0.06}s`);
        observer.observe(n);
    });
    document.querySelectorAll('[data-stagger]').forEach(group => {
        const children = Array.from(group.children);
        children.forEach((child, idx) => child.style.setProperty('--delay', `${idx * 0.08}s`));
    });
}

function initTiltEffects() {
    const nodes = document.querySelectorAll('[data-tilt]');
    nodes.forEach(el => {
        const strength = 12;
        const onMove = (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            const rx = (y / rect.height) * strength;
            const ry = (x / rect.width) * -strength;
            el.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
        };
        const onLeave = () => {
            el.style.transform = '';
        };
        el.addEventListener('mousemove', onMove);
        el.addEventListener('mouseleave', onLeave);
    });
}

// Removed legacy tech marquee logic; using tech-scroll track instead

function initTechScroll() {
    const fill = (track) => {
        const viewport = track.parentElement;
        const base = track.getAttribute('data-base') || track.innerHTML;
        track.setAttribute('data-base', base);
        let guard = 0;
        while (track.scrollWidth < viewport.offsetWidth * 2.4 && guard < 50) {
            track.insertAdjacentHTML('beforeend', base);
            guard++;
        }
    };
    document.querySelectorAll('.tech-scroll .tech-track').forEach(track => {
        fill(track);
        track.querySelectorAll('img').forEach(img => {
            if (img.complete) return;
            img.addEventListener('load', () => fill(track));
        });
    });
}

const STACK_EXTS = ['svg','png','jpg','webp'];
function slugifyTag(tag) {
    return tag.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');
}
function logoPath(tag, idx) {
    const slug = slugifyTag(tag);
    const ext = STACK_EXTS[idx] || STACK_EXTS[0];
    return `images/stack/${slug}.${ext}`;
}
function initStackLogos() {
    document.querySelectorAll('img.stack-logo').forEach(img => {
        const tag = img.getAttribute('data-tag') || '';
        let idx = 0;
        const tryNext = () => {
            idx += 1;
            if (idx < STACK_EXTS.length) {
                img.src = logoPath(tag, idx);
            } else {
                const parent = img.parentElement;
                if (parent) parent.style.display = 'none';
                else img.style.display = 'none';
            }
        };
        img.addEventListener('error', tryNext);
    });
}
