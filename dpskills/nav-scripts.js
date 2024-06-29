// for showing the listed videos in the course section



const videos = {
    dataScience: [
        { title: "Introduction to Data Science", icon: "assets/video-image.png" },
        { title: "Data Analysis with Python", icon: "assets/video-image.png"},
        { title: "Machine Learning Basics", icon: "assets/video-image.png"}
    ],
    softwareDevelopment: [
        { title: "JavaScript for Beginners", icon: "assets/video-image.png"},
        { title: "Advanced Java Programming", icon: "assets/video-image.png"},
        { title: "Web Development with React", icon: "assets/video-image.png"}
    ],
    bankingFinance: [
        { title: "Basics of Banking", icon: "assets/video-image.png"},
        { title: "Financial Markets Overview", icon: "assets/video-image.png"},
        { title: "Investment Strategies", icon: "assets/video-image.png"}
    ],
    programmingCourses: [
        { title: "Learn Python in 10 Days", icon: "assets/video-image.png"},
        { title: "Mastering C++", icon: "assets/video-image.png"},
        { title: "Introduction to Java", icon: "assets/video-image.png"}
    ],
    businessTech: [
        { title: "Business Analytics", icon: "assets/video-image.png"},
        { title: "Technology in Business", icon: "assets/video-image.png"},
        { title: "Digital Transformation", icon: "assets/video-image.png"}
    ]
};

function showVideos(course, element) {
    const videoSection = document.getElementById('videoSection');
    const videoList = videos[course];
    videoSection.innerHTML = videoList.map(video => `
        <div class="videoContainer">
            <img src="${video.icon}" alt="Video Icon">
            <span>${video.title}</span>
        </div>
    `).join('');

    const links = document.querySelectorAll('.dropDownContent .left a');
    links.forEach(link => link.classList.remove('selected'));
    element.classList.add('selected');
}

// Initialize with the first option selected
document.addEventListener('DOMContentLoaded', function() {
    const firstLink = document.querySelector('.dropDownContent .left a');
    if (firstLink) {
        showVideos('dataScience', firstLink);
    }
});


// const videos = {
//     dataScience: {
//         free: [
//             { title: "Introduction to Data Science (Free)", icon: "assets/free-video.png" },
//             { title: "Data Analysis with Python (Free)", icon: "assets/free-video.png" },
//             { title: "Machine Learning Basics (Free)", icon: "assets/free-video.png" }
//         ],
//         paid: [
//             { title: "Advanced Data Science (Paid)", icon: "assets/paid-video.png" },
//             { title: "Deep Learning Fundamentals (Paid)", icon: "assets/paid-video.png" }
//         ]
//     },
//     softwareDevelopment: {
//         free: [
//             { title: "JavaScript for Beginners (Free)", icon: "assets/free-video.png" },
//             { title: "HTML & CSS Basics (Free)", icon: "assets/free-video.png" },
//             { title: "Web Development with React (Free)", icon: "assets/free-video.png" }
//         ],
//         paid: [
//             { title: "Advanced JavaScript Techniques (Paid)", icon: "assets/paid-video.png" },
//             { title: "Full-Stack Web Development (Paid)", icon: "assets/paid-video.png" }
//         ]
//     }
//     // Add similar structures for other course options
// };

// function showVideos(course, courseType) {
//     const videoSection = document.getElementById('courseVideos');
//     const videoList = videos[course][courseType];
//     videoSection.innerHTML = videoList.map(video => `
//         <div class="videoContainer">
//             <img src="${video.icon}" alt="Video Icon">
//             <span>${video.title}</span>
//         </div>
//     `).join('');
// }

// // Initialize with default option
// document.addEventListener('DOMContentLoaded', function() {
//     // Example: Show free videos for Data Science by default
//     showVideos('dataScience', 'free');
// });




// for drop down menu 


document.addEventListener('DOMContentLoaded', function () {
    const menuIcon = document.querySelector('.menuIcon');
    const headerBottom = document.querySelector('.headerBottom');

    // Toggle headerBottom visibility on menu icon click
    menuIcon.addEventListener('click', function () {
        headerBottom.classList.toggle('active');
    });

    // Close headerBottom when clicking outside of it
    document.addEventListener('click', function (event) {
        const isClickInside = headerBottom.contains(event.target) || menuIcon.contains(event.target);
        if (!isClickInside) {
            headerBottom.classList.remove('active');
        }
    });
});
