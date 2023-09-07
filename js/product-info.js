document.addEventListener('DOMContentLoaded', () => {
    let idProduct = localStorage.getItem("IdProduct");
    let URL_ID_PRODUCTS = "https://japceibal.github.io/emercado-api/products/" + idProduct + ".json";
    localStorage.removeItem("IdProduct");
        
    function showProduct(product) {
        let htmlContentToAppend = "";
        htmlContentToAppend += `
        <main class="pb-5">
            <div class="text-center p-4">
                <h2>${product.name}</h2><br><br><hr>
            </div>
                <div class="row">
                    <h4>Precio</h4> 
                        <p class="mb-1">${product.currency}  ${product.cost}</p><br><br>
                    <h4>Descripción</h4> 
                        <p class="mb-1">${product.description}</p><br><br>
                    <h4>Categoría</h4> 
                        <p class="mb-1">${product.category}</p><br><br>
                    <h4>Cantidad de vendidos</h4> 
                        <p class="mb-1">${product.soldCount}</p><br><br>
                    <h4>Imágenes ilustrativas</h4> 
                        <img src="${product.images[1]}"class="img-thumbnail">
                </div>
            `;

        document.getElementById("containerItems").innerHTML = htmlContentToAppend;
    };


    fetch(URL_ID_PRODUCTS)
        .then(res => res.json())
        .then(data => showProduct(data));

});