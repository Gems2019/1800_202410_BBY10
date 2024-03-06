
document.addEventListener('DOMContentLoaded', function() {
    const stars = document.querySelectorAll('#rateExperience .star');
    let rating = 0;

    stars.forEach(star => {
        star.addEventListener('click', function() {
            rating = this.getAttribute('data-value');
            updateStars(rating);
        });
    });

    document.getElementById('submitRating').addEventListener('click', function() {
        if (rating > 0) {
            alert('Thank you for your rating: ' + rating + ' stars!');
            // Here you can add functionality to send the rating to a server, etc.
        } else {
            alert('Please select a rating.');
        }
    });

    function updateStars(rating) {
        stars.forEach(star => {
            if (star.getAttribute('data-value') <= rating) {
                star.classList.add('rated');
            } else {
                star.classList.remove('rated');
            }
        });
    }
});
