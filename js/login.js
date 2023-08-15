
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