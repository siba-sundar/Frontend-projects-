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











// parallax effect code

document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('#scroll-section .section');
    const scrollSection = document.getElementById('scroll-section');
    const fixedSectionClass = 'fixed-section';
  
    window.addEventListener('scroll', () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const scrollSectionTop = scrollSection.offsetTop;
      const scrollSectionBottom = scrollSectionTop + scrollSection.offsetHeight;
  
      sections.forEach((section, index) => {
        const sectionTop = scrollSectionTop + index * windowHeight;
        const isLastSection = index === sections.length - 1;
  
        if (index < sections.length - 1) {
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + windowHeight) {
            section.classList.add(fixedSectionClass);
            section.style.transform = `translateY(${scrollPosition - sectionTop}px)`;
          } else {
            section.classList.remove(fixedSectionClass);
            section.style.transform = 'translateY(0)';
          }
        }
  
        if (isLastSection) {
          if (scrollPosition >= sectionTop) {
            section.classList.remove(fixedSectionClass);
            section.style.transform = 'translateY(0)';
          }
        }
      });
  
      if (scrollPosition >= sections[sections.length - 1].offsetTop) {
        sections.forEach(section => {
          section.classList.remove(fixedSectionClass);
          section.style.transform = 'translateY(0)';
        });
      }
    });
  });

  







  