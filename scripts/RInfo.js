

function writeUnits() {
    //define a variable for the collection you want to create in Firestore to populate data
    var unitsRef = db.collection("rentals2");

    
    unitsRef.add({
        code: "unit1",
        name: "4480 Oak St",
        city: "Vancouver",
        province: "British Columbia",
        Type: "Apartment",
		details: "Bedroom/Bathroom: 2/2",
        description: "No smoking/1 small pet allowed, water included, electricity is not included.",
        rcost: "3200",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()
    });
       
    unitsRef.add({
        code: "unit1",
        name: "2050 W 4th Ave",
        city: "Vancouver",
        province: "British Columbia",
        Type: "Basement",
		details: "Bedroom/Bathroom: 2/1",
        description: "No smoking/No pets allowed, water included, electricity is not included, wash/dry included",
        rcost: "2850",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()
    });

     unitsRef.add({
        code: "unit1",
        name: "12500 Bridgeport Rd",
        city: "Richmond",
        province: "British Columbia",
        level: "Apartment",
		details: "Bedroom/Bathroom: 1/1",
        description: "No smoking/1 small pet allowed, hydro not included, electricity is not included.",
        rcost: "2300",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()
    });
}


//------------------------------------------------------------------------------
// Input parameter is a string representing the collection we are reading from
//------------------------------------------------------------------------------
function displayCardsDynamically(collection) {
    let cardTemplate = document.getElementById("UnitsCardTemplate"); // Retrieve the HTML element with the ID "hikeCardTemplate" and store it in the cardTemplate variable. 

    db.collection(collection).get()   //the collection called "hikes"
        .then(allUnits=> {
            //var i = 1;  //Optional: if you want to have a unique ID for each hike
            allUnits.forEach(doc => { //iterate thru each doc
                var title = doc.data().name;       // get value of the "name" key
                var details = doc.data().details;  // get value of the "details" key
								var unitsCode = doc.data().code;    //get unique ID to each hike to be used for fetching right image
                var hikeLength = doc.data().length; //gets the length field
                var docID = doc.id;
                let newcard = cardTemplate.content.cloneNode(true); // Clone the HTML template to create a new card (newcard) that will be filled with Firestore data.

                //update title and text and image
                newcard.querySelector('.card-title').innerHTML = title;
                newcard.querySelector('.card-text').innerHTML = details;
                newcard.querySelector('.card-text').innerHTML = details;
                newcard.querySelector('.card-image').src = `./images/${unitsCode}.jpg`; //Example: NV01.jpg
                newcard.querySelector('a').href = "propertyDetailPage.html?docID="+docID;

                //Optional: give unique ids to all elements for future use
                // newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
                // newcard.querySelector('.card-text').setAttribute("id", "ctext" + i);
                // newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);

                //attach to gallery, Example: "hikes-go-here"
                document.getElementById(collection + "-go-here").appendChild(newcard);

                //i++;   //Optional: iterate variable to serve as unique ID
            })
        })
}

displayCardsDynamically("rentals");  //input param is the name of the collection