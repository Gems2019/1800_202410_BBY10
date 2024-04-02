// Assuming firebase has been initialized elsewhere in your project
const db = firebase.firestore();

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        const landlordID = user.uid;
        db.collection('users').doc(landlordID).get().then(doc => {
            if (doc.exists) {
                const matchedTenants = doc.data().matched;
                if (matchedTenants && matchedTenants.length > 0) {
                    matchedTenants.forEach(tenantID => {
                        db.collection('users').doc(tenantID).get().then(tenantDoc => {
                            if (tenantDoc.exists) {
                                const tenantName = tenantDoc.data().name;
                                // Find the list element and append the tenant's name as a new list item.
                                const list = document.getElementById('tenantList');
                                const listItem = document.createElement('li');
                                listItem.textContent = tenantName;
                                list.appendChild(listItem);
                            } else {
                                console.log("No such document for tenant!");
                            }
                        }).catch(error => {
                            console.log("Error getting tenant document:", error);
                        });
                    });
                } else {
                    console.log("No tenants matched or 'matched' field is empty.");
                    document.getElementById('tenantList').textContent = 'No tenants matched or "matched" field is empty.';
                }
            } else {
                console.log("No such document for landlord!");
            }
        }).catch(error => {
            console.log("Error getting landlord document:", error);
        });
    } else {
        // No user is signed in.
        console.log("No user signed in.");
    }
});
