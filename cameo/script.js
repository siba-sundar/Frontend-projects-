document.addEventListener('DOMContentLoaded', function() {
    const defaultLink = document.querySelector('ul li a.default');
    const links = document.querySelectorAll('ul li a');

    // Function to set active link styles
    function setActiveLink(link) {
        // Reset styles for all links
        links.forEach(function(link) {
            link.classList.remove('default');
            link.style.backgroundColor = '';
            link.style.color = '';
        });

        // Set styles for the active link
        link.classList.add('default');
        link.style.backgroundColor = '#FDE29E';
        link.style.color = '#3C4733';
    }

    // Set initial default selection
    setActiveLink(defaultLink);

    // Add click event listener to each link
    links.forEach(function(link) {
        link.addEventListener('click', function(event) {
            // Prevent the default action
            event.preventDefault();

            // Set active link styles for the clicked link
            setActiveLink(this);
        });
    });
});
