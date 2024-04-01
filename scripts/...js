
function savetenantDocumentIDAndRedirect(){
    let params = new URL(window.location.href) //get the url from the search bar
    let ID = params.searchParams.get("docID");
    localStorage.setItem('rentalsDocID', ID);
    window.location.href = 'landlordreview.html';
}

var tenantDocID = localStorage.getItem("reviewsDocID");    //visible to all functions on this page

function getrentalsName(id) {
    db.collection("rentals")
      .doc(id)
      .get()
      .then((thistenant) => {
        var reviewsName = thistenant.data().name;
        document.getElementById("reviewsName").innerHTML = reviewsName;
          });
} 

function writeReview() {
    console.log("inside write review");
    let rentalTitle = document.getElementById("title").value;
    let rentalLevel = document.getElementById("level").value;
    let rentalSeason = document.getElementById("season").value;
    let rentalDescription = document.getElementById("description").value;
   
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
            rentalRating++;
        }
    });

    console.log(rentalTitle, rentalLevel, rentalSeason, rentalDescription, rentalRating);

    var user = firebase.auth().currentUser;
    if (user) {
        var currentUser = db.collection("users").doc(user.uid);
        var userID = user.uid;

        // Get the document for the current user.
        db.collection("reviews").add({
            tenantDocID: tenantDocID,
            userID: userID,
            title: rentalTitle,
            level: rentalLevel,
            season: rentalSeason,
            description: rentalDescription,
            rating: rentalRating, // Include the rating in the review
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }).then(() => {
            window.location.href = "thankyou2.html"; // Redirect to the thanks page
        });
    } else {
        console.log("No user is signed in");
        window.location.href = 'eachlandlord.html';
    }
}