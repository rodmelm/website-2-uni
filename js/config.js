// config.js - Sistema de configuración simplificado de accesibilidad

// Configuración por defecto
const configPorDefecto = {
    accesibilidad: {
        activada: false,
        modoDaltonico: false,
        tamanoFuente: '100%'
    }
};

// Claves para localStorage
const CLAVES_CONFIG = {
    CONFIG_GENERAL: 'mochileros_config',
    TAMANO_FUENTE: 'config_tamano_fuente',
    MODO_DALTONICO: 'config_modo_daltonico',
    ACCESIBILIDAD: 'config_accesibilidad'
};

// Función para obtener la configuración actual
function obtenerConfiguracion() {
    try {
        const configGuardada = localStorage.getItem(CLAVES_CONFIG.CONFIG_GENERAL);
        if (configGuardada) {
            return JSON.parse(configGuardada);
        }
    } catch (error) {
        console.error('Error al cargar configuración:', error);
    }
    
    // Si no hay configuración guardada, devolver la por defecto
    return { ...configPorDefecto };
}

// Función para guardar la configuración
function guardarConfiguracion(config) {
    try {
        localStorage.setItem(CLAVES_CONFIG.CONFIG_GENERAL, JSON.stringify(config));
        return true;
    } catch (error) {
        console.error('Error al guardar configuración:', error);
        return false;
    }
}

// Función para aplicar el tamaño de fuente a toda la página
function aplicarTamanoFuente(tamano) {
    // Guardar en localStorage para persistencia entre páginas
    localStorage.setItem(CLAVES_CONFIG.TAMANO_FUENTE, tamano);
    
    // Aplicar a toda la página
    const elementoHTML = document.documentElement;
    elementoHTML.style.fontSize = tamano;
    
    // También aplicar a body por si acaso
    document.body.style.fontSize = tamano;
    
    console.log(`✅ Tamaño de fuente aplicado: ${tamano}`);
    return tamano;
}

// Función para actualizar el texto del porcentaje de tamaño
function actualizarTextoPorcentaje(tamano) {
    const porcentajeElement = document.querySelector('.porcentaje');
    if (porcentajeElement) {
        // Usar el sistema de traducciones si está disponible
        if (window.translations && window.translations.t) {
            const texto = window.translations.t('font_current', {size: tamano});
            porcentajeElement.textContent = texto;
        } else {
            // Fallback si no hay sistema de traducciones
            porcentajeElement.textContent = `(Tamaño actual: ${tamano})`;
        }
    }
}

// Función para restaurar el tamaño de fuente guardado
function restaurarTamanoFuente() {
    const tamanoGuardado = localStorage.getItem(CLAVES_CONFIG.TAMANO_FUENTE);
    if (tamanoGuardado) {
        aplicarTamanoFuente(tamanoGuardado);
        actualizarTextoPorcentaje(tamanoGuardado);
        return tamanoGuardado;
    }
    
    // Si no hay tamaño guardado, usar el por defecto
    aplicarTamanoFuente('100%');
    actualizarTextoPorcentaje('100%');
    return '100%';
}

// Función para aplicar modo daltónico
function aplicarModoDaltonico(activado) {
    localStorage.setItem(CLAVES_CONFIG.MODO_DALTONICO, activado.toString());
    
    if (activado) {
        document.body.classList.add('modo-daltonico');
        console.log('✅ Modo daltónico activado');
    } else {
        document.body.classList.remove('modo-daltonico');
        console.log('❌ Modo daltónico desactivado');
    }
}

// Función para restaurar modo daltónico
function restaurarModoDaltonico() {
    const modoGuardado = localStorage.getItem(CLAVES_CONFIG.MODO_DALTONICO);
    if (modoGuardado === 'true') {
        aplicarModoDaltonico(true);
        return true;
    }
    aplicarModoDaltonico(false);
    return false;
}

// Función para activar/desactivar accesibilidad
function setAccesibilidad(activada) {
    localStorage.setItem(CLAVES_CONFIG.ACCESIBILIDAD, activada.toString());
    
    if (activada) {
        document.body.classList.add('accesibilidad-activa');
        // Restaurar configuraciones si están activadas
        restaurarTamanoFuente();
        restaurarModoDaltonico();
    } else {
        document.body.classList.remove('accesibilidad-activa');
        // Deshacer configuraciones
        aplicarTamanoFuente('100%');
        aplicarModoDaltonico(false);
        actualizarTextoPorcentaje('100%');
    }
    
    return activada;
}

// Función para restaurar accesibilidad
function restaurarAccesibilidad() {
    const accesibilidadGuardada = localStorage.getItem(CLAVES_CONFIG.ACCESIBILIDAD);
    if (accesibilidadGuardada === 'true') {
        setAccesibilidad(true);
        return true;
    }
    setAccesibilidad(false);
    return false;
}

// Función para aplicar todas las configuraciones al cargar la página
function aplicarConfiguraciones() {
    restaurarAccesibilidad();
    
    // Solo restaurar tamaño si la accesibilidad está activa
    const accesibilidadActiva = localStorage.getItem(CLAVES_CONFIG.ACCESIBILIDAD) === 'true';
    if (accesibilidadActiva) {
        restaurarTamanoFuente();
        restaurarModoDaltonico();
    }
}

