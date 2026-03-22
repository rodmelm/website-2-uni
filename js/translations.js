// translations.js - Sistema de traducción multilenguaje

const TRANSLATIONS = {
    ES: {
        // Header y navegación
        'search_trips': 'Buscar viajes',
        'other_corners': 'Otros rincones',
        'information': 'Información',
        'settings': 'Configuración',
        'profile': 'Perfil',
        'login': 'Iniciar sesión',
        'register': 'Registrarse',
        'logout': 'Cerrar sesión',
        
        // Página de configuración (ya existentes)
        'settings_title': 'Configuración',
        'accessibility': 'Accesibilidad',
        'enable_accessibility': 'Activar opciones de accesibilidad',
        'colorblind_mode': 'Modo daltónico',
        'colorblind_desc': 'Ajusta los colores para mayor visibilidad',
        'font_size': 'Tamaño de texto',
        'font_current': '(Tamaño actual: {size})',
        'font_desc': 'Este cambio se aplicará a todas las páginas',
        'very_small': 'Muy pequeño',
        'small': 'Pequeño',
        'normal': 'Normal',
        'large': 'Grande',
        'very_large': 'Muy grande',
        'extra_large': 'Extra grande',
        'restore_defaults': 'Restaurar valores por defecto',
        'confirm_restore': '¿Estás seguro de que quieres restaurar los valores por defecto?',
        'restore_success': '✅ Configuración restaurada a valores por defecto',
        
        // Página principal (main.html)
        'prepare_next_adventure': 'Prepara tu próxima aventura',
        'looking_inspiration': '¿Buscas inspiración? Viajes destacados:',
        'view_more': 'Ver más',
        'recent_reviews': 'Opiniones recientes',
        'user': 'Usuario',
        'first_recent_opinion': 'Primera opinión más reciente',
        'second_recent_opinion': 'Segunda opinión más reciente',
        'third_recent_opinion': 'Tercera opinión más reciente',
        
        // Buscador (buscador.html)
        'our_trips': 'Nuestros Viajes',
        'search_title': 'Buscar viajes',
        'continent': 'Continente',
        'select_continent': '(continente)',
        'price_range': 'Rango de precios',
        'select_price': '(precio)',
        'europe': 'Europa',
        'asia': 'Asia',
        'north_america': 'América del Norte',
        'south_america': 'América del Sur',
        'africa': 'África',
        'oceania': 'Oceanía',
        'antarctica': 'Antártida',
        'price_500_1000': '500-1000',
        'price_1001_1500': '1001-1500',
        'price_1501_2000': '1501-2000',
        'price_2001_2500': '2001-2500',
        'peruvian_andes_adventure': 'Aventura en los Andes Peruanos',
        'peruvian_andes_desc': 'Descubre la majestuosidad de la cordillera de los Andes, explora ruinas incas y vive la cultura local en este viaje inolvidable que te llevará desde Cusco hasta Machu Picchu.',
        'southeast_asia_exploration': 'Explorando el Sudeste Asiático',
        'southeast_asia_desc': 'Sumérgete en la diversidad cultural de Tailandia, Vietnam y Camboya. Desde templos ancestrales hasta playas paradisíacas, este viaje te ofrece una experiencia completa.',
        'african_savanna_safari': 'Safari por la Sabana Africana',
        'african_savanna_desc': 'Vive la emoción de un safari auténtico en Tanzania y Kenia. Avista los Big Five y descubre paisajes que te dejarán sin aliento en este viaje de aventura.',
        'central_europe_route': 'Ruta por Europa Central',
        'central_europe_desc': 'Recorre las joyas arquitectónicas de Praga, Viena y Budapest. Disfruta de la rica historia, cultura y gastronomía en el corazón de Europa.',
        'price': 'Precio',
        'continent_label': 'Continente',
        
        // Detalles (detalles.html)
        'trip_details': 'Detalles del viaje',
        'back_to_search': 'Buscar viajes',
        'trip_title': 'Título de viaje',
        'detailed_description': 'Descripción detallada del viaje',
        'reviews': 'Opiniones',
        'book': 'Reservar',
        'save_to_favorites': 'Guardar en favoritos',
        
        // Opiniones (opiniones.html)
        'leave_your_opinion': 'Deja tu opinión',
        'write_your_opinion': 'Escribe tu opinión aquí...',
        'send_opinion': 'Enviar opinión',
        'user_review': 'Opinión de usuario',
        
        // Información (info.html)
        'about_us': 'Sobre nosotros',
        'contact_us': 'Contacta con nosotros',
        'phone': 'Teléfono',
        'email_contact': 'Correo',
        'business_hours': 'Nuestro horario de atención es de lunes a viernes de 9:00 a 18:00 horas.',
        'about_us_text_1': 'MochilerosXMundo es una plataforma creada por y para viajeros apasionados. Nuestra misión es conectar a aventureros de todo el mundo con experiencias únicas y auténticas que van más allá del turismo convencional.',
        'about_us_text_2': 'Fundada en 2018 por un grupo de amigos mochileros, nuestra web ha crecido hasta convertirse en una comunidad global donde miles de viajeros comparten sus rutas, descubrimientos y consejos para explorar el mundo de forma responsable y enriquecedora.',
        'about_us_text_3': 'Creemos en el poder transformador de los viajes y en la importancia de conocer otras culturas, por lo que promovemos un turismo sostenible que beneficie tanto a los viajeros como a las comunidades locales.',
        'contact_us_text': 'Estamos aquí para ayudarte en todo lo que necesites para planificar tu próxima aventura. No dudes en contactarnos:',
        
        // Registro (register.html)
        'registration': 'Registro',
        'name': 'Nombre',
        'surname': 'Apellidos',
        'email': 'Correo',
        'confirm_email': 'Confirmar correo',
        'birth_date': 'Fecha de nacimiento',
        'username': 'Usuario',
        'password': 'Contraseña',
        'accept_privacy': 'Acepto la Política de Privacidad',
        'privacy_policy': 'Política de Privacidad',
        'register_button': 'Registrarse',
        'placeholder_text': 'Placeholder',
        'date_format': 'DD | MM | AA',
        
        // Login (login.html)
        'login_title': 'Iniciar Sesión',
        'username_required': 'Nombre de usuario *',
        'password_required': 'Contraseña *',
        'username_hint': 'Usa el nombre de usuario que creaste al registrarte',
        'password_hint': 'La contraseña es sensible a mayúsculas/minúsculas',
        'remember_me': 'Recordar mi usuario',
        'login_button': 'Iniciar sesión',
        'no_account': '¿No tienes una cuenta?',
        'register_here': 'Regístrate aquí',
        
        // Perfil (perfil.html)
        'user_profile': 'Perfil de Usuario',
        'my_next_trip': 'Mi próximo viaje:',
        'about_me': 'Sobre mí:',
        'edit_profile': 'Editar Perfil',
        'close_session': 'Cerrar Sesión',
        'profile_settings': 'Configuración',
        'passionate_traveler': 'Apasionada viajera con más de 15 países visitados. Me encanta explorar culturas diferentes, probar comida local y conocer gente nueva en cada destino. Mi lema es "viajar es vivir dos veces".',
        
        // Reserva (reserva.html)
        'reservation': 'Reserva',
        'trip_summary': 'Resumen del viaje',
        'full_name': 'Nombre completo',
        'email_address': 'Correo electrónico',
        'companions': 'Acompañantes:',
        'pet_type': 'Tipo de mascota:',
        'pet_size': 'Tamaño:',
        'payment_method': 'Modo de pago',
        'card_number': 'Número de tarjeta',
        'card_holder': 'Titular de tarjeta',
        'expiry_date': 'Fecha de caducidad',
        'cvv': 'CVV',
        'allergies': 'Intolerancias / alergias:',
        'reserve_button': 'Reservar',
        'none': 'Ninguno',
        'none_female': 'Ninguna',
        'dog': 'Perro',
        'cat': 'Gato',
        'lovebird': 'Agaporni',
        'other': 'Otros',
        'small_pet': 'Pequeño (2-5kg)',
        'medium_pet': 'Mediano (10-15kg)',
        'large_pet': 'Grande (15-20kg)',
        'visa': 'VISA',
        'mastercard': 'MASTERCARD',
        'american_express': 'AMERICAN EXPRESS',
        
        // Otros rincones (otros_rincones.html)
        'world_cities': 'Ciudades del Mundo',
        'search_city': 'Buscar ciudad, país o continente...',
        'all_continents': 'Todos los continentes',
        'all_countries': 'Todos los países',
        'apply_filters': 'Aplicar filtros',
        'clear_filters': 'Limpiar filtros',
        'cities': 'Ciudades',
        'countries': 'Países',
        'continents': 'Continentes',
        'no_results': 'No se encontraron resultados',
        'no_results_hint': 'Intenta con otros términos de búsqueda o ajusta los filtros.',
        
        // Footer
        'all_rights_reserved': 'MochilerosXMundo @ 2025. All rights reserved.',
        'youtube': 'YouTube',
        'facebook': 'Facebook',
        'twitter': 'Twitter',
        'instagram': 'Instagram',
        'linkedin': 'LinkedIn',
        
        // Mensajes comunes
        'loading': 'Cargando...',
        'error': 'Error',
        'success': 'Éxito',
        'save': 'Guardar',
        'cancel': 'Cancelar',
        'delete': 'Eliminar',
        'confirm': 'Confirmar',
        'yes': 'Sí',
        'no': 'No',
        'back': 'Volver'
    },
    
    EN: {
        // Header y navegación
        'search_trips': 'Search trips',
        'other_corners': 'Other corners',
        'information': 'Information',
        'settings': 'Settings',
        'profile': 'Profile',
        'login': 'Login',
        'register': 'Register',
        'logout': 'Logout',
        
        // Página de configuración
        'settings_title': 'Settings',
        'accessibility': 'Accessibility',
        'enable_accessibility': 'Enable accessibility options',
        'colorblind_mode': 'Colorblind mode',
        'colorblind_desc': 'Adjust colors for better visibility',
        'font_size': 'Font size',
        'font_current': '(Current size: {size})',
        'font_desc': 'This change will apply to all pages',
        'very_small': 'Very small',
        'small': 'Small',
        'normal': 'Normal',
        'large': 'Large',
        'very_large': 'Very large',
        'extra_large': 'Extra large',
        'restore_defaults': 'Restore default values',
        'confirm_restore': 'Are you sure you want to restore default values?',
        'restore_success': '✅ Settings restored to default values',
        
        // Página principal
        'prepare_next_adventure': 'Prepare your next adventure',
        'looking_inspiration': 'Looking for inspiration? Featured trips:',
        'view_more': 'View more',
        'recent_reviews': 'Recent reviews',
        'user': 'User',
        'first_recent_opinion': 'First most recent opinion',
        'second_recent_opinion': 'Second most recent opinion',
        'third_recent_opinion': 'Third most recent opinion',
        
        // Buscador
        'our_trips': 'Our Trips',
        'search_title': 'Search trips',
        'continent': 'Continent',
        'select_continent': '(continent)',
        'price_range': 'Price range',
        'select_price': '(price)',
        'europe': 'Europe',
        'asia': 'Asia',
        'north_america': 'North America',
        'south_america': 'South America',
        'africa': 'Africa',
        'oceania': 'Oceania',
        'antarctica': 'Antarctica',
        'price_500_1000': '500-1000',
        'price_1001_1500': '1001-1500',
        'price_1501_2000': '1501-2000',
        'price_2001_2500': '2001-2500',
        'peruvian_andes_adventure': 'Adventure in the Peruvian Andes',
        'peruvian_andes_desc': 'Discover the majesty of the Andes mountain range, explore Inca ruins and experience local culture on this unforgettable journey from Cusco to Machu Picchu.',
        'southeast_asia_exploration': 'Exploring Southeast Asia',
        'southeast_asia_desc': 'Immerse yourself in the cultural diversity of Thailand, Vietnam and Cambodia. From ancient temples to paradisiacal beaches, this trip offers a complete experience.',
        'african_savanna_safari': 'African Savanna Safari',
        'african_savanna_desc': 'Experience the excitement of an authentic safari in Tanzania and Kenya. Spot the Big Five and discover breathtaking landscapes on this adventure trip.',
        'central_europe_route': 'Central Europe Route',
        'central_europe_desc': 'Tour the architectural gems of Prague, Vienna and Budapest. Enjoy rich history, culture and gastronomy in the heart of Europe.',
        'price': 'Price',
        'continent_label': 'Continent',
        
        // Detalles
        'trip_details': 'Trip details',
        'back_to_search': 'Search trips',
        'trip_title': 'Trip title',
        'detailed_description': 'Detailed trip description',
        'reviews': 'Reviews',
        'book': 'Book',
        'save_to_favorites': 'Save to favorites',
        
        // Opiniones
        'leave_your_opinion': 'Leave your opinion',
        'write_your_opinion': 'Write your opinion here...',
        'send_opinion': 'Send opinion',
        'user_review': 'User review',
        
        // Información
        'about_us': 'About us',
        'contact_us': 'Contact us',
        'phone': 'Phone',
        'email_contact': 'Email',
        'business_hours': 'Our business hours are Monday to Friday from 9:00 to 18:00.',
        'about_us_text_1': 'MochilerosXMundo is a platform created by and for passionate travelers. Our mission is to connect adventurers from all over the world with unique and authentic experiences that go beyond conventional tourism.',
        'about_us_text_2': 'Founded in 2018 by a group of backpacker friends, our website has grown to become a global community where thousands of travelers share their routes, discoveries and tips for exploring the world in a responsible and enriching way.',
        'about_us_text_3': 'We believe in the transformative power of travel and the importance of knowing other cultures, so we promote sustainable tourism that benefits both travelers and local communities.',
        'contact_us_text': 'We are here to help you with everything you need to plan your next adventure. Do not hesitate to contact us:',
        
        // Registro
        'registration': 'Registration',
        'name': 'Name',
        'surname': 'Surname',
        'email': 'Email',
        'confirm_email': 'Confirm email',
        'birth_date': 'Date of birth',
        'username': 'Username',
        'password': 'Password',
        'accept_privacy': 'I accept the Privacy Policy',
        'privacy_policy': 'Privacy Policy',
        'register_button': 'Register',
        'placeholder_text': 'Placeholder',
        'date_format': 'DD | MM | YY',
        
        // Login
        'login_title': 'Login',
        'username_required': 'Username *',
        'password_required': 'Password *',
        'username_hint': 'Use the username you created when registering',
        'password_hint': 'Password is case sensitive',
        'remember_me': 'Remember me',
        'login_button': 'Login',
        'no_account': 'Don\'t have an account?',
        'register_here': 'Register here',
        
        // Perfil
        'user_profile': 'User Profile',
        'my_next_trip': 'My next trip:',
        'about_me': 'About me:',
        'edit_profile': 'Edit Profile',
        'close_session': 'Close Session',
        'profile_settings': 'Settings',
        'passionate_traveler': 'Passionate traveler with over 15 countries visited. I love exploring different cultures, trying local food and meeting new people at each destination. My motto is "to travel is to live twice".',
        
        // Reserva
        'reservation': 'Reservation',
        'trip_summary': 'Trip summary',
        'full_name': 'Full name',
        'email_address': 'Email address',
        'companions': 'Companions:',
        'pet_type': 'Pet type:',
        'pet_size': 'Size:',
        'payment_method': 'Payment method',
        'card_number': 'Card number',
        'card_holder': 'Card holder',
        'expiry_date': 'Expiry date',
        'cvv': 'CVV',
        'allergies': 'Intolerances / allergies:',
        'reserve_button': 'Reserve',
        'none': 'None',
        'none_female': 'None',
        'dog': 'Dog',
        'cat': 'Cat',
        'lovebird': 'Lovebird',
        'other': 'Other',
        'small_pet': 'Small (2-5kg)',
        'medium_pet': 'Medium (10-15kg)',
        'large_pet': 'Large (15-20kg)',
        'visa': 'VISA',
        'mastercard': 'MASTERCARD',
        'american_express': 'AMERICAN EXPRESS',
        
        // Otros rincones
        'world_cities': 'World Cities',
        'search_city': 'Search city, country or continent...',
        'all_continents': 'All continents',
        'all_countries': 'All countries',
        'apply_filters': 'Apply filters',
        'clear_filters': 'Clear filters',
        'cities': 'Cities',
        'countries': 'Countries',
        'continents': 'Continents',
        'no_results': 'No results found',
        'no_results_hint': 'Try other search terms or adjust the filters.',
        
        // Footer
        'all_rights_reserved': 'MochilerosXMundo @ 2025. All rights reserved.',
        'youtube': 'YouTube',
        'facebook': 'Facebook',
        'twitter': 'Twitter',
        'instagram': 'Instagram',
        'linkedin': 'LinkedIn',
        
        // Mensajes comunes
        'loading': 'Loading...',
        'error': 'Error',
        'success': 'Success',
        'save': 'Save',
        'cancel': 'Cancel',
        'delete': 'Delete',
        'confirm': 'Confirm',
        'yes': 'Yes',
        'no': 'No',
        'back': 'Back'
    },
    
    GE: {
        // Header y navegación
        'search_trips': 'Reisen suchen',
        'other_corners': 'Andere Ecken',
        'information': 'Information',
        'settings': 'Einstellungen',
        'profile': 'Profil',
        'login': 'Anmelden',
        'register': 'Registrieren',
        'logout': 'Abmelden',
        
        // Página de configuración
        'settings_title': 'Einstellungen',
        'accessibility': 'Barrierefreiheit',
        'enable_accessibility': 'Barrierefreiheitsoptionen aktivieren',
        'colorblind_mode': 'Farbenblind-Modus',
        'colorblind_desc': 'Farben für bessere Sichtbarkeit anpassen',
        'font_size': 'Schriftgröße',
        'font_current': '(Aktuelle Größe: {size})',
        'font_desc': 'Diese Änderung gilt für alle Seiten',
        'very_small': 'Sehr klein',
        'small': 'Klein',
        'normal': 'Normal',
        'large': 'Groß',
        'very_large': 'Sehr groß',
        'extra_large': 'Extra groß',
        'restore_defaults': 'Standardwerte wiederherstellen',
        'confirm_restore': 'Sind Sie sicher, dass Sie die Standardwerte wiederherstellen möchten?',
        'restore_success': '✅ Einstellungen auf Standardwerte zurückgesetzt',
        
        // Página principal
        'prepare_next_adventure': 'Bereite dein nächstes Abenteuer vor',
        'looking_inspiration': 'Auf der Suche nach Inspiration? Empfohlene Reisen:',
        'view_more': 'Mehr anzeigen',
        'recent_reviews': 'Aktuelle Bewertungen',
        'user': 'Benutzer',
        'first_recent_opinion': 'Erste aktuelle Meinung',
        'second_recent_opinion': 'Zweite aktuelle Meinung',
        'third_recent_opinion': 'Dritte aktuelle Meinung',
        
        // Buscador
        'our_trips': 'Unsere Reisen',
        'search_title': 'Reisen suchen',
        'continent': 'Kontinent',
        'select_continent': '(Kontinent)',
        'price_range': 'Preisspanne',
        'select_price': '(Preis)',
        'europe': 'Europa',
        'asia': 'Asien',
        'north_america': 'Nordamerika',
        'south_america': 'Südamerika',
        'africa': 'Afrika',
        'oceania': 'Ozeanien',
        'antarctica': 'Antarktis',
        'price_500_1000': '500-1000',
        'price_1001_1500': '1001-1500',
        'price_1501_2000': '1501-2000',
        'price_2001_2500': '2001-2500',
        'peruvian_andes_adventure': 'Abenteuer in den peruanischen Anden',
        'peruvian_andes_desc': 'Entdecken Sie die Majestätität der Anden, erkunden Sie Inka-Ruinen und erleben Sie die lokale Kultur auf dieser unvergesslichen Reise von Cusco nach Machu Picchu.',
        'southeast_asia_exploration': 'Erkundung Südostasiens',
        'southeast_asia_desc': 'Tauchen Sie ein in die kulturelle Vielfalt von Thailand, Vietnam und Kambodscha. Von antiken Tempeln bis zu paradiesischen Stränden bietet diese Reise ein komplettes Erlebnis.',
        'african_savanna_safari': 'Afrikanische Savannen-Safari',
        'african_savanna_desc': 'Erleben Sie die Aufregung einer authentischen Safari in Tansania und Kenia. Entdecken Sie die Big Five und atemberaubende Landschaften auf dieser Abenteuerreise.',
        'central_europe_route': 'Route durch Mitteleuropa',
        'central_europe_desc': 'Bewundern Sie die architektonischen Juwelen von Prag, Wien und Budapest. Genießen Sie reiche Geschichte, Kultur und Gastronomie im Herzen Europas.',
        'price': 'Preis',
        'continent_label': 'Kontinent',
        
        // Detalles
        'trip_details': 'Reisedetails',
        'back_to_search': 'Zurück zur Reisesuche',
        'trip_title': 'Reisetitel',
        'detailed_description': 'Detaillierte Reisebeschreibung',
        'reviews': 'Bewertungen',
        'book': 'Buchen',
        'save_to_favorites': 'Zu Favoriten hinzufügen',
        
        // Opiniones
        'leave_your_opinion': 'Hinterlassen Sie Ihre Meinung',
        'write_your_opinion': 'Schreiben Sie hier Ihre Meinung...',
        'send_opinion': 'Meinung senden',
        'user_review': 'Benutzerbewertung',
        
        // Información
        'about_us': 'Über uns',
        'contact_us': 'Kontaktieren Sie uns',
        'phone': 'Telefon',
        'email_contact': 'E-Mail',
        'business_hours': 'Unsere Geschäftszeiten sind Montag bis Freitag von 9:00 bis 18:00 Uhr.',
        'about_us_text_1': 'MochilerosXMundo ist eine Plattform, die von und für leidenschaftliche Reisende geschaffen wurde. Unsere Mission ist es, Abenteurer aus der ganzen Welt mit einzigartigen und authentischen Erlebnissen zu verbinden, die über den konventionellen Tourismus hinausgehen.',
        'about_us_text_2': 'Gegründet im Jahr 2018 von einer Gruppe von Rucksackreisenden, ist unsere Website zu einer globalen Gemeinschaft herangewachsen, in der Tausende von Reisenden ihre Routen, Entdeckungen und Tipps für eine verantwortungsvolle und bereichernde Erkundung der Welt teilen.',
        'about_us_text_3': 'Wir glauben an die transformative Kraft des Reisens und die Bedeutung, andere Kulturen kennenzulernen, daher fördern wir nachhaltigen Tourismus, der sowohl Reisenden als auch lokalen Gemeinschaften zugutekommt.',
        'contact_us_text': 'Wir sind hier, um Ihnen bei allem zu helfen, was Sie für die Planung Ihres nächsten Abenteuers benötigen. Zögern Sie nicht, uns zu kontaktieren:',
        
        // Registro
        'registration': 'Registrierung',
        'name': 'Name',
        'surname': 'Nachname',
        'email': 'E-Mail',
        'confirm_email': 'E-Mail bestätigen',
        'birth_date': 'Geburtsdatum',
        'username': 'Benutzername',
        'password': 'Passwort',
        'accept_privacy': 'Ich akzeptiere die Datenschutzrichtlinie',
        'privacy_policy': 'Datenschutzrichtlinie',
        'register_button': 'Registrieren',
        'placeholder_text': 'Platzhalter',
        'date_format': 'TT | MM | JJ',
        
        // Login
        'login_title': 'Anmeldung',
        'username_required': 'Benutzername *',
        'password_required': 'Passwort *',
        'username_hint': 'Verwenden Sie den Benutzernamen, den Sie bei der Registrierung erstellt haben',
        'password_hint': 'Passwort unterscheidet zwischen Groß- und Kleinschreibung',
        'remember_me': 'Angemeldet bleiben',
        'login_button': 'Anmelden',
        'no_account': 'Kein Konto?',
        'register_here': 'Hier registrieren',
        
        // Perfil
        'user_profile': 'Benutzerprofil',
        'my_next_trip': 'Meine nächste Reise:',
        'about_me': 'Über mich:',
        'edit_profile': 'Profil bearbeiten',
        'close_session': 'Sitzung beenden',
        'profile_settings': 'Einstellungen',
        'passionate_traveler': 'Leidenschaftliche Reisende mit über 15 besuchten Ländern. Ich liebe es, verschiedene Kulturen zu erkunden, lokales Essen zu probieren und neue Menschen an jedem Zielort kennenzulernen. Mein Motto lautet "Reisen ist zweimal leben".',
        
        // Reserva
        'reservation': 'Reservierung',
        'trip_summary': 'Reisezusammenfassung',
        'full_name': 'Vollständiger Name',
        'email_address': 'E-Mail-Adresse',
        'companions': 'Begleiter:',
        'pet_type': 'Haustierart:',
        'pet_size': 'Größe:',
        'payment_method': 'Zahlungsmethode',
        'card_number': 'Kartennummer',
        'card_holder': 'Karteninhaber',
        'expiry_date': 'Ablaufdatum',
        'cvv': 'CVV',
        'allergies': 'Unverträglichkeiten / Allergien:',
        'reserve_button': 'Reservieren',
        'none': 'Keine',
        'none_female': 'Keine',
        'dog': 'Hund',
        'cat': 'Katze',
        'lovebird': 'Unzertrennliche',
        'other': 'Andere',
        'small_pet': 'Klein (2-5kg)',
        'medium_pet': 'Mittel (10-15kg)',
        'large_pet': 'Groß (15-20kg)',
        'visa': 'VISA',
        'mastercard': 'MASTERCARD',
        'american_express': 'AMERICAN EXPRESS',
        
        // Otros rincones
        'world_cities': 'Städte der Welt',
        'search_city': 'Stadt, Land oder Kontinent suchen...',
        'all_continents': 'Alle Kontinente',
        'all_countries': 'Alle Länder',
        'apply_filters': 'Filter anwenden',
        'clear_filters': 'Filter löschen',
        'cities': 'Städte',
        'countries': 'Länder',
        'continents': 'Kontinente',
        'no_results': 'Keine Ergebnisse gefunden',
        'no_results_hint': 'Versuchen Sie andere Suchbegriffe oder passen Sie die Filter an.',
        
        // Footer
        'all_rights_reserved': 'MochilerosXMundo @ 2025. Alle Rechte vorbehalten.',
        'youtube': 'YouTube',
        'facebook': 'Facebook',
        'twitter': 'Twitter',
        'instagram': 'Instagram',
        'linkedin': 'LinkedIn',
        
        // Mensajes comunes
        'loading': 'Laden...',
        'error': 'Fehler',
        'success': 'Erfolg',
        'save': 'Speichern',
        'cancel': 'Abbrechen',
        'delete': 'Löschen',
        'confirm': 'Bestätigen',
        'yes': 'Ja',
        'no': 'Nein',
        'back': 'Zurück'
    }
};

