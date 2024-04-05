document.addEventListener('DOMContentLoaded', function() {
    // Assuming Firebase has been initialized elsewhere in your application
    const db = firebase.firestore();

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            const userID = user.uid;
            displayUserInfo(userID);
        } else {
            console.log("No user is signed in.");
        }
    });

    function displayUserInfo(userID) {
        const userRef = db.collection('users').doc(userID);

        userRef.get().then((doc) => {
            if (doc.exists) {
                const userData = doc.data();
                const profileContainer = document.getElementById('profileContainer');
                profileContainer.innerHTML = ''; // Clear existing content
                profileContainer.innerHTML += `<p>Name: ${userData.name}</p>`;
                profileContainer.innerHTML += `<p>Email: ${userData.email}</p>`;
                profileContainer.innerHTML += `<p>Role: ${userData.role}</p>`;
                // profileContainer.innerHTML += `<p>Landlord: ${userData.landlord ? 'Yes' : 'No'}</p>`;
                // profileContainer.innerHTML += `<p>Tenant: ${userData.tenant ? 'Yes' : 'No'}</p>`;
                // If there are more fields, continue appending them in a similar manner

                // Now, handle the reviews
                if (userData.reviews && userData.reviews.length > 0) {
                    userData.reviews.forEach(review => {
                        displayReview(review);
                    });
                }
            } else {
                console.log("No such user!");
            }
        }).catch((error) => {
            console.log("Error getting user data:", error);
        });
    }

    function displayReview(review) {
        const template = document.getElementById('reviewCardTemplate').content.cloneNode(true);
        template.querySelector('.level').textContent = `Communication Level: ${review.level}`;
        template.querySelector('.season').textContent = `Season: ${review.season}`;
        template.querySelector('.description').textContent = `Description: ${review.description}`;
        template.querySelector('.time').textContent = `Date: ${review.timestamp}`;
        // Assuming you have a container for reviews in your HTML. If not, add one or append directly to profileContainer or another suitable element.
        document.getElementById('profileContainer').appendChild(template);
    }
});
