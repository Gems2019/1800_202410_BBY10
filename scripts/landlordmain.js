// Function to update rental availability
function changeIsAvailable() {
    firebase.auth().onAuthStateChanged(async (user) => {
        if (user) {
            try {
                const landlordId = user.uid;
                const landlordDocSnapshot = await db.collection("users").doc(landlordId).get();
                if (landlordDocSnapshot.exists) {
                    const rentalDocId = landlordDocSnapshot.data().property[0];
                    if (rentalDocId) {
                        await db.collection("rentals").doc(rentalDocId).update({
                            isAvailable: false
                        });
                        console.log('Rental availability updated.');
                        showMessage('Rental availability updated successfully!');
                    } else {
                        console.log('No rentalDocId found for landlord:', landlordId);
                        showMessage('No rental document ID found.');
                    }
                } else {
                    console.log('Landlord document not found:', landlordId);
                    showMessage('Landlord document not found.');
                }
            } catch (error) {
                console.error('Error updating rental availability:', error);
                showMessage('Error updating rental availability.');
            }
        } else {
            console.log('No user signed in.');
            showMessage('No user is currently signed in.');
        }
    });
}

// Function to display a temporary message
function showMessage(message) {
    const messageContainer = document.getElementById('messageContainer');
    messageContainer.textContent = message;
    messageContainer.style.display = 'block';
    messageContainer.setAttribute('tabindex', '-1');
    messageContainer.focus();

    setTimeout(() => {
        messageContainer.style.display = 'none';
    }, 2000);
}

// Function to display matched users
function displayMatchedUsersFromCurrentUser() {
    firebase.auth().onAuthStateChanged(async (user) => {
        if (!user) {
            console.log('No user is currently logged in.');
            return;
        }

        const mainContainer = document.getElementById('mainContainer');
        mainContainer.innerHTML = '';

        try {
            const userDocRef = db.collection('users').doc(user.uid);
            const userDocSnapshot = await userDocRef.get();

            if (userDocSnapshot.exists && userDocSnapshot.data().matched) {
                const matchIds = userDocSnapshot.data().matched;
                const template = document.getElementById("userTemplate");

                for (const matchId of matchIds) {
                    const matchDocRef = db.collection('users').doc(matchId);
                    const matchDocSnapshot = await matchDocRef.get();
                    if (matchDocSnapshot.exists) {
                        const userName = matchDocSnapshot.data().name;
                        let clone = template.content.cloneNode(true);
                        clone.querySelector('.user-name').textContent = userName;
                        mainContainer.appendChild(clone);
                    } else {
                        console.log(`No document found for matchId: ${matchId}`);
                    }
                }
            } else {
                console.log('Current user has no matches or document does not exist.');
            }
        } catch (error) {
            console.error("Error fetching the current user's document:", error);
        }
    });
}

//Function to set up delete button listeners using event delegation
function setupDeleteButtonListeners() {
    const mainContainer = document.getElementById('mainContainer');
    mainContainer.addEventListener('click', function (event) {
        if (event.target.classList.contains('delete-btn')) {
            const userContainer = event.target.closest('div.user-container');
            if (userContainer) {
                userContainer.remove();
            }
        }
    });
}

// Function to set up accept button listeners using event delegation
function setupAcceptButtonListeners() {
    const mainContainer = document.getElementById('mainContainer');
    mainContainer.addEventListener('click', function (event) {
        if (event.target.classList.contains('accept')) {
            changeIsAvailable();
            const userContainer = event.target.closest('div.user-container');
            if (userContainer) {
                userContainer.remove();
            }
        }
    });
}

// Initialize the app when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    displayMatchedUsersFromCurrentUser();
    setupDeleteButtonListeners();
    setupAcceptButtonListeners();
});
