
// Datos de los viajes
const viajesData = {
    'viaje-1': {
        imagen: 'media/num_1.png',
        titulo: 'Aventura en los Andes Peruanos',
        descripcion: 'Descubre la majestuosidad de la cordillera de los Andes, explora ruinas incas y vive la cultura local en este viaje inolvidable que te llevará desde Cusco hasta Machu Picchu.',
        precio: '1,200 €'
    },
    'viaje-2': {
        imagen: 'media/num_2.jpg',
        titulo: 'Explorando el Sudeste Asiático',
        descripcion: 'Sumérgete en la diversidad cultural de Tailandia, Vietnam y Camboya. Desde templos ancestrales hasta playas paradisíacas, este viaje te ofrece una experiencia completa.',
        precio: '800 €'
    },
    'viaje-3': {
        imagen: 'media/num_3.jpg',
        titulo: 'Safari por la Sabana Africana',
        descripcion: 'Vive la emoción de un safari auténtico en Tanzania y Kenia. Avista los Big Five y descubre paisajes que te dejarán sin aliento en este viaje de aventura.',
        precio: '2,500 €'
    },
    'viaje-4': {
        imagen: 'media/num_4.jpg',
        titulo: 'Ruta por Europa Central',
        descripcion: 'Recorre las joyas arquitectónicas de Praga, Viena y Budapest. Disfruta de la rica historia, cultura y gastronomía en el corazón de Europa.',
        precio: '1,600 €'
    }
};

// Función para cargar los datos del viaje en la página de reserva
function cargarDatosViaje() {
    const viajeId = localStorage.getItem('viaje');

    if (!viajeId || !viajesData[viajeId]) {
        // Si no hay viaje seleccionado, redirigir al buscador
        window.location.href = 'buscador.html';
        return;
    }

    const viaje = viajesData[viajeId];

    // Obtener elementos del DOM
    const imagenPlaceholder = document.getElementById('imagen_placeholder');
    const tituloViaje = document.getElementById('titulo_viaje');
    const precioViaje = document.getElementById('precio_viaje');

    // Cargar datos
    if (imagenPlaceholder) {
        imagenPlaceholder.style.backgroundImage = `url('${viaje.imagen}')`;
        imagenPlaceholder.style.backgroundSize = 'cover';
        imagenPlaceholder.style.backgroundPosition = 'center';
    }

    if (tituloViaje) {
        tituloViaje.textContent = viaje.titulo;
    }

    if (precioViaje) {
        precioViaje.textContent = viaje.precio;
    }
}

