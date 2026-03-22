const continenteSelect = document.getElementById('Continente');
const priceSelect = document.getElementById('Price');
const viajes = document.querySelectorAll('article.viaje');
const viaje1 = document.getElementById('viaje-1');
const viaje2 = document.getElementById('viaje-2');
const viaje3 = document.getElementById('viaje-3');
const viaje4 = document.getElementById('viaje-4');

viaje1.addEventListener('click', () => {
    localStorage.setItem('viaje', 'viaje-1');
    window.location.href = 'detalles.html';
});
viaje2.addEventListener('click', () => {
    localStorage.setItem('viaje', 'viaje-2');
    window.location.href = 'detalles.html';
});
viaje3.addEventListener('click', () => {
    localStorage.setItem('viaje', 'viaje-3');
    window.location.href = 'detalles.html';
});
viaje4.addEventListener('click', () => {
    localStorage.setItem('viaje', 'viaje-4');
    window.location.href = 'detalles.html';
});



function filtrarViajes() {
    // Guardamos el valor actual seleccionado en los filtros
    const continenteFiltro = continenteSelect.value;
    const priceFiltro = priceSelect.value;

    // Recorremos cada viaje para decidir si mostrarlo u ocultarlo
    viajes.forEach(viaje => {
        const continenteViaje = viaje.querySelector('.continente').textContent.trim();
        const precioTexto = viaje.querySelector('.precio').textContent.trim();

        // Limpiamos el texto del precio para convertirlo en número.
        const precio = parseInt(precioTexto.replace(/[$,]/g, ''));

        // Variable para comprobar si coincide el continente.
        // Comprueba si esta vacio (todos) o si el continente coincide con el del filtro
        let mostrarContinente = (continenteFiltro === "") || (continenteViaje === continenteFiltro);
        // Variable para comprobar si coincide el precio. Asumimos true por defecto.
        let mostrarPrecio = true;

        if (priceFiltro !== "") {
            // Si hay filtro de precio, dividimos el rango "500-1000" en dos números [500, 1000]
            const [min, max] = priceFiltro.split('-').map(Number);

            // Comprobamos si el precio esta fuera del rango
            if (precio < min || precio > max) {
                mostrarPrecio = false;
            }
        }
        // Si cumple AMBAS condiciones (continente Y precio), lo mostramos.
        // Si falla alguna, lo ocultamos.
        if (mostrarContinente && mostrarPrecio) {
            viaje.style.display = 'flex'; // Mostrar
        } else {
            viaje.style.display = 'none';  // Ocultar
        }
    });
}

continenteSelect.addEventListener('change', filtrarViajes);
priceSelect.addEventListener('change', filtrarViajes);

filtrarViajes();


