document.addEventListener("DOMContentLoaded", function () {
  // Function to handle clicking on the Tenant button
  function onTenantClick() {
    selectRole("tenant");
  }

  // Function to handle clicking on the Landlord button
  function onLandlordClick() {
    selectRole("landlord");
  }

  // Unified function to handle role selection and user data storage
  function selectRole(role) {
    // Use firebase.auth().onAuthStateChanged to reactively get the user's sign-in state
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in, proceed with role selection
        console.log("Selected role: ", role);

        // Updated userData with role information
        const userData = {
          name: user.displayName,
          email: user.email,
          // New role fields
          role: role, // 'landlord' or 'tenant'
          landlord: role === "landlord", // true if landlord, false otherwise
          tenant: role === "tenant", // true if tenant, false otherwise
        };

        // Store the user data in Firestore, under a unified 'users' collection
        db.collection("users")
          .doc(user.uid)
          .set(userData)
          .then(() => {
            console.log(`User registered as ${role}.`);
            // Redirect user based on the selected role
            if (role === "landlord") {
              window.location.href = "landlordmain.html";
            } else {
              window.location.href = "main.html";
            }
          })
          .catch((error) => {
            console.error("Error registering user: ", error);
          });
      } else {
        // No user is signed in.
        console.error("User not found. Redirecting to login.");
        // Redirect to login or show error
        window.location.href = "login.html";
      }
    });
  }

  // Attach click event listeners to buttons
  document.getElementById("tenant").addEventListener("click", onTenantClick);
  document
    .getElementById("landlord")
    .addEventListener("click", onLandlordClick);
});
