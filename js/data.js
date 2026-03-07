/* ============================================
   InfoSport – Mock Data v2.0
   Provincia de Jaén – Fútbol Base y Sénior
   Datos ampliados: 30+ jugadores, 35+ clubes
   ============================================ */

const MOCK_DATA = (() => {

  // ---- Localidades de Jaén ----
  const localidades = [
    'Jaén','Linares','Úbeda','Andújar','Martos','Alcalá la Real','Bailén',
    'Torredonjimeno','La Carolina','Mancha Real','Jódar','Villacarrillo',
    'Baeza','Mengíbar','Porcuna','Cazorla','Villanueva del Arzobispo','Arjona',
    'Torreperogil','Quesada','Alcaudete','Huelma','Villanueva de la Reina',
    'Lopera','Torredelcampo','Pegalajar','Carboneros','Guarromán','Sabiote',
    'Santisteban del Puerto','Navas de San Juan','Beas de Segura','La Puerta de Segura',
    'Orcera','Santiago de Calatrava','Fuerte del Rey','Los Villares','Valdepeñas de Jaén'
  ];

  // ---- Equipos de Jaén (35+ clubes reales y verosímiles) ----
  const equipos = [
    { nombre: 'Real Jaén CF', localidad: 'Jaén', logo: '⚽' },
    { nombre: 'Linares Deportivo', localidad: 'Linares', logo: '🔵' },
    { nombre: 'CD Úbeda Viva', localidad: 'Úbeda', logo: '🟢' },
    { nombre: 'Atlético Mancha Real', localidad: 'Mancha Real', logo: '🔴' },
    { nombre: 'Torredonjimeno CF', localidad: 'Torredonjimeno', logo: '🟡' },
    { nombre: 'CD Torreperogil', localidad: 'Torreperogil', logo: '⚪' },
    { nombre: 'Atlético Baezano', localidad: 'Baeza', logo: '🟠' },
    { nombre: 'CF Martos', localidad: 'Martos', logo: '🟤' },
    { nombre: 'Andújar CF', localidad: 'Andújar', logo: '🔷' },
    { nombre: 'Bailén CF', localidad: 'Bailén', logo: '🟣' },
    { nombre: 'Jódar CF', localidad: 'Jódar', logo: '🔶' },
    { nombre: 'CD Cazorla', localidad: 'Cazorla', logo: '🏔️' },
    { nombre: 'Arjona CF', localidad: 'Arjona', logo: '🛡️' },
    { nombre: 'La Carolina FC', localidad: 'La Carolina', logo: '⛏️' },
    { nombre: 'CD Mengíbar', localidad: 'Mengíbar', logo: '🌊' },
    { nombre: 'CD Alcaudete', localidad: 'Alcaudete', logo: '🏰' },
    { nombre: 'Porcuna CF', localidad: 'Porcuna', logo: '🫒' },
    { nombre: 'CD Huelma', localidad: 'Huelma', logo: '⛰️' },
    { nombre: 'Villacarrillo CF', localidad: 'Villacarrillo', logo: '🌾' },
    { nombre: 'Alcalá la Real CF', localidad: 'Alcalá la Real', logo: '🏛️' },
    { nombre: 'Villanueva CF', localidad: 'Villanueva del Arzobispo', logo: '🌿' },
    { nombre: 'CD Lopera', localidad: 'Lopera', logo: '🏵️' },
    { nombre: 'Torredelcampo CF', localidad: 'Torredelcampo', logo: '🌻' },
    { nombre: 'CD Pegalajar', localidad: 'Pegalajar', logo: '💧' },
    { nombre: 'Quesada CF', localidad: 'Quesada', logo: '🌄' },
    { nombre: 'Santisteban CF', localidad: 'Santisteban del Puerto', logo: '🔰' },
    { nombre: 'Navas de San Juan CF', localidad: 'Navas de San Juan', logo: '🌲' },
    { nombre: 'Beas de Segura CF', localidad: 'Beas de Segura', logo: '🌳' },
    { nombre: 'CD Sabiote', localidad: 'Sabiote', logo: '🏯' },
    { nombre: 'Guarromán CF', localidad: 'Guarromán', logo: '🔸' },
    { nombre: 'Carboneros CF', localidad: 'Carboneros', logo: '⚫' },
    { nombre: 'Fuerte del Rey CF', localidad: 'Fuerte del Rey', logo: '👑' },
    { nombre: 'Los Villares CF', localidad: 'Los Villares', logo: '🌅' },
    { nombre: 'Valdepeñas de Jaén CF', localidad: 'Valdepeñas de Jaén', logo: '🍇' },
    { nombre: 'Santiago de Calatrava CF', localidad: 'Santiago de Calatrava', logo: '✝️' },
    { nombre: 'La Puerta CF', localidad: 'La Puerta de Segura', logo: '🚪' },
  ];

  // ---- Posiciones ----
  const posiciones = {
    'Portero': { abr: 'POR', color: '#ffc107' },
    'Central': { abr: 'DFC', color: '#2196f3' },
    'Lateral Derecho': { abr: 'LD', color: '#2196f3' },
    'Lateral Izquierdo': { abr: 'LI', color: '#2196f3' },
    'Mediocentro Defensivo': { abr: 'MCD', color: '#4caf50' },
    'Mediocentro': { abr: 'MC', color: '#4caf50' },
    'Mediapunta': { abr: 'MP', color: '#ff9800' },
    'Interior Derecho': { abr: 'ID', color: '#4caf50' },
    'Interior Izquierdo': { abr: 'II', color: '#4caf50' },
    'Extremo Derecho': { abr: 'ED', color: '#f44336' },
    'Extremo Izquierdo': { abr: 'EI', color: '#f44336' },
    'Delantero Centro': { abr: 'DC', color: '#f44336' },
    'Segundo Delantero': { abr: 'SD', color: '#f44336' },
  };

  const categorias = ['Alevín', 'Infantil', 'Cadete', 'Juvenil', 'Sénior'];

  // ---- Servicios InfoSport (Marketplace) ----
  const servicios = [
    { id:'srv-1', nombre:'Plan Nutricional Deportivo', categoria:'Nutrición', icono:'fa-apple-whole', iconClass:'nutrition', descripcion:'Plan personalizado de alimentación deportiva con seguimiento mensual, adaptado a la fase de la temporada y carga de entrenamiento.', partner:'NutriSport Jaén', precio:45, periodo:'/mes', desbloqueaSello:true },
    { id:'srv-2', nombre:'Psicología del Rendimiento', categoria:'Psicología', icono:'fa-brain', iconClass:'psychology', descripcion:'Sesiones individuales de psicología deportiva: gestión de presión, concentración, liderazgo y resiliencia competitiva.', partner:'MindGame Sport', precio:55, periodo:'/sesión', desbloqueaSello:true },
    { id:'srv-3', nombre:'Preparación Física Individual', categoria:'Preparación Física', icono:'fa-dumbbell', iconClass:'training', descripcion:'Programa de fuerza, velocidad y resistencia personalizado. Incluye test de rendimiento inicial y seguimiento semanal.', partner:'ProPhysical Jaén', precio:60, periodo:'/mes', desbloqueaSello:true },
    { id:'srv-4', nombre:'Fisioterapia Deportiva', categoria:'Fisioterapia', icono:'fa-hand-holding-medical', iconClass:'physio', descripcion:'Tratamiento y prevención de lesiones deportivas. Evaluación biomecánica, readaptación y terapia manual.', partner:'FisioActiva Linares', precio:40, periodo:'/sesión', desbloqueaSello:false },
    { id:'srv-5', nombre:'Video Análisis Táctico', categoria:'Análisis', icono:'fa-video', iconClass:'analysis', descripcion:'Análisis de vídeo individualizado. Informe detallado de posicionamiento, toma de decisiones y rendimiento por partido.', partner:'ScoutVision', precio:35, periodo:'/informe', desbloqueaSello:false },
    { id:'srv-6', nombre:'Recuperación y Crioterapia', categoria:'Recuperación', icono:'fa-snowflake', iconClass:'recovery', descripcion:'Sesiones de recuperación post-partido con crioterapia, electroestimulación y técnicas de descarga muscular.', partner:'CryoJaén Center', precio:30, periodo:'/sesión', desbloqueaSello:false },
  ];

  // ---- Notificaciones Mock ----
  const notificaciones = [
    { id:'n1', tipo:'match', titulo:'Nuevo Match', texto:'Linares Deportivo ha aceptado tu solicitud para Alejandro García.', fecha:'08/03/2026 · 10:15', leida:false },
    { id:'n2', tipo:'scouting', titulo:'Nuevo jugador registrado', texto:'Hugo Quesada Ríos (Jódar CF) se ha registrado en la plataforma.', fecha:'07/03/2026 · 18:30', leida:false },
    { id:'n3', tipo:'servicio', titulo:'Servicio contratado', texto:'Plan Nutricional Deportivo activado para María Fernández.', fecha:'06/03/2026 · 14:45', leida:true },
    { id:'n4', tipo:'match', titulo:'Solicitud rechazada', texto:'Torredonjimeno CF ha rechazado la solicitud para Daniel Pérez.', fecha:'05/03/2026 · 09:20', leida:true },
    { id:'n5', tipo:'sistema', titulo:'Actualización de plataforma', texto:'Se han añadido nuevos filtros de búsqueda al módulo de Scouting Pro.', fecha:'04/03/2026 · 12:00', leida:true },
    { id:'n6', tipo:'scouting', titulo:'Sello desbloqueado', texto:'Carlos Martínez Ruiz ha obtenido el Sello de Alto Rendimiento.', fecha:'03/03/2026 · 16:10', leida:true },
    { id:'n7', tipo:'match', titulo:'Nuevo interés', texto:'Real Jaén CF está interesado en Marcos Del Moral Cano.', fecha:'02/03/2026 · 11:00', leida:true },
    { id:'n8', tipo:'sistema', titulo:'Bienvenido a InfoSport', texto:'Tu cuenta de dirección deportiva ha sido verificada correctamente.', fecha:'01/03/2026 · 08:00', leida:true },
  ];

  // ---- Jugadores Mock (30+ jugadores) ----
  const jugadores = [
    {
      id:'j-001', nombre:'Alejandro', apellidos:'García López', nacimiento:2008, categoria:'Cadete', localidad:'Jaén',
      posicionPrincipal:'Delantero Centro', posicionesAlt:['Segundo Delantero','Extremo Derecho'],
      altura:176, peso:68, pierna:'Derecha', foto:null, disponible:true,
      historialEquipos:[
        { equipo:'Real Jaén CF', temporadas:'2022-Actual', categoria:'Cadete A' },
        { equipo:'Atlético Mancha Real', temporadas:'2020-2022', categoria:'Alevín' },
      ],
      stats:{ partidos:28, goles:18, asistencias:7, tarjetasAmarillas:3, tarjetasRojas:0, minutos:2120, titular:24, suplente:4, minutoGolMedia:[12,34,67,78,45,23,56,89,15,40,55,72,33,60,80,25,48,70] },
      sello:'gold',
      serviciosActivos:['srv-1','srv-3'],
      serviciosInfo:[ {nombre:'Nutrición Deportiva',duracion:'4 meses',icono:'fa-apple-whole'}, {nombre:'Preparación Física',duracion:'3 meses',icono:'fa-dumbbell'} ],
      muroEntrenador:[
        { texto:'Tiene un olfato goleador excepcional. Necesita mejorar el juego de espaldas y la asociación en corto.', entrenador:'Manuel Ruiz – Real Jaén Cadete A', fecha:'Ene 2026' },
        { texto:'Muy rápido al espacio, buen desmarque. Debe trabajar la pierna izquierda y el juego aéreo ofensivo.', entrenador:'Pedro Sánchez – Atl. Mancha Real Alevín', fecha:'Jun 2022' },
      ],
      multimedia:[ {tipo:'video',titulo:'Highlights vs Linares Dep.',icono:'fa-play-circle'}, {tipo:'video',titulo:'Gol de chilena - Copa Jaén',icono:'fa-play-circle'}, {tipo:'foto',titulo:'Celebración gol 100',icono:'fa-image'}, {tipo:'foto',titulo:'Entrenamiento individual',icono:'fa-image'} ],
    },
    {
      id:'j-002', nombre:'Carlos', apellidos:'Martínez Ruiz', nacimiento:2006, categoria:'Juvenil', localidad:'Linares',
      posicionPrincipal:'Mediocentro', posicionesAlt:['Mediocentro Defensivo','Interior Derecho'],
      altura:180, peso:72, pierna:'Derecha', foto:null, disponible:true,
      historialEquipos:[
        { equipo:'Linares Deportivo', temporadas:'2021-Actual', categoria:'Juvenil A' },
        { equipo:'Real Jaén CF', temporadas:'2019-2021', categoria:'Infantil' },
      ],
      stats:{ partidos:32, goles:5, asistencias:12, tarjetasAmarillas:6, tarjetasRojas:1, minutos:2650, titular:30, suplente:2, minutoGolMedia:[55,72,38,81,62] },
      sello:'gold',
      serviciosActivos:['srv-1','srv-2','srv-3'],
      serviciosInfo:[ {nombre:'Nutrición Deportiva',duracion:'6 meses',icono:'fa-apple-whole'}, {nombre:'Psicología Deportiva',duracion:'3 meses',icono:'fa-brain'}, {nombre:'Preparación Física',duracion:'5 meses',icono:'fa-dumbbell'} ],
      muroEntrenador:[
        { texto:'Motor del equipo. Visión de juego excepcional y capacidad para cambiar el ritmo del partido. Líder en el vestuario.', entrenador:'Antonio López – Linares Deportivo Juv. A', fecha:'Feb 2026' },
        { texto:'Centrocampista muy completo. Debe mejorar el disparo desde fuera del área y la agresividad sin balón.', entrenador:'Francisco Torres – Real Jaén Infantil', fecha:'May 2021' },
      ],
      multimedia:[ {tipo:'video',titulo:'Resumen temporada 24/25',icono:'fa-play-circle'}, {tipo:'video',titulo:'Asistencia de gol vs Úbeda',icono:'fa-play-circle'}, {tipo:'foto',titulo:'MVP Jornada 15',icono:'fa-image'} ],
    },
    {
      id:'j-003', nombre:'María', apellidos:'Fernández Ortega', nacimiento:2007, categoria:'Cadete', localidad:'Úbeda',
      posicionPrincipal:'Extremo Izquierdo', posicionesAlt:['Mediapunta','Segundo Delantero'],
      altura:165, peso:56, pierna:'Izquierda', foto:null, disponible:true,
      historialEquipos:[
        { equipo:'CD Úbeda Viva', temporadas:'2021-Actual', categoria:'Cadete Fem.' },
        { equipo:'Atlético Baezano', temporadas:'2019-2021', categoria:'Infantil Fem.' },
      ],
      stats:{ partidos:25, goles:14, asistencias:11, tarjetasAmarillas:1, tarjetasRojas:0, minutos:2050, titular:23, suplente:2, minutoGolMedia:[8,22,35,47,50,63,71,79,15,30,55,68,82,90] },
      sello:'silver',
      serviciosActivos:['srv-1'],
      serviciosInfo:[ {nombre:'Nutrición Deportiva',duracion:'2 meses',icono:'fa-apple-whole'} ],
      muroEntrenador:[
        { texto:'Jugadora desequilibrante en el uno contra uno. Velocidad explosiva y muy buena lectura de espacios.', entrenador:'Laura García – CD Úbeda Viva Cadete Fem.', fecha:'Dic 2025' },
        { texto:'Enorme talento. Debe mejorar la toma de decisiones en el último tercio.', entrenador:'Miguel Ángel Rojas – Atl. Baezano Inf. Fem.', fecha:'Jun 2021' },
      ],
      multimedia:[ {tipo:'video',titulo:'Hat-trick vs CF Martos',icono:'fa-play-circle'}, {tipo:'foto',titulo:'Máxima goleadora liga',icono:'fa-image'}, {tipo:'foto',titulo:'Entrega de trofeos 2025',icono:'fa-image'} ],
    },
    {
      id:'j-004', nombre:'Daniel', apellidos:'Pérez Moreno', nacimiento:2001, categoria:'Sénior', localidad:'Andújar',
      posicionPrincipal:'Central', posicionesAlt:['Mediocentro Defensivo','Lateral Derecho'],
      altura:188, peso:82, pierna:'Derecha', foto:null, disponible:false,
      historialEquipos:[
        { equipo:'Andújar CF', temporadas:'2023-Actual', categoria:'Sénior' },
        { equipo:'Linares Deportivo', temporadas:'2020-2023', categoria:'Juvenil / Filial' },
        { equipo:'Bailén CF', temporadas:'2017-2020', categoria:'Cadete-Juvenil' },
      ],
      stats:{ partidos:34, goles:2, asistencias:1, tarjetasAmarillas:8, tarjetasRojas:1, minutos:2980, titular:33, suplente:1, minutoGolMedia:[78,45] },
      sello:'none',
      serviciosActivos:[],
      serviciosInfo:[],
      muroEntrenador:[
        { texto:'Central contundente con buen juego aéreo. Líder nato. Necesita más velocidad en las coberturas largas.', entrenador:'Jesús Herrera – Andújar CF', fecha:'Mar 2026' },
        { texto:'Futbolista con gran lectura del juego. Excelente en la salida de balón desde atrás.', entrenador:'Rafael Quesada – Linares Dep. Filial', fecha:'Jun 2023' },
      ],
      multimedia:[ {tipo:'video',titulo:'Mejor jugada defensiva',icono:'fa-play-circle'}, {tipo:'foto',titulo:'Capitán del equipo',icono:'fa-image'} ],
    },
    {
      id:'j-005', nombre:'Pablo', apellidos:'Herrera Jiménez', nacimiento:2009, categoria:'Infantil', localidad:'Martos',
      posicionPrincipal:'Portero', posicionesAlt:[],
      altura:178, peso:65, pierna:'Derecha', foto:null, disponible:true,
      historialEquipos:[ { equipo:'CF Martos', temporadas:'2022-Actual', categoria:'Infantil' } ],
      stats:{ partidos:22, goles:0, asistencias:0, tarjetasAmarillas:1, tarjetasRojas:0, minutos:1980, titular:22, suplente:0, minutoGolMedia:[] },
      sello:'silver',
      serviciosActivos:['srv-3'],
      serviciosInfo:[ {nombre:'Preparación Física',duracion:'3 meses',icono:'fa-dumbbell'} ],
      muroEntrenador:[ { texto:'Portero con reflejos sobresalientes para su edad. Muy buena colocación. Debe trabajar el juego con los pies.', entrenador:'Diego Navarro – CF Martos Infantil', fecha:'Ene 2026' } ],
      multimedia:[ {tipo:'video',titulo:'Paradas clave jornada 10',icono:'fa-play-circle'}, {tipo:'foto',titulo:'Portería a cero',icono:'fa-image'} ],
    },
    {
      id:'j-006', nombre:'Lucía', apellidos:'Romero Torres', nacimiento:2005, categoria:'Juvenil', localidad:'Alcalá la Real',
      posicionPrincipal:'Mediapunta', posicionesAlt:['Extremo Derecho','Interior Izquierdo'],
      altura:168, peso:58, pierna:'Derecha', foto:null, disponible:true,
      historialEquipos:[
        { equipo:'Real Jaén CF', temporadas:'2023-Actual', categoria:'Juvenil Fem.' },
        { equipo:'CD Úbeda Viva', temporadas:'2020-2023', categoria:'Cadete Fem.' },
      ],
      stats:{ partidos:30, goles:11, asistencias:15, tarjetasAmarillas:2, tarjetasRojas:0, minutos:2480, titular:28, suplente:2, minutoGolMedia:[12,29,37,55,63,70,76,81,44,58,87] },
      sello:'gold',
      serviciosActivos:['srv-1','srv-2'],
      serviciosInfo:[ {nombre:'Nutrición Deportiva',duracion:'5 meses',icono:'fa-apple-whole'}, {nombre:'Psicología Deportiva',duracion:'4 meses',icono:'fa-brain'} ],
      muroEntrenador:[
        { texto:'Jugadora total. Creatividad y visión de juego por encima de la media. Referente del equipo.', entrenador:'Ana Belén Ortiz – Real Jaén Juv. Fem.', fecha:'Feb 2026' },
        { texto:'Gran capacidad asociativa. Necesita ganar en intensidad defensiva y potencia física.', entrenador:'Laura García – CD Úbeda Viva Cadete Fem.', fecha:'Jun 2023' },
      ],
      multimedia:[ {tipo:'video',titulo:'Mejores jugadas 2025',icono:'fa-play-circle'}, {tipo:'video',titulo:'Gol de falta directa',icono:'fa-play-circle'}, {tipo:'foto',titulo:'Celebración ascenso',icono:'fa-image'} ],
    },
    {
      id:'j-007', nombre:'Adrián', apellidos:'López Castillo', nacimiento:2003, categoria:'Sénior', localidad:'Bailén',
      posicionPrincipal:'Lateral Izquierdo', posicionesAlt:['Extremo Izquierdo','Central'],
      altura:175, peso:70, pierna:'Izquierda', foto:null, disponible:true,
      historialEquipos:[
        { equipo:'Bailén CF', temporadas:'2023-Actual', categoria:'Sénior' },
        { equipo:'Real Jaén CF', temporadas:'2020-2023', categoria:'Juvenil A / Filial' },
      ],
      stats:{ partidos:30, goles:3, asistencias:9, tarjetasAmarillas:5, tarjetasRojas:0, minutos:2540, titular:27, suplente:3, minutoGolMedia:[65,82,41] },
      sello:'none', serviciosActivos:[], serviciosInfo:[],
      muroEntrenador:[ { texto:'Lateral con gran proyección ofensiva y buen centro. Debe mejorar la concentración defensiva.', entrenador:'Pablo Jiménez – Bailén CF', fecha:'Mar 2026' } ],
      multimedia:[ {tipo:'video',titulo:'Internadas por banda',icono:'fa-play-circle'}, {tipo:'foto',titulo:'Once titular jornada 20',icono:'fa-image'} ],
    },
    {
      id:'j-008', nombre:'Iker', apellidos:'Navarro Peinado', nacimiento:2010, categoria:'Alevín', localidad:'Torredonjimeno',
      posicionPrincipal:'Interior Derecho', posicionesAlt:['Mediocentro','Extremo Derecho'],
      altura:152, peso:42, pierna:'Derecha', foto:null, disponible:false,
      historialEquipos:[ { equipo:'Torredonjimeno CF', temporadas:'2023-Actual', categoria:'Alevín A' } ],
      stats:{ partidos:18, goles:8, asistencias:6, tarjetasAmarillas:0, tarjetasRojas:0, minutos:1350, titular:16, suplente:2, minutoGolMedia:[10,25,33,52,61,70,44,80] },
      sello:'none', serviciosActivos:[], serviciosInfo:[],
      muroEntrenador:[ { texto:'Talento puro. Muy buena conducción y regate para su edad.', entrenador:'Sergio Muñoz – Torredonjimeno CF Alevín', fecha:'Dic 2025' } ],
      multimedia:[ {tipo:'video',titulo:'Mejores regates 2025',icono:'fa-play-circle'} ],
    },
    {
      id:'j-009', nombre:'Marcos', apellidos:'Del Moral Cano', nacimiento:1999, categoria:'Sénior', localidad:'La Carolina',
      posicionPrincipal:'Extremo Derecho', posicionesAlt:['Delantero Centro','Mediapunta'],
      altura:174, peso:71, pierna:'Derecha', foto:null, disponible:true,
      historialEquipos:[
        { equipo:'La Carolina FC', temporadas:'2024-Actual', categoria:'Sénior' },
        { equipo:'Linares Deportivo', temporadas:'2021-2024', categoria:'Sénior' },
        { equipo:'Real Jaén CF', temporadas:'2018-2021', categoria:'Juvenil / Filial' },
      ],
      stats:{ partidos:26, goles:10, asistencias:8, tarjetasAmarillas:4, tarjetasRojas:0, minutos:2100, titular:22, suplente:4, minutoGolMedia:[5,18,29,42,56,68,75,83,90,37] },
      sello:'silver', serviciosActivos:['srv-5'],
      serviciosInfo:[ {nombre:'Video Análisis',duracion:'2 meses',icono:'fa-video'} ],
      muroEntrenador:[
        { texto:'Extremo vertical con gran velocidad punta. Excelente en contraataques.', entrenador:'Juan Carlos Moral – La Carolina FC', fecha:'Feb 2026' },
        { texto:'Jugador diferencial en esta categoría. Su velocidad marca diferencias.', entrenador:'Antonio López – Linares Dep.', fecha:'Jun 2024' },
      ],
      multimedia:[ {tipo:'video',titulo:'Top 5 goles temporada',icono:'fa-play-circle'}, {tipo:'video',titulo:'Sprint y gol vs Andújar',icono:'fa-play-circle'}, {tipo:'foto',titulo:'Once ideal jornada 12',icono:'fa-image'} ],
    },
    {
      id:'j-010', nombre:'Sara', apellidos:'Gálvez Medina', nacimiento:2007, categoria:'Cadete', localidad:'Cazorla',
      posicionPrincipal:'Mediocentro Defensivo', posicionesAlt:['Central','Mediocentro'],
      altura:170, peso:60, pierna:'Derecha', foto:null, disponible:true,
      historialEquipos:[ { equipo:'CD Cazorla', temporadas:'2022-Actual', categoria:'Cadete Fem.' } ],
      stats:{ partidos:20, goles:1, asistencias:4, tarjetasAmarillas:3, tarjetasRojas:0, minutos:1750, titular:19, suplente:1, minutoGolMedia:[62] },
      sello:'silver', serviciosActivos:['srv-3'],
      serviciosInfo:[ {nombre:'Preparación Física',duracion:'4 meses',icono:'fa-dumbbell'} ],
      muroEntrenador:[ { texto:'Mediocentro defensivo de gran inteligencia táctica. Lee las líneas de pase del rival con anticipación.', entrenador:'Fernando Siles – CD Cazorla Cadete Fem.', fecha:'Ene 2026' } ],
      multimedia:[ {tipo:'video',titulo:'Recuperaciones clave',icono:'fa-play-circle'}, {tipo:'foto',titulo:'Once titular Copa Jaén',icono:'fa-image'} ],
    },
    {
      id:'j-011', nombre:'Hugo', apellidos:'Quesada Ríos', nacimiento:2004, categoria:'Sénior', localidad:'Jódar',
      posicionPrincipal:'Segundo Delantero', posicionesAlt:['Delantero Centro','Mediapunta'],
      altura:179, peso:73, pierna:'Ambidiestro', foto:null, disponible:true,
      historialEquipos:[
        { equipo:'Jódar CF', temporadas:'2024-Actual', categoria:'Sénior' },
        { equipo:'CD Torreperogil', temporadas:'2021-2024', categoria:'Juvenil' },
      ],
      stats:{ partidos:24, goles:13, asistencias:5, tarjetasAmarillas:2, tarjetasRojas:0, minutos:1920, titular:20, suplente:4, minutoGolMedia:[7,19,32,44,55,61,70,77,83,88,14,50,68] },
      sello:'gold',
      serviciosActivos:['srv-1','srv-2','srv-3'],
      serviciosInfo:[ {nombre:'Nutrición Deportiva',duracion:'3 meses',icono:'fa-apple-whole'}, {nombre:'Psicología Deportiva',duracion:'2 meses',icono:'fa-brain'}, {nombre:'Preparación Física',duracion:'6 meses',icono:'fa-dumbbell'} ],
      muroEntrenador:[
        { texto:'Delantero muy completo y versátil. Gran movilidad y capacidad de aparecer en todas las zonas de ataque.', entrenador:'Carlos Medina – Jódar CF', fecha:'Mar 2026' },
        { texto:'Jugador con gran mentalidad competitiva. Siempre quiere más. Debe mejorar el juego aéreo.', entrenador:'Luis Fernández – CD Torreperogil Juv.', fecha:'Jun 2024' },
      ],
      multimedia:[ {tipo:'video',titulo:'Todos los goles 2025/26',icono:'fa-play-circle'}, {tipo:'video',titulo:'Doblete en el derbi',icono:'fa-play-circle'}, {tipo:'foto',titulo:'Pichichi temporada',icono:'fa-image'} ],
    },
    {
      id:'j-012', nombre:'Álvaro', apellidos:'Aranda Muñoz', nacimiento:2006, categoria:'Juvenil', localidad:'Baeza',
      posicionPrincipal:'Lateral Derecho', posicionesAlt:['Extremo Derecho'],
      altura:177, peso:69, pierna:'Derecha', foto:null, disponible:false,
      historialEquipos:[ { equipo:'Atlético Baezano', temporadas:'2020-Actual', categoria:'Juvenil A' } ],
      stats:{ partidos:27, goles:2, asistencias:10, tarjetasAmarillas:4, tarjetasRojas:0, minutos:2300, titular:25, suplente:2, minutoGolMedia:[72,85] },
      sello:'none', serviciosActivos:[], serviciosInfo:[],
      muroEntrenador:[ { texto:'Lateral incansable con gran capacidad de recorrido. Buena técnica en el centro.', entrenador:'José Ramón Vega – Atl. Baezano Juv. A', fecha:'Feb 2026' } ],
      multimedia:[ {tipo:'video',titulo:'Asistencias desde banda',icono:'fa-play-circle'}, {tipo:'foto',titulo:'Defensa del año',icono:'fa-image'} ],
    },
    // ---- Nuevos jugadores añadidos para ampliar la base de datos ----
    {
      id:'j-013', nombre:'Raúl', apellidos:'Ortiz Blanco', nacimiento:2008, categoria:'Cadete', localidad:'Alcaudete',
      posicionPrincipal:'Mediocentro', posicionesAlt:['Interior Izquierdo'],
      altura:172, peso:63, pierna:'Izquierda', foto:null, disponible:true,
      historialEquipos:[ { equipo:'CD Alcaudete', temporadas:'2023-Actual', categoria:'Cadete A' } ],
      stats:{ partidos:22, goles:4, asistencias:8, tarjetasAmarillas:2, tarjetasRojas:0, minutos:1870, titular:20, suplente:2, minutoGolMedia:[17,43,66,88] },
      sello:'silver', serviciosActivos:['srv-2'],
      serviciosInfo:[ {nombre:'Psicología Deportiva',duracion:'2 meses',icono:'fa-brain'} ],
      muroEntrenador:[ { texto:'Centrocampista con una zurda privilegiada. Buen cambio de orientación. Necesita mejorar ritmo y resistencia.', entrenador:'Ángel Morales – CD Alcaudete Cadete', fecha:'Feb 2026' } ],
      multimedia:[ {tipo:'video',titulo:'Mejores pases largos',icono:'fa-play-circle'} ],
    },
    {
      id:'j-014', nombre:'Elena', apellidos:'Castillo Ruiz', nacimiento:2005, categoria:'Juvenil', localidad:'Porcuna',
      posicionPrincipal:'Portero', posicionesAlt:[],
      altura:174, peso:64, pierna:'Derecha', foto:null, disponible:true,
      historialEquipos:[
        { equipo:'Porcuna CF', temporadas:'2022-Actual', categoria:'Juvenil Fem.' },
        { equipo:'CD Lopera', temporadas:'2020-2022', categoria:'Infantil Fem.' },
      ],
      stats:{ partidos:26, goles:0, asistencias:0, tarjetasAmarillas:0, tarjetasRojas:0, minutos:2340, titular:26, suplente:0, minutoGolMedia:[] },
      sello:'silver', serviciosActivos:['srv-3'],
      serviciosInfo:[ {nombre:'Preparación Física',duracion:'5 meses',icono:'fa-dumbbell'} ],
      muroEntrenador:[ { texto:'Portera con personalidad enorme. Gran manejo del área y buena comunicación con la defensa. Debe mejorar las salidas en balón aéreo.', entrenador:'Marta Jiménez – Porcuna CF Juv. Fem.', fecha:'Ene 2026' } ],
      multimedia:[ {tipo:'video',titulo:'Paradas imposibles 2025',icono:'fa-play-circle'}, {tipo:'foto',titulo:'Mejor portera de la liga',icono:'fa-image'} ],
    },
    {
      id:'j-015', nombre:'Javier', apellidos:'Molina Serrano', nacimiento:2002, categoria:'Sénior', localidad:'Huelma',
      posicionPrincipal:'Central', posicionesAlt:['Mediocentro Defensivo'],
      altura:191, peso:85, pierna:'Derecha', foto:null, disponible:true,
      historialEquipos:[
        { equipo:'CD Huelma', temporadas:'2024-Actual', categoria:'Sénior' },
        { equipo:'Atlético Mancha Real', temporadas:'2021-2024', categoria:'Sénior / Filial' },
      ],
      stats:{ partidos:29, goles:3, asistencias:0, tarjetasAmarillas:7, tarjetasRojas:0, minutos:2610, titular:29, suplente:0, minutoGolMedia:[35,78,90] },
      sello:'none', serviciosActivos:[], serviciosInfo:[],
      muroEntrenador:[ { texto:'Central dominante en el juego aéreo. Referente defensivo. Necesita más velocidad en coberturas.', entrenador:'Diego Carmona – CD Huelma', fecha:'Mar 2026' } ],
      multimedia:[ {tipo:'video',titulo:'Duelos aéreos ganados',icono:'fa-play-circle'} ],
    },
    {
      id:'j-016', nombre:'Nerea', apellidos:'Jiménez Moral', nacimiento:2009, categoria:'Infantil', localidad:'Villacarrillo',
      posicionPrincipal:'Extremo Derecho', posicionesAlt:['Mediapunta','Extremo Izquierdo'],
      altura:160, peso:50, pierna:'Derecha', foto:null, disponible:true,
      historialEquipos:[ { equipo:'Villacarrillo CF', temporadas:'2023-Actual', categoria:'Infantil Fem.' } ],
      stats:{ partidos:19, goles:9, asistencias:7, tarjetasAmarillas:1, tarjetasRojas:0, minutos:1560, titular:17, suplente:2, minutoGolMedia:[11,24,36,49,58,67,73,82,91] },
      sello:'none', serviciosActivos:[], serviciosInfo:[],
      muroEntrenador:[ { texto:'Jugadora con un regate endiablado. Necesita mejorar la definición y el pase final.', entrenador:'Ana López – Villacarrillo CF Inf. Fem.', fecha:'Dic 2025' } ],
      multimedia:[ {tipo:'video',titulo:'Regates y goles 2025',icono:'fa-play-circle'}, {tipo:'foto',titulo:'Goleadora del torneo',icono:'fa-image'} ],
    },
    {
      id:'j-017', nombre:'Diego', apellidos:'Ruiz Sánchez', nacimiento:2000, categoria:'Sénior', localidad:'Mengíbar',
      posicionPrincipal:'Mediocentro Defensivo', posicionesAlt:['Central','Mediocentro'],
      altura:182, peso:76, pierna:'Derecha', foto:null, disponible:false,
      historialEquipos:[
        { equipo:'CD Mengíbar', temporadas:'2023-Actual', categoria:'Sénior' },
        { equipo:'Real Jaén CF', temporadas:'2019-2023', categoria:'Filial / Primer Equipo' },
      ],
      stats:{ partidos:31, goles:1, asistencias:3, tarjetasAmarillas:9, tarjetasRojas:1, minutos:2780, titular:31, suplente:0, minutoGolMedia:[88] },
      sello:'silver', serviciosActivos:['srv-2'],
      serviciosInfo:[ {nombre:'Psicología Deportiva',duracion:'3 meses',icono:'fa-brain'} ],
      muroEntrenador:[ { texto:'Pivote incansable. Barre todo el centro del campo. Líder por personalidad. Debe mejorar la distribución en largo.', entrenador:'Sebastián Torres – CD Mengíbar', fecha:'Mar 2026' } ],
      multimedia:[ {tipo:'video',titulo:'Recuperaciones e intercepciones',icono:'fa-play-circle'} ],
    },
    {
      id:'j-018', nombre:'Carmen', apellidos:'Navarro Expósito', nacimiento:2008, categoria:'Cadete', localidad:'Jaén',
      posicionPrincipal:'Central', posicionesAlt:['Lateral Derecho'],
      altura:172, peso:62, pierna:'Derecha', foto:null, disponible:true,
      historialEquipos:[
        { equipo:'Real Jaén CF', temporadas:'2022-Actual', categoria:'Cadete Fem.' },
      ],
      stats:{ partidos:24, goles:2, asistencias:1, tarjetasAmarillas:4, tarjetasRojas:0, minutos:2100, titular:23, suplente:1, minutoGolMedia:[55,90] },
      sello:'silver', serviciosActivos:['srv-1','srv-3'],
      serviciosInfo:[ {nombre:'Nutrición Deportiva',duracion:'3 meses',icono:'fa-apple-whole'}, {nombre:'Preparación Física',duracion:'4 meses',icono:'fa-dumbbell'} ],
      muroEntrenador:[ { texto:'Central con temperamento. Buena en el uno contra uno y en la salida de balón. Debe mejorar la velocidad de reacción.', entrenador:'Ana Belén Ortiz – Real Jaén Cadete Fem.', fecha:'Feb 2026' } ],
      multimedia:[ {tipo:'foto',titulo:'Capitana del equipo',icono:'fa-image'} ],
    },
    {
      id:'j-019', nombre:'Gonzalo', apellidos:'Fernández Cano', nacimiento:2010, categoria:'Alevín', localidad:'Arjona',
      posicionPrincipal:'Delantero Centro', posicionesAlt:['Extremo Izquierdo'],
      altura:150, peso:40, pierna:'Derecha', foto:null, disponible:true,
      historialEquipos:[ { equipo:'Arjona CF', temporadas:'2024-Actual', categoria:'Alevín' } ],
      stats:{ partidos:16, goles:12, asistencias:3, tarjetasAmarillas:0, tarjetasRojas:0, minutos:1200, titular:14, suplente:2, minutoGolMedia:[5,14,22,31,40,48,55,63,71,79,85,90] },
      sello:'none', serviciosActivos:[], serviciosInfo:[],
      muroEntrenador:[ { texto:'Goleador nato. Una máquina de hacer goles para su edad. Tiene que aprender a jugar de espaldas y asociarse.', entrenador:'Ramón Pérez – Arjona CF Alevín', fecha:'Ene 2026' } ],
      multimedia:[ {tipo:'video',titulo:'Goles temporada 25/26',icono:'fa-play-circle'} ],
    },
    {
      id:'j-020', nombre:'Paula', apellidos:'Moral Heredia', nacimiento:2006, categoria:'Juvenil', localidad:'Linares',
      posicionPrincipal:'Interior Izquierdo', posicionesAlt:['Mediocentro','Mediapunta'],
      altura:166, peso:57, pierna:'Izquierda', foto:null, disponible:true,
      historialEquipos:[
        { equipo:'Linares Deportivo', temporadas:'2022-Actual', categoria:'Juvenil Fem.' },
      ],
      stats:{ partidos:28, goles:6, asistencias:11, tarjetasAmarillas:1, tarjetasRojas:0, minutos:2340, titular:26, suplente:2, minutoGolMedia:[18,33,51,67,74,89] },
      sello:'gold', serviciosActivos:['srv-1','srv-2','srv-3'],
      serviciosInfo:[ {nombre:'Nutrición Deportiva',duracion:'4 meses',icono:'fa-apple-whole'}, {nombre:'Psicología Deportiva',duracion:'3 meses',icono:'fa-brain'}, {nombre:'Preparación Física',duracion:'5 meses',icono:'fa-dumbbell'} ],
      muroEntrenador:[ { texto:'Interior con una zurda exquisita. Asociación, visión y última pasada de altísimo nivel. Referente técnica del equipo.', entrenador:'Marta Jiménez – Linares Dep. Juv. Fem.', fecha:'Feb 2026' } ],
      multimedia:[ {tipo:'video',titulo:'Asistencias de gol 2025',icono:'fa-play-circle'}, {tipo:'foto',titulo:'Jugadora del mes',icono:'fa-image'} ],
    },
    {
      id:'j-021', nombre:'Manuel', apellidos:'Torres Gallego', nacimiento:2003, categoria:'Sénior', localidad:'Úbeda',
      posicionPrincipal:'Extremo Izquierdo', posicionesAlt:['Delantero Centro','Segundo Delantero'],
      altura:176, peso:72, pierna:'Izquierda', foto:null, disponible:true,
      historialEquipos:[
        { equipo:'CD Úbeda Viva', temporadas:'2024-Actual', categoria:'Sénior' },
        { equipo:'Atlético Baezano', temporadas:'2021-2024', categoria:'Juvenil / Sénior' },
      ],
      stats:{ partidos:25, goles:8, asistencias:6, tarjetasAmarillas:3, tarjetasRojas:0, minutos:2000, titular:21, suplente:4, minutoGolMedia:[9,28,37,52,65,73,81,90] },
      sello:'none', serviciosActivos:[], serviciosInfo:[],
      muroEntrenador:[ { texto:'Extremo desequilibrante con un disparo muy potente con la izquierda. Debe mejorar el repliegue defensivo.', entrenador:'Antonio Carmona – CD Úbeda Viva', fecha:'Mar 2026' } ],
      multimedia:[ {tipo:'video',titulo:'Goles desde fuera del área',icono:'fa-play-circle'} ],
    },
    {
      id:'j-022', nombre:'Aitana', apellidos:'Serrano Muñoz', nacimiento:2009, categoria:'Infantil', localidad:'Baeza',
      posicionPrincipal:'Mediapunta', posicionesAlt:['Interior Derecho','Extremo Derecho'],
      altura:158, peso:48, pierna:'Derecha', foto:null, disponible:true,
      historialEquipos:[ { equipo:'Atlético Baezano', temporadas:'2023-Actual', categoria:'Infantil Fem.' } ],
      stats:{ partidos:20, goles:7, asistencias:9, tarjetasAmarillas:0, tarjetasRojas:0, minutos:1680, titular:18, suplente:2, minutoGolMedia:[15,30,44,57,68,76,88] },
      sello:'none', serviciosActivos:[], serviciosInfo:[],
      muroEntrenador:[ { texto:'Jugadora con una creatividad enorme. Ve pases que nadie más ve. Gran futuro si sigue trabajando.', entrenador:'José Ramón Vega – Atl. Baezano Inf. Fem.', fecha:'Ene 2026' } ],
      multimedia:[ {tipo:'video',titulo:'Asistencias y goles',icono:'fa-play-circle'} ],
    },
    {
      id:'j-023', nombre:'Fernando', apellidos:'Gómez Pérez', nacimiento:2001, categoria:'Sénior', localidad:'Torredelcampo',
      posicionPrincipal:'Portero', posicionesAlt:[],
      altura:189, peso:83, pierna:'Derecha', foto:null, disponible:false,
      historialEquipos:[
        { equipo:'Torredelcampo CF', temporadas:'2023-Actual', categoria:'Sénior' },
        { equipo:'Real Jaén CF', temporadas:'2020-2023', categoria:'Filial' },
      ],
      stats:{ partidos:30, goles:0, asistencias:0, tarjetasAmarillas:2, tarjetasRojas:0, minutos:2700, titular:30, suplente:0, minutoGolMedia:[] },
      sello:'none', serviciosActivos:[], serviciosInfo:[],
      muroEntrenador:[ { texto:'Portero experimentado con gran seguridad bajo palos. Referente para los jóvenes. Buen juego con los pies.', entrenador:'Miguel Sánchez – Torredelcampo CF', fecha:'Mar 2026' } ],
      multimedia:[ {tipo:'video',titulo:'Paradas de la temporada',icono:'fa-play-circle'} ],
    },
    {
      id:'j-024', nombre:'Rocío', apellidos:'López García', nacimiento:2007, categoria:'Cadete', localidad:'Andújar',
      posicionPrincipal:'Lateral Izquierdo', posicionesAlt:['Central','Extremo Izquierdo'],
      altura:168, peso:58, pierna:'Izquierda', foto:null, disponible:true,
      historialEquipos:[ { equipo:'Andújar CF', temporadas:'2022-Actual', categoria:'Cadete Fem.' } ],
      stats:{ partidos:23, goles:1, asistencias:8, tarjetasAmarillas:2, tarjetasRojas:0, minutos:1980, titular:21, suplente:2, minutoGolMedia:[73] },
      sello:'silver', serviciosActivos:['srv-1'],
      serviciosInfo:[ {nombre:'Nutrición Deportiva',duracion:'2 meses',icono:'fa-apple-whole'} ],
      muroEntrenador:[ { texto:'Lateral con gran proyección. Excelente en los centros al área. Buena mentalidad defensiva.', entrenador:'Jesús Herrera – Andújar CF Cadete Fem.', fecha:'Feb 2026' } ],
      multimedia:[ {tipo:'foto',titulo:'Mejor lateral de la liga',icono:'fa-image'} ],
    },
    {
      id:'j-025', nombre:'Antonio', apellidos:'Vega Medina', nacimiento:2004, categoria:'Sénior', localidad:'Mancha Real',
      posicionPrincipal:'Interior Derecho', posicionesAlt:['Mediocentro','Mediapunta'],
      altura:178, peso:71, pierna:'Derecha', foto:null, disponible:true,
      historialEquipos:[
        { equipo:'Atlético Mancha Real', temporadas:'2023-Actual', categoria:'Sénior' },
        { equipo:'Real Jaén CF', temporadas:'2021-2023', categoria:'Juvenil' },
      ],
      stats:{ partidos:27, goles:7, asistencias:6, tarjetasAmarillas:3, tarjetasRojas:0, minutos:2200, titular:24, suplente:3, minutoGolMedia:[12,33,48,61,72,80,90] },
      sello:'silver', serviciosActivos:['srv-5'],
      serviciosInfo:[ {nombre:'Video Análisis',duracion:'3 meses',icono:'fa-video'} ],
      muroEntrenador:[ { texto:'Interior con llegada. Buen disparo de media distancia y capacidad para incorporarse al ataque. Debe mejorar el trabajo sin balón.', entrenador:'Francisco Moral – Atl. Mancha Real', fecha:'Mar 2026' } ],
      multimedia:[ {tipo:'video',titulo:'Goles de media distancia',icono:'fa-play-circle'} ],
    },
    {
      id:'j-026', nombre:'Irene', apellidos:'Carmona Roldán', nacimiento:2010, categoria:'Alevín', localidad:'Martos',
      posicionPrincipal:'Mediocentro', posicionesAlt:['Interior Derecho','Interior Izquierdo'],
      altura:148, peso:38, pierna:'Ambidiestro', foto:null, disponible:true,
      historialEquipos:[ { equipo:'CF Martos', temporadas:'2024-Actual', categoria:'Alevín Fem.' } ],
      stats:{ partidos:14, goles:3, asistencias:5, tarjetasAmarillas:0, tarjetasRojas:0, minutos:1050, titular:12, suplente:2, minutoGolMedia:[28,55,76] },
      sello:'none', serviciosActivos:[], serviciosInfo:[],
      muroEntrenador:[ { texto:'Centrocampista con una visión de juego extraordinaria para su edad. Ambidiestra. Gran futuro.', entrenador:'Diego Navarro – CF Martos Alevín Fem.', fecha:'Dic 2025' } ],
      multimedia:[ {tipo:'foto',titulo:'Jugadora revelación',icono:'fa-image'} ],
    },
    {
      id:'j-027', nombre:'David', apellidos:'Heredia Sánchez', nacimiento:2005, categoria:'Juvenil', localidad:'Alcalá la Real',
      posicionPrincipal:'Delantero Centro', posicionesAlt:['Segundo Delantero'],
      altura:183, peso:75, pierna:'Derecha', foto:null, disponible:true,
      historialEquipos:[
        { equipo:'Alcalá la Real CF', temporadas:'2022-Actual', categoria:'Juvenil A' },
      ],
      stats:{ partidos:26, goles:15, asistencias:4, tarjetasAmarillas:3, tarjetasRojas:0, minutos:2180, titular:24, suplente:2, minutoGolMedia:[3,15,27,38,44,52,60,68,74,80,85,89,11,35,56] },
      sello:'gold', serviciosActivos:['srv-1','srv-2','srv-3'],
      serviciosInfo:[ {nombre:'Nutrición Deportiva',duracion:'5 meses',icono:'fa-apple-whole'}, {nombre:'Psicología Deportiva',duracion:'3 meses',icono:'fa-brain'}, {nombre:'Preparación Física',duracion:'4 meses',icono:'fa-dumbbell'} ],
      muroEntrenador:[ { texto:'Delantero de área. Depredador en el área rival. Buen juego aéreo y excelente definición. Debe mejorar la participación fuera del área.', entrenador:'Alberto Moral – Alcalá la Real CF Juv. A', fecha:'Feb 2026' } ],
      multimedia:[ {tipo:'video',titulo:'Goles de la temporada',icono:'fa-play-circle'}, {tipo:'foto',titulo:'Pichichi de la liga provincial',icono:'fa-image'} ],
    },
    {
      id:'j-028', nombre:'Clara', apellidos:'Gallego Ortiz', nacimiento:2006, categoria:'Juvenil', localidad:'Jaén',
      posicionPrincipal:'Extremo Izquierdo', posicionesAlt:['Mediapunta','Interior Izquierdo'],
      altura:164, peso:55, pierna:'Izquierda', foto:null, disponible:true,
      historialEquipos:[
        { equipo:'Real Jaén CF', temporadas:'2023-Actual', categoria:'Juvenil Fem.' },
        { equipo:'Atlético Mancha Real', temporadas:'2021-2023', categoria:'Cadete Fem.' },
      ],
      stats:{ partidos:27, goles:10, asistencias:13, tarjetasAmarillas:1, tarjetasRojas:0, minutos:2250, titular:25, suplente:2, minutoGolMedia:[8,22,35,50,62,73,81,88,15,41] },
      sello:'gold', serviciosActivos:['srv-1','srv-3'],
      serviciosInfo:[ {nombre:'Nutrición Deportiva',duracion:'4 meses',icono:'fa-apple-whole'}, {nombre:'Preparación Física',duracion:'3 meses',icono:'fa-dumbbell'} ],
      muroEntrenador:[ { texto:'Extremo con magia en los pies. Desborde y último pase de nivel superior. Candidata a selección andaluza.', entrenador:'Ana Belén Ortiz – Real Jaén Juv. Fem.', fecha:'Mar 2026' } ],
      multimedia:[ {tipo:'video',titulo:'Highlights temporada',icono:'fa-play-circle'}, {tipo:'foto',titulo:'Convocatoria selección',icono:'fa-image'} ],
    },
    {
      id:'j-029', nombre:'Sergio', apellidos:'Morales Expósito', nacimiento:2003, categoria:'Sénior', localidad:'Quesada',
      posicionPrincipal:'Lateral Derecho', posicionesAlt:['Lateral Izquierdo','Mediocentro Defensivo'],
      altura:176, peso:70, pierna:'Derecha', foto:null, disponible:true,
      historialEquipos:[
        { equipo:'Quesada CF', temporadas:'2024-Actual', categoria:'Sénior' },
        { equipo:'CD Cazorla', temporadas:'2021-2024', categoria:'Juvenil / Sénior' },
      ],
      stats:{ partidos:23, goles:1, asistencias:7, tarjetasAmarillas:5, tarjetasRojas:0, minutos:1950, titular:21, suplente:2, minutoGolMedia:[82] },
      sello:'none', serviciosActivos:[], serviciosInfo:[],
      muroEntrenador:[ { texto:'Lateral aguerrido y competitivo. Buena proyección por banda. Necesita mejorar los centros en carrera.', entrenador:'Pedro Gallego – Quesada CF', fecha:'Feb 2026' } ],
      multimedia:[ {tipo:'video',titulo:'Mejores jugadas por banda',icono:'fa-play-circle'} ],
    },
    {
      id:'j-030', nombre:'Martina', apellidos:'Siles Carmona', nacimiento:2008, categoria:'Cadete', localidad:'Torreperogil',
      posicionPrincipal:'Delantero Centro', posicionesAlt:['Extremo Derecho','Segundo Delantero'],
      altura:167, peso:57, pierna:'Derecha', foto:null, disponible:true,
      historialEquipos:[ { equipo:'CD Torreperogil', temporadas:'2022-Actual', categoria:'Cadete Fem.' } ],
      stats:{ partidos:21, goles:11, asistencias:5, tarjetasAmarillas:1, tarjetasRojas:0, minutos:1750, titular:19, suplente:2, minutoGolMedia:[6,19,33,45,54,63,71,78,84,90,27] },
      sello:'silver', serviciosActivos:['srv-1'],
      serviciosInfo:[ {nombre:'Nutrición Deportiva',duracion:'2 meses',icono:'fa-apple-whole'} ],
      muroEntrenador:[ { texto:'Delantera con instinto goleador. Rápida y decidida en el mano a mano. Debe mejorar el juego de espaldas.', entrenador:'Luis Fernández – CD Torreperogil Cadete Fem.', fecha:'Ene 2026' } ],
      multimedia:[ {tipo:'video',titulo:'Goles de la temporada',icono:'fa-play-circle'}, {tipo:'foto',titulo:'Máxima goleadora',icono:'fa-image'} ],
    },
    {
      id:'j-031', nombre:'Francisco', apellidos:'Medina Ruiz', nacimiento:2002, categoria:'Sénior', localidad:'Lopera',
      posicionPrincipal:'Mediocentro', posicionesAlt:['Mediapunta','Interior Derecho'],
      altura:180, peso:74, pierna:'Derecha', foto:null, disponible:true,
      historialEquipos:[
        { equipo:'CD Lopera', temporadas:'2024-Actual', categoria:'Sénior' },
        { equipo:'Porcuna CF', temporadas:'2021-2024', categoria:'Sénior' },
      ],
      stats:{ partidos:28, goles:4, asistencias:10, tarjetasAmarillas:4, tarjetasRojas:0, minutos:2380, titular:26, suplente:2, minutoGolMedia:[22,55,71,88] },
      sello:'none', serviciosActivos:[], serviciosInfo:[],
      muroEntrenador:[ { texto:'Centrocampista organizador. Buen tempo de partido. El equipo juega diferente con él en el campo.', entrenador:'Miguel Torres – CD Lopera', fecha:'Mar 2026' } ],
      multimedia:[ {tipo:'video',titulo:'Pases de gol',icono:'fa-play-circle'} ],
    },
    {
      id:'j-032', nombre:'Alba', apellidos:'Quesada Herrera', nacimiento:2007, categoria:'Cadete', localidad:'Santisteban del Puerto',
      posicionPrincipal:'Interior Derecho', posicionesAlt:['Mediocentro','Extremo Derecho'],
      altura:163, peso:53, pierna:'Derecha', foto:null, disponible:true,
      historialEquipos:[ { equipo:'Santisteban CF', temporadas:'2023-Actual', categoria:'Cadete Fem.' } ],
      stats:{ partidos:18, goles:5, asistencias:6, tarjetasAmarillas:1, tarjetasRojas:0, minutos:1500, titular:16, suplente:2, minutoGolMedia:[20,38,55,70,85] },
      sello:'none', serviciosActivos:[], serviciosInfo:[],
      muroEntrenador:[ { texto:'Interior con muy buena llegada al área. Trabajadora y con buen pie. Tiene que mejorar la resistencia.', entrenador:'Carlos Vega – Santisteban CF Cadete Fem.', fecha:'Feb 2026' } ],
      multimedia:[ {tipo:'foto',titulo:'Once revelación de la liga',icono:'fa-image'} ],
    },
    {
      id:'j-033', nombre:'Alexis', apellidos:'Carmona Torres', nacimiento:2004, categoria:'Sénior', localidad:'Sabiote',
      posicionPrincipal:'Segundo Delantero', posicionesAlt:['Delantero Centro','Extremo Izquierdo'],
      altura:175, peso:69, pierna:'Ambidiestro', foto:null, disponible:true,
      historialEquipos:[
        { equipo:'CD Sabiote', temporadas:'2024-Actual', categoria:'Sénior' },
        { equipo:'Atlético Baezano', temporadas:'2021-2024', categoria:'Juvenil / Sénior' },
      ],
      stats:{ partidos:22, goles:9, asistencias:4, tarjetasAmarillas:2, tarjetasRojas:0, minutos:1760, titular:18, suplente:4, minutoGolMedia:[8,22,35,50,63,72,80,87,91] },
      sello:'none', serviciosActivos:[], serviciosInfo:[],
      muroEntrenador:[ { texto:'Delantero con mucha movilidad y buen regate. Ambidiestro lo que le da mucha versatilidad. Debe mejorar el juego aéreo.', entrenador:'Ramón Torres – CD Sabiote', fecha:'Mar 2026' } ],
      multimedia:[ {tipo:'video',titulo:'Resumen de goles',icono:'fa-play-circle'} ],
    },
    {
      id:'j-034', nombre:'Laura', apellidos:'Expósito Vega', nacimiento:2005, categoria:'Juvenil', localidad:'Beas de Segura',
      posicionPrincipal:'Mediocentro Defensivo', posicionesAlt:['Central','Mediocentro'],
      altura:171, peso:62, pierna:'Derecha', foto:null, disponible:true,
      historialEquipos:[ { equipo:'Beas de Segura CF', temporadas:'2022-Actual', categoria:'Juvenil Fem.' } ],
      stats:{ partidos:25, goles:0, asistencias:5, tarjetasAmarillas:5, tarjetasRojas:0, minutos:2200, titular:24, suplente:1, minutoGolMedia:[] },
      sello:'silver', serviciosActivos:['srv-3'],
      serviciosInfo:[ {nombre:'Preparación Física',duracion:'5 meses',icono:'fa-dumbbell'} ],
      muroEntrenador:[ { texto:'Pivote rocosa. Gana todos los duelos por abajo. Lectura defensiva extraordinaria. Debe mejorar su distribución.', entrenador:'Marta Sánchez – Beas de Segura CF Juv. Fem.', fecha:'Feb 2026' } ],
      multimedia:[ {tipo:'video',titulo:'Duelos y robos de balón',icono:'fa-play-circle'} ],
    },
    {
      id:'j-035', nombre:'Roberto', apellidos:'Gallego Sánchez', nacimiento:2010, categoria:'Alevín', localidad:'Guarromán',
      posicionPrincipal:'Extremo Izquierdo', posicionesAlt:['Delantero Centro'],
      altura:147, peso:37, pierna:'Izquierda', foto:null, disponible:true,
      historialEquipos:[ { equipo:'Guarromán CF', temporadas:'2024-Actual', categoria:'Alevín' } ],
      stats:{ partidos:15, goles:7, asistencias:4, tarjetasAmarillas:0, tarjetasRojas:0, minutos:1100, titular:13, suplente:2, minutoGolMedia:[12,28,41,55,68,77,88] },
      sello:'none', serviciosActivos:[], serviciosInfo:[],
      muroEntrenador:[ { texto:'Pequeño pero muy habilidoso. Gran velocidad y regate corto. Zurdo puro con mucho desparpajo.', entrenador:'Antonio Pérez – Guarromán CF Alevín', fecha:'Dic 2025' } ],
      multimedia:[ {tipo:'video',titulo:'Regates y velocidad',icono:'fa-play-circle'} ],
    },
  ];

  // ---- Matchmaking Mock (ampliado con fechas exactas) ----
  const matchmaking = [
    {
      id:'match-1', jugadorId:'j-001',
      club:'Linares Deportivo', clubLogo:'🔵', clubInfo:'División de Honor Cadete · Linares',
      estado:'matched', necesidad:'Buscan delantero centro con movilidad para su sistema 4-3-3.',
      fecha:'15/01/2026',
      mensajes:[
        { tipo:'received', texto:'Hola Alejandro, nos gustaría invitarte a una sesión de entrenamiento con nuestro Cadete A. ¿Estarías interesado?', tiempo:'15/01/2026 · 10:30' },
        { tipo:'sent', texto:'¡Hola! Sí, estoy muy interesado. ¿Qué día podría ser?', tiempo:'15/01/2026 · 14:15' },
        { tipo:'received', texto:'Perfecto, te esperamos el miércoles a las 18:00 en el Campo Municipal de Linarejos.', tiempo:'16/01/2026 · 09:00' },
      ],
    },
    {
      id:'match-2', jugadorId:'j-006',
      club:'Atlético Mancha Real', clubLogo:'🔴', clubInfo:'Liga Provincial Juvenil Fem. · Mancha Real',
      estado:'pending', necesidad:'Buscan mediapunta creativa para reforzar la zona ofensiva.',
      fecha:'02/03/2026',
      mensajes:[],
    },
    {
      id:'match-3', jugadorId:'j-009',
      club:'Real Jaén CF', clubLogo:'⚽', clubInfo:'Tercera RFEF · Jaén',
      estado:'pending', necesidad:'Buscan extremo derecho con velocidad y desborde para el primer equipo.',
      fecha:'05/03/2026',
      mensajes:[],
    },
    {
      id:'match-4', jugadorId:'j-004',
      club:'Torredonjimeno CF', clubLogo:'🟡', clubInfo:'Tercera RFEF · Torredonjimeno',
      estado:'rejected', necesidad:'Buscaban central con experiencia.',
      fecha:'20/02/2026',
      mensajes:[],
    },
    {
      id:'match-5', jugadorId:'j-011',
      club:'Linares Deportivo', clubLogo:'🔵', clubInfo:'Tercera RFEF · Linares',
      estado:'matched', necesidad:'Buscan segundo delantero ambidiestro con movilidad.',
      fecha:'10/02/2026',
      mensajes:[
        { tipo:'received', texto:'Hugo, hemos seguido tu trayectoria esta temporada. Nos gustaría hacerte una prueba con el primer equipo.', tiempo:'10/02/2026 · 11:00' },
        { tipo:'sent', texto:'¡Muchísimas gracias! Estoy disponible cuando necesitéis.', tiempo:'10/02/2026 · 15:30' },
        { tipo:'received', texto:'Te esperamos el viernes 14 de febrero a las 17:00 en Linarejos. Trae equipación y botas.', tiempo:'11/02/2026 · 10:00' },
      ],
    },
    {
      id:'match-6', jugadorId:'j-002',
      club:'Real Jaén CF', clubLogo:'⚽', clubInfo:'División de Honor Juvenil · Jaén',
      estado:'matched', necesidad:'Necesitan mediocentro organizador para reforzar el centro del campo.',
      fecha:'22/01/2026',
      mensajes:[
        { tipo:'received', texto:'Carlos, el cuerpo técnico del Real Jaén Juvenil quiere contar contigo. ¿Podemos hablar?', tiempo:'22/01/2026 · 16:00' },
        { tipo:'sent', texto:'Por supuesto, me encantaría volver a jugar en el Real Jaén.', tiempo:'22/01/2026 · 18:45' },
      ],
    },
    {
      id:'match-7', jugadorId:'j-027',
      club:'Atlético Mancha Real', clubLogo:'🔴', clubInfo:'División de Honor Juvenil · Mancha Real',
      estado:'matched', necesidad:'Delantero centro goleador para sistema 4-4-2.',
      fecha:'28/02/2026',
      mensajes:[
        { tipo:'received', texto:'David, tus números esta temporada son impresionantes. Nos encantaría que vinieras a entrenar con nosotros.', tiempo:'28/02/2026 · 12:00' },
        { tipo:'sent', texto:'Gracias por la oportunidad. ¿Cuándo puedo ir?', tiempo:'28/02/2026 · 16:00' },
        { tipo:'received', texto:'El lunes 3 de marzo a las 18:30 en nuestro campo. Pregunta por el míster al llegar.', tiempo:'01/03/2026 · 10:00' },
      ],
    },
    {
      id:'match-8', jugadorId:'j-028',
      club:'Linares Deportivo', clubLogo:'🔵', clubInfo:'Liga Provincial Juvenil Fem. · Linares',
      estado:'pending', necesidad:'Extremo izquierdo con desborde y gol para refuerzo de media temporada.',
      fecha:'06/03/2026',
      mensajes:[],
    },
    {
      id:'match-9', jugadorId:'j-007',
      club:'Andújar CF', clubLogo:'🔷', clubInfo:'Tercera RFEF · Andújar',
      estado:'rejected', necesidad:'Lateral izquierdo con experiencia en categoría nacional.',
      fecha:'12/01/2026',
      mensajes:[],
    },
    {
      id:'match-10', jugadorId:'j-020',
      club:'Real Jaén CF', clubLogo:'⚽', clubInfo:'División Honor Juvenil Fem. · Jaén',
      estado:'matched', necesidad:'Interior izquierdo con visión de juego para su sistema 4-3-3.',
      fecha:'18/02/2026',
      mensajes:[
        { tipo:'received', texto:'Paula, tu perfil encaja perfectamente con lo que buscamos. ¿Estarías disponible para una sesión de prueba?', tiempo:'18/02/2026 · 14:00' },
        { tipo:'sent', texto:'¡Por supuesto! Estoy muy ilusionada con la oportunidad.', tiempo:'18/02/2026 · 17:30' },
      ],
    },
    {
      id:'match-11', jugadorId:'j-015',
      club:'Real Jaén CF', clubLogo:'⚽', clubInfo:'Tercera RFEF · Jaén',
      estado:'pending', necesidad:'Central con experiencia y juego aéreo para refuerzo invernal.',
      fecha:'07/03/2026',
      mensajes:[],
    },
    {
      id:'match-12', jugadorId:'j-021',
      club:'Linares Deportivo', clubLogo:'🔵', clubInfo:'Tercera RFEF · Linares',
      estado:'rejected', necesidad:'Extremo izquierdo con gol para la segunda vuelta.',
      fecha:'25/01/2026',
      mensajes:[],
    },
    {
      id:'match-13', jugadorId:'j-003',
      club:'Real Jaén CF', clubLogo:'⚽', clubInfo:'Cadete Fem. · Jaén',
      estado:'matched', necesidad:'Extremo izquierdo desequilibrante para la fase de ascenso.',
      fecha:'01/03/2026',
      mensajes:[
        { tipo:'received', texto:'María, nos gustaría contar contigo para la fase de ascenso. Tu nivel esta temporada ha sido sobresaliente.', tiempo:'01/03/2026 · 11:00' },
        { tipo:'sent', texto:'¡Gracias! Sería un sueño jugar en el Real Jaén. Estoy preparada.', tiempo:'01/03/2026 · 13:30' },
      ],
    },
    {
      id:'match-14', jugadorId:'j-025',
      club:'Atlético Baezano', clubLogo:'🟠', clubInfo:'Preferente · Baeza',
      estado:'pending', necesidad:'Interior derecho con llegada al área y gol.',
      fecha:'04/03/2026',
      mensajes:[],
    },
  ];

  // ---- Directorio de Clubes ----
  const directorioClubes = equipos.map((e, i) => ({
    ...e,
    categorias: i < 10 ? ['Sénior','Juvenil','Cadete','Infantil','Alevín'] : (i < 20 ? ['Sénior','Juvenil','Cadete'] : ['Sénior','Juvenil']),
    necesidades: i % 3 === 0 ? ['Delantero Centro','Extremo Derecho'] : (i % 3 === 1 ? ['Central','Lateral Izquierdo'] : ['Mediocentro','Mediapunta']),
    contacto: `info@${e.nombre.toLowerCase().replace(/\s+/g, '').replace(/[áéíóú]/g, c => ({á:'a',é:'e',í:'i',ó:'o',ú:'u'})[c])}.es`,
  }));

  // ---- Helpers ----
  function getJugadorById(id) { return jugadores.find(j => j.id === id); }
  function getEquipoByNombre(nombre) { return equipos.find(e => e.nombre === nombre); }

  function filtrarJugadores(filtros) {
    return jugadores.filter(j => {
      if (filtros.categoria && j.categoria !== filtros.categoria) return false;
      if (filtros.posicion && j.posicionPrincipal !== filtros.posicion) return false;
      if (filtros.localidad && j.localidad !== filtros.localidad) return false;
      if (filtros.pierna && j.pierna !== filtros.pierna) return false;
      if (filtros.disponible === true && !j.disponible) return false;
      if (filtros.sello && filtros.sello !== '') {
        if (filtros.sello === 'none' && j.sello !== 'none') return false;
        if (filtros.sello !== 'none' && j.sello !== filtros.sello) return false;
      }
      if (filtros.edadMin) { const edad = new Date().getFullYear() - j.nacimiento; if (edad < parseInt(filtros.edadMin)) return false; }
      if (filtros.edadMax) { const edad = new Date().getFullYear() - j.nacimiento; if (edad > parseInt(filtros.edadMax)) return false; }
      if (filtros.golesMin && j.stats.goles < parseInt(filtros.golesMin)) return false;
      if (filtros.nombre && filtros.nombre !== '') {
        const termino = filtros.nombre.toLowerCase();
        const nombreCompleto = `${j.nombre} ${j.apellidos}`.toLowerCase();
        if (!nombreCompleto.includes(termino)) return false;
      }
      return true;
    });
  }

  function getStatsResumen() {
    const total = jugadores.length;
    const disponibles = jugadores.filter(j => j.disponible).length;
    const conSello = jugadores.filter(j => j.sello === 'gold').length;
    const matches = matchmaking.filter(m => m.estado === 'matched').length;
    return { total, disponibles, conSello, matches };
  }

  function getMatchesByJugador(jugadorId) {
    return matchmaking.filter(m => m.jugadorId === jugadorId);
  }

  return {
    localidades, equipos, posiciones, categorias, servicios, jugadores, matchmaking,
    notificaciones, directorioClubes,
    getJugadorById, getEquipoByNombre, filtrarJugadores, getStatsResumen, getMatchesByJugador,
  };

})();
