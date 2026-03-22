// login.js - Solución completa y probada

// Función principal de login
validate_fields = function () {
    try {
        console.log("=== INICIANDO LOGIN ===");

        // Obtener elementos
        let usernameInput = document.getElementById("usuario");
        let passwordInput = document.getElementById("password");

        if (!usernameInput || !passwordInput) {
            alert("Error: Campos no encontrados. Recarga la página.");
            return false;
        }

        // Obtener valores
        let username = usernameInput.value.trim();
        let password = passwordInput.value;

        console.log("Usuario ingresado:", username);
        console.log("Contraseña ingresada:", password ? "***" : "vacía");

        // Validar campos vacíos
        if (!username) {
            alert("Por favor, ingresa tu nombre de usuario");
            usernameInput.focus();
            return false;
        }

        if (!password) {
            alert("Por favor, ingresa tu contraseña");
            passwordInput.focus();
            return false;
        }

        // Obtener usuarios del localStorage
        let users = [];
        try {
            const usersJSON = localStorage.getItem('users');
            console.log("usersJSON:", usersJSON);

            if (!usersJSON) {
                users = [];
            } else {
                users = JSON.parse(usersJSON);
            }
        } catch (error) {
            console.error("Error al leer usuarios:", error);
            users = [];
        }

        console.log("Total de usuarios registrados:", users.length);
        console.log("Lista de usuarios:", users);

        const usuarioEncontrado = users.find(u => {
            console.log(`Comparando: "${u.username}" con "${username}"`);
            return u.username === username;
        });

        console.log("Usuario encontrado:", usuarioEncontrado);

        if (!usuarioEncontrado) {
            alert("Usuario no encontrado. Verifica tu nombre de usuario o registrese.");
            return false;
        }

        // Verificar contraseña
        console.log("Contraseña almacenada:", usuarioEncontrado.password);
        console.log("Contraseña ingresada:", password);

        if (usuarioEncontrado.password !== password) {
            alert("Contraseña incorrecta. Inténtalo de nuevo.");
            passwordInput.value = "";
            passwordInput.focus();
            return false;
        }

        // LOGIN EXITOSO
        console.log("✅ LOGIN EXITOSO");
        console.log("Usuario autenticado:", usuarioEncontrado);

        // Guardar usuario actual
        localStorage.setItem('currentUser', JSON.stringify(usuarioEncontrado));

        // Verificar que se guardó
        const savedUser = JSON.parse(localStorage.getItem('currentUser'));
        console.log("Usuario guardado como currentUser:", savedUser);

        // Mostrar mensaje y redirigir
        alert(`¡Bienvenido ${usuarioEncontrado.nombre}! Redirigiendo...`);

        // Redirigir a main.html
        setTimeout(() => {
            window.location.href = 'main.html';
        }, 500);

        return true;

    } catch (error) {
        console.error("❌ Error crítico en login:", error);
        alert("Error inesperado: " + error.message);
        return false;
    }
}

// Función para crear usuario de prueba si no hay ninguno
function createTestUserIfNeeded() {
    try {
        const users = JSON.parse(localStorage.getItem('users') || '[]');

        if (users.length === 0) {
            const testUser = {
                nombre: "Usuario",
                apellidos: "de Prueba",
                username: "testuser",
                email: "test@email.com",
                birth: "2000-01-01",
                password: "Test123!@",
                about_me: "Soy un usuario de prueba",
                next_trip: null,
                created_at: new Date().toISOString()
            };

            users.push(testUser);
            localStorage.setItem('users', JSON.stringify(users));

            console.log("✅ Usuario de prueba creado automáticamente");
            console.log("Usuario: testuser");
            console.log("Contraseña: Test123!@");
        }
    } catch (error) {
        console.error("Error creando usuario de prueba:", error);
    }
}

// Función para probar el login rápidamente
function testLogin() {
    document.getElementById("usuario").value = "testuser";
    document.getElementById("password").value = "Test123!@";
    validate_fields();
}

// Inicializar página de login
function initLoginPage() {
    console.log("=== INICIALIZANDO PÁGINA LOGIN ===");

    // Crear usuario de prueba si es necesario
    // Configurar evento del formulario
    const loginForm = document.getElementById('login_form');
    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();
            validate_fields();
        });
    }

    // Configurar botón de login
    const loginButton = document.getElementById('btn_login');
    if (loginButton) {
        loginButton.addEventListener('click', function (e) {
            e.preventDefault();
            validate_fields();
        });
    }

    // Prellenar con usuario recordado si existe
    const rememberedUser = localStorage.getItem('rememberedUsername');
    if (rememberedUser) {
        const userInput = document.getElementById('usuario');
        if (userInput) {
            userInput.value = rememberedUser;
        }
    }

}

// Ejecutar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLoginPage);
} else {
    initLoginPage();
}

// Exportar funciones
window.validate_fields = validate_fields;
window.testLogin = testLogin;