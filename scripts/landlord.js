function populateTenants() {
    console.log("Tenants");
    let hikeCardTemplate = document.getElementById("reviewCardTemplate");
    let hikeCardGroup = document.getElementById("reviewCardGroup");

    let params = new URL(window.location.href); // Get the URL from the search bar
    let hikeID = params.searchParams.get("docID");

    // Double-check: is your collection called "Reviews" or "reviews"?
    db.collection("test")
        .where("rentalsDocID", "==", usersID)
        .get()
        .then((Rentalsall) => {
            reviews = allRentals.docs;
            console.log(rentals);
            reviews.forEach((doc) => {
                var title = doc.data().title;
                var lease = doc.data().lease;
                var description = doc.data().description;
                var reviews = doc.data().reviews;
                var time = doc.data().timestamp.toDate();
                var rating = doc.data().rating; 
                console.log(rating)

                console.log(time);

                let reviewCard = hikeCardTemplate.content.cloneNode(true);
                reviewCard.querySelector(".title").innerHTML = title;
                reviewCard.querySelector(".time").innerHTML = new Date(
                    time
                ).toLocaleString();
                reviewCard.querySelector(".lease").innerHTML = `Lease: ${lease}`;
                reviewCard.querySelector(".reviews").innerHTML = `Reviews: ${reviews}`;
                reviewCard.querySelector( ".description").innerHTML = `Description: ${description}`;

                // Populate the star rating based on the rating value
                
	              // Initialize an empty string to store the star rating HTML
								let starRating = "";
								// This loop runs from i=0 to i<rating, where 'rating' is a variable holding the rating value.
                for (let i = 0; i < rating; i++) {
                    starRating += '<span class="material-icons">star</span>';
                }
								// After the first loop, this second loop runs from i=rating to i<5.
                for (let i = rating; i < 5; i++) {
                    starRating += '<span class="material-icons">star_outline</span>';
                }
                reviewCard.querySelector(".star-rating").innerHTML = starRating;

                hikeCardGroup.appendChild(reviewCard);
            });
        });
}

populateReviews();

