document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('reviewForm');

  form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting in the traditional way

    // Retrieve values within the event to ensure they are current
    let tenantLevel = document.getElementById("level").value;
    let tenantSeason = document.getElementById("season").value;
    let tenantDescription = document.getElementById("description").value;

    // Rest of the code remains the same...
    const urlParams = new URLSearchParams(window.location.search);
    const tenantID = urlParams.get('tenantID'); // Make sure this matches your URL parameter

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        const landlordID = user.uid;
        const reviewData = {
          id: generateUniqueID(),
          level: tenantLevel,
          season: tenantSeason,
          description: tenantDescription,
          timestamp: new Date().toLocaleDateString("en-US"),
          owner: landlordID,
        };

        const db = firebase.firestore();
        const tenantRef = db.collection('users').doc(tenantID);

        tenantRef.update({
          reviews: firebase.firestore.FieldValue.arrayUnion(reviewData)
        }).then(() => {
          console.log('Review added successfully.');
          window.location.href = `tenantProfile.html?tenantID=${tenantID}`;
        }).catch(error => {
          console.error("Error adding review: ", error);
        });

      } else {
        console.error("Landlord not signed in.");
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
