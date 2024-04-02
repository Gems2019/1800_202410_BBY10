// function displayRentalInfo() {
//     let params = new URL(window.location.href); //get URL of search bar
//     let ID = params.searchParams.get("docID"); //get value for key "id"
//     console.log(ID);

//     // doublecheck: is your collection called "Reviews" or "reviews"?
//     db.collection("rentals")
//         .doc(ID)
//         .get()
//         .then(doc => {
//             thisRental = doc.data();
//             rentalCode = thisRental.code;
//             rentalName = doc.data().name;

//             // only populate title, and image
//             document.getElementById("rentalName").innerHTML = rentalName;
//             let imgEvent = document.querySelector(".unit-img");
//             imgEvent.src = "../images/" + rentalCode + ".jpg";
//         });
// }
// displayRentalInfo();



function displayRentalInfo() {
    let params = new URL(window.location.href); //get URL of search bar
    let ID = params.searchParams.get("docID"); //get value for key "id"
    console.log(ID);

    // doublecheck: is your collection called "Reviews" or "reviews"?
    db.collection("rentals")
        .doc(ID)
        .get()
        .then(doc => {
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
            document.getElementById("rentalName").innerHTML = rentalName;
            document.getElementById("rentalCity").innerHTML = rentalCity;
            document.getElementById("rentalDescription").innerHTML = rentalDescription;
            document.getElementById("rentalDetails").innerHTML = rentalDetails;
            document.getElementById("rentalisAvailable").innerHTML = rentalisAvailable;
            document.getElementById("rentalLevel").innerHTML = rentalLevel;
            document.getElementById("rentalProvince").innerHTML = rentalProvince;
            document.getElementById("rentalRcost").innerHTML = rentalRcost;

            let imgEvent = document.querySelector(".unit-img");
            imgEvent.src = "../images/" + rentalCode + ".jpg";
        });
}
displayRentalInfo();

    async function sentRentalRequest() {
        firebase.auth().onAuthStateChanged(async (user) => {
            if (user) {
                const tenantId = user.uid;
                console.log('tenantId', tenantId);

                const urlParams = new URLSearchParams(window.location.search);
                const rentalDocID = urlParams.get('docID');

                if (rentalDocID) {
                    try {
                        const rentalDoc = await db.collection("rentals").doc(rentalDocID).get();
                        if (rentalDoc.exists) {
                            var landlordID = rentalDoc.data().owner;
                            const landlordDoc = await db.collection("users").doc(landlordID).get();
                            if (landlordDoc.exists) {
                                await db.collection("users").doc(landlordID).update({
                                    matched: firebase.firestore.FieldValue.arrayUnion(tenantId)
                                });
                                console.log("TenantId added to matched array.");
                            } else {
                                console.log("No such landlord document!");
                            }
                        } else {
                            console.log("No such rental document!");
                        }
                    } catch (error) {
                        console.error("Error handling rental request:", error);
                    }
                } else {
                    console.log('No rentalDocID found in the URL parameters.');
                }
            } else {
                console.log('No user signed in.');
            }
            // Redirect happens here, after all async operations have completed.
            window.location.href = 'thanks.html';
        });
    }
    // Assuming there's an element with the ID 'renting' that when clicked, triggers this request
    document.getElementById("renting").addEventListener("click", function onRentingClick() {
        sentRentalRequest()
    })



