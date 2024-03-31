

function displayRentalInfo() {
    let params = new URL( window.location.href ); //get URL of search bar
    let ID = params.searchParams.get( "docID" ); //get value for key "id"
    console.log( ID );

    // doublecheck: is your collection called "Reviews" or "reviews"?
    db.collection( "rentals" )
        .doc( ID )
        .get()
        .then( doc => {
            thisRental = doc.data();
            rentalCode = thisRental.code;
            rentalName = doc.data().name;
            
            // only populate title, and image
            document.getElementById( "rentalName" ).innerHTML = rentalName;
            let imgEvent = document.querySelector( ".unit-img" );
            imgEvent.src = "../images/" + rentalCode + ".jpg";
        } );
}
displayRentalInfo();

function saveRentalDocumentIDAndRedirect(){
    let params = new URL(window.location.href) //get the url from the search bar
    let ID = params.searchParams.get("docID");
    localStorage.setItem('rentalDocID', ID);
    window.location.href = 'renterInfo.html';
}

function displayRentalInfo() {
    let params = new URL( window.location.href ); //get URL of search bar
    let ID = params.searchParams.get( "docID" ); //get value for key "id"
    console.log( ID );

    // doublecheck: is your collection called "Reviews" or "reviews"?
    db.collection( "rentals" )
        .doc( ID )
        .get()
        .then( doc => {
            thisRental = doc.data();
            rentalCode = thisRental.code;
            rentalName = doc.data().name;
            rentalCity = doc.data().city;
            rentalDescription = doc.data().description;
            rentalDetails = doc.data().details;
            rentalisAvailable = doc.data().isAvailable;
            rentalLevel = doc.data().level;
            rentalProvince = doc.data().province;
            rentalRcost = doc.data().rcost;
            
            // only populate title, and image
            document.getElementById( "rentalName" ).innerHTML = rentalName;
            document.getElementById( "rentalCity" ).innerHTML = rentalCity;
            document.getElementById( "rentalDescription" ).innerHTML = rentalDescription;
            document.getElementById( "rentalDetails" ).innerHTML = rentalDetails;
            document.getElementById( "rentalisAvailable" ).innerHTML = rentalisAvailable;
            document.getElementById( "rentalLevel" ).innerHTML = rentalLevel;
            document.getElementById( "rentalProvince" ).innerHTML = rentalProvince;
            document.getElementById( "rentalRcost" ).innerHTML = rentalRcost;

            let imgEvent = document.querySelector( ".unit-img" );
            imgEvent.src = "../images/" + rentalCode + ".jpg";
        } );
}
displayRentalInfo();

// function populateRenters() {
//     console.log("test");
//     let rentalCardTemplate = document.getElementById("renterCardTemplate");
//     let rentalCardGroup = document.getElementById("renterCardGroup");

//     let params = new URL(window.location.href); // Get the URL from the search bar
//     let rentalID = params.searchParams.get("docID");

//     // Double-check: is your collection called "Reviews" or "reviews"?
//     db.collection("renters")
//         .where("rentalDocID", "==", rentalID)
//         .get()
//         .then((allRenters) => {
//             renters = allRenters.docs;
//             console.log(renters);
//             renters.forEach((doc) => {
//                 var title = doc.data().title;
//                 var level = doc.data().level;
//                 var season = doc.data().season;
//                 var description = doc.data().description;
//                 var pet = doc.data().pet;
//                 var alone = doc.data().alone;
//                 var time = doc.data().timestamp.toDate();
//                 var rating = doc.data().rating; // Get the rating value
//                 console.log(rating)

//                 console.log(time);

//                 let renterCard = rentalCardTemplate.content.cloneNode(true);
//                 renterCard.querySelector(".title").innerHTML = `Renter name: ${title}`;
//                 renterCard.querySelector(".time").innerHTML = new Date(
//                     time
//                 ).toLocaleString();
//                 renterCard.querySelector(".level").innerHTML = `What level are you used to noise?: ${level}`;
//                 renterCard.querySelector(".season").innerHTML = `Which season will you move in?: ${season}`;
//                 renterCard.querySelector(".alone").innerHTML = `Are you move in alone?: ${alone}`;
//                 renterCard.querySelector(".pet").innerHTML = `Do u have pet with you?: ${pet}`;
//                 renterCard.querySelector( ".description").innerHTML = `What are you going to say to landlord?:${description}`;

//                 // Populate the star rating based on the rating value
                
// 	              // Initialize an empty string to store the star rating HTML
// 								let starRating = "";
// 								// This loop runs from i=0 to i<rating, where 'rating' is a variable holding the rating value.
//                 for (let i = 0; i < rating; i++) {
//                     starRating += '<span class="material-icons">star</span>';
//                 }
// 								// After the first loop, this second loop runs from i=rating to i<5.
//                 for (let i = rating; i < 5; i++) {
//                     starRating += '<span class="material-icons">star_outline</span>';
//                 }
//                 // renterCard.querySelector(".star-rating").innerHTML = starRating;

//                 rentalCardGroup.appendChild(renterCard);
//             });
//         });
// }

// populateRenters();

