 // Dark mode toggle functionality
 const darkModeToggle = document.getElementById('toggle-dark-mode');
 const body = document.body;
 const icon = darkModeToggle.querySelector('i');

 // Check for saved dark mode preference
 if (localStorage.getItem('darkMode') === 'enabled') {
     body.classList.add('dark-mode');
     icon.classList.replace('fa-moon', 'fa-sun');
 }

 darkModeToggle.addEventListener('click', () => {
     body.classList.toggle('dark-mode');
     if (body.classList.contains('dark-mode')) {
         localStorage.setItem('darkMode', 'enabled');
         icon.classList.replace('fa-moon', 'fa-sun');
     } else {
         localStorage.setItem('darkMode', null);
         icon.classList.replace('fa-sun', 'fa-moon');
     }
 });