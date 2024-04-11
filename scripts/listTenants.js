

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        displayTenantCards(user);
    } else {
        // Update UI to reflect no user is signed in
        console.log("No user signed in.");
        document.getElementById('mainContainer').innerHTML = '<p>Please sign in to view tenant information.</p>';
        // Optionally, include a sign-in button or redirect to a sign-in page here
    }
});


function displayTenantCards(user) {
    const landlordID = user.uid;
    const mainContainer = document.getElementById('mainContainer');
    const userTemplate = document.getElementById('userTemplate').content;

    db.collection('users').doc(landlordID).get().then(doc => {
        if (doc.exists) {
            const matchedTenants = doc.data().matched;
            mainContainer.innerHTML = ''; // Clear the container before adding new cards

            if (matchedTenants && matchedTenants.length > 0) {
                matchedTenants.forEach(tenantID => {
                    db.collection('users').doc(tenantID).get().then(tenantDoc => {
                        if (tenantDoc.exists) {
                            const tenant = tenantDoc.data();
                            const tenantCard = document.importNode(userTemplate, true);

                            const tenantNameElement = tenantCard.querySelector('.user-name');
                            tenantNameElement.textContent = tenant.name; // Assuming 'name' is the Firestore field

                            // Handle "View Tenant" button
                            const viewButton = tenantCard.querySelector('.view-tenant');
                            viewButton.addEventListener('click', () => {
                                window.location.href = `tenantProfile.html?tenantID=${tenantID}`;
                            });

                            mainContainer.appendChild(tenantCard);
                        } else {
                            console.log("No such document for tenant!");
                        }
                    }).catch(error => {
                        console.log("Error getting tenant document:", error);
                    });
                });
            } else {
                mainContainer.textContent = 'No tenants matched or "matched" field is empty.';
            }
        } else {
            console.log("No such document for landlord!");
        }
    }).catch(error => {
        console.log("Error getting landlord document:", error);
    });
}
