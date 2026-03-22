const track = document.querySelector("#carrusel_track");
const items = document.querySelectorAll(".carrusel-item")
const prevButton = document.querySelector("#carrusel_btn_prev")
const nextButton = document.querySelector("#carrusel_btn_next")
const slide1 = document.getElementById("carrusel_item_1")
const slide2 = document.getElementById("carrusel_item_2")
const slide3 = document.getElementById("carrusel_item_3")
const slide4 = document.getElementById("carrusel_item_4")
const nextAdventure = document.getElementById("next_adventure")

nextAdventure.addEventListener("click", () => {
    window.location.href = 'buscador.html';
});

let index = 0;
let intervalo;

function showSlide(n) {
    if (n < 0) {
        index = items.length - 1;
    } else if (n >= items.length) {
        index = 0;
    } else {
        index = n;
    }
    const offset = -index * 100;
    track.style.transform = `translateX(${offset}%)`;
}

slide1.addEventListener("click", () => {
    localStorage.setItem('viaje', 'viaje-1');
    window.location.href = 'detalles.html';
});
slide2.addEventListener("click", () => {
    localStorage.setItem('viaje', 'viaje-2');
    window.location.href = 'detalles.html';
});
slide3.addEventListener("click", () => {
    localStorage.setItem('viaje', 'viaje-3');
    window.location.href = 'detalles.html';
});
slide4.addEventListener("click", () => {
    localStorage.setItem('viaje', 'viaje-4');
    window.location.href = 'detalles.html';
});

function iniciarIntervalo() {
    // Reiniciamos contadores anteriores
    if (intervalo) {
        clearInterval(intervalo);
    }
    // Iniciamos nuevo intervalo de 2 segundos
    intervalo = setInterval(function () {
        showSlide(index + 1);
    }, 2000);
}

prevButton.addEventListener("click", () => {
    showSlide(index - 1);
    iniciarIntervalo();
});

nextButton.addEventListener("click", () => {
    showSlide(index + 1);
    iniciarIntervalo();
});

showSlide(index);
iniciarIntervalo();

// =========================================
// SISTEMA DE OPINIONES EN MAIN
// =========================================

// Nombres de los viajes para mostrar
const nombresViajes = {
    'viaje-1': 'Aventura en los Andes Peruanos',
    'viaje-2': 'Explorando el Sudeste Asiático',
    'viaje-3': 'Safari por la Sabana Africana',
    'viaje-4': 'Ruta por Europa Central'
};

// Función para crear opiniones por defecto si no existen
function crearOpinionesDefecto() {
    const opinionesDefecto = [
        {
            viajeId: 'viaje-1',
            username: 'Pedro García',
            texto: 'Una experiencia increíble en los Andes. Las vistas de Machu Picchu al amanecer son algo que nunca olvidaré. Recomiendo este viaje a todos los amantes de la aventura.',
            fecha: Date.now() - 86400000 * 3 // 3 días
        },
        {
            viajeId: 'viaje-2',
            username: 'Carlos López',
            texto: 'El Sudeste Asiático superó todas mis expectativas. La comida, la gente, los templos... Todo fue mágico. Definitivamente volveré.',
            fecha: Date.now() - 86400000 * 2 // 2 días
        },
        {
            viajeId: 'viaje-3',
            username: 'Ana Martínez',
            texto: 'Ver los Big Five en su hábitat natural fue un sueño hecho realidad. El safari fue organizado perfectamente y los guías eran expertos.',
            fecha: Date.now() - 86400000 // 1 día
        }
    ];

    // Guardar cada opinión en su viaje correspondiente si no existe
    opinionesDefecto.forEach(opinion => {
        const key = 'opinions_' + opinion.viajeId;
        const existentes = localStorage.getItem(key);

        if (!existentes || JSON.parse(existentes).length === 0) {
            localStorage.setItem(key, JSON.stringify([{
                username: opinion.username,
                texto: opinion.texto,
                fecha: opinion.fecha
            }]));
        }
    });
}

// Función para obtener todas las opiniones de todos los viajes
function obtenerTodasLasOpiniones() {
    const todasOpiniones = [];
    const viajes = ['viaje-1', 'viaje-2', 'viaje-3', 'viaje-4'];

    viajes.forEach(viajeId => {
        const key = 'opinions_' + viajeId;
        const opiniones = localStorage.getItem(key);

        if (opiniones) {
            const opinionesArray = JSON.parse(opiniones);
            opinionesArray.forEach(opinion => {
                todasOpiniones.push({
                    ...opinion,
                    viajeId: viajeId
                });
            });
        }
    });

    return todasOpiniones;
}

// Función para truncar texto a 100 caracteres
function truncarTexto(texto, maxLength = 100) {
    if (texto.length <= maxLength) {
        return texto;
    }
    return texto.substring(0, maxLength) + '...';
}

// Función para mostrar las 3 opiniones más recientes en main
function mostrarOpinionesMain() {
    const opinionesContainer = document.getElementById('opiniones');
    if (!opinionesContainer) return;

    // Crear opiniones por defecto si es necesario
    crearOpinionesDefecto();

    // Obtener todas las opiniones
    const todasOpiniones = obtenerTodasLasOpiniones();

    // Ordenar por fecha descendente (más recientes primero)
    todasOpiniones.sort((a, b) => b.fecha - a.fecha);

    // Tomar las 3 más recientes
    const opinionesRecientes = todasOpiniones.slice(0, 3);

    // Limpiar contenedor
    opinionesContainer.innerHTML = '';

    if (opinionesRecientes.length === 0) {
        opinionesContainer.innerHTML = '<p style="text-align: center; grid-column: 1 / -1;">No hay opiniones todavía.</p>';
        return;
    }

    // Generar HTML para cada opinión
    opinionesRecientes.forEach((opinion, index) => {
        const nombreViaje = nombresViajes[opinion.viajeId] || opinion.viajeId;
        const textoTruncado = truncarTexto(opinion.texto, 100);

        const opinionElement = document.createElement('aside');
        opinionElement.id = `opinion-${index + 1}`;
        opinionElement.className = 'opinion';
        opinionElement.style.cursor = 'pointer';
        opinionElement.dataset.viaje = opinion.viajeId;

        opinionElement.innerHTML = `
            <div id="opinion-header-${index + 1}" class="opinion-header">
                <span class="usuario">${opinion.username}</span>
                <span class="fecha">${nombreViaje}</span>
            </div>
            <p>${textoTruncado}</p>
        `;

        // Añadir click para redirigir a detalles del viaje
        opinionElement.addEventListener('click', function () {
            localStorage.setItem('viaje', opinion.viajeId);
            window.location.href = 'detalles.html';
        });

        opinionesContainer.appendChild(opinionElement);
    });
}

// Cargar opiniones al iniciar
mostrarOpinionesMain();