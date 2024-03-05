document.addEventListener('DOMContentLoaded', function () {
  const stars = document.querySelectorAll('.star');
  const submitBtn = document.getElementById('submitRating');
  const thankYouMessage = document.getElementById('thankYouMessage');
  let userRating = 0;
  let totalRatings = JSON.parse(localStorage.getItem('totalRatings')) || [];

  function highlightStars(index) {
      for (let i = 0; i < stars.length; i++) {
          stars[i].className = i <= index ? 'star fas fa-star text-warning' : 'star fas fa-star text-secondary';
      }
  }

  stars.forEach((star, index) => {
      star.addEventListener('click', () => {
          userRating = index + 1;
          highlightStars(index);
      });
  });

  submitBtn.addEventListener('click', () => {
      if (userRating !== 0) {
          totalRatings.push(userRating);
          localStorage.setItem('totalRatings', JSON.stringify(totalRatings));
          updatePooledRating();
          thankYouMessage.innerHTML = '<div class="alert alert-success" role="alert">Thank you for submitting your rating!</div>';
          // Reset the user rating after submission
          userRating = 0;
          highlightStars(-1); // Reset stars highlighting
      } else {
          alert('Please select a rating before submitting.');
      }
  });

  function updatePooledRating() {
      const sum = totalRatings.reduce((a, b) => a + b, 0);
      const average = totalRatings.length ? Math.round(sum / totalRatings.length) : 0;
      
      const pooledStars = document.getElementById('pooledRating').children;
      for (let i = 0; i < pooledStars.length; i++) {
          pooledStars[i].className = i < average ? 'fas fa-star text-warning' : 'fas fa-star text-secondary';
      }
  }

  const storedUserRating = parseInt(localStorage.getItem('userRating'));
  if (storedUserRating) {
      userRating = storedUserRating;
      highlightStars(storedUserRating - 1);
  }
  updatePooledRating();
});
