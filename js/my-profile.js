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

if(localStorage.getItem("username") || sessionStorage.getItem("username")) {
    var emailInput = document.getElementById("email");
    emailInput.value = localStorage.getItem("username") || sessionStorage.getItem("username");
}

var guardarBtn = document.getElementById("saveUserData");

  // Agregar evento de clic al botón de guardar
  guardarBtn.addEventListener("click", function() {
    // Obtener valores de los campos de entrada
    var nombreUsuario = document.getElementById("userFirstName").value;
    var apellidoUsuario = document.getElementById("UserFirstSurname").value;

    // Validar campos obligatorios
    if (nombreUsuario && apellidoUsuario) {
      // Guardar datos en el localStorage
      localStorage.setItem("primernombreusuario", nombreUsuario);
      localStorage.setItem("primerapellidousuario", apellidoUsuario);
      // Guarda en local pero al enviar el form me vuelve a cero el input
      var nameInput = document.getElementById("userFirstName");
      nameInput.value = localStorage.getItem("primernombreusuario")
      var surnameInput = document.getElementById("UserFirstSurname");
      surnameInput.value = localStorage.getItem("primerapellidousuario")      
    } 
  });

// Funcion para validar datos de Perfil de usuario
function validate () {
    'use strict'
  
    const forms = document.querySelectorAll('.needs-validation')
  
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
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
