// register.js - Función de registro mejorada
function validate_input_file_type() {
    let input = document.getElementById("pfp");
    if (!input) return { valido: false, error: "No se encontró el campo de archivo." };
    let file = input.files[0];
    if (!file) return { valido: true, error: "" }; // Cambiado: la foto es opcional
    let valid_types = ["image/jpeg", "image/png", "image/webp"];
    let allowed_extensions = [".jpg", ".jpeg", ".png", ".webp"];
    if (!valid_types.includes(file.type)) {
        return { valido: false, error: "El archivo debe ser una imagen (jpg, jpeg, png, webp)." };
    }
    let ok_extension = allowed_extensions.some(extension => file.name.toLowerCase().endsWith(extension));
    if (!ok_extension) {
        return { valido: false, error: "El archivo debe tener una extensión válida (jpg, jpeg, png, webp)." };
    }
    return { valido: true, error: "" };
}

function validateRegisterForm() {
    // Obtener elementos del DOM
    let nombre_input = document.getElementById('nombre');
    let apellidos_input = document.getElementById('apellidos');
    let usuario_input = document.getElementById('usuario');
    let email_input = document.getElementById('email');
    let email_check = document.getElementById('confirmar_email');
    let birthdate_input = document.getElementById('fecha_nacimiento');
    let password_input = document.getElementById('contraseña');
    let privacy_checkbox = document.getElementById('aceptar_privacidad');
    let pfp_input = document.getElementById('pfp');

    // Obtener VALORES de los inputs
    let nombre = nombre_input.value.trim();
    let apellidos = apellidos_input.value.trim();
    let usuario = usuario_input.value.trim();
    let email = email_input.value.trim();
    let emailConfirm = email_check.value.trim();
    let birthdate = birthdate_input.value;
    let password = password_input.value;

    // Obtener usuarios existentes
    let users = JSON.parse(localStorage.getItem('users') || '[]');

    // 1. Validar política de privacidad
    if (!privacy_checkbox.checked) {
        alert("Debe aceptar la política de privacidad para continuar.");
        privacy_checkbox.focus();
        return false;
    }

    // 2. Validar nombre (mínimo 3 caracteres)
    if (nombre.length < 3) {
        alert("El nombre debe tener al menos 3 caracteres.");
        nombre_input.focus();
        return false;
    }

    // 3. Validar apellidos (solo letras, espacios, guiones y apóstrofes)
    let surname_rgx = /^[a-zA-ZÀ-ÿ\s'-]+$/;
    if (!surname_rgx.test(apellidos)) {
        alert("Los apellidos contienen caracteres no válidos. Solo se permiten letras, espacios, guiones y apóstrofes.");
        apellidos_input.focus();
        return false;
    }

    // 4. Validar usuario (mínimo 3 caracteres)
    if (usuario.length < 3) {
        alert("El nombre de usuario debe tener al menos 3 caracteres.");
        usuario_input.focus();
        return false;
    }

    // 5. Validar formato de email
    let email_rgx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email_rgx.test(email)) {
        alert("Por favor, introduce una dirección de correo electrónico válida.");
        email_input.focus();
        return false;
    }

    if (!email_rgx.test(emailConfirm)) {
        alert("Por favor, confirma con una dirección de correo electrónico válida.");
        email_check.focus();
        return false;
    }

    // 6. Validar que los emails coinciden
    if (email !== emailConfirm) {
        alert("Las direcciones de correo electrónico no coinciden.");
        email_check.focus();
        return false;
    }

    // 7. Validar contraseña
    let password_rx = /^(?=.*[0-9].*[0-9])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>\/?])(?=.*[A-Z])(?=.*[a-z]).{8,}$/;
    if (!password_rx.test(password)) {
        alert("La contraseña debe tener al menos 8 caracteres, incluyendo 2 números, 1 carácter especial, 1 letra mayúscula y 1 letra minúscula.");
        password_input.focus();
        return false;
    }

    // 8. Validar fecha de nacimiento
    let parts = birthdate.split('/');
    let birthDateObj;

    if (parts.length === 3) {
        let day = parseInt(parts[0], 10);
        let month = parseInt(parts[1], 10) - 1;
        let year = parseInt(parts[2], 10);

        // Manejar años de dos dígitos
        if (year < 100) {
            year += 2000;
        }

        birthDateObj = new Date(year, month, day);
    } else {
        birthDateObj = new Date('Invalid');
    }

    let today = new Date();

    if (isNaN(birthDateObj.getTime())) {
        alert("Por favor, introduce una fecha de nacimiento válida (DD/MM/AAAA).");
        birthdate_input.focus();
        return false;
    }

    if (birthDateObj >= today) {
        alert("La fecha de nacimiento no puede ser en el futuro.");
        birthdate_input.focus();
        return false;
    }

    // 9. Validar edad mínima (13 años)
    let age = today.getFullYear() - birthDateObj.getFullYear();
    let monthDiff = today.getMonth() - birthDateObj.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
        age--;
    }

    if (age < 13) {
        alert("Debes tener al menos 13 años para registrarte.");
        birthdate_input.focus();
        return false;
    }

    // 10. Validar archivo de perfil (opcional)
    let fileValidation = validate_input_file_type();
    if (!fileValidation.valido) {
        alert(fileValidation.error);
        return false;
    }

    // 11. Verificar si el usuario ya existe
    if (users.some(u => u.username === usuario)) {
        alert('El nombre de usuario ya está en uso. Por favor, elige otro.');
        usuario_input.focus();
        return false;
    }

    // 12. Verificar si el email ya existe
    if (users.some(u => u.email === email)) {
        alert('El correo electrónico ya está registrado.');
        email_input.focus();
        return false;
    }

    // 13. Procesar la imagen de perfil si existe
    let pfpDataUrl = null;
    let file = pfp_input.files[0];

    // Función para completar el registro (movida aquí para que esté disponible)
    function completeRegistration(imageData) {
        // Crear nuevo usuario
        const new_user = {
            nombre: nombre,
            apellidos: apellidos,
            username: usuario,
            email: email,
            birth: birthdate,
            password: password,
            pfp: imageData,
            about_me: '',
            next_trip: [],
            created_at: new Date().toISOString()
        };

        // Guardar en localStorage
        users.push(new_user);
        localStorage.setItem('users', JSON.stringify(users));

        // Guardar como usuario actual (loguear automáticamente)
        localStorage.setItem('currentUser', JSON.stringify(new_user));

        console.log('Usuario registrado:', new_user);
        console.log('Lista de usuarios:', users);

        // Mostrar mensaje de éxito y redirigir
        alert('¡Registro exitoso! Bienvenido a MochilerosXMundo.');
        window.location.href = 'main.html';
    }

    if (file) {
        // Si hay archivo, usar FileReader para convertirlo a Data URL
        const reader = new FileReader();

        reader.onload = function (e) {
            pfpDataUrl = e.target.result;
            completeRegistration(pfpDataUrl);
        };

        reader.onerror = function () {
            alert("Error al cargar la imagen. Por favor, inténtalo de nuevo.");
        };

        reader.readAsDataURL(file);
        return false; // Prevenir submit, la redirección se hace en onload
    } else {
        // Si no hay archivo, continuar sin foto
        completeRegistration(null);
        return false; // Prevenir submit normal, la redirección se hace en completeRegistration
    }
}

