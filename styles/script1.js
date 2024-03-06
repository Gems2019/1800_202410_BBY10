

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
        code: "unit2",
        name: "2050 W 4th Ave", 
        city: "Vancouver",
        province: "British Columbia",
        level: "Unit",
				details: "Bedroom/Bathroom: 2/1",            
        last_updated: firebase.firestore.FieldValue.serverTimestamp()  
    });
    unitRef.add({
        code: "unit3",
        name: "12500 Bridgeport Rd", 
        city: "Richmond",
        province: "British Columbia",
        level: "Unit",
				details: "Bedroom/Bathroom: 1/1",            
        last_updated: firebase.firestore.FieldValue.serverTimestamp()  
    });
    unitRef.add({
        code: "unit4",
        name: "31 8th St", 
        city: "New Westminster",
        province: "British Columbia",
        level: "unit", 
        last_updated: firebase.firestore.Timestamp.fromDate(new Date("March 10, 2022"))
    });
    unitRef.add({
        code: "unit5",
        name: "15531 24 Ave #1", 
        city: "Surrey",
        province: "British Columbia",
        level: "unit",
        last_updated: firebase.firestore.Timestamp.fromDate(new Date("March 10, 2022"))
    });
    unitRef.add({
        code: "unit6",
        name: "4132 Dawson St", 
        city: "Burnaby",
        province: "British Columbia",
        level: "unit",
        last_updated: firebase.firestore.Timestamp.fromDate(new Date("March 10, 2022"))
    });
}