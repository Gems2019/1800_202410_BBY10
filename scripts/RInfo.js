

function writeunit() {
    //define a variable for the collection you want to create in Firestore to populate data
    var unitRef = db.collection("rentals");

    unitRef.add({
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
    unitRef.add({
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
    unitRef.add({
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
    unitRef.add({
        code: "unit1",
        name: "31 8th St",
        city: "New Westminster",
        province: "British Columbia",
        level: "Appartment",
        details: "Bedroom/Bathroom: 2/2",
        description: "No smoking/No pets allowed, hydro included, electricrity included, heating not included",
        rcost: "2800",
        last_updated: firebase.firestore.Timestamp.fromDate(new Date("March 10, 2022"))
    });
    unitRef.add({
        code: "unit1",
        name: "15531 24 Ave #1",
        city: "Surrey",
        province: "British Columbia",
        level: "Basement",
        details: "Bedroom/Bathroom: 1/1",
        description: "No smoking/No pets allowed, hydro included, electricrity included, heating included",
        rcost: "1900",
        last_updated: firebase.firestore.Timestamp.fromDate(new Date("March 10, 2022"))
    });
    unitRef.add({
        code: "unit1",
        name: "4132 Dawson St",
        city: "Burnaby",
        province: "British Columbia",
        level: "GuestHouse",
        details: "Bedroom/Bathroom: 1/1",
        description: "No smoking/No pets allowed, hydro no included, internet included, heating not included, electricity not included",
        rcost: "2100",
        last_updated: firebase.firestore.Timestamp.fromDate(new Date("March 10, 2022"))
    });
}

//------------------------------------------------------------------------------
// Input parameter is a string representing the collection we are reading from
//------------------------------------------------------------------------------
function displayCardsDynamically(collection) {
    let cardTemplate = document.getElementById("rentalCardTemplate"); // Retrieve the HTML element with the ID "hikeCardTemplate" and store it in the cardTemplate variable. 

    db.collection(collection).get()   //the collection called "hikes"
        .then(allrentals=> {
            //var i = 1;  //Optional: if you want to have a unique ID for each hike
            allrentals.forEach(doc => { //iterate thru each doc
                var title = doc.data().name;       // get value of the "name" key
                var rentaldetails = doc.data().details;  // get value of the "details" key
				var rentalCode = doc.data().code;    //get unique ID to each hike to be used for fetching right image
                var area = doc.data().city; //pulls city location
                var region = doc.data().province; //pulls province data
                var unittype = doc.data().level; //pulls type of home
                var info = doc.data().description; // pulls description
                var cost = doc.data().rcost; //cost of the unit
                //var hikeLength = doc.data().length; //gets the length field
                let newcard = cardTemplate.content.cloneNode(true); // Clone the HTML template to create a new card (newcard) that will be filled with Firestore data.

                // r = rental, u = unit

                //update title and text and image
                newcard.querySelector('.card-title').innerHTML = title;
                newcard.querySelector('.card-rdetails').innerHTML = rentaldetails;
                newcard.querySelector('.card-rcode').innerHTML = rentalCode;
                newcard.querySelector('.card-area').innerHTML = area;
                newcard.querySelector('.card-region').innerHTML = region;
                newcard.querySelector('.card-utype').innerHTML = unittype;
                newcard.querySelector('.card-info').innerHTML = info;
                newcard.querySelector('.card-cost').innerHTML = cost;
                newcard.querySelector('.card-img').src = `./images/${unit1}.jpg`; //Example: NV01.jpg
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