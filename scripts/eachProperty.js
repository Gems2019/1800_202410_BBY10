function displayUnitInfo() {
    let params = new URL( window.location.href ); //get URL of search bar
    let ID = params.searchParams.get( "docID" ); //get value for key "id"
    console.log( ID );

    // doublecheck: is your collection called "Reviews" or "reviews"?
    db.collection( "rentals" )
        .doc( ID )
        .get()
        .then( doc => {
            thisUnit = doc.data();
            unitCode = thisUnit.code;
            unitName = doc.data().name;
            
            // only populate title, and image
            document.getElementById( "unitName" ).innerHTML = unitName;
            let imgEvent = document.querySelector( ".unit-img" );
            imgEvent.src = "../images/" + unitCode + ".jpg";
        } );
}
displayUnitInfo();

function saveRentDocumentIDAndRedirect(){
    let params = new URL(window.location.href) //get the url from the search bar
    let ID = params.searchParams.get("docID");
    localStorage.setItem('renterDocID', ID);
    window.location.href = 'renterInfo.html';
}

function populateRenters() {
    console.log("test");
    let hikeCardTemplate = document.getElementById("renterCardTemplate");
    let hikeCardGroup = document.getElementById("renterCardGroup");

    let params = new URL(window.location.href); // Get the URL from the search bar
    let hikeID = params.searchParams.get("docID");

    // Double-check: is your collection called "Reviews" or "reviews"?
    db.collection("")
        .where("rentalsDocID", "==", usersID)
        .get()
        .then((allRentals) => {
            renters = allRentals.docs;
            console.log(allRentals);
            reviews.forEach((doc) => {
                var title = doc.data().title;
                var level = doc.data().level;
                var season = doc.data().season;
                var description = doc.data().description;
                var pet = doc.data().pet;
                var alone = doc.data().alone;
                var time = doc.data().timestamp.toDate();
                var rating = doc.data().rating; // Get the rating value
                console.log(rating)

                console.log(time);

                let reviewCard = hikeCardTemplate.content.cloneNode(true);
                reviewCard.querySelector(".title").innerHTML = title;
                reviewCard.querySelector(".time").innerHTML = new Date(
                    time
                ).toLocaleString();
                reviewCard.querySelector(".level").innerHTML = `Level: ${level}`;
                reviewCard.querySelector(".season").innerHTML = `Season: ${season}`;
                reviewCard.querySelector(".alone").innerHTML = `Alone: ${alone}`;
                reviewCard.querySelector(".pet").innerHTML = `Pet: ${pet}`;
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

