// banner heading animation


document.addEventListener('DOMContentLoaded', function() {
    const headings = document.querySelectorAll('.heading');
    let index = 0;

    function showNextHeading() {
        headings.forEach((heading, idx) => {
            if (idx === index) {
                heading.classList.add('headingActive');
            } else {
                heading.classList.remove('headingActive');
            }
        });
        
        index = (index + 1) % headings.length;
        setTimeout(showNextHeading, 3000); // Change heading every 3 seconds
    }

    showNextHeading();
});




// auto scroll animation for partners logo

document.addEventListener('DOMContentLoaded', function() {
    const logoContainer = document.querySelector('.logoContainer');

    // Pause the animation on hover
    logoContainer.addEventListener('mouseover', function() {
        logoContainer.style.animationPlayState = 'paused';
    });

    // Resume the animation when not hovering
    logoContainer.addEventListener('mouseout', function() {
        logoContainer.style.animationPlayState = 'running';
    });
});











