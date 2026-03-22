// Verificar si hay un usuario logueado
const currentUser = localStorage.getItem('currentUser');
if (!currentUser) {
    window.location.href = 'login.html';
}

// Obtener el viaje actual
const viajeActual = localStorage.getItem('viaje');
if (!viajeActual) {
    // Si no hay viaje seleccionado, redirigir al buscador
    window.location.href = 'buscador.html';
}

// Elementos del DOM
const opinionesContainer = document.getElementById('opiniones');
const form_opinion = document.getElementById('form_opinion');
const usuario_opinion = document.getElementById('usuario_opinion');
const error_opinion = document.getElementById('error_opinion');

// Función para obtener las opiniones de un viaje específico
function obtenerOpiniones(viajeId) {
    const key = 'opinions_' + viajeId;
    const opiniones = localStorage.getItem(key);
    return opiniones ? JSON.parse(opiniones) : [];
}

// Función para guardar opiniones de un viaje
function guardarOpiniones(viajeId, opiniones) {
    const key = 'opinions_' + viajeId;
    localStorage.setItem(key, JSON.stringify(opiniones));
}

// Función para mostrar las 3 opiniones más recientes
function mostrarOpiniones() {
    const opiniones = obtenerOpiniones(viajeActual);

    // Ordenar por fecha descendente (más recientes primero)
    opiniones.sort((a, b) => b.fecha - a.fecha);

    // Tomar solo las 3 más recientes
    const opinionesRecientes = opiniones.slice(0, 3);

    // Limpiar el contenedor
    opinionesContainer.innerHTML = '';

    if (opinionesRecientes.length === 0) {
        // Mostrar mensaje si no hay opiniones
        opinionesContainer.innerHTML = `
            <aside class="opinion sin-opiniones" style="grid-area: 1/1/2/4; text-align: center; justify-self: center; align-self: center;">
                <p>Aún no hay opiniones para este viaje. ¡Sé el primero en opinar!</p>
            </aside>
        `;
    } else {
        // Generar HTML para cada opinión
        opinionesRecientes.forEach((opinion, index) => {
            const opinionHTML = `
                <aside id="opinion-${index + 1}" class="opinion">
                    <div id="opinion-header-${index + 1}" class="opinion-header">
                        <h1 class="usuario">${opinion.username}</h1>
                    </div>
                    <p>${opinion.texto}</p>
                </aside>
            `;
            opinionesContainer.innerHTML += opinionHTML;
        });
    }
}

// Función para publicar una nueva opinión
function publicarOpinion() {
    const user = JSON.parse(currentUser);
    const texto = usuario_opinion.value.trim();

    const nuevaOpinion = {
        username: user.nombre,
        texto: texto,
        fecha: Date.now()
    };

    // Obtener opiniones existentes y añadir la nueva
    const opiniones = obtenerOpiniones(viajeActual);
    opiniones.push(nuevaOpinion);

    // Guardar en localStorage
    guardarOpiniones(viajeActual, opiniones);

    // Limpiar textarea
    usuario_opinion.value = '';

    // Actualizar la vista
    mostrarOpiniones();
}

// Event listener para el formulario
form_opinion.addEventListener('submit', (e) => {
    e.preventDefault();
    let messages = [];

    if (usuario_opinion.value.trim() === '') {
        messages.push('Por favor, añada texto para publicar una opinión.');
    }

    if (usuario_opinion.value.length > 500) {
        messages.push('La opinión no puede exceder los 500 caracteres.');
    }

    if (messages.length > 0) {
        error_opinion.innerText = messages.join(' ');
    } else {
        publicarOpinion();
        error_opinion.innerText = "";
    }
});

// Cargar opiniones al iniciar la página
mostrarOpiniones();