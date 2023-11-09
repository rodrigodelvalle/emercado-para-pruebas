document.addEventListener('DOMContentLoaded', function(){
    //modo dark del nav
    let nav = document.getElementById("navIndex")
    let mode = localStorage.getItem('mode')
    if(mode === 'dark'){
        nav.removeAttribute('style')    
        nav.classList.add('bg-body-tertiary')
        nav.setAttribute('data-bs-theme', 'dark')
    }
    if(mode === 'light' || !mode){
        nav.removeAttribute('data-bs-theme')
        nav.classList.remove('bg-body-tertiary')
        nav.setAttribute('style','background-color: rgba(255, 192, 74, 0.684);')
    }
    if(nav.hasAttribute('data-bs-theme')){
        botonCambiar.classList.add('active')
    }
})

//Traigo las id de los input para guardarlos despues

let primerNombre = document.getElementById("primerNombre");
let segundoNombre= document.getElementById("segundoNombre");
let primerApellido= document.getElementById("primerApellido");
let segundoApellido= document.getElementById("segundoApellido");
let email = document.getElementById("email");
let telefono= document.getElementById("telefono");


document.addEventListener('DOMContentLoaded', function(){
let datosUsuario = JSON.parse(localStorage.getItem("guardarDatos"));
primerNombre.value= datosUsuario.nombre1;
segundoNombre.value= datosUsuario.nombre2;
primerApellido.value= datosUsuario.apellido1;
segundoApellido.value= datosUsuario.apellido2;
email.value= datosUsuario.email;
telefono.value=datosUsuario.telefono;

})

if(localStorage.getItem("username") || sessionStorage.getItem("username")) {
    var emailInput = document.getElementById("email");
    emailInput.value = localStorage.getItem("username") || sessionStorage.getItem("username");
}
let form= document.getElementById("perfilUsuario");

  // Agregar evento de clic al botón de guardar
  form.addEventListener("submit", function() {
    // Obtener valores

    let guardarVariables={
  nombre1:primerNombre.value, 
  nombre2:segundoNombre.value, 
  apellido1:primerApellido.value,
  apellido2:segundoApellido.value,
  email:email.value,
 telefono:telefono.value,
 };

localStorage.setItem("guardarDatos", JSON.stringify(guardarVariables));
  });

// Funcion para validar datos de Perfil de usuario
function validate () {
  'use strict'  
    const forms = document.querySelectorAll('.needs-validation')  
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }  
        form.classList.add('was-validated');
      }, false);
    })
  }  

  document.addEventListener('DOMContentLoaded', function() {
    validate();
  }, false);
const inputFile = document.getElementById('inputFile');
const imagenContainer = document.getElementById('imagenContainer');
const imagenPredeterminada = document.getElementById('imagenPredeterminada');

inputFile.addEventListener('change', (event) => {
  const files = event.target.files;
  if (files && files.length > 0) {
    const file = files[0];
    if (/\.(jpg|jpeg|png)$/i.test(file.name)) {
      const reader = new FileReader();
      reader.onload = function (e) {
        // Crear una nueva imagen
        const img = new Image();
        img.src = e.target.result;
        img.style.width = '100%';
        img.style.height = 'auto';

        // Eliminar la imagen anterior del contenedor
        while (imagenContainer.firstChild) {
          imagenContainer.removeChild(imagenContainer.firstChild);
        }

        // Mostrar la nueva imagen en el contenedor
        imagenContainer.appendChild(img);
      };
      reader.readAsDataURL(file);
    } else {
      alert('Formato de archivo no válido. Por favor, selecciona un archivo JPG o PNG.');
    }
  } else {
    // Mostrar la imagen predeterminada si no se selecciona ninguna foto
    imagenContainer.appendChild(imagenPredeterminada);
  }
});
