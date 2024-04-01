

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


