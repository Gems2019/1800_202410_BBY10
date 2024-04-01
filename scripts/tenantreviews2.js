function populateReviews() {
    console.log("test");
    let tenantCardTemplate = document.getElementById("reviewCardTemplate");
    let tenantCardGroup = document.getElementById("reviewCardGroup");

    let params = new URL(window.location.href); 
    let tenantID = params.searchParams.get("docID");

    db.collection("reviews")
        .where("tenantDocID", "==", tenantID)
        .get()
        .then((alltenants) => {
            let reviews = alltenants.docs;
            console.log(reviews);
            reviews.forEach((doc) => {
                let title = doc.data().title;
                let communicationLevel = doc.data().level;
                let referFuture = doc.data().season;
                let description = doc.data().description;
                let time = doc.data().timestamp.toDate();

                let reviewCard = tenantCardTemplate.content.cloneNode(true);
                reviewCard.querySelector(".title").innerHTML = title;
                reviewCard.querySelector(".time").innerHTML = new Date(time).toLocaleString();
                reviewCard.querySelector(".communication-level").innerHTML = `Communication Level: ${communicationLevel}`;
                reviewCard.querySelector(".refer-future").innerHTML = `Refer Tenant in the Future: ${referFuture}`;
                reviewCard.querySelector(".description").innerHTML = `Description: ${description}`;

                tenantCardGroup.appendChild(reviewCard);
            });
        });
}

populateReviews();
