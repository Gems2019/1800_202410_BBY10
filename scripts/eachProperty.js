function displayRentalInfo() {
    let params = new URL(window.location.href); 
    let ID = params.searchParams.get("docID"); 
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

            document.getElementById("rentalName").innerHTML = rentalName;
            document.getElementById("rentalCity").innerHTML = rentalCity;
            document.getElementById("rentalDescription").innerHTML = rentalDescription;
            document.getElementById("rentalDetails").innerHTML = rentalDetails;
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
            window.location.href = 'thanks.html';
        });
    }

    document.getElementById("renting").addEventListener("click", function onRentingClick() {
        sentRentalRequest()
    })


function adjustButtonVisibility() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            const userDocRef = firebase.firestore().collection('users').doc(user.uid);
            userDocRef.get().then((doc) => {
                if (doc.exists) {
                    const userRole = doc.data().role;
                    if (userRole === 'landlord') {
                        document.getElementById('renting').style.display = 'none';
                    } else {
                        document.getElementById('renting').style.display = 'block';
                    }
                } else {
                    console.log('No such document!');
                }
            }).catch((error) => {
                console.log('Error getting document:', error);
            });
        } else {
            console.log('No user is signed in.');
        }
    });
}
document.addEventListener('DOMContentLoaded', adjustButtonVisibility);



