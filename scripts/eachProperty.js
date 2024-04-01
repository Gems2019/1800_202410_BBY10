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

function sentRentalRequest() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            // User is signed in, let's get the UID
            const tenantId = user.uid;
            console.log('UID stored in local storage:', tenantId);

            // Retrieve rentalDocID from local storage
            var rentalDocID = localStorage.getItem('rentalDocID');
            window.location.href = 'thanks.html';

            if (rentalDocID) {
                // Fetch rental document based on rentalDocID
                db.collection("rentals")
                    .doc(rentalDocID)
                    .get()
                    .then(doc => {
                        if (doc.exists) {
                            var landlordID = doc.data().owner; // Correctly accessing the document's data

                            // Fetch user document based on landlordID
                            db.collection("users")
                                .doc(landlordID)
                                .get()
                                .then(doc => {
                                    if (doc.exists) {
                                        // Update the 'matched' array to include tenantId
                                        db.collection("users").doc(landlordID).update({
                                            matched: firebase.firestore.FieldValue.arrayUnion(tenantId)
                                        }).then(() => {
                                            console.log("TenantId added to matched array.");
                                        }).catch(error => {
                                            console.error("Error updating document: ", error);
                                        });
                                    } else {
                                        console.log("No such landlord document!");
                                    }
                                }).catch(error => {
                                    console.error("Error fetching landlord document:", error);
                                });
                        } else {
                            console.log("No such rental document!");
                        }
                    }).catch(error => {
                        console.error("Error fetching rental document:", error);
                    });
            } else {
                console.log('No rentalDocID found in local storage.');
            }
        } else {
            // User is signed out
            console.log('No user signed in.');
        }
    });

    // Assuming there's an element with the ID 'renting' that when clicked, triggers this request
    



document.getElementById("renting").addEventListener("click", function onRentingClick() {
    sentRentalRequest()})}