// Clave para almacenar el idioma en localStorage
const LANGUAGE_KEY = 'mochileros_idioma';

// Obtener idioma actual
function getIdiomaActual() {
    const idiomaGuardado = localStorage.getItem(LANGUAGE_KEY);
    return idiomaGuardado || 'ES'; // Español por defecto
}

// Establecer idioma
function setIdioma(idioma) {
    if (TRANSLATIONS[idioma]) {
        localStorage.setItem(LANGUAGE_KEY, idioma);
        return true;
    }
    return false;
}

// Obtener traducción
function t(key, params = {}) {
    const idioma = getIdiomaActual();
    let translation = TRANSLATIONS[idioma]?.[key] || key;
    
    // Reemplazar parámetros si existen
    Object.keys(params).forEach(param => {
        translation = translation.replace(`{${param}}`, params[param]);
    });
    
    return translation;
}

// Aplicar traducciones a la página actual
function aplicarTraducciones() {
    const idioma = getIdiomaActual();
    
    // Actualizar selector de idioma en el header
    const selectIdioma = document.querySelector('select[name="idioma"]');
    if (selectIdioma) {
        selectIdioma.value = idioma;
    }
    
    // Buscar todos los elementos con data-i18n
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const text = t(key);
        
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            element.placeholder = text;
        } else if (element.tagName === 'OPTION') {
            // Manejar opciones específicas
            const optionValue = element.value;
            const specificKey = `${key}_${optionValue}`;
            const specificText = t(specificKey);
            
            if (specificText !== specificKey) {
                element.textContent = specificText;
            } else {
                element.textContent = t(optionValue) || text;
            }
        } else {
            element.textContent = text;
        }
    });
    
    // Actualizar atributos específicos
    document.querySelectorAll('[data-i18n-title]').forEach(element => {
        const key = element.getAttribute('data-i18n-title');
        element.title = t(key);
    });
    
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        element.placeholder = t(key);
    });
    
    document.querySelectorAll('[data-i18n-alt]').forEach(element => {
        const key = element.getAttribute('data-i18n-alt');
        element.alt = t(key);
    });
    
    console.log(`🌐 Idioma aplicado: ${idioma}`);
}

// Inicializar sistema de idiomas
function inicializarIdioma() {
    // Aplicar traducciones cuando se carga el DOM
    document.addEventListener('DOMContentLoaded', function() {
        aplicarTraducciones();
        
        // Configurar evento para el selector de idioma
        const selectIdioma = document.querySelector('select[name="idioma"]');
        if (selectIdioma) {
            selectIdioma.value = getIdiomaActual();
            
            selectIdioma.addEventListener('change', function() {
                const nuevoIdioma = this.value;
                if (setIdioma(nuevoIdioma)) {
                    aplicarTraducciones();
                    
                    // Recargar la página para aplicar cambios completos
                    setTimeout(() => {
                        window.location.reload();
                    }, 300);
                }
            });
        }
    });
}

// Ejecutar inicialización
inicializarIdioma();

// Exportar para uso global
window.translations = {
    t,
    getIdiomaActual,
    setIdioma,
    aplicarTraducciones
};