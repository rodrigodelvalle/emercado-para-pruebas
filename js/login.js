
window.onload = function() {
    document.getElementById("loginForm").addEventListener("submit", function(event) {
        event.preventDefault(); // Prevenir el envío del formulario

        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;
        let rememberMe = document.getElementById("remember").checked;

        if (username === "" || password === "") {
            alert("Por favor, completa todos los campos.");
        } else if (username.length > 30 || password.length > 30) {
            alert("La contraseña no puede tener más de 30 caracteres.");
        } else {
            if (rememberMe) {
                localStorage.setItem("username", username);
            } else {
                sessionStorage.setItem("username", username);
            }
            window.location.href = "index.html";
        }
    });

    let bienvenida = document.getElementById("username").value = localStorage.getItem("username");
};

click = document.getElementById("login");

click.addEventListener("click", function () {
  alert('Bienvenid@ a E-mercado: ' + username.value)
})

//const checkbox = document.getElementById ("remember");
//const username = document.getElementById ("username");
//const btn = document.getElementById ("login");


function guardarInfo () {
    if (rememberMe.checked && click) {
        sessionStorage.setItem ("username", username.value)
    }
    else {
        window.location.href = "login.html"
    }
}

checkbox.addEventListener ('change', guardarInfo)