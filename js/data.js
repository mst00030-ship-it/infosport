/* ============================================
   InfoSport – Mock Data
   Provincia de Jaén – Fútbol Base y Sénior
   ============================================ */

const MOCK_DATA = (() => {

  // ---- Localidades de Jaén ----
  const localidades = [
    'Jaén', 'Linares', 'Úbeda', 'Andújar', 'Martos',
    'Alcalá la Real', 'Bailén', 'Torredonjimeno', 'La Carolina',
    'Mancha Real', 'Jódar', 'Villacarrillo', 'Baeza', 'Mengíbar',
    'Porcuna', 'Cazorla', 'Villanueva del Arzobispo', 'Arjona',
    'Torreperogil', 'Quesada'
  ];

  // ---- Equipos de Jaén ----
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

  // ---- Categorías ----
  const categorias = ['Alevín', 'Infantil', 'Cadete', 'Juvenil', 'Sénior'];

  // ---- Servicios InfoSport (Marketplace) ----
  const servicios = [
    {
      id: 'srv-1',
      nombre: 'Plan Nutricional Deportivo',
      categoria: 'Nutrición',
      icono: 'fa-apple-whole',
      iconClass: 'nutrition',
      descripcion: 'Plan personalizado de alimentación deportiva con seguimiento mensual, adaptado a la fase de la temporada y carga de entrenamiento.',
      partner: 'NutriSport Jaén',
      precio: 45,
      periodo: '/mes',
      desbloqueaSello: true,
    },
    {
      id: 'srv-2',
      nombre: 'Psicología del Rendimiento',
      categoria: 'Psicología',
      icono: 'fa-brain',
      iconClass: 'psychology',
      descripcion: 'Sesiones individuales de psicología deportiva: gestión de presión, concentración, liderazgo y resiliencia competitiva.',
      partner: 'MindGame Sport',
      precio: 55,
      periodo: '/sesión',
      desbloqueaSello: true,
    },
    {
      id: 'srv-3',
      nombre: 'Preparación Física Individual',
      categoria: 'Preparación Física',
      icono: 'fa-dumbbell',
      iconClass: 'training',
      descripcion: 'Programa de fuerza, velocidad y resistencia personalizado. Incluye test de rendimiento inicial y seguimiento semanal.',
      partner: 'ProPhysical Jaén',
      precio: 60,
      periodo: '/mes',
      desbloqueaSello: true,
    },
    {
      id: 'srv-4',
      nombre: 'Fisioterapia Deportiva',
      categoria: 'Fisioterapia',
      icono: 'fa-hand-holding-medical',
      iconClass: 'physio',
      descripcion: 'Tratamiento y prevención de lesiones deportivas. Evaluación biomecánica, readaptación y terapia manual.',
      partner: 'FisioActiva Linares',
      precio: 40,
      periodo: '/sesión',
      desbloqueaSello: false,
    },
    {
      id: 'srv-5',
      nombre: 'Video Análisis Táctico',
      categoria: 'Análisis',
      icono: 'fa-video',
      iconClass: 'analysis',
      descripcion: 'Análisis de vídeo individualizado. Informe detallado de posicionamiento, toma de decisiones y rendimiento por partido.',
      partner: 'ScoutVision',
      precio: 35,
      periodo: '/informe',
      desbloqueaSello: false,
    },
    {
      id: 'srv-6',
      nombre: 'Recuperación y Crioterapia',
      categoria: 'Recuperación',
      icono: 'fa-snowflake',
      iconClass: 'recovery',
      descripcion: 'Sesiones de recuperación post-partido con crioterapia, electroestimulación y técnicas de descarga muscular.',
      partner: 'CryoJaén Center',
      precio: 30,
      periodo: '/sesión',
      desbloqueaSello: false,
    },
  ];

  // ---- Jugadores Mock ----
  const jugadores = [
    {
      id: 'j-001',
      nombre: 'Alejandro',
      apellidos: 'García López',
      nacimiento: 2008,
      categoria: 'Cadete',
      localidad: 'Jaén',
      posicionPrincipal: 'Delantero Centro',
      posicionesAlt: ['Segundo Delantero', 'Extremo Derecho'],
      altura: 176,
      peso: 68,
      pierna: 'Derecha',
      foto: null,
      disponible: true,
      historialEquipos: [
        { equipo: 'Real Jaén CF', temporadas: '2022-Actual', categoria: 'Cadete A' },
        { equipo: 'Atlético Mancha Real', temporadas: '2020-2022', categoria: 'Alevín' },
      ],
      stats: {
        partidos: 28,
        goles: 18,
        asistencias: 7,
        tarjetasAmarillas: 3,
        tarjetasRojas: 0,
        minutos: 2120,
        titular: 24,
        suplente: 4,
        minutoGolMedia: [12, 34, 67, 78, 45, 23, 56, 89, 15, 40, 55, 72, 33, 60, 80, 25, 48, 70],
      },
      sello: 'gold',
      serviciosActivos: ['srv-1', 'srv-3'],
      serviciosInfo: [
        { nombre: 'Nutrición Deportiva', duracion: '4 meses', icono: 'fa-apple-whole' },
        { nombre: 'Preparación Física', duracion: '3 meses', icono: 'fa-dumbbell' },
      ],
      muroEntrenador: [
        { texto: 'Tiene un olfato goleador excepcional. Necesita mejorar el juego de espaldas y la asociación en corto.', entrenador: 'Manuel Ruiz – Real Jaén Cadete A', fecha: 'Ene 2026' },
        { texto: 'Muy rápido al espacio, buen desmarque. Debe trabajar la pierna izquierda y el juego aéreo ofensivo.', entrenador: 'Pedro Sánchez – Atl. Mancha Real Alevín', fecha: 'Jun 2022' },
      ],
      multimedia: [
        { tipo: 'video', titulo: 'Highlights vs Linares Dep.', icono: 'fa-play-circle' },
        { tipo: 'video', titulo: 'Gol de chilena - Copa Jaén', icono: 'fa-play-circle' },
        { tipo: 'foto', titulo: 'Celebración gol 100', icono: 'fa-image' },
        { tipo: 'foto', titulo: 'Entrenamiento individual', icono: 'fa-image' },
      ],
    },
    {
      id: 'j-002',
      nombre: 'Carlos',
      apellidos: 'Martínez Ruiz',
      nacimiento: 2006,
      categoria: 'Juvenil',
      localidad: 'Linares',
      posicionPrincipal: 'Mediocentro',
      posicionesAlt: ['Mediocentro Defensivo', 'Interior Derecho'],
      altura: 180,
      peso: 72,
      pierna: 'Derecha',
      foto: null,
      disponible: true,
      historialEquipos: [
        { equipo: 'Linares Deportivo', temporadas: '2021-Actual', categoria: 'Juvenil A' },
        { equipo: 'Real Jaén CF', temporadas: '2019-2021', categoria: 'Infantil' },
      ],
      stats: {
        partidos: 32,
        goles: 5,
        asistencias: 12,
        tarjetasAmarillas: 6,
        tarjetasRojas: 1,
        minutos: 2650,
        titular: 30,
        suplente: 2,
        minutoGolMedia: [55, 72, 38, 81, 62],
      },
      sello: 'gold',
      serviciosActivos: ['srv-1', 'srv-2', 'srv-3'],
      serviciosInfo: [
        { nombre: 'Nutrición Deportiva', duracion: '6 meses', icono: 'fa-apple-whole' },
        { nombre: 'Psicología Deportiva', duracion: '3 meses', icono: 'fa-brain' },
        { nombre: 'Preparación Física', duracion: '5 meses', icono: 'fa-dumbbell' },
      ],
      muroEntrenador: [
        { texto: 'Motor del equipo. Visión de juego excepcional y capacidad para cambiar el ritmo del partido. Líder en el vestuario.', entrenador: 'Antonio López – Linares Deportivo Juv. A', fecha: 'Feb 2026' },
        { texto: 'Centrocampista muy completo. Debe mejorar el disparo desde fuera del área y la agresividad sin balón.', entrenador: 'Francisco Torres – Real Jaén Infantil', fecha: 'May 2021' },
      ],
      multimedia: [
        { tipo: 'video', titulo: 'Resumen temporada 24/25', icono: 'fa-play-circle' },
        { tipo: 'video', titulo: 'Asistencia de gol vs Úbeda', icono: 'fa-play-circle' },
        { tipo: 'foto', titulo: 'MVP Jornada 15', icono: 'fa-image' },
      ],
    },
    {
      id: 'j-003',
      nombre: 'María',
      apellidos: 'Fernández Ortega',
      nacimiento: 2007,
      categoria: 'Cadete',
      localidad: 'Úbeda',
      posicionPrincipal: 'Extremo Izquierdo',
      posicionesAlt: ['Mediapunta', 'Segundo Delantero'],
      altura: 165,
      peso: 56,
      pierna: 'Izquierda',
      foto: null,
      disponible: true,
      historialEquipos: [
        { equipo: 'CD Úbeda Viva', temporadas: '2021-Actual', categoria: 'Cadete Fem.' },
        { equipo: 'Atlético Baezano', temporadas: '2019-2021', categoria: 'Infantil Fem.' },
      ],
      stats: {
        partidos: 25,
        goles: 14,
        asistencias: 11,
        tarjetasAmarillas: 1,
        tarjetasRojas: 0,
        minutos: 2050,
        titular: 23,
        suplente: 2,
        minutoGolMedia: [8, 22, 35, 47, 50, 63, 71, 79, 15, 30, 55, 68, 82, 90],
      },
      sello: 'silver',
      serviciosActivos: ['srv-1'],
      serviciosInfo: [
        { nombre: 'Nutrición Deportiva', duracion: '2 meses', icono: 'fa-apple-whole' },
      ],
      muroEntrenador: [
        { texto: 'Jugadora desequilibrante en el uno contra uno. Velocidad explosiva y muy buena lectura de espacios. Falta de constancia en el repliegue defensivo.', entrenador: 'Laura García – CD Úbeda Viva Cadete Fem.', fecha: 'Dic 2025' },
        { texto: 'Enorme talento. Debe mejorar la toma de decisiones en el último tercio.', entrenador: 'Miguel Ángel Rojas – Atl. Baezano Inf. Fem.', fecha: 'Jun 2021' },
      ],
      multimedia: [
        { tipo: 'video', titulo: 'Hat-trick vs CF Martos', icono: 'fa-play-circle' },
        { tipo: 'foto', titulo: 'Máxima goleadora liga', icono: 'fa-image' },
        { tipo: 'foto', titulo: 'Entrega de trofeos 2025', icono: 'fa-image' },
      ],
    },
    {
      id: 'j-004',
      nombre: 'Daniel',
      apellidos: 'Pérez Moreno',
      nacimiento: 2001,
      categoria: 'Sénior',
      localidad: 'Andújar',
      posicionPrincipal: 'Central',
      posicionesAlt: ['Mediocentro Defensivo', 'Lateral Derecho'],
      altura: 188,
      peso: 82,
      pierna: 'Derecha',
      foto: null,
      disponible: false,
      historialEquipos: [
        { equipo: 'Andújar CF', temporadas: '2023-Actual', categoria: 'Sénior' },
        { equipo: 'Linares Deportivo', temporadas: '2020-2023', categoria: 'Juvenil / Filial' },
        { equipo: 'Bailén CF', temporadas: '2017-2020', categoria: 'Cadete-Juvenil' },
      ],
      stats: {
        partidos: 34,
        goles: 2,
        asistencias: 1,
        tarjetasAmarillas: 8,
        tarjetasRojas: 1,
        minutos: 2980,
        titular: 33,
        suplente: 1,
        minutoGolMedia: [78, 45],
      },
      sello: 'none',
      serviciosActivos: [],
      serviciosInfo: [],
      muroEntrenador: [
        { texto: 'Central contundente con buen juego aéreo. Líder nato. Necesita más velocidad en las coberturas largas.', entrenador: 'Jesús Herrera – Andújar CF', fecha: 'Mar 2026' },
        { texto: 'Futbolista con gran lectura del juego. Excelente en la salida de balón desde atrás.', entrenador: 'Rafael Quesada – Linares Dep. Filial', fecha: 'Jun 2023' },
      ],
      multimedia: [
        { tipo: 'video', titulo: 'Mejor jugada defensiva', icono: 'fa-play-circle' },
        { tipo: 'foto', titulo: 'Capitán del equipo', icono: 'fa-image' },
      ],
    },
    {
      id: 'j-005',
      nombre: 'Pablo',
      apellidos: 'Herrera Jiménez',
      nacimiento: 2009,
      categoria: 'Infantil',
      localidad: 'Martos',
      posicionPrincipal: 'Portero',
      posicionesAlt: [],
      altura: 178,
      peso: 65,
      pierna: 'Derecha',
      foto: null,
      disponible: true,
      historialEquipos: [
        { equipo: 'CF Martos', temporadas: '2022-Actual', categoria: 'Infantil' },
      ],
      stats: {
        partidos: 22,
        goles: 0,
        asistencias: 0,
        tarjetasAmarillas: 1,
        tarjetasRojas: 0,
        minutos: 1980,
        titular: 22,
        suplente: 0,
        minutoGolMedia: [],
      },
      sello: 'silver',
      serviciosActivos: ['srv-3'],
      serviciosInfo: [
        { nombre: 'Preparación Física', duracion: '3 meses', icono: 'fa-dumbbell' },
      ],
      muroEntrenador: [
        { texto: 'Portero con reflejos sobresalientes para su edad. Muy buena colocación y seguridad en los centros laterales. Debe trabajar el juego con los pies.', entrenador: 'Diego Navarro – CF Martos Infantil', fecha: 'Ene 2026' },
      ],
      multimedia: [
        { tipo: 'video', titulo: 'Paradas clave jornada 10', icono: 'fa-play-circle' },
        { tipo: 'foto', titulo: 'Portería a cero', icono: 'fa-image' },
      ],
    },
    {
      id: 'j-006',
      nombre: 'Lucía',
      apellidos: 'Romero Torres',
      nacimiento: 2005,
      categoria: 'Juvenil',
      localidad: 'Alcalá la Real',
      posicionPrincipal: 'Mediapunta',
      posicionesAlt: ['Extremo Derecho', 'Interior Izquierdo'],
      altura: 168,
      peso: 58,
      pierna: 'Derecha',
      foto: null,
      disponible: true,
      historialEquipos: [
        { equipo: 'Real Jaén CF', temporadas: '2023-Actual', categoria: 'Juvenil Fem.' },
        { equipo: 'CD Úbeda Viva', temporadas: '2020-2023', categoria: 'Cadete Fem.' },
      ],
      stats: {
        partidos: 30,
        goles: 11,
        asistencias: 15,
        tarjetasAmarillas: 2,
        tarjetasRojas: 0,
        minutos: 2480,
        titular: 28,
        suplente: 2,
        minutoGolMedia: [12, 29, 37, 55, 63, 70, 76, 81, 44, 58, 87],
      },
      sello: 'gold',
      serviciosActivos: ['srv-1', 'srv-2'],
      serviciosInfo: [
        { nombre: 'Nutrición Deportiva', duracion: '5 meses', icono: 'fa-apple-whole' },
        { nombre: 'Psicología Deportiva', duracion: '4 meses', icono: 'fa-brain' },
      ],
      muroEntrenador: [
        { texto: 'Jugadora total. Creatividad y visión de juego por encima de la media. Capaz de desbloquear cualquier defensa con un último pase. Referente del equipo.', entrenador: 'Ana Belén Ortiz – Real Jaén Juv. Fem.', fecha: 'Feb 2026' },
        { texto: 'Gran capacidad asociativa. Necesita ganar en intensidad defensiva y potencia física.', entrenador: 'Laura García – CD Úbeda Viva Cadete Fem.', fecha: 'Jun 2023' },
      ],
      multimedia: [
        { tipo: 'video', titulo: 'Mejores jugadas 2025', icono: 'fa-play-circle' },
        { tipo: 'video', titulo: 'Gol de falta directa', icono: 'fa-play-circle' },
        { tipo: 'foto', titulo: 'Celebración ascenso', icono: 'fa-image' },
      ],
    },
    {
      id: 'j-007',
      nombre: 'Adrián',
      apellidos: 'López Castillo',
      nacimiento: 2003,
      categoria: 'Sénior',
      localidad: 'Bailén',
      posicionPrincipal: 'Lateral Izquierdo',
      posicionesAlt: ['Extremo Izquierdo', 'Central'],
      altura: 175,
      peso: 70,
      pierna: 'Izquierda',
      foto: null,
      disponible: true,
      historialEquipos: [
        { equipo: 'Bailén CF', temporadas: '2023-Actual', categoria: 'Sénior' },
        { equipo: 'Real Jaén CF', temporadas: '2020-2023', categoria: 'Juvenil A / Filial' },
      ],
      stats: {
        partidos: 30,
        goles: 3,
        asistencias: 9,
        tarjetasAmarillas: 5,
        tarjetasRojas: 0,
        minutos: 2540,
        titular: 27,
        suplente: 3,
        minutoGolMedia: [65, 82, 41],
      },
      sello: 'none',
      serviciosActivos: [],
      serviciosInfo: [],
      muroEntrenador: [
        { texto: 'Lateral con gran proyección ofensiva y buen centro. Debe mejorar la concentración defensiva en el último tramo de los partidos.', entrenador: 'Pablo Jiménez – Bailén CF', fecha: 'Mar 2026' },
      ],
      multimedia: [
        { tipo: 'video', titulo: 'Internadas por banda', icono: 'fa-play-circle' },
        { tipo: 'foto', titulo: 'Once titular jornada 20', icono: 'fa-image' },
      ],
    },
    {
      id: 'j-008',
      nombre: 'Iker',
      apellidos: 'Navarro Peinado',
      nacimiento: 2010,
      categoria: 'Alevín',
      localidad: 'Torredonjimeno',
      posicionPrincipal: 'Interior Derecho',
      posicionesAlt: ['Mediocentro', 'Extremo Derecho'],
      altura: 152,
      peso: 42,
      pierna: 'Derecha',
      foto: null,
      disponible: false,
      historialEquipos: [
        { equipo: 'Torredonjimeno CF', temporadas: '2023-Actual', categoria: 'Alevín A' },
      ],
      stats: {
        partidos: 18,
        goles: 8,
        asistencias: 6,
        tarjetasAmarillas: 0,
        tarjetasRojas: 0,
        minutos: 1350,
        titular: 16,
        suplente: 2,
        minutoGolMedia: [10, 25, 33, 52, 61, 70, 44, 80],
      },
      sello: 'none',
      serviciosActivos: [],
      serviciosInfo: [],
      muroEntrenador: [
        { texto: 'Talento puro. Muy buena conducción y regate para su edad. Hay que proteger su desarrollo sin presionar demasiado.', entrenador: 'Sergio Muñoz – Torredonjimeno CF Alevín', fecha: 'Dic 2025' },
      ],
      multimedia: [
        { tipo: 'video', titulo: 'Mejores regates 2025', icono: 'fa-play-circle' },
      ],
    },
    {
      id: 'j-009',
      nombre: 'Marcos',
      apellidos: 'Del Moral Cano',
      nacimiento: 1999,
      categoria: 'Sénior',
      localidad: 'La Carolina',
      posicionPrincipal: 'Extremo Derecho',
      posicionesAlt: ['Delantero Centro', 'Mediapunta'],
      altura: 174,
      peso: 71,
      pierna: 'Derecha',
      foto: null,
      disponible: true,
      historialEquipos: [
        { equipo: 'La Carolina FC', temporadas: '2024-Actual', categoria: 'Sénior' },
        { equipo: 'Linares Deportivo', temporadas: '2021-2024', categoria: 'Sénior' },
        { equipo: 'Real Jaén CF', temporadas: '2018-2021', categoria: 'Juvenil / Filial' },
      ],
      stats: {
        partidos: 26,
        goles: 10,
        asistencias: 8,
        tarjetasAmarillas: 4,
        tarjetasRojas: 0,
        minutos: 2100,
        titular: 22,
        suplente: 4,
        minutoGolMedia: [5, 18, 29, 42, 56, 68, 75, 83, 90, 37],
      },
      sello: 'silver',
      serviciosActivos: ['srv-5'],
      serviciosInfo: [
        { nombre: 'Video Análisis', duracion: '2 meses', icono: 'fa-video' },
      ],
      muroEntrenador: [
        { texto: 'Extremo vertical con gran velocidad punta. Excelente en contraataques. Necesita mejorar la consistencia y la toma de decisiones en el último pase.', entrenador: 'Juan Carlos Moral – La Carolina FC', fecha: 'Feb 2026' },
        { texto: 'Jugador diferencial en esta categoría. Su velocidad marca diferencias. Falta regularidad y participación cuando el equipo no tiene balón.', entrenador: 'Antonio López – Linares Dep.', fecha: 'Jun 2024' },
      ],
      multimedia: [
        { tipo: 'video', titulo: 'Top 5 goles temporada', icono: 'fa-play-circle' },
        { tipo: 'video', titulo: 'Sprint y gol vs Andújar', icono: 'fa-play-circle' },
        { tipo: 'foto', titulo: 'Once ideal jornada 12', icono: 'fa-image' },
        { tipo: 'foto', titulo: 'Entrenamiento pretemporada', icono: 'fa-image' },
      ],
    },
    {
      id: 'j-010',
      nombre: 'Sara',
      apellidos: 'Gálvez Medina',
      nacimiento: 2007,
      categoria: 'Cadete',
      localidad: 'Cazorla',
      posicionPrincipal: 'Mediocentro Defensivo',
      posicionesAlt: ['Central', 'Mediocentro'],
      altura: 170,
      peso: 60,
      pierna: 'Derecha',
      foto: null,
      disponible: true,
      historialEquipos: [
        { equipo: 'CD Cazorla', temporadas: '2022-Actual', categoria: 'Cadete Fem.' },
      ],
      stats: {
        partidos: 20,
        goles: 1,
        asistencias: 4,
        tarjetasAmarillas: 3,
        tarjetasRojas: 0,
        minutos: 1750,
        titular: 19,
        suplente: 1,
        minutoGolMedia: [62],
      },
      sello: 'silver',
      serviciosActivos: ['srv-3'],
      serviciosInfo: [
        { nombre: 'Preparación Física', duracion: '4 meses', icono: 'fa-dumbbell' },
      ],
      muroEntrenador: [
        { texto: 'Mediocentro defensivo de gran inteligencia táctica. Lee las líneas de pase del rival con anticipación. Necesita ganar potencia en los duelos.', entrenador: 'Fernando Siles – CD Cazorla Cadete Fem.', fecha: 'Ene 2026' },
      ],
      multimedia: [
        { tipo: 'video', titulo: 'Recuperaciones clave', icono: 'fa-play-circle' },
        { tipo: 'foto', titulo: 'Once titular Copa Jaén', icono: 'fa-image' },
      ],
    },
    {
      id: 'j-011',
      nombre: 'Hugo',
      apellidos: 'Quesada Ríos',
      nacimiento: 2004,
      categoria: 'Sénior',
      localidad: 'Jódar',
      posicionPrincipal: 'Segundo Delantero',
      posicionesAlt: ['Delantero Centro', 'Mediapunta'],
      altura: 179,
      peso: 73,
      pierna: 'Ambidiestro',
      foto: null,
      disponible: true,
      historialEquipos: [
        { equipo: 'Jódar CF', temporadas: '2024-Actual', categoria: 'Sénior' },
        { equipo: 'CD Torreperogil', temporadas: '2021-2024', categoria: 'Juvenil' },
      ],
      stats: {
        partidos: 24,
        goles: 13,
        asistencias: 5,
        tarjetasAmarillas: 2,
        tarjetasRojas: 0,
        minutos: 1920,
        titular: 20,
        suplente: 4,
        minutoGolMedia: [7, 19, 32, 44, 55, 61, 70, 77, 83, 88, 14, 50, 68],
      },
      sello: 'gold',
      serviciosActivos: ['srv-1', 'srv-2', 'srv-3'],
      serviciosInfo: [
        { nombre: 'Nutrición Deportiva', duracion: '3 meses', icono: 'fa-apple-whole' },
        { nombre: 'Psicología Deportiva', duracion: '2 meses', icono: 'fa-brain' },
        { nombre: 'Preparación Física', duracion: '6 meses', icono: 'fa-dumbbell' },
      ],
      muroEntrenador: [
        { texto: 'Delantero muy completo y versátil. Gran movilidad y capacidad de aparecer en todas las zonas de ataque. Pichichi de la liga con merecimiento.', entrenador: 'Carlos Medina – Jódar CF', fecha: 'Mar 2026' },
        { texto: 'Jugador con gran mentalidad competitiva. Siempre quiere más. Debe mejorar el juego aéreo.', entrenador: 'Luis Fernández – CD Torreperogil Juv.', fecha: 'Jun 2024' },
      ],
      multimedia: [
        { tipo: 'video', titulo: 'Todos los goles 2025/26', icono: 'fa-play-circle' },
        { tipo: 'video', titulo: 'Doblete en el derbi', icono: 'fa-play-circle' },
        { tipo: 'foto', titulo: 'Pichichi temporada', icono: 'fa-image' },
        { tipo: 'foto', titulo: 'Sesión de gimnasio', icono: 'fa-image' },
      ],
    },
    {
      id: 'j-012',
      nombre: 'Álvaro',
      apellidos: 'Aranda Muñoz',
      nacimiento: 2006,
      categoria: 'Juvenil',
      localidad: 'Baeza',
      posicionPrincipal: 'Lateral Derecho',
      posicionesAlt: ['Extremo Derecho'],
      altura: 177,
      peso: 69,
      pierna: 'Derecha',
      foto: null,
      disponible: false,
      historialEquipos: [
        { equipo: 'Atlético Baezano', temporadas: '2020-Actual', categoria: 'Juvenil A' },
      ],
      stats: {
        partidos: 27,
        goles: 2,
        asistencias: 10,
        tarjetasAmarillas: 4,
        tarjetasRojas: 0,
        minutos: 2300,
        titular: 25,
        suplente: 2,
        minutoGolMedia: [72, 85],
      },
      sello: 'none',
      serviciosActivos: [],
      serviciosInfo: [],
      muroEntrenador: [
        { texto: 'Lateral incansable con gran capacidad de recorrido. Buena técnica en el centro. Debe mejorar el posicionamiento defensivo en repliegues rápidos.', entrenador: 'José Ramón Vega – Atl. Baezano Juv. A', fecha: 'Feb 2026' },
      ],
      multimedia: [
        { tipo: 'video', titulo: 'Asistencias desde banda', icono: 'fa-play-circle' },
        { tipo: 'foto', titulo: 'Defensa del año', icono: 'fa-image' },
      ],
    },
  ];

  // ---- Matchmaking Mock ----
  const matchmaking = [
    {
      id: 'match-1',
      jugadorId: 'j-001',
      club: 'Linares Deportivo',
      clubLogo: '🔵',
      clubInfo: 'División de Honor Cadete · Linares',
      estado: 'matched',
      necesidad: 'Buscan delantero centro con movilidad para su sistema 4-3-3.',
      mensajes: [
        { tipo: 'received', texto: 'Hola Alejandro, nos gustaría invitarte a una sesión de entrenamiento con nuestro Cadete A. ¿Estarías interesado?', tiempo: 'Hace 2 días' },
        { tipo: 'sent', texto: '¡Hola! Sí, estoy muy interesado. ¿Qué día podría ser?', tiempo: 'Hace 1 día' },
        { tipo: 'received', texto: 'Perfecto, te esperamos el miércoles 11 a las 18:00 en el Campo Municipal de Linarejos.', tiempo: 'Hace 5 horas' },
      ],
    },
    {
      id: 'match-2',
      jugadorId: 'j-006',
      club: 'Atlético Mancha Real',
      clubLogo: '🔴',
      clubInfo: 'Liga Provincial Juvenil Fem. · Mancha Real',
      estado: 'pending',
      necesidad: 'Buscan mediapunta creativa para reforzar la zona ofensiva.',
      mensajes: [],
    },
    {
      id: 'match-3',
      jugadorId: 'j-009',
      club: 'Real Jaén CF',
      clubLogo: '⚽',
      clubInfo: 'Tercera RFEF · Jaén',
      estado: 'pending',
      necesidad: 'Buscan extremo derecho con velocidad y desborde para el primer equipo.',
      mensajes: [],
    },
    {
      id: 'match-4',
      jugadorId: 'j-004',
      club: 'Torredonjimeno CF',
      clubLogo: '🟡',
      clubInfo: 'Tercera RFEF · Torredonjimeno',
      estado: 'rejected',
      necesidad: 'Buscaban central con experiencia.',
      mensajes: [],
    },
  ];

  // ---- Helpers ----
  function getJugadorById(id) {
    return jugadores.find(j => j.id === id);
  }

  function getEquipoByNombre(nombre) {
    return equipos.find(e => e.nombre === nombre);
  }

  function filtrarJugadores(filtros) {
    return jugadores.filter(j => {
      if (filtros.categoria && filtros.categoria !== '' && j.categoria !== filtros.categoria) return false;
      if (filtros.posicion && filtros.posicion !== '' && j.posicionPrincipal !== filtros.posicion) return false;
      if (filtros.localidad && filtros.localidad !== '' && j.localidad !== filtros.localidad) return false;
      if (filtros.pierna && filtros.pierna !== '' && j.pierna !== filtros.pierna) return false;
      if (filtros.disponible === true && !j.disponible) return false;
      if (filtros.sello && filtros.sello !== '' && j.sello !== filtros.sello) return false;
      if (filtros.edadMin) {
        const edad = new Date().getFullYear() - j.nacimiento;
        if (edad < parseInt(filtros.edadMin)) return false;
      }
      if (filtros.edadMax) {
        const edad = new Date().getFullYear() - j.nacimiento;
        if (edad > parseInt(filtros.edadMax)) return false;
      }
      if (filtros.golesMin && j.stats.goles < parseInt(filtros.golesMin)) return false;
      if (filtros.asistenciasMin && j.stats.asistencias < parseInt(filtros.asistenciasMin)) return false;
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

  // ---- Directorio de Clubes (para vista Jugador) ----
  const directorioClubes = [
    {
      id: 'club-1',
      nombre: 'Linares Deportivo',
      logo: '🔵',
      localidad: 'Linares',
      categoria: 'Tercera RFEF',
      descripcion: 'Club histórico de Linares con cantera propia y filial en División de Honor.',
      distancia: '62 km',
      necesidades: [
        { posicion: 'Delantero Centro', desc: 'Revulsivo desde el banquillo con rapidez y gol' },
        { posicion: 'Lateral Izquierdo', desc: 'Carrilero con ida y vuelta, buen centro' },
      ],
    },
    {
      id: 'club-2',
      nombre: 'Real Jaén CF',
      logo: '⚽',
      localidad: 'Jaén',
      categoria: 'Tercera RFEF',
      descripcion: 'El decano del fútbol jiennense. Buen proyecto deportivo a medio plazo.',
      distancia: '0 km',
      necesidades: [
        { posicion: 'Extremo Derecho', desc: 'Perfil desequilibrante para jugar a pierna cambiada' },
        { posicion: 'Mediocentro', desc: 'Centrocampista organizador con visión de juego' },
      ],
    },
    {
      id: 'club-3',
      nombre: 'Atlético Mancha Real',
      logo: '🔴',
      localidad: 'Mancha Real',
      categoria: 'División de Honor',
      descripcion: 'Club en crecimiento. Referencia en la cantera de la provincia.',
      distancia: '18 km',
      necesidades: [
        { posicion: 'Mediapunta', desc: 'Jugador creativo con último pase' },
        { posicion: 'Central', desc: 'Defensa con buen juego de salida' },
      ],
    },
    {
      id: 'club-4',
      nombre: 'CD Úbeda Viva',
      logo: '🟢',
      localidad: 'Úbeda',
      categoria: 'Tercera RFEF',
      descripcion: 'Proyecto sólido con apuesta por la cantera y el fútbol femenino.',
      distancia: '55 km',
      necesidades: [
        { posicion: 'Portero', desc: 'Portero titular con experiencia en la categoría' },
        { posicion: 'Interior Derecho', desc: 'Futbolista técnico con ambición ofensiva' },
      ],
    },
    {
      id: 'club-5',
      nombre: 'Torredonjimeno CF',
      logo: '🟡',
      localidad: 'Torredonjimeno',
      categoria: 'Provincial Preferente',
      descripcion: 'Club familiar con buen ambiente y cantera competitiva.',
      distancia: '12 km',
      necesidades: [
        { posicion: 'Segundo Delantero', desc: 'Atacante versátil que combine y marque' },
      ],
    },
    {
      id: 'club-6',
      nombre: 'Andújar CF',
      logo: '🔷',
      localidad: 'Andújar',
      categoria: 'Tercera RFEF',
      descripcion: 'Tradición futbolística y estadio con historia. Apuesta por jóvenes locales.',
      distancia: '73 km',
      necesidades: [
        { posicion: 'Extremo Izquierdo', desc: 'Velocista por banda con desborde y centros' },
        { posicion: 'Mediocentro Defensivo', desc: 'Ancla en el centro del campo con recuperación' },
      ],
    },
    {
      id: 'club-7',
      nombre: 'Jódar CF',
      logo: '🔶',
      localidad: 'Jódar',
      categoria: 'Provincial Preferente',
      descripcion: 'Club con una afición fiel. Busca consolidarse y subir de categoría.',
      distancia: '48 km',
      necesidades: [
        { posicion: 'Lateral Derecho', desc: 'Lateral joven con proyección ofensiva' },
        { posicion: 'Delantero Centro', desc: 'Referencia en punta con juego aéreo' },
      ],
    },
    {
      id: 'club-8',
      nombre: 'Bailén CF',
      logo: '🟣',
      localidad: 'Bailén',
      categoria: 'Provincial Preferente',
      descripcion: 'Club con historia y buena infraestructura. Apuesta por la juventud.',
      distancia: '38 km',
      necesidades: [
        { posicion: 'Mediapunta', desc: 'Enganche creativo para generar fútbol' },
      ],
    },
  ];

  // ---- Public API ----
  return {
    localidades,
    equipos,
    posiciones,
    categorias,
    servicios,
    jugadores,
    matchmaking,
    directorioClubes,
    getJugadorById,
    getEquipoByNombre,
    filtrarJugadores,
    getStatsResumen,
    getMatchesByJugador,
  };

})();
