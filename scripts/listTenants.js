// //Assuming firebase has been initialized elsewhere in your project
// const db = firebase.firestore();

// firebase.auth().onAuthStateChanged(function(user) {
//     if (user) {
//         const landlordID = user.uid;
//         db.collection('users').doc(landlordID).get().then(doc => {
//             if (doc.exists) {
//                 const matchedTenants = doc.data().matched;
//                 if (matchedTenants && matchedTenants.length > 0) {
//                     matchedTenants.forEach(tenantID => {
//                         db.collection('users').doc(tenantID).get().then(tenantDoc => {
//                             if (tenantDoc.exists) {
//                                 const tenantName = tenantDoc.data().name;
//                                 // Find the list element and append the tenant's name as a new list item.
//                                 const list = document.getElementById('tenantList');
//                                 const listItem = document.createElement('li');
//                                 listItem.textContent = tenantName;
//                                 list.appendChild(listItem);
//                             } else {
//                                 console.log("No such document for tenant!");
//                             }
//                         }).catch(error => {
//                             console.log("Error getting tenant document:", error);
//                         });
//                     });
//                 } else {
//                     console.log("No tenants matched or 'matched' field is empty.");
//                     document.getElementById('tenantList').textContent = 'No tenants matched or "matched" field is empty.';
//                 }
//             } else {
//                 console.log("No such document for landlord!");
//             }
//         }).catch(error => {
//             console.log("Error getting landlord document:", error);
//         });
//     } else {
//         // No user is signed in.
//         console.log("No user signed in.");
//     }
// });

firebase.auth().onAuthStateChanged(function(user) {
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

                            // Clone the template and populate it with tenant data
                            const tenantCard = document.importNode(userTemplate, true);

                            // If tenant has an image, set it, otherwise remove the img element
                            if (tenant.imageUrl) {
                                tenantCard.querySelector('.card-image').src = tenant.imageUrl;
                            } else {
                                tenantCard.querySelector('.card-image').remove();
                            }

                            // Set tenant's name
                            tenantCard.querySelector('.user-name').textContent = tenant.name;

                            // Append the populated card to the main container
                            mainContainer.appendChild(tenantCard);
                        } else {
                            console.log("No such document for tenant!");
                        }
                    }).catch(error => {
                        console.log("Error getting tenant document:", error);
                    });
                });
            } else {
                console.log("No tenants matched or 'matched' field is empty.");
                mainContainer.textContent = 'No tenants matched or "matched" field is empty.';
            }
        } else {
            console.log("No such document for landlord!");
        }
    }).catch(error => {
        console.log("Error getting landlord document:", error);
    });
}

