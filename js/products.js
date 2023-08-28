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

// Acá es donde implemente el filter, ahora funciona pero no pude usar la función showCategory por como está declarada
// así que la copie y le modifique las variables.

document.getElementById("rangeFilterCount").addEventListener("click", function () {
    let minPrice = document.getElementById("rangeFilterCountMin").value;
    let maxPrice = document.getElementById("rangeFilterCountMax").value;

    function showArrayPrice(filterPrice) {
        let htmlContentToAppend = "";
        for (let i = 0; i < filterPrice.length; i++) {
            htmlContentToAppend += `
                <div class="list-group-item list-group-item-action cursor-active">
                    <div class="row">
                        <div class="col-3">
                            <img src="${filterPrice[i].image}" alt="${filterPrice[i].description}" class="img-thumbnail">
                        </div>
                        <div class="col">
                            <div class="d-flex w-100 justify-content-between">
                                <h4 class="mb-1">${filterPrice[i].name} - ${filterPrice[i].currency}  ${filterPrice[i].cost}</h4>
                                <small class="text-muted">${filterPrice[i].soldCount} artículos</small>
                            </div>
                            <p class="mb-1">${filterPrice[i].description}</p>
                        </div>
                    </div>
                </div>
                `
        }

        document.getElementById("containerItems").innerHTML = htmlContentToAppend;
    }

    if (minPrice !== "" && !isNaN(parseInt(minPrice)) && parseInt(minPrice) >= 0) {
        minPrice = parseInt(minPrice);
    } else {
        minPrice = undefined;
    }

    if (maxPrice !== "" && !isNaN(parseInt(maxPrice)) && parseInt(maxPrice) >= 0) {
        maxPrice = parseInt(maxPrice);
    } else {
        maxPrice = undefined;
    }

    fetch(URL_PRODUCTS)
        .then(response => response.json())
        .then(data => {
            if (Array.isArray(data.products)) {
                let filterPrice = data.products.filter(product => {
                    if (minPrice !== undefined && maxPrice !== undefined) {
                        return product.cost >= minPrice && product.cost <= maxPrice;
                    } else if (minPrice !== undefined) {
                        return product.cost >= minPrice;
                    } else if (maxPrice !== undefined) {
                        return product.cost <= maxPrice;
                    }
                    return true;
                });
                //console.log(filterPrice);
                filterPrice.sort((a, b) => a.cost - b.cost);
                showArrayPrice(filterPrice);
            }
        })
});
// Es la misma que aparece en categories.js (para que funcione el boton "Limpiar")
document.getElementById("clearRangeFilter").addEventListener("click", function () {
    document.getElementById("rangeFilterCountMin").value = "";
    document.getElementById("rangeFilterCountMax").value = "";

    minPrice = undefined;
    maxPrice = undefined;
    showCategory(originalData);

});

let originalData; // Almacena los datos originales obtenidos

fetch(URL_PRODUCTS)
    .then(res => res.json())
    .then(data => {
        originalData = data;
        namesCategory(data);
        showCategory(data);
    });


//Se establece una contante con lo ingresado en la linea 43 (de 40 a 44) del prodcuto.html
const searchInput = document.getElementById("productSearch");

//Al momento que se escribe algo, se toma la contante ya creada, se obtiene su valor, se la pasa a minúsculas y se eliminan los espacios iniciales y finales con .trim()
searchInput.addEventListener("input", function () {
    const searchText = searchInput.value.toLowerCase().trim();

    //Se usa .filter sobre originalData.prodcto para obtener la los valores de la API que ocurren dentro de (product =>)
    const filteredProducts = originalData.products.filter(product => {
        const productName = product.name.toLowerCase();  //esto nos da el título en minuscula
        const productDescription = product.description.toLowerCase();  //nos da la descripción en minuscula
        return productName.includes(searchText) || productDescription.includes(searchText); // nos retorna TODOS los valores que matcheen contra el título o la disripción
    });

    //Muestra lo filtrado. Al final no recurrí a hacer otro fetch sino que fui directo a la constante "originData"
    
    showCategory({ products: filteredProducts });   
});btnDesc.addEventListener('click', function () {
    const itemsArray = originalData.products.slice(); 
    
    itemsArray.sort(function (a, b) {
        // Ordenar por costo de forma descendente
        return b.cost - a.cost;
    });
    
    showCategory({ products: itemsArray });
});

btnAsc.addEventListener('click', function () {
    const itemsArray = originalData.products.slice(); 
    
    itemsArray.sort(function (a, b) {
       
        return a.cost - b.cost;
    });
    
    showCategory({ products: itemsArray });
});

relevant.addEventListener('click', function () {
    const itemsArray = originalData.products.slice(); 
    
    itemsArray.sort(function (a, b) {
        return b.soldCount - a.soldCount;
    });
    
    showCategory({ products: itemsArray });
});
