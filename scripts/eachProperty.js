

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

function getNameFromAuth() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if a user is signed in:
        if (user) {
            // Do something for the currently logged-in user here: 
            console.log(user.uid); //print the uid in the browser console
            console.log(user.displayName);  //print the user name in the browser console
            userName = user.displayName;

            // method #1:  insert with JS
            document.getElementById("rentername-goes-here").innerText = userName;    

            //method #2:  insert using jquery
            //$("#name-goes-here").text(userName); //using jquery

            //method #3:  insert using querySelector
            //document.querySelector("#name-goes-here").innerText = userName

        } else {
            // No user is signed in.
            console.log ("No user is logged in");
        }
    });
}
getNameFromAuth(); //run the function

document.getElementById('renting').addEventListener('click', function() {
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML += '<p>Name: John Doe</p>';
    contentDiv.innerHTML += '<button>Button 1</button>';
    contentDiv.innerHTML += '<button>Button 2</button>';
});


