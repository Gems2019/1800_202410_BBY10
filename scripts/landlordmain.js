// async function displayMatchedUserName() {
//     try {
//       // Assuming 'firebase.auth().currentUser' is not null and the user is logged in
//       const currentUser = firebase.auth().currentUser;
//       if (!currentUser) {
//         console.log('No user is currently logged in.');
//         return;
//       }
  
//       // Get the current logged-in user's document from Firestore
//       const userDocRef = db.collection('users').doc(currentUser.uid);
//       const userDocSnapshot = await userDocRef.get();
//       if (userDocSnapshot.exists) {
//         // Get the match ID from the user's document
//         const matchId = userDocSnapshot.data().matched[0]; // Assuming 'matched' is an array and we want the first element
        
//         // Get the document of the matched user by match ID
//         const matchedUserDocRef = db.collection('users').doc(matchId);
//         const matchedUserDocSnapshot = await matchedUserDocRef.get();
//         if (matchedUserDocSnapshot.exists) {
//           // Get the name field from the matched user's document
//           const matchedUserName = matchedUserDocSnapshot.data().name;
          
//           // Display the name in the HTML element with the ID 'matchedUserName'
//           document.getElementById('matchedUserName').textContent = matchedUserName;
//         } else {
//           console.log('Matched user document does not exist.');
//         }
//       } else {
//         console.log('Current user document does not exist.');
//       }
//     } catch (error) {
//       console.error("Error fetching documents:", error);
//     }
//   }
  
//   // Call the function to update the name on the page
//   displayMatchedUserName();
    

  function displayMatchedUserName() {
    firebase.auth().onAuthStateChanged(async (user) => {
        if (user) {
            try {
                // User is signed in, so now let's get the document from Firestore
                const userDocRef = db.collection('users').doc(user.uid);
                const userDocSnapshot = await userDocRef.get();
                if (userDocSnapshot.exists) {
                    // Get the match ID from the user's document
                    const matchId = userDocSnapshot.data().matched[0]; // Assuming 'matched' is an array and we want the first element

                    // Get the document of the matched user by match ID
                    const matchedUserDocRef = db.collection('users').doc(matchId);
                    const matchedUserDocSnapshot = await matchedUserDocRef.get();
                    if (matchedUserDocSnapshot.exists) {
                        // Get the name field from the matched user's document
                        const matchedUserName = matchedUserDocSnapshot.data().name;

                        // Display the name in the HTML element with the ID 'matchedUserName'
                        document.getElementById('matchedUserName').textContent = matchedUserName;
                    } else {
                        console.log('Matched user document does not exist.');
                    }
                } else {
                    console.log('Current user document does not exist.');
                }
            } catch (error) {
                console.error("Error fetching documents:", error);
            }
        } else {
            // No user is signed in
            console.log('No user is currently logged in.');
        }
    });
}

// Call the function on page load
document.addEventListener('DOMContentLoaded', displayMatchedUserName);


  function changeIsAvailable() {
    firebase.auth().onAuthStateChanged(async (user) => {
        if (user) {
            try {
                const landlordId = user.uid;
                const landlordDocSnapshot = await db.collection("users").doc(landlordId).get(); // Corrected "user" to "users"
                if (landlordDocSnapshot.exists) {
                    const rentalDocId = landlordDocSnapshot.data().property[0]; // Assuming 'property' is an array and we want the first element
                    if (rentalDocId) {
                        await db.collection("rentals").doc(rentalDocId).update({
                            isAvailable: false // Corrected the syntax here
                        });
                        console.log('Rental availability updated.');
                    } else {
                        console.log('No rentalDocId found for landlord:', landlordId);
                    }
                } else {
                    console.log('Landlord document not found:', landlordId);
                }
            } catch (error) {
                console.error('Error updating rental availability:', error);
            }
        } else {
            console.log('No user signed in.');
        }
    });
}

  // Assuming there's an element with the ID 'renting' that when clicked, triggers this request
  document.getElementById("accept").addEventListener("click", function onAcceptingClick() {
    changeIsAvailable()
})