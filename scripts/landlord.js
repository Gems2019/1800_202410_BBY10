document.addEventListener('DOMContentLoaded', event => {
    const db = firebase.firestore();
    const propertyList = document.getElementById('property-list');
    const ownerId = firebase.auth().currentUser.uid; // Get current user's ID

    // Fetch properties owned by the logged-in owner
    db.collection('properties').where('ownerId', '==', ownerId).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
            const property = doc.data();
            const propertyItem = document.createElement('div');
            propertyItem.className = 'property-item';
            propertyItem.innerHTML = `<h3>${property.name}</h3>`;

            // Fetch tenants of the property
            doc.ref.collection('tenants').get().then(tenantSnapshot => {
                tenantSnapshot.forEach(tenantDoc => {
                    const tenant = tenantDoc.data();
                    const tenantItem = document.createElement('div');
                    tenantItem.className = 'tenant-item';
                    tenantItem.innerHTML = `<p>${tenant.name}</p>`;

                    // Add verification button if tenant is not verified
                    if (!tenant.verified) {
                        const verifyBtn = document.createElement('button');
                        verifyBtn.className = 'verify-btn';
                        verifyBtn.innerText = 'Yes, this is my tenant';
                        verifyBtn.onclick = () => {
                            tenantDoc.ref.update({ verified: true });
                            tenantItem.removeChild(verifyBtn);
                        };
                        tenantItem.appendChild(verifyBtn);
                    }

                    propertyItem.appendChild(tenantItem);
                });
            });

            propertyList.appendChild(propertyItem);
        });
    });
});
