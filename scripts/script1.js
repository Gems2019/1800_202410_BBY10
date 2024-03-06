

function writeunit() {
    //define a variable for the collection you want to create in Firestore to populate data
    var hikesRef = db.collection("hikes");

    unitRef.add({
        code: "unit1",
        name: "4480 Oak St", 
        city: "Vancouver",
        province: "British Columbia",
        level: "Unit",
				details: "Bedroom/Bathroom: 2/2",            
        last_updated: firebase.firestore.FieldValue.serverTimestamp()  
    });
    unitRef.add({
        code: "unit1",
        name: "2050 W 4th Ave", 
        city: "Vancouver",
        province: "British Columbia",
        level: "Unit",
				details: "Bedroom/Bathroom: 2/1",            
        last_updated: firebase.firestore.FieldValue.serverTimestamp()  
    });
    unitRef.add({
        code: "unit1",
        name: "12500 Bridgeport Rd", 
        city: "Richmond",
        province: "British Columbia",
        level: "Unit",
				details: "Bedroom/Bathroom: 1/1",            
        last_updated: firebase.firestore.FieldValue.serverTimestamp()  
    });
    unitRef.add({
        code: "unit1",
        name: "31 8th St", 
        city: "New Westminster",
        province: "British Columbia",
        level: "unit", 
        last_updated: firebase.firestore.Timestamp.fromDate(new Date("March 10, 2022"))
    });
    unitRef.add({
        code: "unit1",
        name: "15531 24 Ave #1", 
        city: "Surrey",
        province: "British Columbia",
        level: "unit",
        last_updated: firebase.firestore.Timestamp.fromDate(new Date("March 10, 2022"))
    });
    unitRef.add({
        code: "unit1",
        name: "4132 Dawson St", 
        city: "Burnaby",
        province: "British Columbia",
        level: "unit",
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
        hikesRef.add({ //add to database, autogen ID
            name: "unit" + i,
            details: "Bedroom/Bathroom:" + "  " 
                + "Location:" + i,
            code: unit1,    
            last_updated: firebase.firestore.FieldValue.serverTimestamp()
        })
   }
}