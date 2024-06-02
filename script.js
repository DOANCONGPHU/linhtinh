// Get elements
const playButton = document.getElementById('playButton');
const videoContainer = document.getElementById('videoContainer');
const myVideo = document.getElementById('myVideo');

// Play video on button click
playButton.addEventListener('click', () => {
    videoContainer.style.display = 'block';
    myVideo.play();
});

