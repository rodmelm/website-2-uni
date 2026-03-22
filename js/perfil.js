// perfil.js - Cargar perfil del usuario con todos sus viajes
let users = JSON.parse(localStorage.getItem('users') || '[]');

function load_profile() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));

    // Si no hay usuario logueado, redirigir a login
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }

    // Obtener referencias a los elementos del DOM
    let avatarElement = document.getElementById('avatar');
    let nombreUsuarioElement = document.getElementById('nombre_usuario');
    let emailUsuarioElement = document.getElementById('email_usuario');
    let aboutMeElement = document.getElementById('about_me');
    
    // Obtener la foto de perfil (puede estar en pfp o profilePicture)
    let pfp = currentUser.pfp || currentUser.profilePicture || '';

    // Actualizar la información del perfil
    if (avatarElement) {
        // PRIMERO: Limpiar el contenido del avatar
        avatarElement.innerHTML = '';
        avatarElement.className = 'avatar-container';
        
        if (pfp && pfp !== '') {
            // Si el usuario tiene foto de perfil, mostrarla
            const img = document.createElement('img');
            img.src = pfp;
            img.alt = 'Foto de perfil';
            img.className = 'avatar-image';
            
            // Manejar errores de carga de imagen
            img.onerror = function() {
                // Si la imagen falla, mostrar las iniciales
                console.error('Error cargando la imagen de perfil:', pfp);
                showInitialsFallback(avatarElement, currentUser);
            };
            
            avatarElement.appendChild(img);
        } else {
            // Si no tiene foto, mostrar las iniciales
            showInitialsFallback(avatarElement, currentUser);
        }
    }

    if (nombreUsuarioElement) {
        if (currentUser.nombre && currentUser.apellidos) {
            nombreUsuarioElement.textContent = currentUser.nombre + ' ' + currentUser.apellidos;
        } else {
            nombreUsuarioElement.textContent = currentUser.username || currentUser.nombre || 'Usuario';
        }
    }

    if (emailUsuarioElement) {
        emailUsuarioElement.textContent = currentUser.email || 'Email no disponible';
    }

    if (aboutMeElement) {
        if (currentUser.aboutMe || currentUser.about_me) {
            aboutMeElement.textContent = currentUser.aboutMe || currentUser.about_me;
        } else {
            aboutMeElement.textContent = `¡Hola! Soy ${currentUser.nombre || 'un viajero'}. Me encanta viajar y explorar nuevos lugares.`;
        }
    }

    // CARGAR TODOS LOS VIAJES DEL USUARIO
    loadUserTrips(currentUser);
}

// Función auxiliar para mostrar iniciales cuando no hay foto
function showInitialsFallback(avatarElement, currentUser) {
    avatarElement.className = 'avatar-initials';
    let initials = getInitials(currentUser.nombre + ' ' + currentUser.apellidos);
    avatarElement.textContent = initials;
}

// Función auxiliar para obtener iniciales del nombre
function getInitials(fullName) {
    if (!fullName || fullName.trim() === '') return 'US';

    const parts = fullName.trim().split(' ');
    if (parts.length >= 2) {
        return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
    }

    return fullName.substring(0, 2).toUpperCase();
}

// Función para cargar todos los viajes del usuario desde next_trip
function loadUserTrips(currentUser) {
    let tituloSeccionElement = document.getElementById('titulo_seccion');
    let listaViajesContainer = document.getElementById('lista_viajes_container');
    
    if (!listaViajesContainer) {
        console.error('Elemento lista_viajes_container no encontrado en el DOM');
        return;
    }
    
    // Limpiar el contenedor antes de agregar nuevo contenido
    listaViajesContainer.innerHTML = '';
    
    // Obtener los viajes del array next_trip
    let userTrips = currentUser.next_trip || [];
    
    console.log('Viajes del usuario encontrados:', userTrips);
    console.log('Número de viajes:', userTrips.length);
    
    if (userTrips.length > 0) {
        // Mostrar título de la sección con el número de viajes
        if (tituloSeccionElement) {
            tituloSeccionElement.textContent = `Mis próximos viajes (${userTrips.length})`;
        }
        
        // Mostrar los viajes en el orden en que aparecen en el array
        userTrips.forEach((trip, index) => {
            console.log(`Mostrando viaje ${index}:`, trip);
            let tripCard = createTripCard(trip, index);
            listaViajesContainer.appendChild(tripCard);
        });
        
    } else {
        // No hay viajes planificados
        if (tituloSeccionElement) {
            tituloSeccionElement.textContent = '¿A dónde te gustaría viajar?';
        }
        
        // Mostrar mensaje cuando no hay viajes
        let emptyCard = document.createElement('div');
        emptyCard.className = 'tarjeta-viaje vacia';
        emptyCard.innerHTML = `
            <div class="imagen-viaje">
                <i class="fas fa-globe-americas"></i>
            </div>
            <h3 class="titulo-viaje">No tienes viajes planificados</h3>
            <p class="mensaje-viaje">¡Reserva tu primera aventura!</p>
        `;
        
        listaViajesContainer.appendChild(emptyCard);
    }
}

