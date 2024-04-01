document.addEventListener('DOMContentLoaded', function() {
    const db = firebase.firestore();

    db.collection("userProfile").onSnapshot(snapshot => {
        const usersContainer = document.getElementById("usersContainer");
        // Initialize container for cards
        usersContainer.innerHTML = '<div class="card-container"></div>'; 
        const cardContainer = usersContainer.querySelector('.card-container');

        snapshot.forEach(doc => {
            const user = doc.data();
            const userCard = `
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${user.Name || 'No Name'}</h5>
                        <p class="card-text">DOB: ${user.Age || 'N/A'}</p>
                        <p class="card-text">Email: ${user.Email || 'N/A'}</p>
                        <p class="card-text">Phone: ${user.Number || 'N/A'}</p>
                        <p class="card-text">Residence: ${user.Residence || 'N/A'}</p>
                        <p class="card-text">Title: ${user.Title || 'N/A'}</p>
                        <p class="card-text">Immigration Status: ${user.ImmigrationStatus || 'N/A'}</p>
                       
                    </div>
                </div>
            `;
            cardContainer.insertAdjacentHTML('beforeend', userCard);
        });
    }, error => {
        console.log(`Encountered error: ${error}`);
    });
});

