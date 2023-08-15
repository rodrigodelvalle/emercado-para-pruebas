function enviarFormulario() {
    document.getElementById("loginForm").addEventListener("submit", function (event) {
        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;
        let rememberMe = document.getElementById("remember").checked;

        if (username === "" || password === "") {
            event.preventDefault(); // Evita que el formulario se envíe
            alert("Por favor, completa todos los campos.");
        } else if (username.length > 30 && password.length > 30) {
            event.preventDefault(); // Evita que el formulario se envíe
            alert("La contraseña no puede tener más de 30 caracteres.");
        } else {
            // Si se cumplen todas las condiciones, redirige a index.html
            window.location.href = "index.html";
        }
        if (rememberMe && username && password) {
            localStorage.setItem("username", username);
            window.location.href = "index.html";
        } else if (!rememberMe && username && password) {
            sessionStorage.setItem("username", username);
            window.location.href = "index.html";
        }

    })
}


let bienvenida = document.getElementById("username").value = localStorage.username;
localStorage.username = "username"; // Agregué para guardar el id
