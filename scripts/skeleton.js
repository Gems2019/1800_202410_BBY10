function loadSkeleton() {

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {               
            console.log($('#navbarPlaceholder').load('./text/nav_after_login.html'));
            console.log($('#footerPlaceholder').load('./text/footer.html'));
        } else {
            console.log($('#navbarPlaceholder').load('./text/nav_before_login.html'));
            console.log($('#footerPlaceholder').load('./text/footer.html'));
        }
    });
}
loadSkeleton(); 

function logout() {
    firebase.auth().signOut().then(() => {
        console.log("logging out user");
      }).catch((error) => {
        console.log("error: ", error)
      });
}

