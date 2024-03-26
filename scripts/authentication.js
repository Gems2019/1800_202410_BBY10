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
          // User is not new, load it into main.html
          window.location.href = "main.html";
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
