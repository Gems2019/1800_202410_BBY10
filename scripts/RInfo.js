function writeRentals() {
    var rentalsRef = db.collection("rentals");
    var user = firebase.auth().currentUser;
    if (user) {
        var currentUser = db.collection("users").doc(user.uid);
        var userID = user.uid;

        rentalsRef.add({
            code: "unit1",
            name: "4480 Oak St",
            city: "Vancouver",
            province: "British Columbia",
            level: "Apartment",
            details: "Bedroom/Bathroom: 2/2",
            description: "No smoking/1 small pet allowed, water included, electricity is not included.",
            rcost: "3200 Cad",
    
            last_updated: firebase.firestore.FieldValue.serverTimestamp()
        });

        rentalsRef.add({
            code: "unit1",
            name: "2050 W 4th Ave",
            city: "Vancouver",
            province: "British Columbia",
            level: "Basement",
            details: "Bedroom/Bathroom: 2/1",
            description: "No smoking/No pets allowed, water included, electricity is not included, wash/dry included",
            rcost: "$2850 Cad",
            last_updated: firebase.firestore.FieldValue.serverTimestamp()
        });

        rentalsRef.add({
            code: "unit1",
            name: "12500 Bridgeport Rd",
            city: "Richmond",
            province: "British Columbia",
            level: "Apartment",
            details: "Bedroom/Bathroom: 1/1",
            description: "No smoking/1 small pet allowed, hydro not included, electricity is not included.",
            rcost: "2300 Cad",
            last_updated: firebase.firestore.FieldValue.serverTimestamp()
        });

        rentalsRef.add({
            code: "unit1",
            name: "31 8th St",
            city: "New Westminster",
            province: "British Columbia",
            level: "Appartment",
            details: "Bedroom/Bathroom: 2/2",
            description: "No smoking/No pets allowed, hydro included, electricrity included, heating not included",
            rcost: "2800 Cad",
            last_updated: firebase.firestore.Timestamp.fromDate(new Date("March 10, 2022"))
        });

        rentalsRef.add({
            code: "unit1",
            name: "15531 24 Ave #1",
            city: "Surrey",
            province: "British Columbia",
            level: "Basement",
            details: "Bedroom/Bathroom: 1/1",
            description: "No smoking/No pets allowed, hydro included, electricrity included, heating included",
            rcost: "1900 Cad",
            last_updated: firebase.firestore.Timestamp.fromDate(new Date("March 10, 2022"))
        });

        rentalsRef.add({
            code: "unit1",
            name: "4132 Dawson St",
            city: "Burnaby",
            province: "British Columbia",
            level: "GuestHouse",
            details: "Bedroom/Bathroom: 1/1",
            description: "No smoking/No pets allowed, hydro no included, internet included, heating not included, electricity not included",
            rcost: "2100 Cad",
            last_updated: firebase.firestore.Timestamp.fromDate(new Date("March 10, 2022"))
        });
    }
}
function displayCardsDynamically(collection) {
    let cardTemplate = document.getElementById("rentalCardTemplate");

    db.collection(collection).get()
        .then(allRentals => {
            allRentals.forEach(doc => {
                var title = doc.data().name;
                var details = doc.data().details;
                var area = doc.data().city;
                var region = doc.data().province;
                var rentalCode = doc.data().code;
                var cost = doc.data().rcost;
                var docID = doc.id;
                var isAvailable = doc.data().isAvailable; 

                let newcard = cardTemplate.content.cloneNode(true);

                newcard.querySelector('.card-title').innerHTML = title;
                newcard.querySelector('.card-rdetails').innerHTML = details;
                newcard.querySelector('.card-text').innerHTML = "City " + area;
                newcard.querySelector('.card-region').innerHTML = "Province " + region;
                newcard.querySelector('.card-rcost').innerHTML = "Monthly Rent " + "$" + cost;
                newcard.querySelector('.card-image').src = `./images/${rentalCode}.jpg`;
                newcard.querySelector('a').href = "eachProperty.html?docID=" + docID;

                if (!isAvailable) {
                    const availableButton = newcard.querySelector('.available-button');
                    availableButton.classList.add('button-disabled');
                    availableButton.disabled = true; 
                    availableButton.textContent = 'Not Available'; 
                }

                document.getElementById(collection + "-go-here").appendChild(newcard);
            })
        })
}

displayCardsDynamically("rentals");