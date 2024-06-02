const playButton = document.getElementById('playButton');
const videoContainer = document.getElementById('videoContainer');
const myVideo = document.getElementById('myVideo');

playButton.addEventListener('click', () => {
  videoContainer.style.display = 'block'; // Hiển thị video
  myVideo.play(); // Bắt đầu phát video
});
