document.addEventListener('DOMContentLoaded', function(){
    //modo dark del nav
    let nav = document.getElementById("navIndex")
    let mode = localStorage.getItem('mode')
    if(mode === 'dark'){
        nav.removeAttribute('style')    
        nav.classList.add('bg-body-tertiary')
        nav.setAttribute('data-bs-theme', 'dark')
        
    }
    if(mode === 'light'  || !mode){
        nav.removeAttribute('data-bs-theme')
        nav.classList.remove('bg-body-tertiary')
        nav.setAttribute('style','background-color: rgba(255, 192, 74, 0.684);')
    }
    if(nav.hasAttribute('data-bs-theme')){
        botonCambiar.classList.add('active')
    }

 
 



})
//https://japceibal.github.io/emercado-api/user_cart/25801.json
//25801
//"https://japceibal.github.io/emercado-api/user_cart/"

document.addEventListener("DOMContentLoaded",function(){
    const URL_info='https://japceibal.github.io/emercado-api/user_cart/25801.json';
    fetch (URL_info)
    .then(response=>response.json())
    .then(data=>showCartInfo(data.articles[0]))
})


function showCartInfo(data){
    let htmlContentToAppend = "";
            htmlContentToAppend += `
            <table id="tablaCarrito" class="table" >
            <thead>
              <tr>
                <th scope="col"  class="col-sm-1"></th>
                <th scope="col"  class="col-sm-1">Nombre</th>
                <th scope="col"  class="col-sm-1">Costo</th>
                <th scope="col"  class="col-sm-1">Cantidad</th>
                <th scope="col"  class="col-sm-1">Subtotal</th>
              </tr>
            </thead>
            <tbody class="table-group-divider">
              <tr>
                <td scope="row"><img  class="img-fluid" src="${data.image}"></img> </td>
                <td>${data.name} </td>
                <td> ${data.currency} ${data.unitCost}</td>
                <td class="col"><input id="inputCart" type="number" min="1"  class="form-control w-50 mx-auto" value="${data.count}"></td>
                <td> <b> ${data.currency} ${data.unitCost}</b></td>
              </tr>
            </tbody>
          </table>
                `  
    document.getElementById("containerCartInfo").innerHTML = htmlContentToAppend;
        }
    
      
    
    