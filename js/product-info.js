/*document.addEventListener("DOMContentLoaded", function () {
let productID = localStorage.getItem("productID");
const URL_PRODUCTS = "https://japceibal.github.io/emercado-api/cats_products/" + productID + ".json";
let itemsArray = [];

function showCategory(itemsArray) {
    let htmlContentToAppend = "";
    for (let i = 0; i < itemsArray.length; i++) {
        htmlContentToAppend += `
            <div class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-3">
                        <img src="${itemsArray[i].image}" alt="${itemsArray[i].description}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${itemsArray[i].name} - ${itemsArray[i].currency}  ${itemsArray[i].cost}</h4>
                            <small class="text-muted">${itemsArray[i].soldCount} artículos</small>
                        </div>
                        <p class="mb-1">${itemsArray[i].description}</p>
                    </div>
                </div>
            </div>
            `
    }

    document.getElementById("containerItemsInfo").innerHTML = htmlContentToAppend;
}

fetch(URL_PRODUCTS)
        .then(res => res.json())
        .then(data => {
            itemsArray = data.products;
            showCategory(itemsArray);

        });
})
*/