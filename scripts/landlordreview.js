
function saverentalsDocumentIDAndRedirect(){
    let params = new URL(window.location.href) //get the url from the search bar
    let ID = params.searchParams.get("docID");
    localStorage.setItem('rentalsDocID', ID);
    window.location.href = 'landlordreview.html';
}

var hikeDocID = localStorage.getItem("rentalsDocID");    //visible to all functions on this page

function getrentalsName(id) {
    db.collection("rentals")
      .doc(id)
      .get()
      .then((thisrentals) => {
        var rentalsName = thisrentals.data().name;
        document.getElementById("rentalsName").innerHTML = hikeName;
          });
}

getrentalsName(rentalsDocID);

