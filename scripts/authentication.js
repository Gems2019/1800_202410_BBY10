document.addEventListener("DOMContentLoaded", function () {
  var ui = new firebaseui.auth.AuthUI(firebase.auth());

  var uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: function (authResult, redirectUrl) {
        var isNewUser = authResult.additionalUserInfo.isNewUser;

        if (isNewUser) {
          window.location.href = "profile.html";
          return false; 
        } else {
          var db = firebase.firestore();
          var userId = firebase.auth().currentUser.uid; 
          db.collection('users').doc(userId).get().then(doc => {
            if (doc.exists) {
              var role = doc.data().role; 
              if (role === 'tenant') {
                window.location.href = "tenantmain.html";
              } else if (role === 'landlord') {
                window.location.href = "landlordmain.html";
              }
            } else {
            }
          }).catch(error => {
            console.log("Error getting document:", error);
          });
          return false;
        }
      },
      uiShown: function () {
        document.getElementById("loader").style.display = "none";
      },
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: "popup",
    signInSuccessUrl: "profile.html",
    signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
    tosUrl: "<your-tos-url>",
    privacyPolicyUrl: "<your-privacy-policy-url>",
  };

  ui.start("#firebaseui-auth-container", uiConfig);
});

