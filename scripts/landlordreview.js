
function savetenantDocumentIDAndRedirect(){
    let params = new URL(window.location.href) //get the url from the search bar
    let ID = params.searchParams.get("docID");
    localStorage.setItem('tenantDocID', ID);
    window.location.href = 'landlordreview.html';
}

var tenantDocID = localStorage.getItem("tenantDocID");    //visible to all functions on this page

function getrentalsName(id) {
    db.collection("tenant")
      .doc(id)
      .get()
      .then((thistenant) => {
        var tenantName = thistenant.data().name;
        document.getElementById("tenantName").innerHTML = tenantName;
          });
} 
function writeReview() {
    console.log("inside write review");
    let tenantTitle = document.getElementById("title").value;
    let tenantLevel = document.getElementById("level").value;
    let tenantSeason = document.getElementById("season").value;
    let tenantDescription = document.getElementById("description").value;
   
    // Get the star rating
		// Get all the elements with the class "star" and store them in the 'stars' variable
    const stars = document.querySelectorAll('.star');
		// Initialize a variable 'hikeRating' to keep track of the rating count
    let tenantRating = 0;
		// Iterate through each element in the 'stars' NodeList using the forEach method
    stars.forEach((star) => {
				// Check if the text content of the current 'star' element is equal to the string 'star'
        if (star.textContent === 'star') {
						// If the condition is met, increment the 'hikeRating' by 1
            tenantRating++;
        }
    });

    console.log(tenantTitle, tenantLevel, tenantSeason, tenantDescription, tenantRating);

    var user = firebase.auth().currentUser;
    if (user) {
        var currentUser = db.collection("users").doc(user.uid);
        var userID = user.uid;

        // Get the document for the current user.
        db.collection("reviews").add({
            tenantDocID: tenantDocID,
            userID: userID,
            title: tenantTitle,
            level: tenantLevel,
            season: tenantSeason,
            description: tenantDescription,
            rating: tenantRating, // Include the rating in the review
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }).then(() => {
            window.location.href = "thankyou2.html"; // Redirect to the thanks page
        });
    } else {
        console.log("No user is signed in");
        window.location.href = 'eachlandlord.html';
    }
}