// Función para inicializar la página de configuración
function inicializarPaginaConfiguracion() {
    console.log('🔧 Inicializando página de configuración...');
    
    // Obtener configuración actual
    const config = obtenerConfiguracion();
    
    // Elementos del DOM
    const checkboxAccesibilidad = document.getElementById('accesibilidad');
    const checkboxModoDaltonico = document.getElementById('modo-daltonico');
    const selectorTamanoFuente = document.getElementById('tamano-fuente');
    const porcentajeActual = document.querySelector('.porcentaje');
    const btnRestaurar = document.getElementById('btn-restaurar');
    
    if (!checkboxAccesibilidad || !checkboxModoDaltonico || !selectorTamanoFuente) {
        console.error('❌ No se encontraron elementos de configuración');
        return;
    }
    
    // Establecer valores iniciales
    checkboxAccesibilidad.checked = config.accesibilidad.activada;
    checkboxModoDaltonico.checked = config.accesibilidad.modoDaltonico;
    selectorTamanoFuente.value = config.accesibilidad.tamanoFuente;
    
    // Actualizar texto del porcentaje
    actualizarTextoPorcentaje(config.accesibilidad.tamanoFuente);
    
    // Evento para cambio de accesibilidad
    checkboxAccesibilidad.addEventListener('change', function() {
        const estaActivado = this.checked;
        
        // Actualizar subopciones
        const subopciones = document.querySelectorAll('.subopciones input, .subopciones select');
        subopciones.forEach(elemento => {
            elemento.disabled = !estaActivado;
        });
        
        // Guardar configuración
        config.accesibilidad.activada = estaActivado;
        guardarConfiguracion(config);
        
        // Aplicar cambios
        setAccesibilidad(estaActivado);
        
        if (!estaActivado) {
            // Si se desactiva, también desmarcar subopciones
            document.querySelectorAll('.subopciones input[type="checkbox"]').forEach(checkbox => {
                checkbox.checked = false;
            });
            
            // Actualizar configuración
            config.accesibilidad.modoDaltonico = false;
            config.accesibilidad.tamanoFuente = '100%';
            guardarConfiguracion(config);
            
            // Restaurar valores por defecto en la interfaz
            checkboxModoDaltonico.checked = false;
            selectorTamanoFuente.value = '100%';
            actualizarTextoPorcentaje('100%');
        }
    });
    
    // Evento para cambio de modo daltónico
    checkboxModoDaltonico.addEventListener('change', function() {
        const estaActivado = this.checked;
        config.accesibilidad.modoDaltonico = estaActivado;
        guardarConfiguracion(config);
        aplicarModoDaltonico(estaActivado);
    });
    
    // Evento para cambio de tamaño de fuente
    selectorTamanoFuente.addEventListener('change', function() {
        const nuevoTamano = this.value;
        
        // Actualizar texto del porcentaje
        actualizarTextoPorcentaje(nuevoTamano);
        
        // Guardar configuración
        config.accesibilidad.tamanoFuente = nuevoTamano;
        guardarConfiguracion(config);
        
        // Aplicar tamaño de fuente
        aplicarTamanoFuente(nuevoTamano);
    });
    
    // Botón para restaurar valores por defecto
    if (btnRestaurar) {
        btnRestaurar.addEventListener('click', function() {
            // Usar el sistema de traducciones para el mensaje de confirmación
            const mensajeConfirmacion = window.translations ? 
                window.translations.t('confirm_restore') : 
                '¿Estás seguro de que quieres restaurar los valores por defecto?';
            
            if (confirm(mensajeConfirmacion)) {
                // Restaurar configuración por defecto
                const configDefecto = { ...configPorDefecto };
                guardarConfiguracion(configDefecto);
                
                // Actualizar interfaz
                checkboxAccesibilidad.checked = false;
                checkboxModoDaltonico.checked = false;
                selectorTamanoFuente.value = '100%';
                
                actualizarTextoPorcentaje('100%');
                
                // Aplicar cambios
                setAccesibilidad(false);
                
                // Deshabilitar subopciones
                const subopciones = document.querySelectorAll('.subopciones input, .subopciones select');
                subopciones.forEach(elemento => {
                    elemento.disabled = true;
                });
                
                // Mostrar mensaje traducido
                const mensajeExito = window.translations ? 
                    window.translations.t('restore_success') : 
                    '✅ Configuración restaurada a valores por defecto';
                mostrarMensaje(mensajeExito, 'success');
            }
        });
    }
    
    // Inicializar estado de subopciones
    const subopciones = document.querySelectorAll('.subopciones input, .subopciones select');
    subopciones.forEach(elemento => {
        elemento.disabled = !checkboxAccesibilidad.checked;
    });
    
    console.log('✅ Página de configuración inicializada');
}

// Función para mostrar mensajes
function mostrarMensaje(texto, tipo = 'success') {
    const mensajeElement = document.getElementById('mensaje-config');
    if (mensajeElement) {
        mensajeElement.textContent = texto;
        mensajeElement.className = `mensaje-config ${tipo}`;
        mensajeElement.style.display = 'block';
        
        // Ocultar mensaje después de 3 segundos
        setTimeout(() => {
            mensajeElement.style.display = 'none';
        }, 3000);
    }
}

// Ejecutar cuando se cargue el DOM
document.addEventListener('DOMContentLoaded', function() {
    // Aplicar configuraciones en todas las páginas
    aplicarConfiguraciones();
    
    // Si estamos en la página de configuración, inicializarla
    if (window.location.pathname.includes('config.html')) {
        inicializarPaginaConfiguracion();
    }
});

// Exportar funciones para uso global
window.configuracion = {
    obtenerConfiguracion,
    guardarConfiguracion,
    aplicarTamanoFuente,
    restaurarTamanoFuente,
    aplicarModoDaltonico,
    restaurarModoDaltonico,
    setAccesibilidad,
    restaurarAccesibilidad,
    aplicarConfiguraciones,
    actualizarTextoPorcentaje
};