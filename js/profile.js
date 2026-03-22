// profile.js - Lógica para la página de perfil

/**
 * Carga los datos del usuario en el perfil
 */
function loadUserProfile() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (!currentUser) {
        alert('No hay usuario logueado. Redirigiendo al login...');
        window.location.href = 'login.html';
        return;
    }

    // Actualizar información básica
    document.getElementById('nombre_usuario').textContent = currentUser.nombre + ' ' + currentUser.apellidos;
    document.getElementById('email_usuario').textContent = currentUser.email;

    // Actualizar avatar con iniciales
    const avatar = document.getElementById('avatar');
    if (avatar) {
        const initials = getInitials(currentUser.nombre, currentUser.apellidos);
        avatar.textContent = initials;
    }

    // Actualizar "Sobre mí"
    const aboutMe = document.getElementById('about_me');
    if (aboutMe && currentUser.about_me) {
        aboutMe.textContent = currentUser.about_me;
    } else if (aboutMe) {
        aboutMe.textContent = `¡Hola! Soy ${currentUser.nombre}. Me encanta viajar y explorar nuevos lugares.`;
    }

    // Actualizar próximo viaje si existe
    if (currentUser.next_trip) {
        document.querySelector('.titulo-viaje').textContent = currentUser.next_trip.title || 'Próxima aventura';
        document.querySelector('.descripcion-viaje p').textContent = currentUser.next_trip.description || 'Planificando mi próximo viaje...';
        document.querySelector('.continente').textContent = currentUser.next_trip.continent || 'Por definir';
    }

    // Configurar botón de editar
    setupEditButton(currentUser);
}

/**
 * Obtiene iniciales del nombre y apellidos
 */
function getInitials(nombre, apellidos) {
    let initials = '';
    if (nombre && nombre.length > 0) initials += nombre.charAt(0).toUpperCase();
    if (apellidos && apellidos.length > 0) {
        const firstApellido = apellidos.split(' ')[0];
        initials += firstApellido.charAt(0).toUpperCase();
    }
    return initials || 'US';
}

/**
 * Configura el botón de editar perfil
 */
function setupEditButton(currentUser) {
    const editButton = document.getElementById('btn_editar');
    if (editButton) {
        editButton.addEventListener('click', function () {
            editUserProfile(currentUser);
        });
    }

    const configButton = document.getElementById('btn_config');
    if (configButton) {
        configButton.addEventListener('click', function () {
            window.location.href = 'config.html';
        });
    }
}

/**
 * Permite editar el perfil del usuario
 */
function editUserProfile(currentUser) {
    const newAboutMe = prompt('Cuéntanos algo sobre ti:',
        currentUser.about_me || `¡Hola! Soy ${currentUser.nombre}. Me encanta viajar y explorar nuevos lugares.`);

    const newTripTitle = prompt('Título de tu próximo viaje:',
        currentUser.next_trip?.title || '');

    const newTripDesc = prompt('Descripción de tu próximo viaje:',
        currentUser.next_trip?.description || '');

    const newTripContinent = prompt('Continente de tu próximo viaje:',
        currentUser.next_trip?.continent || '');

    if (newAboutMe !== null) {
        currentUser.about_me = newAboutMe;
    }

    if (newTripTitle !== null || newTripDesc !== null || newTripContinent !== null) {
        currentUser.next_trip = {
            title: newTripTitle || currentUser.next_trip?.title || '',
            description: newTripDesc || currentUser.next_trip?.description || '',
            continent: newTripContinent || currentUser.next_trip?.continent || ''
        };
    }

    // Actualizar en localStorage
    localStorage.setItem('currentUser', JSON.stringify(currentUser));

    // Actualizar en la lista de usuarios
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(u => u.username === currentUser.username);
    if (userIndex !== -1) {
        users[userIndex] = currentUser;
        localStorage.setItem('users', JSON.stringify(users));
    }

    // Recargar la información
    loadUserProfile();
    alert('Perfil actualizado correctamente');
}

/**
 * Inicializa la página de perfil
 */
function initProfilePage() {
    loadUserProfile();
}

// Ejecutar cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', initProfilePage);

// Exportar funciones
window.loadUserProfile = loadUserProfile;
window.initProfilePage = initProfilePage;