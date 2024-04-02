document.addEventListener("DOMContentLoaded", function () {
  // Initialize the FirebaseUI Widget using Firebase.
  var ui = new firebaseui.auth.AuthUI(firebase.auth());

  var uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: function (authResult, redirectUrl) {
        var isNewUser = authResult.additionalUserInfo.isNewUser;
        // Check if the user is a new user
        if (isNewUser) {
          // Redirect user to profile.html after successful sign-in
          window.location.href = "profile.html";
          return false; // Prevent default redirect behavior
        } else {
          var db = firebase.firestore();
          var userId = firebase.auth().currentUser.uid; // Get the current user's UID
          db.collection('users').doc(userId).get().then(doc => {
            if (doc.exists) {
              var role = doc.data().role; // Access the role field from the document
              // Use the role as needed
              if (role === 'tenant') {
                window.location.href = "tenantmain.html";
              } else if (role === 'landlord') {
                window.location.href = "landlordmain.html";
              }
            } else {
              // Handle the case where there is no document for the user
            }
          }).catch(error => {
            console.log("Error getting document:", error);
          });
          return false;
        }
      },
      uiShown: function () {
        // The widget is rendered.
        // Hide the loader.
        document.getElementById("loader").style.display = "none";
      },
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: "popup",
    signInSuccessUrl: "profile.html",
    signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
    // Terms of service url.
    tosUrl: "<your-tos-url>",
    // Privacy policy url.
    privacyPolicyUrl: "<your-privacy-policy-url>",
  };

  // Start the FirebaseUI authentication UI
  ui.start("#firebaseui-auth-container", uiConfig);
});

