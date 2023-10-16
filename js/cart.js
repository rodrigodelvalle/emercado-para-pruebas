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
window.addEventListener('load', function() {
  // Llama a sumaDePrecios() u otras acciones que desees realizar al cargar la página.
  sumaDePrecios();
});

document.addEventListener("DOMContentLoaded", function () {
  const URL_info = 'https://japceibal.github.io/emercado-api/user_cart/25801.json';
  fetch(URL_info)
    .then(response => response.json())
    .then(data => {
      showCartInfo(data.articles[0]);
      mostrarLista();
      let cantidades = document.getElementsByClassName('cant');
      for (let i = 0; i < cantidades.length; i++) { //Recorre los elementos que tienen la clase "cant"
        cantidades[i].addEventListener('input', recalcular);       // Asignar el evento 'input' a todos los elementos con la clase 'cant' después de cargar el contenido
        cantidades[i].addEventListener('change', sumaDePrecios); 
      }
    });
    
});

function showCartInfo(data) {
  let htmlContentToAppend = `
    <tr>
      <td scope="row"><img class="img-fluid" src="${data.image}"></td>
      <td>${data.name}</td>
      <td class="precio">${data.currency} ${data.unitCost}</td>
      <td class="col"><input id="inputCart" type="number" min="1" class="cant form-control w-50 mx-auto" value="${data.count}"></td>
      <td class="res"><b>${data.currency} ${data.unitCost}</b></td>
    </tr>
  `;
  document.getElementById("productosCart").innerHTML = htmlContentToAppend;
}

function mostrarLista() {
  // Obtener productos del localStorage
  let arrayProductos = JSON.parse(localStorage.getItem('arrayProductos'));
  if (arrayProductos) {
    let content = "";
    for (let i = 0; i < arrayProductos.length; i++) {
      content += `
        <tr>
          <td scope="row"><img class="img-fluid" src="${arrayProductos[i].images[0]}"></td>
          <td>${arrayProductos[i].name}</td>
          <td class="precio">${arrayProductos[i].currency} ${arrayProductos[i].cost}</td>
          <td class="col"><input type="number" min="1" class="cant form-control w-50 mx-auto inputCart" value="1"></td>
          <td class="res"><b>${arrayProductos[i].currency} ${arrayProductos[i].cost}</b></td>
        </tr>
      `;
    }
    document.getElementById("productosCart").innerHTML += content;
  }
}

function recalcular() {
  let cantidades = document.getElementsByClassName('cant'); 
  let precios = document.getElementsByClassName('precio');
  let preciosTotales = document.getElementsByClassName('res');
  let sumaFinal = document.getElementById('totalForm')
  let sumaTotal = 0
  for (let i = 0; i < cantidades.length; i++) {
    let cantidad = parseInt(cantidades[i].value);
    let precio = parseFloat(precios[i].textContent.replace(/\D/g, '')); //busca todos los caracteres que no son dígitos ni puntos.
    let currencySymbol = precios[i].textContent.replace(/[^A-Z]/g, ''); // Obtener símbolo de la currency busca y reemplaza cualquier carácter que no sea una letra mayúscula por una cadena vacía. Esto extrae el símbolo de la moneda.
    let precioTotal = cantidad * precio;
    sumaTotal += precioTotal 
    precioTotal = Math.floor(precioTotal); // Este metodo redondea el nro para que no aparezcan los decimales.
     preciosTotales[i].innerHTML = "<b>" + currencySymbol + " " + precioTotal + "</b>";
    sumaFinal.innerHTML = currencySymbol + " " + sumaTotal;
    
  }
}  

function sumaDePrecios(){
  let premium = document.getElementById("premium");
  let expres = document.getElementById("expres");
  let estandar = document.getElementById("estandar");
  let cantidades = document.getElementsByClassName('cant'); 
  let precios = document.getElementsByClassName('precio');
  let sumaFinal = document.getElementById('totalForm')
  let precioFinal = document.getElementById('precioFinal')
  let sumaTotal = 0

  for (let i = 0; i < cantidades.length; i++) {
    let cantidad = parseInt(cantidades[i].value);
    let precio = parseFloat(precios[i].textContent.replace(/\D/g, ''));
    let currencySymbol = precios[i].textContent.replace(/[^A-Z]/g, ''); 
    let precioTotal = cantidad * precio;
    sumaTotal += precioTotal 
    sumaFinal.innerHTML =  currencySymbol + " " + sumaTotal ;
  }
  premium.addEventListener('click', ()=>{
    let valorEnvio = document.getElementById('envio');
    let envioPremium = sumaTotal*0.15;
    valorEnvio.innerHTML = "USD " + envioPremium.toFixed(2);
    total = sumaTotal+envioPremium;
    precioFinal.innerHTML = "<b>"+"USD " +total.toFixed(2)+"</b>";

  })
  expres.addEventListener('click', ()=>{
    let valorEnvio = document.getElementById('envio');
    let envioExpres = sumaTotal*0.07
    valorEnvio.innerHTML = "USD " + envioExpres.toFixed(2)
    total = sumaTotal+envioExpres
    precioFinal.innerHTML = "<b>"+"USD " +total.toFixed(2)+"</b>";

  })
  estandar.addEventListener('click', ()=>{
    let valorEnvio = document.getElementById('envio');
    let envioEstandar = sumaTotal*0.05
    valorEnvio.innerHTML = "USD " + envioEstandar.toFixed(2)
    total = sumaTotal+envioEstandar
    
    precioFinal.innerHTML = "<b>"+"USD " +total.toFixed(2)+"</b>";
  })

}



