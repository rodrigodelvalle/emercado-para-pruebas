const catID = localStorage.getItem("catID");
const URL_PRODUCTS = "https://japceibal.github.io/emercado-api/cats_products/" + catID + ".json";

function namesCategory(items) {
    let names = document.getElementById("categoryName")
    let htmlContentToAppend = ` <h1>${items.catName}</h1>
<p class="lead">Verás aquí lo que estas buscando.</p> `
    names.innerHTML = htmlContentToAppend
}

function showCategory(items) {
    let itemsArray = items.products
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

    document.getElementById("containerItems").innerHTML = htmlContentToAppend;
}

// Acá es donde implemente el filter, pero no estaría funcionando
document.getElementById("rangeFilterCount").addEventListener("click", function () {
    let minPrice = document.getElementById("rangeFilterCountMin").value;
    let maxPrice = document.getElementById("rangeFilterCountMax").value;

    if ((minPrice != undefined) && (minPrice != "") && (parseInt(minPrice)) >= 0) {
        minPrice = parseInt(minPrice);
    }
    else {
        minPrice = undefined;
    }

    if ((maxPrice != undefined) && (maxPrice != "") && (parseInt(maxPrice)) >= 0) {
        maxPrice = parseInt(maxPrice);
    }
    else {
        maxPrice = undefined;
    }

    fetch(URL_PRODUCTS)
        .then(response => response.json())
        .then(data => {
            const filterPrice = data.filter(product => product.cost >= minPrice && product.cost <= maxPrice);
            showCategory(filterPrice);
        })
})

// Es la misma que aparece en categories.js (para que funcione el boton "Limpiar")
document.getElementById("clearRangeFilter").addEventListener("click", function () {
    document.getElementById("rangeFilterCountMin").value = "";
    document.getElementById("rangeFilterCountMax").value = "";

    minPrice = undefined;
    maxPrice = undefined;
});

fetch(URL_PRODUCTS)
    .then(res => res.json())
    .then(data => {
        namesCategory(data)
        showCategory(data)
    })

