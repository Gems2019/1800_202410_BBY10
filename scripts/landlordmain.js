async function displayMatchedUserName() {
    try {
      // Assuming 'firebase.auth().currentUser' is not null and the user is logged in
      const currentUser = firebase.auth().currentUser;
      if (!currentUser) {
        console.log('No user is currently logged in.');
        return;
      }
  
      // Get the current logged-in user's document from Firestore
      const userDocRef = db.collection('users').doc(currentUser.uid);
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
  }
  
  // Call the function to update the name on the page
  displayMatchedUserName();
    
// function getNameFromAuth() {
//     firebase.auth().onAuthStateChanged(user => {
//         // Check if a user is signed in:
//         if (user) {

//             const landlordID = user.uid;
//             const tenantid = 
//             // Do something for the currently logged-in user here: 
//             console.log(user.uid); //print the uid in the browser console
//             console.log(user.displayName);  //print the user name in the browser console
//             userName = user.displayName;

//             // method #1:  insert with JS
//             document.getElementById("rentername-goes-here").innerHTML = userName;    

//             //method #2:  insert using jquery
//             //$("#name-goes-here").text(userName); //using jquery

//             //method #3:  insert using querySelector
//             //document.querySelector("#name-goes-here").innerText = userName

//         } else {
//             // No user is signed in.
//             console.log ("No user is logged in");
//         }
//     });
// }
// getNameFromAuth(); //run the function

// async function displayMatchNameFromDocId(docId) {
//     try {
//       // Fetch the document by docId to get matchId
//       const docRef = db.collection('user').doc(docId);
//       const docSnapshot = await docRef.get();
  
//       if (docSnapshot.exists) {
//         const matchId = docSnapshot.data().matched;
//      // Assuming the field is named matchId
  
//         // Use matchId to fetch the corresponding match document from the "matches" collection
//         const matchRef = db.collection('users').doc(matchId); // Adjust 'matches' to your actual collection name
//         const matchSnapshot = await matchRef.get();
  
//         if (matchSnapshot.exists) {
//           const matchName = matchSnapshot.data().matchName; // Adjust 'matchName' to your actual field name
//           console.log('Match Name:', matchName);
  
//           // Display the match name in the HTML element
//           document.getElementById('rentername-goes-here').textContent = matchName;
//         } else {
//           console.log('No such match document!');
//           document.getElementById('matchNameDisplay').textContent = 'No match found.';
//         }
//       } else {
//         console.log('No such document!');
//         document.getElementById('matchNameDisplay').textContent = 'No document found.';
//       }
//     } catch (error) {
//       console.error("Error getting document:", error);
//       document.getElementById('matchNameDisplay').textContent = 'Error fetching match name.';
//     }
//   }

//   // Insert name function using the global variable "currentUser"
// function insertNameFromFirestore() {
//     currentUser.get().then(userDoc => {
//         //get the user name
//         var matchTenantId = userDoc.data().matched;
//         const tenantRef = db.collection('users').doc(matchTenantId);
//         const tenantSnapshot = await tenantRef.get();
//         const matchName = tenantSnapshot.data().name; // Adjust 'matchName' to your actual field name
//           console.log('Match Name:', matchName);


//         $("#name-goes-here").text(matchName); //jquery
//         // document.getElementByID("name-goes-here").innetText=user_Name;
//     })
// }
// // Comment out the next line (we will call this function from doAll())
// insertNameFromFirestore();