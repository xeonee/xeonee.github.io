document.addEventListener('DOMContentLoaded', function() {

    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close mobile menu when clicking on a nav link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }

    // Smooth scrolling for anchor links (if any are added later)
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Add animation to elements when they come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.intro-item, .skill-category, .value-item, .experience-item, .project-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Header background on scroll
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.style.boxShadow = '0 1px 0 #21262d';
            } else {
                header.style.boxShadow = 'none';
            }
        });
    }

    // Active navigation is set server-side by Jekyll (see _includes/nav.html).

    // Form handling (for future contact forms)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add form handling logic here when needed
            console.log('Form submitted');
        });
    });

    // Keyboard navigation enhancement
    document.addEventListener('keydown', function(e) {
        // ESC key closes mobile menu
        if (e.key === 'Escape') {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });

    // Performance optimization: Debounce scroll events
    let ticking = false;

    function updateOnScroll() {
        // Any scroll-based updates can go here
        ticking = false;
    }

    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    });

    // Preload critical images
    const criticalImages = [
        'images/profile.jpg'
    ];

    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });

    // Console greeting for developers who inspect the site
    console.log(`
    ███████╗██╗  ██╗██╗   ██╗██╗  ██╗██╗
    ██╔════╝██║  ██║██║   ██║██║ ██╔╝██║
    ███████╗███████║██║   ██║█████╔╝ ██║
    ╚════██║██╔══██║██║   ██║██╔═██╗ ██║
    ███████║██║  ██║╚██████╔╝██║  ██╗██║
    ╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝╚═╝

    Hey there, fellow developer! 👋
    Thanks for checking out the code.
    This portfolio is built with vanilla HTML, CSS, and JavaScript.

    Want to get in touch? Check out the contact links!
    `);
});

// Utility functions that might be useful later

// Function to get current theme (if dark mode is added later)
function getCurrentTheme() {
    return localStorage.getItem('theme') || 'light';
}

// Function to toggle theme (for future dark mode implementation)
function toggleTheme() {
    const currentTheme = getCurrentTheme();
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    return newTheme;
}

// Function to format dates (useful for blog posts later)
function formatDate(dateString) {
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Function to truncate text (useful for blog excerpts)
function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
}

// Export functions for potential future use
window.portfolioUtils = {
    getCurrentTheme,
    toggleTheme,
    formatDate,
    truncateText
};