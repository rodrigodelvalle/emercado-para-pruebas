document.getElementById("loginForm").addEventListener("submit", function(event) {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var rememberMe = document.getElementById("remember").checked;
    
    if (username === "" || password === "") {
        event.preventDefault(); // Evita que el formulario se envíe
        alert("Por favor, completa todos los campos.");
    } else if (password.length > 30) {
        event.preventDefault(); // Evita que el formulario se envíe
        alert("La contraseña no puede tener más de 30 caracteres.");
    } else {
        // Si se cumplen todas las condiciones, redirige a index.html
        window.location.href = "index.html";
    }
});