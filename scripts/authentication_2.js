document.addEventListener("DOMContentLoaded", function () {
  function onTenantClick() {
    selectRole("tenant");
  }

  function onLandlordClick() {
    selectRole("landlord");
  }

  // Unified function to handle role selection and user data storage
  function selectRole(role) {
    // Use firebase.auth().onAuthStateChanged to reactively get the user's sign-in state
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        console.log("Selected role: ", role);

        localStorage.setItem('userRole', role);

        // Updated userData with role information
        const userData = {
          name: user.displayName,
          email: user.email,
          role: role, 
          landlord: role === "landlord",
          tenant: role === "tenant", 
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
              window.location.href = "tenantmain.html";
            }
          })
          .catch((error) => {
            console.error("Error registering user: ", error);
          });
      } else {
        console.error("User not found. Redirecting to login.");
        window.location.href = "login.html";
      }
    });
  }

  document.getElementById("tenant").addEventListener("click", onTenantClick);
  document
    .getElementById("landlord")
    .addEventListener("click", onLandlordClick);
});
