const detail_image = document.getElementById('detail_image');
const trip_title = document.getElementById('trip_title');
const big_price = document.getElementById('big_price');
const tag = document.getElementById('tag');
const summary = document.getElementById('summary');

function cargarDetalles() {
    if (localStorage.getItem('viaje') == 'viaje-1') {
        detail_image.style.backgroundImage = "url('media/viaje_andes.jpg')";
        trip_title.textContent = "Aventura en los Andes Peruanos";
        big_price.textContent = "1,200 €";
        tag.textContent = "America del Sur";
        summary.textContent = "Descubre la majestuosidad de la cordillera de los Andes, explora ruinas incas y vive la cultura local en este viaje inolvidable que te llevará desde Cusco hasta Machu Picchu";
    } else if (localStorage.getItem('viaje') == 'viaje-2') {
        detail_image.style.backgroundImage = "url('media/viaje_sudeste_asiatico.jpg')";
        trip_title.textContent = "Explorando el Sudeste Asiático";
        big_price.textContent = "800 €";
        tag.textContent = "Asia";
        summary.textContent = "Sumérgete en la diversidad cultural de Tailandia, Vietnam y Camboya. Desde templos ancestrales hasta playas paradisíacas, este viaje te ofrece una experiencia completa.";
    } else if (localStorage.getItem('viaje') == 'viaje-3') {
        detail_image.style.backgroundImage = "url('media/viaje_sabana_africana.jpeg')";
        trip_title.textContent = "Safari por la Sabana Africana";
        big_price.textContent = "2,500 €";
        tag.textContent = "África";
        summary.textContent = "Vive la emoción de un safari auténtico en Tanzania y Kenia. Avista los Big Five y descubre paisajes que te dejarán sin aliento en este viaje de aventura.";
    } else if (localStorage.getItem('viaje') == 'viaje-4') {
        detail_image.style.backgroundImage = "url('media/viaje_centro_europa.jpg')";
        trip_title.textContent = "Ruta por Europa Central";
        big_price.textContent = "1,600 €";
        tag.textContent = "Europa";
        summary.textContent = "Recorre las joyas arquitectónicas de Praga, Viena y Budapest. Disfruta de la rica historia, cultura y gastronomía en el corazón de Europa.";
    }
    detail_image.style.backgroundSize = "cover";
    detail_image.style.backgroundPosition = "center";
}

cargarDetalles();