// Función para crear una tarjeta de viaje
function createTripCard(trip, index) {
    let card = document.createElement('div');
    card.className = 'tarjeta-viaje';
    card.dataset.index = index;
    
    // Extraer información del viaje (asumiendo la estructura de reserva.js)
    let destino = trip.destino || 'Destino no especificado';
    let nombre = trip.nombre || currentUser?.nombre || '';
    let email = trip.email || currentUser?.email || '';
    let acompanantes = trip.acompanantes || '0';
    let mascota = trip.mascota || 'Ninguna';
    let tamano = trip.tamano || '';
    let alergias = trip.alergias || 'Sin alergias';
    
    // Obtener imagen según el destino
    let imageUrl = getTripImageByDestination(destino);
    
    card.innerHTML = `
        <div class="imagen-viaje">
            <img src="${imageUrl}" alt="${destino}" onerror="this.src='https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'">
        </div>
        <div class="contenido-viaje">
            <h3 class="titulo-viaje">${destino}</h3>
            <div class="detalles-viaje">
                <p><strong>Reservado por:</strong> ${nombre}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Acompañantes:</strong> ${acompanantes}</p>
                ${mascota !== 'Ninguna' ? `<p><strong>Mascota:</strong> ${mascota} ${tamano ? `(${tamano})` : ''}</p>` : ''}
                ${alergias && alergias !== 'Sin alergias' ? `<p><strong>Alergias:</strong> ${alergias}</p>` : ''}
            </div>
        </div>
        <div class="acciones-viaje">
            <button class="btn-detalles" title="Ver detalles">
                <i class="fas fa-info-circle"></i>
            </button>
            <button class="btn-eliminar-viaje" title="Cancelar viaje" data-index="${index}">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Agregar eventos a los botones
    let detallesButton = card.querySelector('.btn-detalles');
    let eliminarButton = card.querySelector('.btn-eliminar-viaje');
    
    if (detallesButton) {
        detallesButton.addEventListener('click', function(e) {
            e.stopPropagation();
            showTripDetails(trip);
        });
    }
    
    if (eliminarButton) {
        eliminarButton.addEventListener('click', function(e) {
            e.stopPropagation();
            let tripIndex = parseInt(e.currentTarget.dataset.index);
            deleteTrip(tripIndex);
        });
    }
    
    return card;
}

// Función para obtener imagen según el destino
function getTripImageByDestination(destino) {
    const destinationImages = {
        'parís': 'https://images.unsplash.com/photo-1502602897457-92c8f9a320a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        'roma': 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        'londres': 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        'nueva york': 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        'tokio': 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        'bali': 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        'sydney': 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        'río de janeiro': 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        'machu picchu': 'https://images.unsplash.com/photo-1526392060635-9d6019884377?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        'barcelona': 'https://images.unsplash.com/photo-1583422409516-2895a77efded?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        'amsterdam': 'https://images.unsplash.com/photo-1512476446317-8e2db7c9a7ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        'atenas': 'https://images.unsplash.com/photo-1555993539-1732b0258235?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        'dubai': 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        'playa': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        'montaña': 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        'selva': 'https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        'desierto': 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    };
    
    // Convertir destino a minúsculas para la búsqueda
    let destinoLower = destino.toLowerCase();
    
    // Buscar coincidencias en las palabras clave
    for (let key in destinationImages) {
        if (destinoLower.includes(key)) {
            return destinationImages[key];
        }
    }
    
    // Si no encuentra coincidencia, usar imagen por defecto
    return 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60';
}

// Función para mostrar detalles del viaje
function showTripDetails(trip) {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    let detalles = `
        Destino: ${trip.destino || 'No especificado'}
        Nombre: ${trip.nombre || currentUser?.nombre || 'No especificado'}
        Email: ${trip.email || currentUser?.email || 'No especificado'}
        Acompañantes: ${trip.acompanantes || '0'}
        Mascota: ${trip.mascota || 'Ninguna'} ${trip.tamano && trip.tamano !== 'No hay mascota' ? `(${trip.tamano})` : ''}
        Alergias: ${trip.alergias || 'Sin alergias'}
    `;
    
    alert(detalles);
}

// Función para eliminar un viaje
function deleteTrip(index) {
    if (!confirm('¿Estás seguro de que quieres cancelar este viaje?')) {
        return;
    }
    
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    
    if (!currentUser) {
        alert('No hay usuario logueado');
        return false;
    }
    
    if (!currentUser.next_trip || currentUser.next_trip.length === 0) {
        alert('No hay viajes para eliminar');
        return false;
    }
    
    // Verificar que el índice sea válido
    if (index < 0 || index >= currentUser.next_trip.length) {
        alert('Índice de viaje inválido');
        return false;
    }
    
    // Eliminar el viaje del array
    currentUser.next_trip.splice(index, 1);
    
    // Actualizar localStorage
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    // Actualizar también en el array de usuarios
    const userIndex = users.findIndex(u => 
        u.username === currentUser.username || 
        u.email === currentUser.email
    );
    
    if (userIndex !== -1) {
        users[userIndex].next_trip = currentUser.next_trip;
        localStorage.setItem('users', JSON.stringify(users));
    }
    
    // Recargar los viajes en la página
    loadUserTrips(currentUser);
    
    alert('Viaje cancelado correctamente');
    return true;
}

function setupProfileButtons() {
    // Botón Editar Perfil (solo edita la sección "Sobre mí")
    const editButton = document.getElementById('btn_editar');
    if (editButton) {
        editButton.addEventListener('click', function () {
            let currentUser = JSON.parse(localStorage.getItem('currentUser'));
            
            let newAboutMe = prompt(
                'Cuéntanos algo sobre ti:', 
                currentUser?.aboutMe || currentUser?.about_me || ''
            );

            if (newAboutMe !== null) {
                updateUserProfile({
                    aboutMe: newAboutMe,
                    about_me: newAboutMe
                });
                alert('¡Perfil actualizado correctamente!');
            }
        });
    }

    // Botón Configuración
    const configButton = document.getElementById('btn_config');
    if (configButton) {
        configButton.addEventListener('click', function () {
            window.location.href = 'config.html';
        });
    }
}

// Función para actualizar información del perfil
function updateUserProfile(updatedData) {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let users = JSON.parse(localStorage.getItem('users') || '[]');

    if (!currentUser) return false;

    // Actualizar el objeto currentUser
    currentUser = { ...currentUser, ...updatedData };

    // Actualizar en localStorage
    localStorage.setItem('currentUser', JSON.stringify(currentUser));

    // Actualizar también en el array de usuarios
    const userIndex = users.findIndex(u => 
        u.username === currentUser.username || 
        u.email === currentUser.email
    );
    
    if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...updatedData };
        localStorage.setItem('users', JSON.stringify(users));
    }

    // Recargar la información en la página
    load_profile();

    return true;
}

// Ejecutar cuando se cargue la página
document.addEventListener('DOMContentLoaded', function () {
    // Cargar el perfil del usuario
    load_profile();

    // Configurar los botones del perfil
    setupProfileButtons();
    
    // Mostrar información de debug en consola
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log('Usuario actual:', currentUser);
    console.log('Foto de perfil:', currentUser?.pfp);
    console.log('Viajes del usuario:', currentUser?.next_trip);
    
    // También cargar los viajes aquí para asegurarnos
    if (currentUser) {
        loadUserTrips(currentUser);
    }
});

function close_session() {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}

// Añade estos estilos en tu CSS (profile_styles.css) o directamente:
function addAvatarStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .avatar-container {
            width: 150px;
            height: 150px;
            border-radius: 50%;
            overflow: hidden;
            background-color: #f0f0f0;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 20px;
            border: 4px solid #4CAF50;
        }
        
        .avatar-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        
        .avatar-initials {
            width: 150px;
            height: 150px;
            border-radius: 50%;
            background-color: #4CAF50;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 48px;
            font-weight: bold;
            margin: 0 auto 20px;
            border: 4px solid #45a049;
        }
        
        /* Estilos para las tarjetas de viaje */
        .tarjeta-viaje {
            border: 1px solid #ddd;
            border-radius: 8px;
            overflow: hidden;
            margin-bottom: 20px;
            background-color: white;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        
        .imagen-viaje img {
            width: 100%;
            height: 200px;
            object-fit: cover;
        }
        
        .contenido-viaje {
            padding: 15px;
        }
        
        .titulo-viaje {
            margin-top: 0;
            color: #333;
        }
        
        .detalles-viaje {
            color: #666;
            font-size: 14px;
        }
        
        .detalles-viaje p {
            margin: 5px 0;
        }
        
        .acciones-viaje {
            padding: 10px 15px;
            background-color: #f9f9f9;
            border-top: 1px solid #eee;
            display: flex;
            justify-content: flex-end;
            gap: 10px;
        }
        
        .btn-detalles, .btn-eliminar-viaje {
            background: none;
            border: none;
            cursor: pointer;
            font-size: 18px;
            color: #666;
            padding: 5px;
        }
        
        .btn-detalles:hover {
            color: #4CAF50;
        }
        
        .btn-eliminar-viaje:hover {
            color: #f44336;
        }
        
        .tarjeta-viaje.vacia {
            text-align: center;
            padding: 40px 20px;
            background-color: #f9f9f9;
            border: 2px dashed #ddd;
        }
        
        .tarjeta-viaje.vacia .imagen-viaje {
            font-size: 48px;
            color: #ddd;
            margin-bottom: 20px;
        }
        
        .tarjeta-viaje.vacia .mensaje-viaje {
            color: #888;
            font-style: italic;
        }
    `;
    document.head.appendChild(style);
}

// Agregar estilos cuando se cargue la página
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addAvatarStyles);
} else {
    addAvatarStyles();
}