// auth.js - Funciones completas de autenticación

// Funciones básicas de autenticación
function getCurrentUser() {
    try {
        const user = localStorage.getItem('currentUser');
        return user ? JSON.parse(user) : null;
    } catch (error) {
        console.error('Error al obtener usuario actual:', error);
        return null;
    }
}

function isAuthenticated() {
    return getCurrentUser() !== null;
}

function getAllUsers() {
    try {
        return JSON.parse(localStorage.getItem('users') || '[]');
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        return [];
    }
}

function logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('rememberedUsername');
    window.location.href = 'login.html';
}

// Función específica para el botón del header
function setupHeaderUserButton() {
    const userButtons = document.querySelectorAll('.icon-btn');
    
    userButtons.forEach(button => {
        const icon = button.querySelector('i');
        if (!icon) return;
        
        // Solo modificar botones con ícono de usuario
        if (icon.classList.contains('fa-user') || 
            (icon.classList.contains('fa-regular') && button.getAttribute('onclick')?.includes('login.html'))) {
            
            const currentUser = getCurrentUser();
            
            // Eliminar onclick original
            button.removeAttribute('onclick');
            
            // Configurar nuevo comportamiento
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                if (currentUser) {
                    // Usuario logueado: ir al perfil
                    window.location.href = 'perfil.html';
                } else {
                    // Usuario no logueado: ir al login
                    window.location.href = 'login.html';
                }
            });
            
            // Opcional: Cambiar el ícono y tooltip
            if (currentUser) {
                button.title = 'Mi perfil';
                icon.classList.remove('fa-regular');
                icon.classList.add('fa-solid');
            } else {
                button.title = 'Iniciar sesión';
                icon.classList.remove('fa-solid');
                icon.classList.add('fa-regular');
            }
        }
    });
}

// Función para proteger páginas (requerir login)
function protectPage() {
    const currentUser = getCurrentUser();
    const protectedPages = ['perfil.html', 'config.html']; // Agrega otras páginas protegidas
    
    const currentPage = window.location.pathname.split('/').pop();
    
    if (protectedPages.includes(currentPage) && !currentUser) {
        alert('Debes iniciar sesión para acceder a esta página');
        window.location.href = 'login.html';
        return false;
    }
    
    return true;
}

// Inicializar cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    setupHeaderUserButton();
    protectPage();
});

// Exportar funciones al ámbito global
window.auth = {
    getCurrentUser,
    isAuthenticated,
    getAllUsers,
    logout,
    setupHeaderUserButton,
    protectPage
};