var currentUser; // Points to the document of the user who is logged in

function populateUserInfo() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            // Go to the correct user document by referencing the user UID in the userProfile collection
            currentUser = db.collection("userProfile").doc(user.uid);
            currentUser.get().then(userDoc => {
                if (userDoc.exists) {
                    // Get the data fields of the user
                    let userName = userDoc.data().Name;
                    let userAge = userDoc.data().Age;
                    let userEmail = userDoc.data().Email;
                    let userNumber = userDoc.data().Number;
                    let userResidence = userDoc.data().Residence;
                    let userTitle = userDoc.data().Title;
                    // Newly added fields
                    let userImmigrationStatus = userDoc.data().ImmigrationStatus || '';
                    
                    // Populate the form fields if not null
                    document.getElementById("nameInput").value = userName || '';
                    document.getElementById("dobInput").value = userAge || '';
                    document.getElementById("emailInput").value = userEmail || '';
                    document.getElementById("numberInput").value = userNumber || '';
                    document.getElementById("ResidenceInput").value = userResidence || '';
                    document.getElementById("titleInput").value = userTitle || '';
                    // Populate the new fields
                    document.getElementById("immigrationStatusInput").value = userImmigrationStatus;
                    // Set the appropriate radio button for Criminal History

                }
            });
        } else {
            console.log("No user is signed in.");
        }
    });
}


function editUserInfo() {
    document.getElementById('personalInfoFields').disabled = false;
}

function saveUserInfo() {
    let userName = document.getElementById('nameInput').value;
    let userAge = document.getElementById('dobInput').value;
    let userEmail = document.getElementById('emailInput').value;
    let userNumber = document.getElementById('numberInput').value;
    let userResidence = document.getElementById('ResidenceInput').value;
    let userTitle = document.getElementById('titleInput').value;
    let userImmigrationStatus = document.getElementById('immigrationStatusInput').value;


    currentUser.set({
        Name: userName,
        Age: userAge,
        Email: userEmail,
        Number: userNumber,
        Residence: userResidence,
        Title: userTitle,
        ImmigrationStatus: userImmigrationStatus, // New field

    }, { merge: true }).then(() => {
        console.log("User Profile successfully written or updated!");
        document.getElementById('personalInfoFields').disabled = true;

        // Redirect to listTenants.html or any other page you want
        window.location.href = 'tenantProfile2.html'; // Adjust the redirect as necessary
    }).catch(error => {
        console.error("Error writing or updating user profile: ", error);
    });
}



// Call the function to populate user info on page load
populateUserInfo();
