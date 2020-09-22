var url =
    "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json";

fetch(url)
    .then((response) => response.json())
    .then((data) => {
        for (let i = 0; i < data.length; i++) {
            const li = document.createElement("li");
            li.className = "nav-item";
            const a = document.createElement("a");
            a.className = "nav-link";
            a.textContent = data[i]["name"];
            a.href = `#${i + 1}`;
            a.id = `${i + 1}`;
            li.appendChild(a);
            let x = document.getElementById(`${i + 1}`);
            console.log(x);
            document.getElementById("category_menu").appendChild(li);
            for (let j = 0; j < data[i]["products"].length; j++) {
                const divCard = document.createElement("div");
                divCard.className = "card";
                const image = document.createElement("img");
                image.className = "card-img-top";
                image.alt = data[i]["products"][j]["name"];
                image.src = data[i]["products"][j]["image"];
                const divCardBody = document.createElement("div");
                divCardBody.className = "card-body";
                const cardTitle = document.createElement("h5");
                cardTitle.className = "card-title";
                cardTitle.textContent = data[i]["products"][j]["name"];
                const cardText = document.createElement("p");
                cardText.className = "card-text";
                cardText.textContent = data[i]["products"][j]["description"];
                const cardPrice = document.createElement("p");
                cardPrice.className = "card-text bold";
                cardPrice.textContent = data[i]["products"][j]["price"];

                divCard.appendChild(image);
                divCard.appendChild(divCardBody);
                divCardBody.appendChild(cardTitle);
                divCardBody.appendChild(cardText);
                divCardBody.appendChild(cardPrice);

                document.getElementById("cards").appendChild(divCard);
            }
        }
    });
