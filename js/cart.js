document.addEventListener('DOMContentLoaded', function () {
  //modo dark del nav
  let nav = document.getElementById("navIndex")
  let mode = localStorage.getItem('mode')
  if (mode === 'dark') {
    nav.removeAttribute('style')
    nav.classList.add('bg-body-tertiary')
    nav.setAttribute('data-bs-theme', 'dark')

  }
  if (mode === 'light' || !mode) {
    nav.removeAttribute('data-bs-theme')
    nav.classList.remove('bg-body-tertiary')
    nav.setAttribute('style', 'background-color: rgba(255, 192, 74, 0.684);')
  }
  if (nav.hasAttribute('data-bs-theme')) {
    botonCambiar.classList.add('active')
  }


})

document.addEventListener("DOMContentLoaded", function () {
  const URL_info = 'https://japceibal.github.io/emercado-api/user_cart/25801.json';
  fetch(URL_info)
    .then(response => response.json())
    .then(data => showCartInfo(data.articles[0]))
    mostrarLista();
})


function showCartInfo(data) {
  let htmlContentToAppend = "";
  htmlContentToAppend += `
            <tr>
              <td scope="row"><img  class="img-fluid" src="${data.image}"></img> </td>
              <td>${data.name} </td>
              <td> ${data.currency} ${data.unitCost}</td>
              <td class="col"><input id="inputCart" type="number" min="1"  class="form-control w-50 mx-auto" value="${data.count}"></td>
              <td id="subtotal"> <b> ${data.currency} ${data.unitCost}</b></td>
            </tr>
              `
  document.getElementById("productosCart").innerHTML += htmlContentToAppend;

  var inputCart = document.getElementById('inputCart'); // Toma los valores de cantidad de articulos y el precio por unidad
  var precioTotal = parseFloat(data.unitCost);

  function mostrar() {
    var cantidad = parseFloat(inputCart.value); // Obtiene la cantidad de artículos
    var subtotal = precioTotal * cantidad; // Calcula el subtotal multiplicando el precio total por la cantidad
document.getElementById('subtotal').innerHTML = "<b>" + data.currency + " " + subtotal + "</b>"; // Modifica el subtotal con el símbolo de la moneda
    // Cada vez que cambia el input de cantidad se ejecuta la función que modifica el subtotal.
  }
  inputCart.addEventListener('input', mostrar);
}

// Función que muestra los productos agregados al carrito
function mostrarLista() {
  // Mostrar el array almacenado en el localStorage
  let arrayProductos = JSON.parse(localStorage.getItem('arrayProductos'));
  let content = "";

  for (let i = 0; i < arrayProductos.length; i++) {
    content += `
      <tr>
        <td scope="row"><img class="img-fluid" src="${arrayProductos[i].images[0]}"></img></td>
        <td>${arrayProductos[i].name}</td>
        <td>${arrayProductos[i].currency} ${arrayProductos[i].cost}</td>
        <td class="col"><input class="inputCart" type="number" min="1" class="form-control w-50 mx-auto"></td>
        <td><b>${arrayProductos[i].currency} ${arrayProductos[i].cost}</b></td>
      </tr>
    `;
  }

  // Reemplazar el contenido del elemento con el id "productosCart"
  document.getElementById("productosCart").innerHTML += content;
}

    
    