document.addEventListener("DOMContentLoaded", function () {
    // Verificar que hay usuario logueado
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }

    // Cargar datos del viaje al iniciar
    cargarDatosViaje();

    const mascotaSelect = document.getElementById("mascota");
    const tamanoSelect = document.getElementById("tamano");
    // No dejamos que se pueda seleccionar un tamaño si no se ha seleccionado una mascota
    function actualizarEstadoTamano() {
        const mascotaValue = mascotaSelect.value;
        const esNinguna = mascotaValue === "Ninguna" || mascotaSelect.selectedIndex === 0;

        if (esNinguna) {
            tamanoSelect.disabled = true;
            tamanoSelect.selectedIndex = 0;
            tamanoSelect.style.opacity = "0.5";
            tamanoSelect.style.cursor = "not-allowed";
        } else {
            tamanoSelect.disabled = false;
            tamanoSelect.style.opacity = "1";
            tamanoSelect.style.cursor = "pointer";
        }
    }

    // Inicializar estado y añadir listener
    actualizarEstadoTamano();
    mascotaSelect.addEventListener("change", actualizarEstadoTamano);

    // Acompañantes dinámicos
    const acompanantesSelect = document.getElementById("acompanantes");
    const camposAcompanantes = document.getElementById("campos_acompanantes");

    function generarCamposAcompanantes() {
        // Obtener número de acompañantes
        const numAcompanantes = parseInt(acompanantesSelect.value) || 0;

        // Limpiar campos existentes
        camposAcompanantes.innerHTML = "";

        // Generar campos para cada acompañante
        for (let i = 1; i <= numAcompanantes; i++) {
            const divAcompanante = document.createElement("div");
            divAcompanante.className = "acompanante-grupo";
            divAcompanante.innerHTML = `
                <h3 class="acompanante-titulo">Acompañante ${i}</h3>
                <div class="fila-campos-dos">
                    <div class="campo">
                        <label for="acompanante_nombre_${i}">Nombre completo</label>
                        <input type="text" id="acompanante_nombre_${i}" class="acompanante-nombre" placeholder="Nombre del acompañante ${i}">
                    </div>
                    <div class="campo">
                        <label for="acompanante_email_${i}">Correo electrónico</label>
                        <input type="email" id="acompanante_email_${i}" class="acompanante-email" placeholder="Email del acompañante ${i}">
                    </div>
                </div>
            `;
            camposAcompanantes.appendChild(divAcompanante);
        }
    }

    // Añadir listener para cambios en acompañantes
    acompanantesSelect.addEventListener("change", generarCamposAcompanantes);

    // Validación y guardado
    function validate_card_date() {
        // Validar que la fecha de caducidad no sea anterior al mes actual
        const card_date_value = document.getElementById("fecha-caducidad").value;

        // Verificar que se ha seleccionado una fecha
        if (!card_date_value) {
            return { valido: false, error: "Por favor, selecciona la fecha de caducidad de la tarjeta." };
        }

        // El input type="month" devuelve formato YYYY-MM
        const [year, month] = card_date_value.split('-').map(Number);

        // Obtener mes y año actuales
        const today = new Date();
        const currentYear = today.getFullYear();
        const currentMonth = today.getMonth() + 1; // getMonth() devuelve 0-11

        // Comparar: la tarjeta caduca al final del mes indicado
        if (year < currentYear || (year === currentYear && month < currentMonth)) {
            return { valido: false, error: "La tarjeta ha caducado. Por favor, utiliza una tarjeta válida." };
        }

        return { valido: true, error: "" };
    }

    function obtenerDatosAcompanantes() {
        const acompanantesData = [];
        const numAcompanantes = parseInt(acompanantesSelect.value) || 0;

        for (let i = 1; i <= numAcompanantes; i++) {
            const nombreInput = document.getElementById(`acompanante_nombre_${i}`);
            const emailInput = document.getElementById(`acompanante_email_${i}`);

            if (nombreInput && emailInput) {
                acompanantesData.push({
                    nombre: nombreInput.value.trim(),
                    email: emailInput.value.trim()
                });
            }
        }

        return acompanantesData;
    }

    function validarAcompanantes() {
        const numAcompanantes = parseInt(acompanantesSelect.value) || 0;
        const email_rgx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        for (let i = 1; i <= numAcompanantes; i++) {
            const nombreInput = document.getElementById(`acompanante_nombre_${i}`);
            const emailInput = document.getElementById(`acompanante_email_${i}`);

            if (nombreInput && nombreInput.value.trim().length < 3) {
                alert(`El nombre del acompañante ${i} debe tener al menos 3 caracteres.`);
                return false;
            }

            if (emailInput && !email_rgx.test(emailInput.value.trim())) {
                alert(`Por favor, introduce un email válido para el acompañante ${i}.`);
                return false;
            }
        }

        return true;
    }

    function validate_reservation() {
        let titulo_input = document.getElementById("titulo_viaje");
        let name_input = document.getElementById("nombre");
        let email_input = document.getElementById("email");
        let mascota_input = document.getElementById("mascota");
        let tamano_input = document.getElementById("tamano");

        let titulo = titulo_input.textContent;
        let name = name_input.value.trim();
        let email = email_input.value.trim();
        let numAcompanantes = parseInt(acompanantesSelect.value) || 0;
        let mascota = mascota_input.value.trim();
        let tamano = tamano_input.disabled ? "No aplica" : tamano_input.value.trim();

        let card_owner = document.getElementById("titular").value;
        let card_number = document.getElementById("numero-tarjeta").value;
        let card_cvv = document.getElementById("cvv").value;
        let allergies = document.getElementById("intolerancias").value;

        // Validar nombre principal
        if (name.length < 3) {
            alert("El nombre debe tener al menos 3 caracteres.");
            return false;
        }

        // Validar email principal
        let email_rgx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!email_rgx.test(email)) {
            alert("Por favor, introduce una dirección de correo electrónico válida.");
            return false;
        }

        // Validar datos de acompañantes
        if (!validarAcompanantes()) {
            return false;
        }

        // Validar titular tarjeta
        if (card_owner.length < 3) {
            alert("El nombre del titular debe tener al menos 3 caracteres.");
            return false;
        }

        // Validar número de tarjeta
        let card_number_rgx = /^\d{13}$|^\d{15}$|^\d{16}$|^\d{19}$/;
        if (!card_number.match(card_number_rgx)) {
            alert("Por favor, introduce un número de tarjeta válido (13, 15, 16 o 19 dígitos).");
            return false;
        }

        // Validar CVV
        let cvv_rgx = /^\d{3}$/;
        if (!card_cvv.match(cvv_rgx)) {
            alert("Por favor, introduce un código CVV válido (3 dígitos).");
            return false;
        }

        // Validar fecha de tarjeta
        let date_validation = validate_card_date();
        if (!date_validation.valido) {
            alert(date_validation.error);
            return false;
        }

        // Obtener datos de acompañantes
        const acompanantesData = obtenerDatosAcompanantes();

        // Crear objeto de reserva
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        let new_reservation = {
            destino: titulo,
            nombre: name,
            email: email,
            numeroAcompanantes: numAcompanantes,
            acompanantes: acompanantesData,
            mascota: mascota,
            tamanoMascota: tamano,
            alergias: allergies
        };

        // Guardar reserva
        if (!currentUser.next_trip) {
            currentUser.next_trip = [new_reservation];
        } else {
            currentUser.next_trip.unshift(new_reservation);
        }

        alert("Pago realizado con éxito. Gracias por su compra.");
        localStorage.setItem('currentUser', JSON.stringify(currentUser));

        // Redirigir al perfil del usuario
        window.location.href = 'perfil.html';
        return true;
    }

    const btnReservar = document.getElementById('btn_reservar');
    if (btnReservar) {
        btnReservar.addEventListener('click', function (e) {
            e.preventDefault();
            validate_reservation();
        });
    }
});