document.getElementById('createPropertyForm').addEventListener('submit', function(e) {
  e.preventDefault();
  submitPropertyForm();
});


function submitPropertyForm() {
  // Assuming Firebase Auth is set up and the user is signed in
  firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
          const db = firebase.firestore(); 
          const bedrooms = document.getElementById('bedrooms').value;
          const bathrooms = document.getElementById('bathrooms').value;

          // Format the detail string
          const detailsValue = `Bedroom/Bathroom: ${bedrooms}/${bathrooms}`;

          const propertyData = {
              name: document.getElementById('propertyName').value,
              city: document.getElementById('city').value,
              province: document.getElementById('province').value,
              level: document.getElementById('level').value,
              details: detailsValue,
              description: document.getElementById('description').value,
              rcost: document.getElementById('rcost').value,
              // Assuming image handling is done separately
              last_updated: firebase.firestore.FieldValue.serverTimestamp(),
              owner: user.uid,
              isAvailable: true,
              code: "unit1"
          };

          db.collection("rentals").add(propertyData).then((docRef) => {
              console.log("Document written with ID: ", docRef.id);

              // Now update the user's document with the property ID
              const landlordID = user.uid;
              const userRef = db.collection('users').doc(landlordID);

              // Add property ID to user's document
              userRef.update({
                  property: firebase.firestore.FieldValue.arrayUnion(docRef.id)
              }).then(() => {
                  console.log("User document successfully updated with property ID");

                  window.location.href = `eachProperty.html?docID=${docRef.id}`;
              }).catch((error) => {
                  console.error("Error updating user document: ", error);
              });

          }).catch((error) => {
              console.error("Error adding document: ", error);
          });

      } else {
          console.log('User is not signed in.');
      }
  });
}
