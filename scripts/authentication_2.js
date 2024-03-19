// Wait for the DOM to be fully loaded before executing scripts
document.addEventListener('DOMContentLoaded', function() {
  // Function to handle clicking on the Tenant button
  function onTenantClick() {
    selectRole('tenant');
  }
  function onLandlordClick() {
    selectRole('landlord');
  }

  // Function to handle clicking on the Landlord button
  function selectRole(role) {
    // Use firebase.auth().onAuthStateChanged to reactively get the user's sign-in state
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in, proceed with role selection
        console.log("Selected role: ", role);
        const userData = {
          name: user.displayName,
          email: user.email,
          // Add additional user fields as necessary
        };

        // Determine the collection based on selected role
        const collectionName = role === 'tenant' ? 'tenants' : 'landlords';

        // Store the user data in Firestore
        db.collection(collectionName).doc(user.uid).set(userData)
          .then(() => {
            console.log(`User registered as ${role}.`);
            // Redirect user to the main page
            window.location.href = 'main.html';
          })
          .catch(error => {
            console.error("Error registering user: ", error);
          });
      } else {
        // No user is signed in.
        console.error("User not found. Redirecting to login.");
        // Redirect to login or show error
        window.location.href = 'login.html';
      }
    });
  }

  // Attach click event listeners to buttons
  document.getElementById('tenant').addEventListener('click', onTenantClick);
  document.getElementById('landlord').addEventListener('click', onLandlordClick);
});
