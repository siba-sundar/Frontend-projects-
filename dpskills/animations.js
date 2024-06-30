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








// button click cards 
let scrollPosition = 0;

function scrollCardsLeft() {
    const cardScroll = document.querySelector('.cardScroll');
    const cardWidth = document.querySelector('.card').offsetWidth;
    const containerWidth = document.querySelector('.cardContainer').offsetWidth;

    if (scrollPosition > 0) {
        scrollPosition -= cardWidth;
        cardScroll.style.transform = `translateX(-${scrollPosition}px)`;
    }
}

function scrollCardsRight() {
    const cardScroll = document.querySelector('.cardScroll');
    const cardWidth = document.querySelector('.card').offsetWidth;
    const containerWidth = document.querySelector('.cardContainer').offsetWidth;
    const totalScrollWidth = cardScroll.scrollWidth;

    if (scrollPosition + containerWidth < totalScrollWidth) {
        scrollPosition += cardWidth;
        cardScroll.style.transform = `translateX(-${scrollPosition}px)`;
    }
}








// paralax animation 

const parallax = document.getElementById("parallax");

// Parallax Effect for DIV 1
window.addEventListener("scroll", function () {
  let offset = window.pageYOffset;
  parallax.style.backgroundPositionY = offset * 0.7 + "px";
  // DIV 1 background will move slower than other elements on scroll.
});




let sucScrollPosition = 0;

function scrollSucCardsLeft() {
    const cardScroll = document.querySelector('.sucCardScroll');
    const cardWidth = document.querySelector('.sucCard').offsetWidth;
    const containerWidth = document.querySelector('.sucCardContainer').offsetWidth;

    if (sucScrollPosition > 0) {
        sucScrollPosition -= cardWidth;
        cardScroll.style.transform = `translateX(-${sucScrollPosition}px)`;
    }
}

function scrollSucCardsRight() {
    const cardScroll = document.querySelector('.sucCardScroll');
    const cardWidth = document.querySelector('.sucCard').offsetWidth;
    const containerWidth = document.querySelector('.sucCardContainer').offsetWidth;
    const totalScrollWidth = cardScroll.scrollWidth;

    if (sucScrollPosition + containerWidth < totalScrollWidth) {
        sucScrollPosition += cardWidth;
        cardScroll.style.transform = `translateX(-${sucScrollPosition}px)`;
    }
}

















document.addEventListener('DOMContentLoaded', () => {
    const questions = document.querySelectorAll('.question');
    const answerDiv = document.getElementById('answer');
    const answersSection = document.getElementById('answers');
    let currentQuestion = null;

    questions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.getAttribute('data-answer');

            // Remove bold from previous question
            if (currentQuestion) {
                currentQuestion.querySelector('p').classList.remove('font-bold');
            }

            // Hide current answer
            answerDiv.classList.add('hidden');
            
            setTimeout(() => {
                // Update answer text
                answerDiv.textContent = answer;

                // Show new answer
                answerDiv.classList.remove('hidden');
                
                // Bold the selected question
                question.querySelector('p').classList.add('font-bold');

                // Update current question
                currentQuestion = question;
            }, 300); // Adjust timing as necessary for your sliding animation
        });
    });
});