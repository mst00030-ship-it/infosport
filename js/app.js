/* ============================================
   InfoSport – App Controller v2.0
   SPA Logic, Rendering, Auth, Notifications,
   Settings, Matchmaking, Profile, Marketplace
   ============================================ */

const App = (() => {
  'use strict';

  // ---- State ----
  let currentView = 'dashboard';
  let previousView = 'dashboard';
  let allPlayers = [];
  let filteredPlayers = [];

  // ============================================================
  //  INIT
  // ============================================================
  function init() {
    allPlayers = MOCK_DATA.jugadores;
    filteredPlayers = [...allPlayers];

    bindAuth();
    bindNavigation();
    bindHamburger();
    bindGlobalSearch();
    bindNotifications();
    bindSettings();
    bindFilters();

    // Render default view
    renderDashboard();
    renderScouting(filteredPlayers);
    updateBadges();
  }

  // ============================================================
  //  AUTH
  // ============================================================
  function bindAuth() {
    // Tab switching
    document.querySelectorAll('.auth-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const target = tab.dataset.authTab;
        document.getElementById('auth-login-form').style.display = target === 'login' ? '' : 'none';
        document.getElementById('auth-register-form').style.display = target === 'register' ? '' : 'none';
      });
    });

    // Login form
    document.getElementById('auth-login-form').addEventListener('submit', e => {
      e.preventDefault();
      enterApp();
    });

    // Register form
    document.getElementById('auth-register-form').addEventListener('submit', e => {
      e.preventDefault();
      enterApp();
    });

    // Social buttons
    ['auth-google', 'auth-facebook', 'auth-phone'].forEach(id => {
      const btn = document.getElementById(id);
      if (btn) btn.addEventListener('click', () => enterApp());
    });
  }

  function enterApp() {
    document.getElementById('auth-screen').style.display = 'none';
    document.getElementById('app-layout').style.display = '';
    showToast('Sesión iniciada correctamente', 'success');
  }

  function logout() {
    document.getElementById('app-layout').style.display = 'none';
    document.getElementById('auth-screen').style.display = '';
    // Close settings if open
    document.getElementById('settings-overlay').classList.remove('open');
    showToast('Sesión cerrada', 'info');
  }

  // ============================================================
  //  NAVIGATION
  // ============================================================
  function bindNavigation() {
    document.querySelectorAll('.nav-item[data-view]').forEach(item => {
      item.addEventListener('click', () => {
        showView(item.dataset.view);
        // Close sidebar on mobile
        document.querySelector('.sidebar').classList.remove('open');
      });
    });
  }

  function showView(viewId) {
    previousView = currentView;
    currentView = viewId;

    // Update nav items
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    const navItem = document.querySelector(`.nav-item[data-view="${viewId}"]`);
    if (navItem) navItem.classList.add('active');

    // Show/hide view sections
    document.querySelectorAll('.view-section').forEach(s => s.classList.remove('active'));
    const viewEl = document.getElementById(`view-${viewId}`);
    if (viewEl) viewEl.classList.add('active');

    // Render on demand
    if (viewId === 'dashboard') renderDashboard();
    if (viewId === 'scouting') renderScouting(filteredPlayers);
    if (viewId === 'matchmaking') renderMatchmaking();
    if (viewId === 'marketplace') renderMarketplace();

    // Scroll to top
    document.querySelector('.page-content').scrollTop = 0;
  }

  function goBack() {
    showView(previousView || 'dashboard');
  }

  // ============================================================
  //  HAMBURGER (mobile sidebar toggle)
  // ============================================================
  function bindHamburger() {
    const btn = document.getElementById('hamburger-btn');
    if (btn) {
      btn.addEventListener('click', () => {
        document.querySelector('.sidebar').classList.toggle('open');
      });
    }
  }

  // ============================================================
  //  GLOBAL SEARCH
  // ============================================================
  function bindGlobalSearch() {
    const input = document.getElementById('global-search');
    if (!input) return;

    input.addEventListener('input', () => {
      const term = input.value.trim().toLowerCase();
      if (!term) {
        filteredPlayers = [...allPlayers];
      } else {
        filteredPlayers = allPlayers.filter(j => {
          const full = `${j.nombre} ${j.apellidos}`.toLowerCase();
          return full.includes(term);
        });
      }

      if (currentView === 'scouting') {
        renderScouting(filteredPlayers);
      } else {
        showView('scouting');
        renderScouting(filteredPlayers);
      }
    });
  }

  // ============================================================
  //  NOTIFICATIONS PANEL
  // ============================================================
  function bindNotifications() {
    const btn = document.getElementById('btn-notifications');
    const panel = document.getElementById('notifications-panel');
    const backdrop = document.getElementById('notifications-backdrop');
    const closeBtn = document.getElementById('notifications-close');

    if (btn) btn.addEventListener('click', () => openNotifications());
    if (closeBtn) closeBtn.addEventListener('click', () => closeNotifications());
    if (backdrop) backdrop.addEventListener('click', () => closeNotifications());

    renderNotificationsList();
  }

  function openNotifications() {
    document.getElementById('notifications-panel').classList.add('open');
    document.getElementById('notifications-backdrop').classList.add('open');
    // Mark dot as read
    const dot = document.querySelector('.notif-dot');
    if (dot) dot.style.display = 'none';
  }

  function closeNotifications() {
    document.getElementById('notifications-panel').classList.remove('open');
    document.getElementById('notifications-backdrop').classList.remove('open');
  }

  function renderNotificationsList() {
    const container = document.getElementById('notifications-list');
    if (!container) return;

    const iconMap = {
      match: 'fa-handshake',
      scouting: 'fa-binoculars',
      servicio: 'fa-store',
      sistema: 'fa-circle-info',
    };

    const colorMap = {
      match: 'var(--accent)',
      scouting: '#2196f3',
      servicio: '#ff9800',
      sistema: '#9e9e9e',
    };

    container.innerHTML = MOCK_DATA.notificaciones.map(n => `
      <div class="notification-item ${n.leida ? 'read' : 'unread'}">
        <div class="notification-icon" style="color:${colorMap[n.tipo] || 'var(--accent)'}">
          <i class="fa-solid ${iconMap[n.tipo] || 'fa-bell'}"></i>
        </div>
        <div class="notification-content">
          <div class="notification-title">${n.titulo}</div>
          <div class="notification-text">${n.texto}</div>
          <div class="notification-time">${n.fecha}</div>
        </div>
        ${!n.leida ? '<div class="notification-unread-dot"></div>' : ''}
      </div>
    `).join('');
  }

  // ============================================================
  //  SETTINGS PANEL
  // ============================================================
  function bindSettings() {
    const btn = document.getElementById('btn-settings');
    const overlay = document.getElementById('settings-overlay');
    const closeBtn = document.getElementById('settings-close');

    if (btn) btn.addEventListener('click', () => overlay.classList.add('open'));
    if (closeBtn) closeBtn.addEventListener('click', () => overlay.classList.remove('open'));

    // Click outside panel to close
    if (overlay) {
      overlay.addEventListener('click', e => {
        if (e.target === overlay) overlay.classList.remove('open');
      });
    }
  }

  // ============================================================
  //  FILTERS
  // ============================================================
  function bindFilters() {
    const searchBtn = document.getElementById('btn-filter-search');
    const resetBtn = document.getElementById('btn-filter-reset');

    if (searchBtn) {
      searchBtn.addEventListener('click', () => {
        const filtros = getFilterValues();
        filteredPlayers = MOCK_DATA.filtrarJugadores(filtros);
        renderScouting(filteredPlayers);
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        // Reset all filter inputs
        ['filter-nombre', 'filter-goles-min', 'filter-edad-min', 'filter-edad-max'].forEach(id => {
          const el = document.getElementById(id);
          if (el) el.value = '';
        });
        ['filter-categoria', 'filter-posicion', 'filter-localidad', 'filter-pierna', 'filter-sello'].forEach(id => {
          const el = document.getElementById(id);
          if (el) el.value = '';
        });
        const disp = document.getElementById('filter-disponible');
        if (disp) disp.checked = false;

        filteredPlayers = [...allPlayers];
        renderScouting(filteredPlayers);
      });
    }
  }

  function getFilterValues() {
    return {
      nombre: val('filter-nombre'),
      categoria: val('filter-categoria'),
      posicion: val('filter-posicion'),
      localidad: val('filter-localidad'),
      pierna: val('filter-pierna'),
      sello: val('filter-sello'),
      golesMin: val('filter-goles-min'),
      edadMin: val('filter-edad-min'),
      edadMax: val('filter-edad-max'),
      disponible: document.getElementById('filter-disponible')?.checked || false,
    };
  }

  function val(id) {
    const el = document.getElementById(id);
    return el ? el.value.trim() : '';
  }

  // ============================================================
  //  BADGES
  // ============================================================
  function updateBadges() {
    const stats = MOCK_DATA.getStatsResumen();
    setTextContent('nav-badge-scouting', stats.total);
    setTextContent('nav-badge-matches', MOCK_DATA.matchmaking.length);
  }

  // ============================================================
  //  DASHBOARD
  // ============================================================
  function renderDashboard() {
    const stats = MOCK_DATA.getStatsResumen();

    setTextContent('stat-total', stats.total);
    setTextContent('stat-disponibles', stats.disponibles);
    setTextContent('stat-sello', stats.conSello);
    setTextContent('stat-matches', stats.matches);

    // Featured players (gold sello or top scorers)
    const featured = allPlayers
      .filter(j => j.sello === 'gold' || j.stats.goles >= 10)
      .sort((a, b) => b.stats.goles - a.stats.goles)
      .slice(0, 6);

    const grid = document.getElementById('dashboard-players-grid');
    if (grid) {
      grid.innerHTML = featured.map(j => renderPlayerCard(j)).join('');
      bindPlayerCardClicks(grid);
    }
  }

  // ============================================================
  //  SCOUTING
  // ============================================================
  function renderScouting(players) {
    const grid = document.getElementById('scouting-players-grid');
    const countEl = document.getElementById('results-count');

    if (countEl) {
      countEl.innerHTML = `Se encontraron <strong>${players.length}</strong> jugadores`;
    }

    if (grid) {
      if (players.length === 0) {
        grid.innerHTML = `
          <div style="grid-column:1/-1;text-align:center;padding:3rem 1rem;color:var(--text-muted);">
            <i class="fa-solid fa-search" style="font-size:2.5rem;margin-bottom:1rem;display:block;opacity:.4"></i>
            <p style="font-size:1.05rem;">No se encontraron jugadores con esos criterios.</p>
            <p style="font-size:0.85rem;margin-top:0.5rem;">Prueba a modificar los filtros para ampliar la búsqueda.</p>
          </div>
        `;
      } else {
        grid.innerHTML = players.map(j => renderPlayerCard(j)).join('');
        bindPlayerCardClicks(grid);
      }
    }
  }

  // ============================================================
  //  PLAYER CARD
  // ============================================================
  function renderPlayerCard(j) {
    const posInfo = MOCK_DATA.posiciones[j.posicionPrincipal] || { abr: '??', color: '#666' };
    const edad = new Date().getFullYear() - j.nacimiento;
    const equipo = j.historialEquipos[0];
    const clubData = equipo ? MOCK_DATA.getEquipoByNombre(equipo.equipo) : null;
    const iniciales = `${j.nombre[0]}${j.apellidos[0]}`;

    const sellos = {
      gold: '<span class="sello gold" title="Sello de Alto Rendimiento"><i class="fa-solid fa-medal"></i> Alto Rendimiento</span>',
      silver: '<span class="sello silver" title="En seguimiento"><i class="fa-solid fa-eye"></i> En seguimiento</span>',
      none: '',
    };

    return `
      <div class="player-card" data-player-id="${j.id}">
        <div class="player-card-header">
          <div class="player-avatar">${iniciales}</div>
          <div class="player-header-info">
            <h3>${j.nombre} ${j.apellidos}</h3>
            <div class="player-club">
              ${clubData ? clubData.logo : '⚽'} ${equipo ? equipo.equipo : 'Sin club'}
            </div>
          </div>
          <div class="player-position" style="background:${posInfo.color}">${posInfo.abr}</div>
        </div>
        <div class="player-card-body">
          <div class="player-meta">
            <span><i class="fa-solid fa-calendar"></i> ${edad} años</span>
            <span><i class="fa-solid fa-location-dot"></i> ${j.localidad}</span>
            <span><i class="fa-solid fa-shoe-prints"></i> ${j.pierna}</span>
            <span><i class="fa-solid fa-tag"></i> ${j.categoria}</span>
          </div>
          <div class="player-stats-row">
            <div class="player-stat"><strong>${j.stats.partidos}</strong><span>PJ</span></div>
            <div class="player-stat"><strong>${j.stats.goles}</strong><span>GOL</span></div>
            <div class="player-stat"><strong>${j.stats.asistencias}</strong><span>ASI</span></div>
            <div class="player-stat"><strong>${j.stats.tarjetasAmarillas}</strong><span>TA</span></div>
          </div>
          ${sellos[j.sello] || ''}
        </div>
        <div class="player-card-footer">
          <span class="availability ${j.disponible ? 'available' : 'unavailable'}">
            <i class="fa-solid fa-circle"></i> ${j.disponible ? 'Disponible' : 'No disponible'}
          </span>
          <button class="btn btn-sm btn-primary" onclick="App.openPlayerProfile('${j.id}'); event.stopPropagation();">
            <i class="fa-solid fa-eye"></i> Ver perfil
          </button>
        </div>
      </div>
    `;
  }

  function bindPlayerCardClicks(container) {
    container.querySelectorAll('.player-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.dataset.playerId;
        if (id) openPlayerProfile(id);
      });
    });
  }

  // ============================================================
  //  PLAYER PROFILE
  // ============================================================
  function openPlayerProfile(playerId) {
    const j = MOCK_DATA.getJugadorById(playerId);
    if (!j) return;

    previousView = currentView;
    currentView = 'profile';

    // Hide all views, show profile
    document.querySelectorAll('.view-section').forEach(s => s.classList.remove('active'));
    document.getElementById('view-profile').classList.add('active');

    // Remove active from nav
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

    renderProfile(j);
    document.querySelector('.page-content').scrollTop = 0;
  }

  function renderProfile(j) {
    const container = document.getElementById('view-profile');
    const posInfo = MOCK_DATA.posiciones[j.posicionPrincipal] || { abr: '??', color: '#666' };
    const edad = new Date().getFullYear() - j.nacimiento;
    const equipo = j.historialEquipos[0];
    const clubData = equipo ? MOCK_DATA.getEquipoByNombre(equipo.equipo) : null;
    const iniciales = `${j.nombre[0]}${j.apellidos[0]}`;
    const matches = MOCK_DATA.getMatchesByJugador(j.id);

    const sellos = {
      gold: '<span class="sello gold"><i class="fa-solid fa-medal"></i> Sello de Alto Rendimiento</span>',
      silver: '<span class="sello silver"><i class="fa-solid fa-eye"></i> En seguimiento</span>',
      none: '<span class="sello none"><i class="fa-solid fa-minus"></i> Sin sello</span>',
    };

    container.innerHTML = `
      <button class="back-btn" onclick="App.goBack()"><i class="fa-solid fa-arrow-left"></i> Volver</button>

      <!-- Profile Header -->
      <div class="profile-header-card">
        <div class="profile-top">
          <div class="profile-avatar">${iniciales}</div>
          <div class="profile-info">
            <h2>${j.nombre} ${j.apellidos}</h2>
            <div class="profile-club">${clubData ? clubData.logo : '⚽'} ${equipo ? equipo.equipo : 'Sin club'} · ${equipo ? equipo.categoria : ''}</div>
            <div class="profile-meta-row">
              <span class="profile-position" style="background:${posInfo.color}">${j.posicionPrincipal}</span>
              ${j.posicionesAlt.map(p => {
                const pi = MOCK_DATA.posiciones[p] || { color: '#666' };
                return `<span class="profile-position alt" style="background:${pi.color}88">${p}</span>`;
              }).join('')}
            </div>
          </div>
          <div class="profile-actions">
            <button class="btn btn-primary" onclick="App.simulateMatch('${j.id}')">
              <i class="fa-solid fa-handshake"></i> Solicitar Match
            </button>
            <button class="btn ${j.disponible ? 'btn-success' : 'btn-secondary'}" onclick="App.toggleAvailability('${j.id}')">
              <i class="fa-solid fa-${j.disponible ? 'toggle-on' : 'toggle-off'}"></i>
              ${j.disponible ? 'Disponible' : 'No disponible'}
            </button>
          </div>
        </div>

        <div class="profile-details-grid">
          <div class="detail-item"><i class="fa-solid fa-calendar"></i><span>Nacimiento</span><strong>${j.nacimiento} (${edad} años)</strong></div>
          <div class="detail-item"><i class="fa-solid fa-location-dot"></i><span>Localidad</span><strong>${j.localidad}</strong></div>
          <div class="detail-item"><i class="fa-solid fa-shoe-prints"></i><span>Pierna</span><strong>${j.pierna}</strong></div>
          <div class="detail-item"><i class="fa-solid fa-ruler-vertical"></i><span>Altura</span><strong>${j.altura} cm</strong></div>
          <div class="detail-item"><i class="fa-solid fa-weight-scale"></i><span>Peso</span><strong>${j.peso} kg</strong></div>
          <div class="detail-item"><i class="fa-solid fa-tag"></i><span>Categoría</span><strong>${j.categoria}</strong></div>
        </div>

        <div class="profile-sello-row">
          ${sellos[j.sello] || sellos.none}
        </div>
      </div>

      <!-- Stats -->
      <div class="section-card">
        <div class="section-card-header"><h3><i class="fa-solid fa-chart-bar"></i> Estadísticas</h3></div>
        <div class="section-card-body">
          <div class="stats-grid-profile">
            <div class="stat-box"><div class="stat-value">${j.stats.partidos}</div><div class="stat-label">Partidos</div></div>
            <div class="stat-box accent"><div class="stat-value">${j.stats.goles}</div><div class="stat-label">Goles</div></div>
            <div class="stat-box"><div class="stat-value">${j.stats.asistencias}</div><div class="stat-label">Asistencias</div></div>
            <div class="stat-box"><div class="stat-value">${j.stats.minutos}'</div><div class="stat-label">Minutos</div></div>
            <div class="stat-box"><div class="stat-value">${j.stats.titular}</div><div class="stat-label">Titular</div></div>
            <div class="stat-box"><div class="stat-value">${j.stats.suplente}</div><div class="stat-label">Suplente</div></div>
            <div class="stat-box warn"><div class="stat-value">${j.stats.tarjetasAmarillas}</div><div class="stat-label">Amarillas</div></div>
            <div class="stat-box danger"><div class="stat-value">${j.stats.tarjetasRojas}</div><div class="stat-label">Rojas</div></div>
          </div>
          ${j.stats.minutoGolMedia.length > 0 ? `
            <div class="goal-minutes">
              <h4>Minutos de gol</h4>
              <div class="goal-minutes-bar">
                ${renderGoalMinutesBar(j.stats.minutoGolMedia)}
              </div>
            </div>
          ` : ''}
        </div>
      </div>

      <!-- Historial de Equipos -->
      <div class="section-card">
        <div class="section-card-header"><h3><i class="fa-solid fa-clock-rotate-left"></i> Historial de Equipos</h3></div>
        <div class="section-card-body">
          <div class="timeline">
            ${j.historialEquipos.map(h => {
              const cd = MOCK_DATA.getEquipoByNombre(h.equipo);
              return `
                <div class="timeline-item">
                  <div class="timeline-marker"></div>
                  <div class="timeline-content">
                    <h4>${cd ? cd.logo : '⚽'} ${h.equipo}</h4>
                    <p>${h.categoria} · ${h.temporadas}</p>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>

      <!-- Muro del Entrenador -->
      ${j.muroEntrenador.length > 0 ? `
        <div class="section-card">
          <div class="section-card-header"><h3><i class="fa-solid fa-chalkboard-user"></i> Muro del Entrenador</h3></div>
          <div class="section-card-body">
            ${j.muroEntrenador.map(m => `
              <div class="coach-note">
                <div class="coach-note-text">"${m.texto}"</div>
                <div class="coach-note-author">— ${m.entrenador} · ${m.fecha}</div>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      <!-- Servicios Activos -->
      ${j.serviciosInfo.length > 0 ? `
        <div class="section-card">
          <div class="section-card-header"><h3><i class="fa-solid fa-certificate"></i> Servicios Activos</h3></div>
          <div class="section-card-body">
            <div class="services-list">
              ${j.serviciosInfo.map(s => `
                <div class="service-chip">
                  <i class="fa-solid ${s.icono}"></i>
                  <span>${s.nombre}</span>
                  <span class="service-duration">${s.duracion}</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      ` : ''}

      <!-- Multimedia -->
      ${j.multimedia.length > 0 ? `
        <div class="section-card">
          <div class="section-card-header"><h3><i class="fa-solid fa-photo-film"></i> Multimedia</h3></div>
          <div class="section-card-body">
            <div class="media-grid">
              ${j.multimedia.map(m => `
                <div class="media-item">
                  <i class="fa-solid ${m.icono}"></i>
                  <span>${m.titulo}</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      ` : ''}

      <!-- Matches del jugador -->
      ${matches.length > 0 ? `
        <div class="section-card">
          <div class="section-card-header"><h3><i class="fa-solid fa-handshake"></i> Matches</h3></div>
          <div class="section-card-body">
            <div class="matches-player-list">
              ${matches.map(m => `
                <div class="match-player-item ${m.estado}">
                  <div class="match-player-club">
                    <span class="match-club-logo">${m.clubLogo}</span>
                    <div class="match-club-info">
                      <strong>${m.club}</strong>
                      <span>${m.clubInfo}</span>
                    </div>
                  </div>
                  <div class="match-player-status">
                    <span class="match-status-badge ${m.estado}">
                      ${m.estado === 'matched' ? '<i class="fa-solid fa-check-circle"></i> Match' : m.estado === 'pending' ? '<i class="fa-solid fa-clock"></i> Pendiente' : '<i class="fa-solid fa-times-circle"></i> Rechazado'}
                    </span>
                    <span class="match-date">${m.fecha}</span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      ` : ''}
    `;
  }

  function renderGoalMinutesBar(minutes) {
    // Create 9 zones (0-10, 10-20, ..., 80-90)
    const zones = Array(9).fill(0);
    minutes.forEach(m => {
      const idx = Math.min(Math.floor(m / 10), 8);
      zones[idx]++;
    });
    const max = Math.max(...zones, 1);
    return zones.map((count, i) => {
      const h = Math.round((count / max) * 100);
      return `
        <div class="goal-zone">
          <div class="goal-zone-bar" style="height:${Math.max(h, 4)}%;${count > 0 ? 'background:var(--accent);' : ''}"></div>
          <span>${i * 10}'</span>
        </div>
      `;
    }).join('');
  }

  // ============================================================
  //  MATCHMAKING
  // ============================================================
  function renderMatchmaking() {
    const statsRow = document.getElementById('matchmaking-stats-row');
    const grid = document.getElementById('matchmaking-grid-view');
    if (!statsRow || !grid) return;

    const all = MOCK_DATA.matchmaking;
    const matched = all.filter(m => m.estado === 'matched').length;
    const pending = all.filter(m => m.estado === 'pending').length;
    const rejected = all.filter(m => m.estado === 'rejected').length;

    statsRow.innerHTML = `
      <div class="stat-card">
        <div class="stat-icon green"><i class="fa-solid fa-check-circle"></i></div>
        <div class="stat-info"><h3>${matched}</h3><p>Matches confirmados</p></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon orange"><i class="fa-solid fa-clock"></i></div>
        <div class="stat-info"><h3>${pending}</h3><p>Pendientes</p></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon red"><i class="fa-solid fa-times-circle"></i></div>
        <div class="stat-info"><h3>${rejected}</h3><p>Rechazados</p></div>
      </div>
    `;

    // Sort: matched first, then pending, then rejected
    const sorted = [...all].sort((a, b) => {
      const order = { matched: 0, pending: 1, rejected: 2 };
      return (order[a.estado] || 0) - (order[b.estado] || 0);
    });

    grid.innerHTML = sorted.map(m => {
      const jugador = MOCK_DATA.getJugadorById(m.jugadorId);
      if (!jugador) return '';

      const posInfo = MOCK_DATA.posiciones[jugador.posicionPrincipal] || { abr: '??', color: '#666' };

      const statusBadge = m.estado === 'matched'
        ? '<span class="match-status-badge matched"><i class="fa-solid fa-check-circle"></i> Match</span>'
        : m.estado === 'pending'
          ? '<span class="match-status-badge pending"><i class="fa-solid fa-clock"></i> Pendiente</span>'
          : '<span class="match-status-badge rejected"><i class="fa-solid fa-times-circle"></i> Rechazado</span>';

      const chatHtml = m.mensajes.length > 0 ? `
        <div class="match-chat">
          <div class="match-chat-title"><i class="fa-solid fa-comments"></i> Conversación</div>
          ${m.mensajes.map(msg => `
            <div class="chat-msg ${msg.tipo}">
              <div class="chat-bubble">${msg.texto}</div>
              <div class="chat-time">${msg.tiempo}</div>
            </div>
          `).join('')}
        </div>
      ` : '';

      return `
        <div class="match-card ${m.estado}">
          <div class="match-card-header">
            <div class="match-jugador" onclick="App.openPlayerProfile('${jugador.id}')">
              <div class="match-avatar">${jugador.nombre[0]}${jugador.apellidos[0]}</div>
              <div>
                <h4>${jugador.nombre} ${jugador.apellidos}</h4>
                <span class="match-pos" style="background:${posInfo.color}">${posInfo.abr}</span>
                <span>${jugador.categoria} · ${jugador.localidad}</span>
              </div>
            </div>
            <div class="match-club-side">
              <span class="match-club-logo-lg">${m.clubLogo}</span>
              <div>
                <strong>${m.club}</strong>
                <span>${m.clubInfo}</span>
              </div>
            </div>
          </div>
          <div class="match-card-body">
            <p class="match-necesidad"><i class="fa-solid fa-bullseye"></i> ${m.necesidad}</p>
            <div class="match-meta-row">
              ${statusBadge}
              <span class="match-date"><i class="fa-regular fa-calendar"></i> ${m.fecha}</span>
            </div>
          </div>
          ${chatHtml}
        </div>
      `;
    }).join('');
  }

  // ============================================================
  //  MARKETPLACE
  // ============================================================
  function renderMarketplace() {
    const grid = document.getElementById('marketplace-grid');
    if (!grid) return;

    grid.innerHTML = MOCK_DATA.servicios.map(s => `
      <div class="service-card">
        <div class="service-card-icon ${s.iconClass}">
          <i class="fa-solid ${s.icono}"></i>
        </div>
        <div class="service-card-body">
          <h3>${s.nombre}</h3>
          <p class="service-category">${s.categoria}</p>
          <p class="service-desc">${s.descripcion}</p>
          <div class="service-partner"><i class="fa-solid fa-handshake-angle"></i> ${s.partner}</div>
        </div>
        <div class="service-card-footer">
          <div class="service-price">${s.precio}€ <span>${s.periodo}</span></div>
          ${s.desbloqueaSello ? '<span class="service-sello-badge"><i class="fa-solid fa-medal"></i> Desbloquea Sello</span>' : ''}
          <button class="btn btn-primary btn-sm" onclick="App.showToast('Servicio \\\'${s.nombre}\\\' añadido. Se contactará con el partner.', 'success')">
            <i class="fa-solid fa-cart-plus"></i> Contratar
          </button>
        </div>
      </div>
    `).join('');
  }

  // ============================================================
  //  ACTIONS
  // ============================================================
  function toggleAvailability(playerId) {
    const j = MOCK_DATA.getJugadorById(playerId);
    if (!j) return;
    j.disponible = !j.disponible;
    showToast(
      j.disponible ? `${j.nombre} ${j.apellidos} ahora está disponible` : `${j.nombre} ${j.apellidos} ya no está disponible`,
      j.disponible ? 'success' : 'info'
    );
    openPlayerProfile(playerId);
    updateBadges();
  }

  function simulateMatch(playerId) {
    const j = MOCK_DATA.getJugadorById(playerId);
    if (!j) return;
    showToast(`Solicitud de match enviada para ${j.nombre} ${j.apellidos}. El club será notificado.`, 'success');
  }

  // ============================================================
  //  TOAST
  // ============================================================
  function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const icons = {
      success: 'fa-check-circle',
      error: 'fa-times-circle',
      info: 'fa-info-circle',
      warning: 'fa-exclamation-triangle',
    };

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `<i class="fa-solid ${icons[type] || icons.info}"></i> <span>${message}</span>`;
    container.appendChild(toast);

    // Trigger animation
    requestAnimationFrame(() => toast.classList.add('show'));

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  // ============================================================
  //  HELPERS
  // ============================================================
  function setTextContent(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  }

  // ============================================================
  //  PUBLIC API
  // ============================================================
  return {
    init,
    showView,
    openPlayerProfile,
    toggleAvailability,
    simulateMatch,
    goBack,
    showToast,
    logout,
  };

})();

// ---- Boot ----
document.addEventListener('DOMContentLoaded', () => App.init());
