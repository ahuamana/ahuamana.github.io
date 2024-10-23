document.addEventListener('DOMContentLoaded', function() {
    // Navigation elements
    const navToggle = document.querySelector('.nav-toggle');
    const navList = document.querySelector('.nav-list');
    const navOverlay = document.querySelector('.nav-overlay');
    const body = document.body;
    let scrollPosition = 0;

    // Navigation functions
    function closeMenu() {
        navToggle.classList.remove('active');
        navList.classList.remove('active');
        navOverlay.classList.remove('active');
        body.classList.remove('menu-open');
        body.style.top = '';
        window.scrollTo(0, scrollPosition);
    }

    function openMenu() {
        scrollPosition = window.pageYOffset;
        navToggle.classList.add('active');
        navList.classList.add('active');
        navOverlay.classList.add('active');
        body.classList.add('menu-open');
        body.style.top = `-${scrollPosition}px`;
    }

    function toggleMenu() {
        if (navList.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    }

    // Enhanced smooth scrolling function
    function smoothScrollTo(target, offset = 100) {
        const targetSection = document.querySelector(target);
        if (!targetSection) return;

        const targetPosition = targetSection.getBoundingClientRect().top;
        const offsetPosition = targetPosition + window.pageYOffset - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }

    // Handle all navigation links with smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');

            // If it's a mobile menu link, close the menu first
            if (window.innerWidth <= 768 && navList.classList.contains('active')) {
                closeMenu();
                // Add delay for menu closing animation
                setTimeout(() => {
                    smoothScrollTo(targetId);
                }, 300);
            } else {
                smoothScrollTo(targetId);
            }
        });
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach((element) => {
        observer.observe(element);
        // Set initial state
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    });

    // Active section highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function highlightNavigation() {
        const scrollPosition = window.scrollY;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Event Listeners
    navToggle.addEventListener('click', toggleMenu);
    navOverlay.addEventListener('click', closeMenu);
    window.addEventListener('scroll', highlightNavigation);
    
    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navList.classList.contains('active')) {
            closeMenu();
        }
    });

    // Handle resize events
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navList.classList.contains('active')) {
            closeMenu();
        }
    });

    // Initialize navigation highlight
    highlightNavigation();
});