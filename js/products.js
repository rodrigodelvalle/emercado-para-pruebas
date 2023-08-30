document.addEventListener("DOMContentLoaded",function (){
    const catID = localStorage.getItem("catID");
    const URL_PRODUCTS = "https://japceibal.github.io/emercado-api/cats_products/"+ catID + ".json";
    let productsCar = document.getElementById("containerItems");
    let originalData= []; 
    let nameCat = ""; 

    function namesCategory (items) {
    let names = document.getElementById("categoryName")
    let htmlContentToAppend =  ` <h1>${items.catName}</h1>
    <p class="lead">Verás aquí lo que estas buscando.</p> ` 
    names.innerHTML=htmlContentToAppend
    }
    
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
    
        document.getElementById("containerItems").innerHTML = htmlContentToAppend;
    }
     
    document.getElementById("rangeFilterCount").addEventListener("click", function (){ 
      const minPrice = document.getElementById("rangeFilterCountMin").value;
      const maxPrice = document.getElementById("rangeFilterCountMax").value; 
              let filtrarPrecio = originalData.filter(product => {
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
              filtrarPrecio.sort((a, b) => a.cost - b.cost);
              showCategory(filtrarPrecio);
          
    });
    
      // Es la misma que aparece en categories.js (para que funcione el boton "Limpiar")
    document.getElementById("clearRangeFilter").addEventListener("click", function () {
    document.getElementById("rangeFilterCountMin").value = "";
    document.getElementById("rangeFilterCountMax").value = "";
    
    minPrice = undefined;
    maxPrice = undefined;
    showCategory(originalData);
    });
    
    
    //Se establece una contante con lo ingresado en la linea 43 (de 40 a 44) del prodcuto.html
    const searchInput = document.getElementById("productSearch");
    
    //Al momento que se escribe algo, se toma la contante ya creada, se obtiene su valor, se la pasa a minúsculas y se eliminan los espacios iniciales y finales con .trim()
    searchInput.addEventListener("input", function () {
                const searchText = searchInput.value.toLowerCase().trim();
    
                //Se usa .filter sobre originalData.prodcto para obtener la los valores de la API que ocurren dentro de (product =>)
                let filteredProducts = originalData.filter(product => {
                    const productName = product.name.toLowerCase();  //esto nos da el título en minuscula
                    const productDescription = product.description.toLowerCase();  //nos da la descripción en minuscula
                    return productName.includes(searchText) || productDescription.includes(searchText); // nos retorna TODOS los valores que matcheen contra el título o la disripción
                });
            
                //Muestra lo filtrado. Al final no recurrí a hacer otro fetch sino que fui directo a la constante "originData"
                showCategory(filteredProducts);
       
    });

 let btnDesc = document.getElementById ("sortByCount1");
 let btnAsc = document.getElementById ("sortByCount2");
 let relevant = document.getElementById ("sortByRel");

btnDesc.addEventListener('click', function () {
    let itemsArray = originalData.slice(); 
    
    itemsArray.sort(function (a, b) {
    // Ordenar por costo de forma descendente
    return b.cost - a.cost;
});

showCategory(itemsArray);
});

btnAsc.addEventListener('click', function () {
let itemsArray = originalData.slice(); 

itemsArray.sort(function (a, b) {
   
    return a.cost - b.cost;
});

showCategory(itemsArray);
});

relevant.addEventListener('click', function () {
let itemsArray = originalData.slice(); 
0
itemsArray.sort(function (a, b) {
    return b.soldCount - a.soldCount;
});

showCategory(itemsArray);
});

fetch(URL_PRODUCTS)
.then(res => res.json())
.then(data => {
    originalData = data.products;
    nameCat = data.name;
    namesCategory(data);
    showCategory(originalData);
    
});
    
})

