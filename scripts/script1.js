

function writeunit() {
    //define a variable for the collection you want to create in Firestore to populate data
    var hikesRef = db.collection("hikes");

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


//-----------------------------------------------
// Create a "max" number of hike document objects
//-----------------------------------------------
function writeHikeLoop(max) {
    //define a variable for the collection you want to create in Firestore to populate data
    var hikesRef = db.collection("hikes");
    for (i = 1; i <= max; i++) {
        hikesRef.add({ //add to database, autogen ID
            name: "hike" + i,
            details: "Elmo says this hike is amazing!  You will love going on hike" + i,
            lat: 49+i,    //randomly different
            lng: -122+i,  //randomly different
            last_updated: firebase.firestore.FieldValue.serverTimestamp()
        })
   }
}

//-----------------------------------------------
// Create a "max" number of hike document objects
//-----------------------------------------------
function writeunitLoop(max) {
    //define a variable for the collection you want to create in Firestore to populate data
    var hikesRef = db.collection("AvailableUnit");
    for (i = 1; i <= max; i++) {
        hikesRef.add({
            name: "unit" + i,
            details: "Bedroom/Bathroom:" + "  "
                + "Location:" + i,
            code: unit1,
            last_updated: firebase.firestore.FieldValue.serverTimestamp()
        })
   }
}


// Import the necessary admin module and initialize the app
const admin = require('firebase-admin');
admin.initializeApp();

// Firestore reference
const db = admin.firestore();

exports.createAvailableUnitsOnNewProperty = functions.firestore
    .document('ListedProperties/{propertyId}')
    .onCreate((snap, context) => {
        // Get the new property data
        const newData = snap.data();

        // Let's assume 'max' (the number of units to generate) is part of the new property data
        const max = newData.numberOfUnits;

        // Reference to the collection where we want to create new documents
        var hikesRef = db.collection("AvailableUnit");

        // Array to hold all promises from the writes
        let promises = [];

        // Creating multiple documents based on the new property
        for (let i = 1; i <= max; i++) {
            // Push the promise from the 'add' operation into the array
            promises.push(
                hikesRef.add({
                    name: "unit" + i,
                    details: `Bedroom/Bathroom: ${newData.details} Location: ${newData.location}`,
                    code: newData.codePrefix + i, // Assuming each unit gets a code starting with the property's code prefix
                    last_updated: admin.firestore.FieldValue.serverTimestamp()
                })
            );
        }

        // Return a single Promise that resolves when all adds are done
        return Promise.all(promises);
    });

    // Firestore DB initialization
// Assume db is already initialized elsewhere in your code as the Firestore instance

// Function to add a single unit/property
function listNewProperty(property) {
    var availableUnitRef = db.collection("AvailableUnit");

    // Adding a new property to the Firestore collection
    availableUnitRef.add({
        name: property.name,
        details: "Bedroom/Bathroom: " + property.bedrooms + "/" + property.bathrooms
                 + " Location: " + property.location,
        code: property.code,
        last_updated: firebase.firestore.FieldValue.serverTimestamp()
    }).then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
    }).catch((error) => {
        console.error("Error adding document: ", error);
    });
}

// Example usage of the function
// This example assumes you have an object for a new property listing
var newProperty = {
    name: "unit101",
    bedrooms: 2,
    bathrooms: 1,
    location: "Downtown",
    code: "unit101Code" // Ensure this is unique or generated accordingly
};

// Call the function when a landlord lists a new property
listNewProperty(newProperty);
