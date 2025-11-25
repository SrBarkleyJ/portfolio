const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const icon = themeToggle.querySelector('i');
// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
}
themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    // Update icon
    if (body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    }
});
// ===== SMOOTH SCROLLING =====
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
// ===== SCROLL ANIMATIONS =====
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
// Observe all sections and cards
document.querySelectorAll('section, .project-card, .skill-category, .timeline-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});
// ===== ACTIVE NAVIGATION =====
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-menu a');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 100) {
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
// ===== TYPING EFFECT (Optional Enhancement) =====
const subtitle = document.querySelector('.hero-subtitle');
if (subtitle) {
    const text = subtitle.textContent;
    subtitle.textContent = '';
    let i = 0;
    function typeWriter() {
        if (i < text.length) {
            subtitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    // Start typing effect after page load
    setTimeout(typeWriter, 500);
}
// ===== STATS COUNTER ANIMATION =====
const stats = document.querySelectorAll('.stat-number');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const finalValue = target.textContent;
            // Only animate if it's a number
            if (!isNaN(parseInt(finalValue))) {
                let current = 0;
                const increment = parseInt(finalValue) / 50;
                const updateCounter = () => {
                    current += increment;
                    if (current < parseInt(finalValue)) {
                        target.textContent = Math.ceil(current) + (finalValue.includes('+') ? '+' : '');
                        requestAnimationFrame(updateCounter);
                    } else {
                        target.textContent = finalValue;
                    }
                };
                updateCounter();
            }
            statsObserver.unobserve(target);
        }
    });
}, { threshold: 0.5 });
stats.forEach(stat => statsObserver.observe(stat));
// ===== PROJECT CARDS HOVER EFFECT =====
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.zIndex = '10';
    });
    card.addEventListener('mouseleave', function () {
        this.style.zIndex = '1';
    });
});
// ===== CONSOLE MESSAGE =====
console.log('%c¡Hola! 👋', 'font-size: 20px; font-weight: bold; color: #667eea;');
console.log('%c¿Eres desarrollador? Revisa el código en GitHub: https://github.com/SrBarkleyJ', 'font-size: 14px; color: #718096;');
console.log('%cEste portfolio fue creado con ❤️ y mucho ☕', 'font-size: 12px; color: #f093fb;');