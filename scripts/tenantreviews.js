
function savetenantDocumentIDAndRedirect(){
    let params = new URL(window.location.href) //get the url from the search bar
    let ID = params.searchParams.get("docID");
    localStorage.setItem('rentalsDocID', ID);
    window.location.href = 'landlordreview.html';
}

var tenantDocID = localStorage.getItem("reviewsDocID");    //visible to all functions on this page

function getrentalsName(id) {
    db.collection("rentals")
      .doc(id)
      .get()
      .then((thistenant) => {
        var reviewsName = thistenant.data().name;
        document.getElementById("reviewsName").innerHTML = reviewsName;
          });
} 

function writeReview() {
  console.log("inside write review");
  let rentalTitle = document.getElementById("title").value;
  let communicationLevel = document.getElementById("level").value;
  let referFuture = document.getElementById("season").value;
  let rentalDescription = document.getElementById("description").value;

  var user = firebase.auth().currentUser;
  if (user) {
      var userID = user.uid;

      db.collection("reviews").add({
          tenantDocID: tenantDocID,
          userID: userID,
          title: rentalTitle,
          level: communicationLevel,
          season: referFuture,
          description: rentalDescription,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
      }).then(() => {
          window.location.href = "thankyou2.html";
      });
  } else {
      console.log("No user is signed in");
      window.location.href = 'about.html';
  }
}
