var url =
    "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json";

let shoppingList = [];

fetch(url)
    .then((response) => response.json())
    .then((data) => {
        // Se generan las respectivas pestanias para los diferentes tipos de productos
        for (let i = 0; i < data.length; i++) {
            const li = document.createElement("li");
            li.className = "nav-item";
            const a = document.createElement("a");
            a.className = "nav-link";
            a.textContent = data[i]["name"];
            a.href = `#${i + 1}`;
            a.id = i + 1;
            li.appendChild(a);
            document.getElementById("category_menu").appendChild(li);
        }

        const category = document
            .getElementById("category_menu")
            .getElementsByTagName("a");
        // Se generan las tarjetas para cada producto dependiendo de la categoria escogida por el usuario
        for (let i = 0; i < category.length; i++) {
            category[i].addEventListener("click", function () {
                let k = parseInt(category[i].id) - 1;
                // Se eliminan los resultados de ejercicios anterirores
                $("#cards div").remove();
                $("#categoryTitle h1").remove();
                $("#products table").remove();
                $("#totalPrice button").remove();
                $("#totalPrice p").remove();
                // Se crea el titulo de la categoria seleccionada
                const titleCat = document.createElement("h1");
                titleCat.className = "text-center my-4";
                titleCat.textContent = data[k]["name"];
                document.getElementById("categoryTitle").appendChild(titleCat);
                for (let j = 0; j < data[k]["products"].length; j++) {
                    // Se crea un div general para introducir las tarjetas de los productos
                    const divGen = document.createElement("div");
                    divGen.className = "col mb-4";
                    // Se crea un div para introducir cada tarjeta de cada producto
                    const divCard = document.createElement("div");
                    divCard.className = "card h-100";
                    // Se crea el espacio para la imagen del producto
                    const image = document.createElement("img");
                    image.className = "card-img-top";
                    image.alt = data[k]["products"][j]["name"];
                    image.src = data[k]["products"][j]["image"];
                    // Se crea el cuerpo de la tarjeta del producto
                    const divCardBody = document.createElement("div");
                    divCardBody.className = "card-body move-div";
                    const cardTitle = document.createElement("h5");
                    cardTitle.className = "card-title";
                    cardTitle.textContent = data[k]["products"][j]["name"];
                    const cardText = document.createElement("p");
                    cardText.className = "card-text";
                    cardText.textContent =
                        data[k]["products"][j]["description"];
                    const cardPrice = document.createElement("p");
                    cardPrice.className = "card-text bold";
                    cardPrice.textContent = `$${data[k]["products"][j]["price"]}`;
                    // Se crea el boton para agregar el producto al carrito
                    const cardBtn = document.createElement("button");
                    cardBtn.id = j;
                    cardBtn.className = "btn btn-primary btn-block move-btn";
                    cardBtn.textContent = "Add to cart";
                    cardBtn.addEventListener("click", function () {
                        // Se elimina el resultado de operaciones anteriores
                        $("#btn-carrito p").remove();
                        let j = parseInt(cardBtn.id);
                        let obj = data[k]["products"][j];
                        // se agrega el producto al carrito
                        shoppingList.push(obj);
                        const numItems = document.createElement("p");
                        numItems.classList = "column";
                        let str = "";
                        shoppingList.length > 1
                            ? (str = "items")
                            : (str = "item");
                        // Se actualiza el numero de productos en el carrito
                        numItems.textContent = `${shoppingList.length} ${str}`;
                        document
                            .getElementById("btn-carrito")
                            .appendChild(numItems);
                        // Se le notifica al usuario que su producto fue agregado
                        alert(
                            `${data[k]["products"][j]["name"]} has been added to your cart`,
                        );
                    });

                    // Se agregan los componentes al archivo htlm
                    divGen.appendChild(divCard);
                    divCard.appendChild(image);
                    divCard.appendChild(divCardBody);
                    divCardBody.appendChild(cardTitle);
                    divCardBody.appendChild(cardText);
                    divCardBody.appendChild(cardPrice);
                    divCardBody.appendChild(cardBtn);

                    document.getElementById("cards").appendChild(divGen);
                }
            });
        }

        const shppCart = document.getElementById("btn-shopping-cart");
        shppCart.addEventListener("click", function () {
            $("#cards div").remove();
            $("#products table").remove();
            $("#categoryTitle h1").remove();
            $("#totalPrice button").remove();
            $("#totalPrice p").remove();
            // Crear titulo 'Order Detail'
            const ordrDetail = document.createElement("h1");
            ordrDetail.className = "text-center my-4";
            ordrDetail.textContent = "Order detail";
            document.getElementById("categoryTitle").appendChild(ordrDetail);
            // Crear tabla striped
            const table = document.createElement("table");
            table.className = "table table-striped";
            table.id = "table";
            // Crear thead
            const thead = document.createElement("thead");
            // Crear fila encabezada
            const thItem = document.createElement("th");
            thItem.scope = "col";
            thItem.textContent = "Item";
            const thQty = document.createElement("th");
            thQty.scope = "col";
            thQty.textContent = "Qty.";
            const thDesc = document.createElement("th");
            thDesc.scope = "col";
            thDesc.textContent = "Description";
            const thUnPr = document.createElement("th");
            thUnPr.scope = "col";
            thUnPr.textContent = "Unit Price";
            const thAmnt = document.createElement("th");
            thAmnt.scope = "col";
            thAmnt.textContent = "Amount";
            // Inicializar el cuerpo de la tabla
            const tbody = document.createElement("tbody");
            tbody.id = "tableBody";
            // Agregar la inicializacion de la tabla al documento html
            thead.appendChild(thItem);
            thead.appendChild(thQty);
            thead.appendChild(thDesc);
            thead.appendChild(thUnPr);
            thead.appendChild(thAmnt);
            table.appendChild(thead);
            table.appendChild(tbody);
            // Agrupamos los productos del carrito por nombre para no repetirlos en la tabla
            const groupedByName = shoppingList.reduce(
                (groupedPruducts, pruduct) => {
                    const key = pruduct.name;
                    if (!groupedPruducts[key]) groupedPruducts[key] = [];
                    groupedPruducts[key].push(pruduct);
                    return groupedPruducts;
                },
                {},
            );
            // Organizamos los productos agrupados en un arreglo
            const groupSame = function () {
                let arr = [];
                for (product of Object.keys(groupedByName)) {
                    arr.push(groupedByName[product]);
                }
                return arr;
            };
            groupedShppCart = groupSame();
            // Obtenemos el precio total del carrito de compras
            const totalPrice = shoppingList.reduce((sumPrice, product) => {
                return sumPrice + product.price;
            }, 0);
            // declaramos el arreglo que va a devolverse por consola
            const arr = [];
            // Creamos una fila en la tabla para cada producto
            for (let i = 0; i < groupedShppCart.length; i++) {
                // Crear fila
                let tr = document.createElement("tr");
                // Crear celdas y asignarle sus valores
                let tdItem = document.createElement("td");
                tdItem.textContent = i + 1;
                let tdQty = document.createElement("td");
                tdQty.textContent = groupedShppCart[i].length;
                let tdDesc = document.createElement("td");
                tdDesc.textContent = groupedShppCart[i][0]["name"];
                let tdUnPr = document.createElement("td");
                tdUnPr.className = "bold";
                tdUnPr.textContent = `$${groupedShppCart[i][0]["price"]}`;
                let tdAmnt = document.createElement("td");
                tdAmnt.className = "bold";
                tdAmnt.textContent = `$${
                    groupedShppCart[i][0]["price"] * groupedShppCart[i].length
                }`;
                tr.appendChild(tdItem);
                tr.appendChild(tdQty);
                tr.appendChild(tdDesc);
                tr.appendChild(tdUnPr);
                tr.appendChild(tdAmnt);
                tbody.appendChild(tr);

                // Generamos el objeto para introducir al arreglo que se devovlera
                let obj = {};
                obj["item"] = i + 1;
                obj["quantity"] = groupedShppCart[i].length;
                obj["description"] = groupedShppCart[i][0]["name"];
                obj["unitPrice"] = groupedShppCart[i][0]["price"];
                arr.push(obj);
            }
            // Creamos el div para el precio total y los botones de confirmar y cancelar
            // Devolvemos el precio del carrito por medio del html de la pagina
            const totPri = document.createElement("p");
            totPri.className = "bold float-left";
            totPri.id = "total-order-price";
            totPri.textContent = `Total: $${totalPrice.toFixed(2)}`;
            // Creamos los botenes de cancelado y confirmado
            const cancelBtn = document.createElement("button");
            cancelBtn.className = "btn btn-danger float-right";
            cancelBtn.textContent = "Cancel";
            const confirmBtn = document.createElement("button");
            confirmBtn.className = "btn btn-light float-right mx-2";
            confirmBtn.textContent = "Confirm order";

            document.getElementById("totalPrice").appendChild(totPri);
            document.getElementById("totalPrice").appendChild(confirmBtn);
            document.getElementById("totalPrice").appendChild(cancelBtn);
            document.getElementById("products").appendChild(table);

            cancelBtn.addEventListener("click", () => {
                $("#CancelOrderModal").modal();
            });

            confirmBtn.addEventListener("click", () => {
                console.log(arr);
                alert(
                    "Your order has been recived. Please check the console for more details.",
                );
            });
        });

        const cancelOrder = document.getElementById("cancel-order");
        cancelOrder.addEventListener("click", () => {
            shoppingList.splice(0, shoppingList.length);
            $("#btn-carrito p").remove();
            const numItems = document.createElement("p");
            numItems.classList = "column";
            let str = "";
            shoppingList.length === 1 ? (str = "items") : (str = "item");
            // Se actualiza el numero de productos en el carrito
            numItems.textContent = `${shoppingList.length} ${str}`;
            document.getElementById("btn-carrito").appendChild(numItems);
            // Se limpia la tabla de productos
            $("#table tbody").remove();
            document.getElementById(
                "total-order-price",
            ).textContent = `Total: $${0.0}`;
            // Se le notifica al usuario que su orden fue cancelada
            alert(`Su orden fue cancelada exitosamente`);
        });
    });
