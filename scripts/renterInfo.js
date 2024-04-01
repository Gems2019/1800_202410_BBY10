var rentalDocID = localStorage.getItem("rentalDocID");    //visible to all functions on this page

function getRentalName(id) {
    db.collection("rentals")
      .doc(id)
      .get()
      .then((thisRental) => {
        var rentalName = thisRental.data().name;
        document.getElementById("rentalName").innerHTML = rentalName;
          });
}

getRentalName(rentalDocID);

function writeRenters() {
    console.log("inside write renter");
    let rentalTitle = document.getElementById("title").value;
    let rentalLevel = document.getElementById("level").value;
    let rentalSeason = document.getElementById("season").value;
    let rentalDescription = document.getElementById("description").value;
    let rentalPet = document.querySelector('input[name="pet"]:checked').value;
    let rentalAlone = document.querySelector('input[name="alone"]:checked').value;

    // Get the star rating
		// Get all the elements with the class "star" and store them in the 'stars' variable
    const stars = document.querySelectorAll('.star');
		// Initialize a variable 'hikeRating' to keep track of the rating count
    let rentalRating = 0;
		// Iterate through each element in the 'stars' NodeList using the forEach method
    stars.forEach((star) => {
				// Check if the text content of the current 'star' element is equal to the string 'star'
        if (star.textContent === 'star') {
						// If the condition is met, increment the 'hikeRating' by 1
            hikeRating++;
        }
    });

    console.log(rentalTitle, rentalLevel, rentalSeason, rentalDescription, rentalPet, rentalAlone, rentalRating);

    var user = firebase.auth().currentUser;
    if (user) {
        var currentUser = db.collection("users").doc(user.uid);
        var userID = user.uid;

        // Get the document for the current user.
        db.collection("renters").add({
            rentalDocID: rentalDocID,
            userID: userID,
            title: rentalTitle,
            level: rentalLevel,
            season: rentalSeason,
            description: rentalDescription,
            pet: rentalPet,
            alone: rentalAlone,
            rating: rentalRating, // Include the rating in the review
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }).then(() => {
            window.location.href = "thanks.html"; // Redirect to the thanks page
        });
    } else {
        console.log("No user is signed in");
        window.location.href = 'renterInfo.html';
    }
}
