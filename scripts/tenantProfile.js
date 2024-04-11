document.addEventListener('DOMContentLoaded', function () {
    const db = firebase.firestore();

    const params = new URLSearchParams(window.location.search);
    const userID = params.get('tenantID');

    if (userID) {
        displayUserInfo(userID);
        setupLeaveReviewButton(userID);
    } else {
        console.log("No userID found in the URL.");
    }

    function setupLeaveReviewButton(tenantID) {
        const leaveReviewButton = document.querySelector('.leaveReview');
        if (leaveReviewButton) {
            leaveReviewButton.addEventListener('click', function () {
                window.location.href = `/review.html?tenantID=${tenantID}`;
            });
        }
    }

    function displayUserInfo(userID) {
        const userRef = db.collection('users').doc(userID);

        userRef.get().then((doc) => {
            if (doc.exists) {
                const userData = doc.data();
                const profileContainer = document.getElementById('profileContainer');
                profileContainer.innerHTML = '';
                profileContainer.innerHTML += `<p>Name: ${userData.name}</p>`;
                profileContainer.innerHTML += `<p>Email: ${userData.email}</p>`;
                profileContainer.innerHTML += `<p>Role: ${userData.role}</p>`;

                if (userData.reviews && userData.reviews.length > 0) {
                    userData.reviews.forEach(review => {
                        displayReview(review, db);
                    });
                }
            } else {
                console.log("No such user!");
            }
        }).catch((error) => {
            console.log("Error getting user data:", error);
        });
    }

    function displayReview(review, db) {
        db.collection('users').doc(review.owner).get().then((doc) => {
            if (doc.exists) {
                const userName = doc.data().name;
                const template = document.getElementById('reviewCardTemplate').content.cloneNode(true);

                template.querySelector('.landlordName').textContent = `Name of landlord: ${userName}`;
                template.querySelector('.season').textContent = `Would you refer the Tenant in the future?: ${review.season}`;
                template.querySelector('.description').textContent = `Description: ${review.description}`;
                template.querySelector('.time').textContent = `Date: ${review.timestamp}`;

                document.getElementById('reviewCardGroup').appendChild(template);
            } else {
                console.log(`No user found with ID: ${review.owner}`);
            }
        }).catch((error) => {
            console.error("Error fetching landlord details:", error);
        });
    }
});

