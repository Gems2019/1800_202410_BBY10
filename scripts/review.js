document.addEventListener('DOMContentLoaded', function() {
  // Assuming there's a form with id 'reviewForm' and an input for the review message with id 'reviewMessage'
  const form = document.getElementById('reviewForm');
  const reviewMessageInput = document.getElementById('reviewMessage');

  // Function to handle form submission
  form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting in the traditional way

    // Retrieve tenantID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const tenantID = urlParams.get('userID'); // Ensure 'userID' is the correct query parameter name //URL LINK!

    // Retrieve landlordID from the current user session
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        const landlordID = user.uid;

        // Now, construct the review data
        const reviewData = {
          id: generateUniqueID(), // Implement this function based on your ID generation logic
          message: reviewMessageInput.value,
          timestamp: new Date().toLocaleDateString("en-US"), // Format the date as you need
          owner: landlordID,
        };
        // Store the review data in the tenant's document under 'reviews'
        const db = firebase.firestore(); // Assuming firestore is already initialized
        const tenantRef = db.collection('users').doc(tenantID);

        // Using Firestore's arrayUnion to add a review without overwriting existing ones
        tenantRef.update({
          reviews: firebase.firestore.FieldValue.arrayUnion(reviewData)
        }).then(() => {
          console.log('Review added successfully.');
          // Here, redirect to the tenant's profile page
          // Assuming the tenant's profile page URL looks like 'tenantProfile.html?userID=<TenantID>'
          window.location.href = `tenantProfile.html?userID=${tenantID}`; //URL LINK!
        }).catch(error => {
          console.error("Error adding review: ", error);
        });

      } else {
        console.error("Landlord not signed in.");
        // Redirect to login or handle accordingly
        window.location.href = 'login.html';
      }
    });
  });

  // Function to generate a unique ID for the review
  function generateUniqueID() {
    // Use the current timestamp as the base
    const timestamp = Date.now().toString(36); // Convert to base 36 for compactness
    // Generate a random string
    const randomString = Math.random().toString(36).substr(2, 9); // 9 characters from the random fraction
    // Combine them to form a unique ID
    return `${timestamp}-${randomString}`;
  }

});