// Función para inicializar la página de registro
function initRegisterPage() {
    const registerForm = document.getElementById('formulario_registro');

    if (registerForm) {
        registerForm.addEventListener('submit', function (e) {
            e.preventDefault();
            validateRegisterForm();
        });
    }

    // También conectar el botón por si acaso
    const registerButton = document.getElementById('btn_registrarse');
    if (registerButton) {
        registerButton.addEventListener('click', function (e) {
            e.preventDefault();
            validateRegisterForm();
        });
    }

    // Configurar máscara para fecha
    setupDateInputMask();
}

// Función para máscara de fecha
function setupDateInputMask() {
    const fechaInput = document.getElementById('fecha_nacimiento');
    if (fechaInput) {
        // Configurar placeholder más descriptivo
        fechaInput.placeholder = 'DD/MM/AAAA';

        // Agregar máscara para fecha
        fechaInput.addEventListener('input', function (e) {
            let value = e.target.value.replace(/\D/g, '');

            if (value.length >= 2) {
                value = value.substring(0, 2) + '/' + value.substring(2);
            }
            if (value.length >= 5) {
                value = value.substring(0, 5) + '/' + value.substring(5, 9);
            }

            e.target.value = value;
        });
    }
}

// Prevenir envío de formularios con Enter en toda la aplicación
document.addEventListener('DOMContentLoaded', function () {
    // Escuchar el evento 'keydown' en todos los formularios
    document.addEventListener('keydown', function (event) {
        // Verificar si la tecla es Enter y si el objetivo es un campo de formulario
        if (event.key === 'Enter' &&
            (event.target.tagName === 'INPUT' ||
                event.target.tagName === 'TEXTAREA' ||
                event.target.tagName === 'SELECT')) {
            event.preventDefault();
        }
    });
});

// Ejecutar cuando el DOM esté cargado
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRegisterPage);
} else {
    initRegisterPage();
}

// Exportar funciones al ámbito global
window.validateRegisterForm = validateRegisterForm;
window.initRegisterPage = initRegisterPage;