// Get elements
const playButton = document.getElementById('playButton');
const videoContainer = document.getElementById('videoContainer');
const myVideo = document.getElementById('myVideo');

// Play video on button click
playButton.addEventListener('click', () => {
    videoContainer.style.display = 'block';
    myVideo.play();
});

// ... (lazy loading như ví dụ trước) ...

// Thêm hiệu ứng cuộn mượt
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});
