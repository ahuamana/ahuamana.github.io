
function closeMenu() {
    navToggle.classList.remove('active');
    navList.classList.remove('active');
    navOverlay.classList.remove('active');
    body.classList.remove('menu-open');
    body.style.top = '';
    window.scrollTo(0, scrollPosition);
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