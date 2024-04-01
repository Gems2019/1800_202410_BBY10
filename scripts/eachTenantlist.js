function populateRenters() {
    console.log("test");
    let rentalCardTemplate = document.getElementById("renterCardTemplate");
    let rentalCardGroup = document.getElementById("renterCardGroup");

    let params = new URL(window.location.href); // Get the URL from the search bar
    let rentalID = params.searchParams.get("docID");

    // Double-check: is your collection called "Reviews" or "reviews"?
    db.collection("renters")
        .where("rentalDocID", "==", rentalID)
        .get()
        .then((allRenters) => {
            renters = allRenters.docs;
            console.log(renters);
            renters.forEach((doc) => {
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

                let renterCard = rentalCardTemplate.content.cloneNode(true);
                renterCard.querySelector(".title").innerHTML = `Renter name: ${title}`;
                renterCard.querySelector(".time").innerHTML = new Date(
                    time
                ).toLocaleString();
                renterCard.querySelector(".level").innerHTML = `What level are you used to noise?: ${level}`;
                renterCard.querySelector(".season").innerHTML = `Which season will you move in?: ${season}`;
                renterCard.querySelector(".alone").innerHTML = `Are you move in alone?: ${alone}`;
                renterCard.querySelector(".pet").innerHTML = `Do u have pet with you?: ${pet}`;
                renterCard.querySelector( ".description").innerHTML = `What are you going to say to landlord?:${description}`;

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
                // renterCard.querySelector(".star-rating").innerHTML = starRating;

                rentalCardGroup.appendChild(renterCard);
            });
        });
}

populateRenters();


