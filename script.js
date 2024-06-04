document.addEventListener("DOMContentLoaded", function() {
  const vimeoChannelId = 'animation'; // Replace with your Vimeo channel ID
  const videoContainer = document.getElementById('videoContainer');
  const videoTitle = document.getElementById('videoTitle');
  const videoDescription = document.getElementById('videoDescription');
  const videoGrid = document.querySelector('.video-grid');
  const darkModeToggle = document.getElementById('darkModeToggle');
  const searchInput = document.querySelector('.search-bar input[type="text"]');
  const searchButton = document.querySelector('.search-bar button');

  // Function to embed Vimeo video
  function embedVimeoVideo(videoId, container) {
      container.innerHTML = ''; // Clear any existing content
      const iframe = document.createElement('iframe');
      iframe.src = `https://player.vimeo.com/video/${videoId}`;
      iframe.width = '100%';
      iframe.height = container.offsetWidth * 9 / 16; // 16:9 aspect ratio
      iframe.frameBorder = '0';
      iframe.allow = 'autoplay; fullscreen; picture-in-picture';
      iframe.allowFullscreen = true;
      container.appendChild(iframe);
  }

  // Fetch and display featured video (first video in the channel)
  fetch(`https://vimeo.com/api/v2/channel/${vimeoChannelId}/videos.json`)
      .then(response => response.json())
      .then(videos => {
          const featuredVideo = videos[0];
          embedVimeoVideo(featuredVideo.id, videoContainer);
          videoTitle.textContent = featuredVideo.title;
          videoDescription.textContent = "featuredVideo.description";

          // Display other videos
          const otherVideos = videos.slice(1);
          otherVideos.forEach(video => {
              const videoElement = document.createElement('div');
              videoElement.classList.add('video-item');
              videoElement.innerHTML = `
                  <iframe src="https://player.vimeo.com/video/${video.id}" 
                      width="100%" height="200" frameborder="0" 
                      allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
                  <h3>${video.title}</h3>
              `;
              videoElement.addEventListener('click', () => {
                  openModal(video);
              });
              videoGrid.appendChild(videoElement);
          });
      })
      .catch(error => {
          console.error('Error fetching Vimeo videos:', error);
          videoContainer.innerHTML = '<p>Sorry, videos could not be loaded at this time.</p>';
      });

  // Dark mode toggle
  darkModeToggle.addEventListener('change', () => {
      document.body.classList.toggle('dark-mode');
  });

  // Video search
  searchButton.addEventListener('click', () => {
      const searchTerm = searchInput.value.toLowerCase();
      const videoItems = videoGrid.querySelectorAll('.video-item');
      videoItems.forEach(item => {
          const title = item.querySelector('h3').textContent.toLowerCase();
          item.style.display = title.includes(searchTerm) ? 'block' : 'none';
      });
  });

  // Share video (e.g., share on Facebook)
  const shareButton = document.getElementById('shareButton');
  shareButton.addEventListener('click', () => {
      const videoUrl = `https://vimeo.com/${vimeoChannelId}`;
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(videoUrl)}`, '_blank');
  });

  // Modal logic
  const modal = document.getElementById('videoModal');
  const modalCloseButton = document.querySelector('.close-button');
  const modalVideoContainer = document.getElementById('modalVideoContainer');
  const modalVideoTitle = document.getElementById('modalVideoTitle');
  const modalVideoDescription = document.getElementById('modalVideoDescription');

  function openModal(video) {
      modal.style.display = 'block';
      embedVimeoVideo(video.id, modalVideoContainer);
      modalVideoTitle.textContent = video.title;
      modalVideoDescription.textContent = video.description;
  }

  modalCloseButton.addEventListener('click', () => {
      modal.style.display = 'none';
  });

  window.addEventListener('click', (event) => {
      if (event.target === modal) {
          modal.style.display = 'none';
      }
  });

  // Comment functionality
  const commentForm = document.getElementById('commentForm');
  const commentInput = document.getElementById('commentInput');
  const commentsList = document.getElementById('commentsList');

  commentForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const commentText = commentInput.value.trim();
      if (commentText) {
          const commentItem = document.createElement('li');
          commentItem.textContent = commentText;
          commentsList.appendChild(commentItem);
          commentInput.value = '';
      }
  });

  // Filter videos by category
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(button => {
      button.addEventListener('click', () => {
          const category = button.getAttribute('data-category');
          const videoItems = videoGrid.querySelectorAll('.video-item');
          videoItems.forEach(item => {
              const title = item.querySelector('h3').textContent.toLowerCase();
              item.style.display = (category === 'all' || title.includes(category)) ? 'block' : 'none';
          });
      });
  });

  // Page load animation
  window.addEventListener('load', () => {
      document.body.classList.add('loaded');
  });
});
