var renterDocID = localStorage.getItem("renterDocID");    //visible to all functions on this page
function getUnitName(id) {
    db.collection("reviews")
      .doc(id)
      .get()
      .then((thisHike) => {
        var unitName = thisUnit.data().name;
        document.getElementById("unitName").innerHTML = unitName;
          });
}

getUnitName(renterDocID);

function writeRenter() {
    console.log("inside write review");
    let unitTitle = document.getElementById("title").value;
    let unitLevel = document.getElementById("level").value;
    let unitSeason = document.getElementById("season").value;
    let unitDescription = document.getElementById("description").value;
    let unitPet = document.querySelector('input[name="pet"]:checked').value;
    let unitAlone = document.querySelector('input[name="alone"]:checked').value;

    // Get the star rating
		// Get all the elements with the class "star" and store them in the 'stars' variable
    const stars = document.querySelectorAll('.star');
		// Initialize a variable 'hikeRating' to keep track of the rating count
    let hikeRating = 0;
		// Iterate through each element in the 'stars' NodeList using the forEach method
    stars.forEach((star) => {
				// Check if the text content of the current 'star' element is equal to the string 'star'
        if (star.textContent === 'star') {
						// If the condition is met, increment the 'hikeRating' by 1
            hikeRating++;
        }
    });

    console.log(unitTitle, unitLevel, unitSeason, unitDescription, unitPet, unitAlone, hikeRating);

    var user = firebase.auth().currentUser;
    if (user) {
        var currentUser = db.collection("users").doc(user.uid);
        var userID = user.uid;

        // Get the document for the current user.
        db.collection("reviews").add({
            renterDocID: renterDocID,
            userID: userID,
            title: unitTitle,
            level: unitLevel,
            season: unitSeason,
            description: unitDescription,
            pet: unitPet,
            alone: unitAlone,
            rating: hikeRating, // Include the rating in the review
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }).then(() => {
            window.location.href = "thanks.html"; // Redirect to the thanks page
        });
    } else {
        console.log("No user is signed in");
        window.location.href = 'renterInfo.html';
    }
}