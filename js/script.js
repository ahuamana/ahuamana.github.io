document.addEventListener('DOMContentLoaded', (event) => {
    const fadeElements = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
            }
        });
    });

    fadeElements.forEach(element => {
        element.style.opacity = 0;
        observer.observe(element);
    });
});
