/* ============================================
   InfoSport – Application Logic
   SPA Controller & Rendering Engine
   ============================================ */

const App = (() => {
  'use strict';

  // ---- State ----
  let currentView = 'dashboard';
  let currentPlayerId = null;
  let filteredPlayers = [];
  let currentRole = 'director'; // 'director' | 'jugador'
  const PLAYER_ID = 'j-001'; // Alejandro García López (logged-in player)

  // ---- DOM Helpers ----
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  // ---- Init ----
  function init() {
    bindNavigation();
    bindFilters();
    bindGlobalSearch();
    bindHamburger();
    bindRoleSwitcher();
    renderDashboard();
    showView('dashboard');
  }

  // ===================== Role Switcher =====================
  function bindRoleSwitcher() {
    $$('.role-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const role = btn.dataset.role;
        switchRole(role);
      });
    });
  }

  function switchRole(role) {
    currentRole = role;

    // Update role buttons
    $$('.role-btn').forEach(b => b.classList.remove('active'));
    $(`.role-btn[data-role="${role}"]`).classList.add('active');

    // Update nav groups
    if (role === 'director') {
      $('#nav-director').style.display = 'block';
      $('#nav-jugador').style.display = 'none';
      // Update sidebar identity
      $('#sidebar-avatar').textContent = 'DD';
      $('#sidebar-user-name').textContent = 'Dir. Deportiva';
      $('#sidebar-user-role').textContent = 'Real Jaén CF';
      // Update header indicator
      const indicator = $('#header-role-indicator');
      indicator.className = 'header-role-indicator';
      indicator.innerHTML = '<i class="fa-solid fa-user-tie"></i> <span>Vista Director Deportivo</span>';
      // Update search placeholder
      $('#global-search').placeholder = 'Buscar jugador por nombre...';
      // Go to dashboard
      showView('dashboard');
    } else {
      const j = MOCK_DATA.getJugadorById(PLAYER_ID);
      $('#nav-director').style.display = 'none';
      $('#nav-jugador').style.display = 'block';
      // Update sidebar identity
      const initials = j.nombre.charAt(0) + j.apellidos.charAt(0);
      $('#sidebar-avatar').textContent = initials;
      $('#sidebar-user-name').textContent = `${j.nombre} ${j.apellidos}`;
      $('#sidebar-user-role').textContent = `${j.posicionPrincipal} · ${j.categoria}`;
      // Update header indicator
      const indicator = $('#header-role-indicator');
      indicator.className = 'header-role-indicator player-mode';
      indicator.innerHTML = '<i class="fa-solid fa-futbol"></i> <span>Vista Jugador</span>';
      // Update search placeholder
      $('#global-search').placeholder = 'Buscar equipos, servicios...';
      // Go to player profile
      showView('p-miperfil');
    }
  }

  // ===================== Navigation =====================
  function bindNavigation() {
    $$('.nav-item[data-view]').forEach(item => {
      item.addEventListener('click', () => {
        const view = item.dataset.view;
        showView(view);
      });
    });
  }

  function showView(view) {
    currentView = view;
    // Update nav
    $$('.nav-item').forEach(n => n.classList.remove('active'));
    const activeNav = $(`.nav-item[data-view="${view}"]`);
    if (activeNav) activeNav.classList.add('active');
    // Update sections
    $$('.view-section').forEach(s => s.classList.remove('active'));
    const section = $(`#view-${view}`);
    if (section) {
      section.classList.add('active');
      section.classList.add('fade-in');
    }
    // Render
    switch (view) {
      case 'dashboard': renderDashboard(); break;
      case 'scouting': renderScouting(); break;
      case 'marketplace': renderMarketplace(); break;
      case 'matchmaking': renderMatchmaking(); break;
      case 'profile': renderProfile(currentPlayerId); break;
      // Player views
      case 'p-miperfil': renderPlayerMyProfile(); break;
      case 'p-estadisticas': renderPlayerStats(); break;
      case 'p-equipos': renderPlayerClubDirectory(); break;
      case 'p-solicitudes': renderPlayerSolicitudes(); break;
      case 'p-servicios': renderPlayerServicios(); break;
    }
    // Mobile: close sidebar
    $('.sidebar').classList.remove('open');
    window.scrollTo(0, 0);
  }

  // ===================== Dashboard =====================
  function renderDashboard() {
    const stats = MOCK_DATA.getStatsResumen();
    $('#stat-total').textContent = stats.total;
    $('#stat-disponibles').textContent = stats.disponibles;
    $('#stat-sello').textContent = stats.conSello;
    $('#stat-matches').textContent = stats.matches;

    // Render top players cards
    const topPlayers = MOCK_DATA.jugadores.slice(0, 6);
    const grid = $('#dashboard-players-grid');
    grid.innerHTML = topPlayers.map(j => renderPlayerCard(j)).join('');
    bindPlayerCardClicks(grid);
  }

  // ===================== Scouting (Filtros Pro) =====================
  function renderScouting() {
    const filtros = getFilterValues();
    filteredPlayers = MOCK_DATA.filtrarJugadores(filtros);
    const grid = $('#scouting-players-grid');
    const count = $('#results-count');

    count.innerHTML = `Se encontraron <strong>${filteredPlayers.length}</strong> jugadores`;

    if (filteredPlayers.length === 0) {
      grid.innerHTML = `
        <div class="empty-state" style="grid-column:1/-1">
          <i class="fa-solid fa-magnifying-glass"></i>
          <h3>Sin resultados</h3>
          <p>Ajusta los filtros para encontrar jugadores.</p>
        </div>`;
    } else {
      grid.innerHTML = filteredPlayers.map(j => renderPlayerCard(j)).join('');
    }
    bindPlayerCardClicks(grid);
  }

  function getFilterValues() {
    return {
      nombre: $('#filter-nombre')?.value || '',
      categoria: $('#filter-categoria')?.value || '',
      posicion: $('#filter-posicion')?.value || '',
      localidad: $('#filter-localidad')?.value || '',
      pierna: $('#filter-pierna')?.value || '',
      disponible: $('#filter-disponible')?.checked || false,
      sello: $('#filter-sello')?.value || '',
      golesMin: $('#filter-goles-min')?.value || '',
      edadMin: $('#filter-edad-min')?.value || '',
      edadMax: $('#filter-edad-max')?.value || '',
    };
  }

  function bindFilters() {
    const debounced = debounce(() => {
      if (currentView === 'scouting') renderScouting();
    }, 250);

    $$('.filter-group select, .filter-group input').forEach(el => {
      el.addEventListener('change', debounced);
      el.addEventListener('input', debounced);
    });

    const btnSearch = $('#btn-filter-search');
    if (btnSearch) btnSearch.addEventListener('click', () => renderScouting());

    const btnReset = $('#btn-filter-reset');
    if (btnReset) btnReset.addEventListener('click', () => {
      $$('.filter-group select').forEach(s => s.value = '');
      $$('.filter-group input[type="number"]').forEach(i => i.value = '');
      $$('.filter-group input[type="text"]').forEach(i => i.value = '');
      const chk = $('#filter-disponible');
      if (chk) chk.checked = false;
      renderScouting();
    });
  }

  // ===================== Player Card (List) =====================
  function renderPlayerCard(j) {
    const pos = MOCK_DATA.posiciones[j.posicionPrincipal];
    const edad = new Date().getFullYear() - j.nacimiento;
    const mediaGol = j.stats.goles > 0 ? Math.round(j.stats.minutos / j.stats.goles) : '—';
    const ratioTitular = j.stats.partidos > 0 ? Math.round((j.stats.titular / j.stats.partidos) * 100) : 0;
    const initials = j.nombre.charAt(0) + j.apellidos.charAt(0);

    let selloHTML = '';
    if (j.sello === 'gold') {
      selloHTML = `<span class="sello-badge gold"><i class="fa-solid fa-medal"></i> Alto Rendimiento</span>`;
    } else if (j.sello === 'silver') {
      selloHTML = `<span class="sello-badge silver"><i class="fa-solid fa-shield-halved"></i> En seguimiento</span>`;
    }

    return `
      <div class="player-card" data-player-id="${j.id}">
        <div class="player-card-header">
          <div class="player-avatar">${initials}</div>
          <div class="player-main-info">
            <div class="player-name">${j.nombre} ${j.apellidos}</div>
            <div class="player-position">${pos?.abr || ''} · ${j.posicionPrincipal}</div>
            <div class="player-meta-row">
              <span class="meta-tag">${j.categoria}</span>
              <span class="meta-tag">${edad} años</span>
              <span class="meta-tag">${j.localidad}</span>
              <span class="meta-tag">${j.pierna}</span>
            </div>
          </div>
        </div>
        <div class="player-card-body">
          <div class="player-stats-mini">
            <div class="mini-stat"><span class="val">${j.stats.goles}</span><span class="lbl">Goles</span></div>
            <div class="mini-stat"><span class="val">${j.stats.asistencias}</span><span class="lbl">Asist.</span></div>
            <div class="mini-stat"><span class="val">${mediaGol}</span><span class="lbl">Min/Gol</span></div>
            <div class="mini-stat"><span class="val">${ratioTitular}%</span><span class="lbl">Titular</span></div>
          </div>
        </div>
        <div class="player-card-footer">
          <div class="availability-badge">
            <span class="dot ${j.disponible ? 'available' : 'unavailable'}"></span>
            ${j.disponible ? 'Disponible' : 'No disponible'}
          </div>
          ${selloHTML}
        </div>
      </div>
    `;
  }

  function bindPlayerCardClicks(container) {
    $$('.player-card', container).forEach(card => {
      card.addEventListener('click', () => {
        const id = card.dataset.playerId;
        openPlayerProfile(id);
      });
    });
  }

  function openPlayerProfile(id) {
    currentPlayerId = id;
    showView('profile');
  }

  // ===================== Player Profile (Detailed) =====================
  function renderProfile(id) {
    const j = MOCK_DATA.getJugadorById(id);
    if (!j) return;

    const container = $('#view-profile');
    const edad = new Date().getFullYear() - j.nacimiento;
    const pos = MOCK_DATA.posiciones[j.posicionPrincipal];
    const mediaGol = j.stats.goles > 0 ? Math.round(j.stats.minutos / j.stats.goles) : '—';
    const ratioTitular = j.stats.partidos > 0 ? Math.round((j.stats.titular / j.stats.partidos) * 100) : 0;
    const initials = j.nombre.charAt(0) + j.apellidos.charAt(0);
    const minutosGolesFormatted = j.stats.minutoGolMedia.length > 0
      ? j.stats.minutoGolMedia.map(m => `${m}'`).join(', ')
      : 'Sin datos';

    let selloHTML = '';
    if (j.sello === 'gold') {
      selloHTML = `<span class="sello-badge gold" style="font-size:0.85rem;padding:6px 14px;"><i class="fa-solid fa-medal"></i> Sello Alto Rendimiento</span>`;
    } else if (j.sello === 'silver') {
      selloHTML = `<span class="sello-badge silver" style="font-size:0.85rem;padding:6px 14px;"><i class="fa-solid fa-shield-halved"></i> En seguimiento</span>`;
    }

    // Alt positions
    const altPosHTML = j.posicionesAlt.length > 0
      ? j.posicionesAlt.map(p => `<span class="meta-tag" style="font-size:0.78rem">${p}</span>`).join(' ')
      : '<span class="meta-tag">—</span>';

    // Team history
    const teamHistoryHTML = j.historialEquipos.map(t => {
      const eq = MOCK_DATA.getEquipoByNombre(t.equipo);
      return `
        <div class="team-history-item">
          <div class="team-badge">${eq ? eq.logo : '⚽'}</div>
          <span class="team-name">${t.equipo} <span style="color:var(--text-muted);font-weight:400;font-size:0.75rem">(${t.categoria})</span></span>
          <span class="team-years">${t.temporadas}</span>
        </div>`;
    }).join('');

    // Coach wall
    const coachWallHTML = j.muroEntrenador.map(c => `
      <div class="coach-quote">
        <p>${c.texto}</p>
        <div class="coach-name">— ${c.entrenador} · ${c.fecha}</div>
      </div>`
    ).join('');

    // Semáforo de Salud
    const allServices = [
      { key: 'srv-1', nombre: 'Nutrición Deportiva', icono: 'fa-apple-whole', iconClass: 'green' },
      { key: 'srv-2', nombre: 'Psicología Deportiva', icono: 'fa-brain', iconClass: 'orange' },
      { key: 'srv-3', nombre: 'Preparación Física', icono: 'fa-dumbbell', iconClass: 'green' },
    ];

    const semaphoreHTML = allServices.map(s => {
      const activo = j.serviciosActivos.includes(s.key);
      const info = j.serviciosInfo.find(si => si.icono === s.icono);
      return `
        <div class="semaphore-item ${activo ? 'active' : 'inactive'}">
          <div class="semaphore-icon ${activo ? s.iconClass : 'gray'}">
            <i class="fa-solid ${s.icono}"></i>
          </div>
          <div class="semaphore-info">
            <h4>${s.nombre}</h4>
            <p>${activo ? `Activo · ${info ? info.duracion : ''}` : 'No contratado'}</p>
          </div>
        </div>`;
    }).join('');

    // Multimedia
    const mediaHTML = j.multimedia.map(m => `
      <div class="media-thumb">
        <i class="fa-solid ${m.icono}"></i>
        <div class="media-label">${m.titulo}</div>
      </div>`
    ).join('');

    // Matches
    const playerMatches = MOCK_DATA.getMatchesByJugador(id);
    let matchesHTML = '';
    if (playerMatches.length > 0) {
      matchesHTML = playerMatches.map(m => {
        const statusClass = m.estado;
        const statusLabel = m.estado === 'matched' ? '✅ Match' : m.estado === 'pending' ? '⏳ Pendiente' : '❌ Rechazado';
        let chatHTML = '';
        if (m.estado === 'matched' && m.mensajes.length > 0) {
          const msgs = m.mensajes.map(msg => `<div class="chat-msg ${msg.tipo}">${msg.texto}</div>`).join('');
          chatHTML = `
            <div class="chat-container" style="margin-top:0.75rem">
              <div class="chat-messages">${msgs}</div>
              <div class="chat-input-bar">
                <input type="text" placeholder="Escribe un mensaje..." />
                <button onclick="App.showToast('Mensaje enviado (demo)', 'success')">Enviar</button>
              </div>
            </div>`;
        }
        return `
          <div class="match-card">
            <div class="match-card-header">
              <div class="match-club-logo">${m.clubLogo}</div>
              <div>
                <div class="match-club-name">${m.club}</div>
                <div class="match-club-info">${m.clubInfo}</div>
              </div>
            </div>
            <div class="match-status ${statusClass}">${statusLabel}</div>
            <div class="match-needs"><strong>Necesidad:</strong> ${m.necesidad}</div>
            ${m.estado === 'pending' ? `<button class="btn btn-sm btn-outline-accent" onclick="App.simulateMatch('${m.id}')"><i class="fa-solid fa-handshake"></i> Simular Match</button>` : ''}
            ${chatHTML}
          </div>`;
      }).join('');
    } else {
      matchesHTML = `<div class="empty-state"><i class="fa-solid fa-handshake-slash"></i><h3>Sin solicitudes</h3><p>Este jugador no tiene solicitudes de contacto activas.</p></div>`;
    }

    container.innerHTML = `
      <button class="back-btn" onclick="App.goBack()"><i class="fa-solid fa-arrow-left"></i> Volver al listado</button>

      <!-- Hero -->
      <div class="profile-hero">
        <div class="profile-hero-top">
          <div class="profile-avatar-lg">${initials}</div>
          <div class="profile-info-block">
            <div class="profile-name">${j.nombre} ${j.apellidos}</div>
            <div class="profile-position-main">${pos?.abr || ''} · ${j.posicionPrincipal}</div>
            <div class="profile-details-grid">
              <div class="detail-item"><span class="detail-label">Categoría</span><span class="detail-value">${j.categoria}</span></div>
              <div class="detail-item"><span class="detail-label">Edad</span><span class="detail-value">${edad} años (${j.nacimiento})</span></div>
              <div class="detail-item"><span class="detail-label">Localidad</span><span class="detail-value">${j.localidad}</span></div>
              <div class="detail-item"><span class="detail-label">Altura</span><span class="detail-value">${j.altura} cm</span></div>
              <div class="detail-item"><span class="detail-label">Peso</span><span class="detail-value">${j.peso} kg</span></div>
              <div class="detail-item"><span class="detail-label">Pierna</span><span class="detail-value">${j.pierna}</span></div>
              <div class="detail-item"><span class="detail-label">Pos. Alternativas</span><span class="detail-value" style="display:flex;gap:4px;flex-wrap:wrap">${altPosHTML}</span></div>
            </div>
          </div>
          <div class="profile-actions">
            ${selloHTML}
            <label class="toggle-switch" style="margin-top:0.75rem">
              <input type="checkbox" ${j.disponible ? 'checked' : ''} onchange="App.toggleAvailability('${j.id}', this.checked)" />
              <span class="toggle-slider"></span>
              <span class="toggle-label">${j.disponible ? 'Visible para clubes' : 'Oculto'}</span>
            </label>
            <button class="btn btn-blue btn-sm" style="margin-top:0.5rem" onclick="App.showToast('Solicitud de plaza enviada (demo)', 'info')"><i class="fa-solid fa-paper-plane"></i> Solicitar plaza</button>
          </div>
        </div>
      </div>

      <div class="two-col">
        <!-- Left Column -->
        <div>
          <!-- Estadísticas -->
          <div class="section-card">
            <div class="section-card-header"><h3><i class="fa-solid fa-chart-bar"></i> Estadísticas Avanzadas</h3></div>
            <div class="section-card-body">
              <div class="profile-stats-grid">
                <div class="profile-stat-item"><div class="stat-val">${j.stats.partidos}</div><div class="stat-label">Partidos</div></div>
                <div class="profile-stat-item"><div class="stat-val">${j.stats.goles}</div><div class="stat-label">Goles</div></div>
                <div class="profile-stat-item"><div class="stat-val">${j.stats.asistencias}</div><div class="stat-label">Asistencias</div></div>
                <div class="profile-stat-item"><div class="stat-val">${j.stats.tarjetasAmarillas}</div><div class="stat-label">T. Amarillas</div></div>
                <div class="profile-stat-item"><div class="stat-val">${j.stats.tarjetasRojas}</div><div class="stat-label">T. Rojas</div></div>
                <div class="profile-stat-item"><div class="stat-val">${j.stats.minutos}'</div><div class="stat-label">Minutos</div></div>
                <div class="profile-stat-item"><div class="stat-val">${mediaGol}'</div><div class="stat-label">Media Min/Gol</div></div>
                <div class="profile-stat-item"><div class="stat-val">${ratioTitular}%</div><div class="stat-label">Ratio Titular</div></div>
              </div>
              <div style="margin-top:1rem;padding:0.75rem;background:var(--bg-input);border-radius:var(--radius-sm);">
                <div style="font-size:0.7rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:0.35rem;font-weight:600;">Minuto de los goles</div>
                <div style="font-size:0.82rem;color:var(--text-secondary);line-height:1.6">${minutosGolesFormatted}</div>
              </div>
            </div>
          </div>

          <!-- Muro del Entrenador -->
          <div class="section-card">
            <div class="section-card-header"><h3><i class="fa-solid fa-bullhorn"></i> Muro del Entrenador</h3></div>
            <div class="section-card-body">${coachWallHTML}</div>
          </div>

          <!-- Matchmaking -->
          <div class="section-card">
            <div class="section-card-header"><h3><i class="fa-solid fa-handshake"></i> Zona de Contacto (Matchmaking)</h3></div>
            <div class="section-card-body">
              <div class="matchmaking-grid">${matchesHTML}</div>
            </div>
          </div>
        </div>

        <!-- Right Column -->
        <div>
          <!-- Semáforo de Salud -->
          <div class="section-card">
            <div class="section-card-header"><h3><i class="fa-solid fa-heartbeat"></i> Semáforo de Salud / Sello de Alto Rendimiento</h3></div>
            <div class="section-card-body">
              <div class="health-semaphore">${semaphoreHTML}</div>
              ${j.sello === 'gold' ? `<div style="margin-top:1rem;padding:0.75rem;background:rgba(255,193,7,0.08);border:1px solid rgba(255,193,7,0.2);border-radius:var(--radius-sm);font-size:0.8rem;color:var(--warning);display:flex;align-items:center;gap:0.5rem;"><i class="fa-solid fa-trophy"></i> <strong>Sello de Alto Rendimiento desbloqueado.</strong> Este jugador trabaja activamente con los profesionales de InfoSport.</div>` : `<div style="margin-top:1rem;padding:0.75rem;background:rgba(136,146,176,0.08);border:1px solid rgba(136,146,176,0.15);border-radius:var(--radius-sm);font-size:0.8rem;color:var(--text-muted);display:flex;align-items:center;gap:0.5rem;"><i class="fa-solid fa-info-circle"></i> Contrata servicios de nutrición, psicología y preparación física para desbloquear el Sello de Alto Rendimiento.</div>`}
            </div>
          </div>

          <!-- Historial de Equipos -->
          <div class="section-card">
            <div class="section-card-header"><h3><i class="fa-solid fa-shirt"></i> Historial de Equipos</h3></div>
            <div class="section-card-body">
              <div class="team-history-list">${teamHistoryHTML}</div>
            </div>
          </div>

          <!-- Multimedia -->
          <div class="section-card">
            <div class="section-card-header"><h3><i class="fa-solid fa-photo-film"></i> Multimedia</h3></div>
            <div class="section-card-body">
              <div class="media-gallery">${mediaHTML}</div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // ===================== Marketplace =====================
  function renderMarketplace() {
    const grid = $('#marketplace-grid');
    grid.innerHTML = MOCK_DATA.servicios.map(s => `
      <div class="service-card">
        <div class="service-card-top">
          <div class="service-icon ${s.iconClass}"><i class="fa-solid ${s.icono}"></i></div>
          <div class="service-info">
            <h3>${s.nombre}</h3>
            <p>${s.descripcion}</p>
            <div class="service-partner"><i class="fa-solid fa-handshake-angle"></i> ${s.partner}</div>
          </div>
        </div>
        <div class="service-card-bottom">
          <div class="service-price">${s.precio}€ <span>${s.periodo}</span></div>
          ${s.desbloqueaSello ? `<div class="service-unlocks"><i class="fa-solid fa-lock-open"></i> Desbloquea Sello</div>` : ''}
          <button class="btn btn-sm btn-primary" onclick="App.showToast('Servicio contratado (demo): ${s.nombre}', 'success')"><i class="fa-solid fa-cart-plus"></i> Contratar</button>
        </div>
      </div>
    `).join('');
  }

  // ===================== Matchmaking =====================
  function renderMatchmaking() {
    const grid = $('#matchmaking-grid-view');
    const matches = MOCK_DATA.matchmaking;

    grid.innerHTML = matches.map(m => {
      const j = MOCK_DATA.getJugadorById(m.jugadorId);
      const statusClass = m.estado;
      const statusLabel = m.estado === 'matched' ? '✅ Match' : m.estado === 'pending' ? '⏳ Pendiente' : '❌ Rechazado';
      return `
        <div class="match-card">
          <div class="match-card-header">
            <div class="match-club-logo">${m.clubLogo}</div>
            <div>
              <div class="match-club-name">${m.club}</div>
              <div class="match-club-info">${m.clubInfo}</div>
            </div>
          </div>
          <div class="match-status ${statusClass}">${statusLabel}</div>
          <div class="match-needs"><strong>Jugador:</strong> ${j ? `${j.nombre} ${j.apellidos}` : 'Desconocido'}</div>
          <div class="match-needs"><strong>Necesidad:</strong> ${m.necesidad}</div>
          ${m.estado === 'pending' ? `<button class="btn btn-sm btn-outline-accent" onclick="App.simulateMatch('${m.id}')"><i class="fa-solid fa-handshake"></i> Simular Match</button>` : ''}
          ${m.estado === 'matched' ? `<button class="btn btn-sm btn-blue" onclick="App.openPlayerProfile('${m.jugadorId}')"><i class="fa-solid fa-comment-dots"></i> Ver Chat</button>` : ''}
        </div>`;
    }).join('');
  }

  // ===================== Global Search =====================
  function bindGlobalSearch() {
    const input = $('#global-search');
    if (!input) return;

    input.addEventListener('input', debounce(() => {
      const term = input.value.trim();
      if (term.length >= 2) {
        showView('scouting');
        const filterNombre = $('#filter-nombre');
        if (filterNombre) {
          filterNombre.value = term;
          renderScouting();
        }
      }
    }, 400));
  }

  // ===================== Hamburger =====================
  function bindHamburger() {
    const hamburger = $('#hamburger-btn');
    if (hamburger) {
      hamburger.addEventListener('click', () => {
        $('.sidebar').classList.toggle('open');
      });
    }
  }

  // ===================== Actions =====================
  function toggleAvailability(id, checked) {
    const j = MOCK_DATA.getJugadorById(id);
    if (j) {
      j.disponible = checked;
      showToast(checked ? 'Perfil visible para clubes' : 'Perfil oculto para clubes', 'success');
      // Update toggle labels (may exist in both director and player views)
      $$('.toggle-label').forEach(label => {
        if (label.id === 'player-avail-label' || label.closest('.profile-actions') || label.closest('.player-welcome-actions')) {
          label.textContent = checked ? 'Visible para clubes' : 'Oculto para clubes';
        }
      });
    }
  }

  function simulateMatch(matchId) {
    const m = MOCK_DATA.matchmaking.find(x => x.id === matchId);
    if (m) {
      m.estado = 'matched';
      m.mensajes = [
        { tipo: 'received', texto: `¡Enhorabuena! ${m.club} ha aceptado tu solicitud. Nos ponemos en contacto contigo pronto.`, tiempo: 'Ahora' },
      ];
      showToast(`¡Match con ${m.club}! Chat habilitado.`, 'success');
      // Re-render
      if (currentView === 'matchmaking') renderMatchmaking();
      if (currentView === 'profile') renderProfile(currentPlayerId);
    }
  }

  function goBack() {
    if (currentRole === 'jugador') {
      showView('p-miperfil');
    } else {
      showView('scouting');
    }
  }

  // ===================== PLAYER VIEWS =====================

  // ---- Mi Perfil (Player sees their own profile) ----
  function renderPlayerMyProfile() {
    const j = MOCK_DATA.getJugadorById(PLAYER_ID);
    if (!j) return;
    const container = $('#view-p-miperfil');
    const edad = new Date().getFullYear() - j.nacimiento;
    const pos = MOCK_DATA.posiciones[j.posicionPrincipal];
    const initials = j.nombre.charAt(0) + j.apellidos.charAt(0);

    // Team history
    const teamHistoryHTML = j.historialEquipos.map(t => {
      const eq = MOCK_DATA.getEquipoByNombre(t.equipo);
      return `
        <div class="team-history-item">
          <div class="team-badge">${eq ? eq.logo : '⚽'}</div>
          <span class="team-name">${t.equipo} <span style="color:var(--text-muted);font-weight:400;font-size:0.75rem">(${t.categoria})</span></span>
          <span class="team-years">${t.temporadas}</span>
        </div>`;
    }).join('');

    // Coach wall
    const coachWallHTML = j.muroEntrenador.map(c => `
      <div class="coach-quote">
        <p>${c.texto}</p>
        <div class="coach-name">— ${c.entrenador} · ${c.fecha}</div>
      </div>`
    ).join('');

    // Multimedia
    const mediaHTML = j.multimedia.map(m => `
      <div class="media-thumb">
        <i class="fa-solid ${m.icono}"></i>
        <div class="media-label">${m.titulo}</div>
      </div>`
    ).join('');

    // Alt positions
    const altPosHTML = j.posicionesAlt.length > 0
      ? j.posicionesAlt.map(p => `<span class="meta-tag" style="font-size:0.78rem">${p}</span>`).join(' ')
      : '<span class="meta-tag">—</span>';

    // Sello progress
    const selloServices = ['srv-1', 'srv-2', 'srv-3'];
    const activeSelloCount = selloServices.filter(s => j.serviciosActivos.includes(s)).length;
    const selloPercent = Math.round((activeSelloCount / selloServices.length) * 100);
    const circumference = 2 * Math.PI * 42;
    const dashOffset = circumference - (selloPercent / 100) * circumference;

    container.innerHTML = `
      <!-- Welcome Banner -->
      <div class="player-welcome">
        <div class="player-welcome-avatar">${initials}</div>
        <div class="player-welcome-info">
          <h2>¡Hola, ${j.nombre}!</h2>
          <p>${pos?.abr || ''} · ${j.posicionPrincipal} · ${j.categoria} · ${j.localidad}</p>
        </div>
        <div class="player-welcome-actions">
          <label class="toggle-switch">
            <input type="checkbox" ${j.disponible ? 'checked' : ''} onchange="App.toggleAvailability('${j.id}', this.checked)" />
            <span class="toggle-slider"></span>
            <span class="toggle-label" id="player-avail-label">${j.disponible ? 'Visible para clubes' : 'Oculto para clubes'}</span>
          </label>
          ${j.sello === 'gold' ? `<span class="sello-badge gold" style="font-size:0.8rem;padding:5px 12px;margin-top:0.25rem;"><i class="fa-solid fa-medal"></i> Sello Alto Rendimiento</span>` : j.sello === 'silver' ? `<span class="sello-badge silver" style="font-size:0.8rem;padding:5px 12px;margin-top:0.25rem;"><i class="fa-solid fa-shield-halved"></i> En seguimiento</span>` : ''}
        </div>
      </div>

      <div class="two-col">
        <!-- Left Column -->
        <div>
          <!-- Editable Profile Card -->
          <div class="section-card">
            <div class="section-card-header">
              <h3><i class="fa-solid fa-id-card"></i> Mi Pasaporte Digital</h3>
              <button class="btn btn-sm btn-outline-accent" onclick="App.showToast('Perfil guardado (demo)', 'success')"><i class="fa-solid fa-floppy-disk"></i> Guardar cambios</button>
            </div>
            <div class="section-card-body">
              <div class="profile-form-grid">
                <div class="form-field">
                  <label>Nombre</label>
                  <input type="text" value="${j.nombre}" />
                </div>
                <div class="form-field">
                  <label>Apellidos</label>
                  <input type="text" value="${j.apellidos}" />
                </div>
                <div class="form-field">
                  <label>Año de nacimiento</label>
                  <input type="number" value="${j.nacimiento}" />
                </div>
                <div class="form-field">
                  <label>Categoría</label>
                  <select>
                    ${MOCK_DATA.categorias.map(c => `<option ${c === j.categoria ? 'selected' : ''}>${c}</option>`).join('')}
                  </select>
                </div>
                <div class="form-field">
                  <label>Posición Principal</label>
                  <select>
                    ${Object.keys(MOCK_DATA.posiciones).map(p => `<option ${p === j.posicionPrincipal ? 'selected' : ''}>${p}</option>`).join('')}
                  </select>
                </div>
                <div class="form-field">
                  <label>Pierna Dominante</label>
                  <select>
                    <option ${j.pierna === 'Derecha' ? 'selected' : ''}>Derecha</option>
                    <option ${j.pierna === 'Izquierda' ? 'selected' : ''}>Izquierda</option>
                    <option ${j.pierna === 'Ambidiestro' ? 'selected' : ''}>Ambidiestro</option>
                  </select>
                </div>
                <div class="form-field">
                  <label>Altura (cm)</label>
                  <input type="number" value="${j.altura}" />
                </div>
                <div class="form-field">
                  <label>Peso (kg)</label>
                  <input type="number" value="${j.peso}" />
                </div>
                <div class="form-field">
                  <label>Localidad</label>
                  <select>
                    ${MOCK_DATA.localidades.map(l => `<option ${l === j.localidad ? 'selected' : ''}>${l}</option>`).join('')}
                  </select>
                </div>
              </div>

              <div style="margin-top:1.25rem">
                <label style="font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;color:var(--text-muted);display:block;margin-bottom:0.5rem;">Posiciones Alternativas</label>
                <div style="display:flex;gap:0.5rem;flex-wrap:wrap;">
                  ${altPosHTML}
                  <button class="btn btn-sm btn-secondary" onclick="App.showToast('Añadir posición (demo)', 'info')" style="font-size:0.7rem;padding:3px 10px;"><i class="fa-solid fa-plus"></i> Añadir</button>
                </div>
              </div>
            </div>
          </div>

          <!-- Muro del Entrenador (readonly for player) -->
          <div class="section-card">
            <div class="section-card-header"><h3><i class="fa-solid fa-bullhorn"></i> Lo que dicen mis entrenadores</h3></div>
            <div class="section-card-body">${coachWallHTML.length > 0 ? coachWallHTML : '<p style="color:var(--text-muted);font-size:0.85rem;">Aún no tienes comentarios de entrenadores.</p>'}</div>
          </div>
        </div>

        <!-- Right Column -->
        <div>
          <!-- Sello Progress -->
          <div class="section-card">
            <div class="section-card-header"><h3><i class="fa-solid fa-trophy"></i> Progreso del Sello</h3></div>
            <div class="section-card-body">
              <div class="sello-progress-container">
                <div class="sello-progress-ring">
                  <svg width="100" height="100" viewBox="0 0 100 100">
                    <circle class="progress-bg" cx="50" cy="50" r="42" />
                    <circle class="progress-fill" cx="50" cy="50" r="42" stroke-dasharray="${circumference}" stroke-dashoffset="${dashOffset}" />
                  </svg>
                  <div class="sello-progress-center">
                    <span class="pct">${selloPercent}%</span>
                    <span class="pct-label">Completado</span>
                  </div>
                </div>
                <div class="sello-progress-info">
                  <h3>${j.sello === 'gold' ? '🏆 ¡Sello desbloqueado!' : 'Desbloquea tu Sello'}</h3>
                  <p>${j.sello === 'gold' ? 'Tienes el Sello de Alto Rendimiento activo. Los clubes te ven como un jugador comprometido.' : 'Contrata los 3 servicios clave para desbloquear el Sello de Alto Rendimiento en tu perfil.'}</p>
                  <ul class="sello-checklist">
                    <li class="${j.serviciosActivos.includes('srv-1') ? 'completed' : 'not-completed'}">
                      <i class="fa-solid ${j.serviciosActivos.includes('srv-1') ? 'fa-circle-check done' : 'fa-circle pending'}"></i>
                      Nutrición Deportiva
                    </li>
                    <li class="${j.serviciosActivos.includes('srv-2') ? 'completed' : 'not-completed'}">
                      <i class="fa-solid ${j.serviciosActivos.includes('srv-2') ? 'fa-circle-check done' : 'fa-circle pending'}"></i>
                      Psicología del Rendimiento
                    </li>
                    <li class="${j.serviciosActivos.includes('srv-3') ? 'completed' : 'not-completed'}">
                      <i class="fa-solid ${j.serviciosActivos.includes('srv-3') ? 'fa-circle-check done' : 'fa-circle pending'}"></i>
                      Preparación Física Individual
                    </li>
                  </ul>
                  ${j.sello !== 'gold' ? `<button class="btn btn-sm btn-primary" style="margin-top:0.75rem" onclick="App.showView('marketplace')"><i class="fa-solid fa-store"></i> Ir al Marketplace</button>` : ''}
                </div>
              </div>
            </div>
          </div>

          <!-- Team History -->
          <div class="section-card">
            <div class="section-card-header"><h3><i class="fa-solid fa-shirt"></i> Mi trayectoria</h3></div>
            <div class="section-card-body">
              <div class="team-history-list">${teamHistoryHTML}</div>
            </div>
          </div>

          <!-- Multimedia Upload -->
          <div class="section-card">
            <div class="section-card-header">
              <h3><i class="fa-solid fa-photo-film"></i> Mi Multimedia</h3>
              <button class="btn btn-sm btn-blue" onclick="App.showToast('Subir archivo (demo)', 'info')"><i class="fa-solid fa-cloud-arrow-up"></i> Subir</button>
            </div>
            <div class="section-card-body">
              <div class="media-gallery">${mediaHTML}</div>
              <div class="upload-zone" style="margin-top:1rem" onclick="App.showToast('Subir vídeo o foto (demo)', 'info')">
                <i class="fa-solid fa-cloud-arrow-up"></i>
                <p>Arrastra aquí tus vídeos o fotos</p>
                <span>MP4, MOV, JPG, PNG · Máx 50MB</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // ---- Mis Estadísticas (Player Stats) ----
  function renderPlayerStats() {
    const j = MOCK_DATA.getJugadorById(PLAYER_ID);
    if (!j) return;
    const container = $('#view-p-estadisticas');
    const mediaGol = j.stats.goles > 0 ? Math.round(j.stats.minutos / j.stats.goles) : '—';
    const ratioTitular = j.stats.partidos > 0 ? Math.round((j.stats.titular / j.stats.partidos) * 100) : 0;
    const minutosGolesFormatted = j.stats.minutoGolMedia.length > 0
      ? j.stats.minutoGolMedia.map(m => `${m}'`).join(', ')
      : 'Sin datos';
    const mediaMinutos = j.stats.partidos > 0 ? Math.round(j.stats.minutos / j.stats.partidos) : 0;

    // Build a simple bar chart representation for goals per time zone
    const zones = { '0-15': 0, '16-30': 0, '31-45': 0, '46-60': 0, '61-75': 0, '76-90': 0 };
    j.stats.minutoGolMedia.forEach(m => {
      if (m <= 15) zones['0-15']++;
      else if (m <= 30) zones['16-30']++;
      else if (m <= 45) zones['31-45']++;
      else if (m <= 60) zones['46-60']++;
      else if (m <= 75) zones['61-75']++;
      else zones['76-90']++;
    });
    const maxZone = Math.max(...Object.values(zones), 1);
    const barsHTML = Object.entries(zones).map(([label, count]) => {
      const pct = Math.round((count / maxZone) * 100);
      return `
        <div style="display:flex;align-items:center;gap:0.6rem;margin-bottom:0.4rem;">
          <span style="width:45px;font-size:0.7rem;color:var(--text-muted);text-align:right;flex-shrink:0;">${label}'</span>
          <div style="flex:1;height:22px;background:var(--bg-input);border-radius:4px;overflow:hidden;">
            <div style="height:100%;width:${pct}%;background:linear-gradient(90deg,var(--accent),var(--accent-secondary));border-radius:4px;display:flex;align-items:center;padding-left:6px;font-size:0.68rem;font-weight:700;color:var(--bg-primary);transition:width 0.5s ease;min-width:${count > 0 ? '20px' : '0'}">${count > 0 ? count : ''}</div>
          </div>
        </div>`;
    }).join('');

    container.innerHTML = `
      <h2 class="page-title">Mis Estadísticas</h2>
      <p class="page-subtitle">Temporada 2025/26 · ${j.historialEquipos[0]?.equipo || ''}</p>

      <!-- Main Stats -->
      <div class="stats-row">
        <div class="stat-card">
          <div class="stat-icon green"><i class="fa-solid fa-futbol"></i></div>
          <div class="stat-info"><h3>${j.stats.goles}</h3><p>Goles</p></div>
        </div>
        <div class="stat-card">
          <div class="stat-icon blue"><i class="fa-solid fa-hands-helping"></i></div>
          <div class="stat-info"><h3>${j.stats.asistencias}</h3><p>Asistencias</p></div>
        </div>
        <div class="stat-card">
          <div class="stat-icon orange"><i class="fa-solid fa-gamepad"></i></div>
          <div class="stat-info"><h3>${j.stats.partidos}</h3><p>Partidos</p></div>
        </div>
        <div class="stat-card">
          <div class="stat-icon red"><i class="fa-solid fa-clock"></i></div>
          <div class="stat-info"><h3>${j.stats.minutos}'</h3><p>Minutos Jugados</p></div>
        </div>
      </div>

      <div class="two-col">
        <div>
          <!-- Detailed Stats -->
          <div class="section-card">
            <div class="section-card-header"><h3><i class="fa-solid fa-chart-bar"></i> Desglose Completo</h3></div>
            <div class="section-card-body">
              <div class="profile-stats-grid">
                <div class="profile-stat-item"><div class="stat-val">${j.stats.titular}</div><div class="stat-label">Titular</div></div>
                <div class="profile-stat-item"><div class="stat-val">${j.stats.suplente}</div><div class="stat-label">Suplente</div></div>
                <div class="profile-stat-item"><div class="stat-val">${ratioTitular}%</div><div class="stat-label">% Titular</div></div>
                <div class="profile-stat-item"><div class="stat-val">${mediaMinutos}'</div><div class="stat-label">Min/Partido</div></div>
                <div class="profile-stat-item"><div class="stat-val">${mediaGol}'</div><div class="stat-label">Min/Gol</div></div>
                <div class="profile-stat-item"><div class="stat-val">${j.stats.tarjetasAmarillas}</div><div class="stat-label">T. Amarillas</div></div>
                <div class="profile-stat-item"><div class="stat-val">${j.stats.tarjetasRojas}</div><div class="stat-label">T. Rojas</div></div>
                <div class="profile-stat-item"><div class="stat-val">${j.stats.goles + j.stats.asistencias}</div><div class="stat-label">G+A Total</div></div>
              </div>
            </div>
          </div>

          <!-- Goal minutes list -->
          <div class="section-card">
            <div class="section-card-header"><h3><i class="fa-solid fa-stopwatch"></i> Minuto de mis goles</h3></div>
            <div class="section-card-body">
              <div style="font-size:0.85rem;color:var(--text-secondary);line-height:1.8">${minutosGolesFormatted}</div>
            </div>
          </div>
        </div>

        <div>
          <!-- Goal distribution chart -->
          <div class="section-card">
            <div class="section-card-header"><h3><i class="fa-solid fa-chart-simple"></i> Distribución de goles por franja</h3></div>
            <div class="section-card-body">
              ${barsHTML}
              <p style="font-size:0.72rem;color:var(--text-muted);margin-top:0.75rem;text-align:center;">Goles por franja de 15 minutos</p>
            </div>
          </div>

          <!-- Performance Summary -->
          <div class="section-card">
            <div class="section-card-header"><h3><i class="fa-solid fa-ranking-star"></i> Resumen de rendimiento</h3></div>
            <div class="section-card-body">
              <div style="display:flex;flex-direction:column;gap:0.75rem;">
                <div style="display:flex;justify-content:space-between;align-items:center;padding:0.6rem 0;border-bottom:1px solid var(--border-color)">
                  <span style="font-size:0.85rem;color:var(--text-secondary);">Goles por partido</span>
                  <span style="font-size:1rem;font-weight:800;color:var(--accent)">${j.stats.partidos > 0 ? (j.stats.goles / j.stats.partidos).toFixed(2) : '0'}</span>
                </div>
                <div style="display:flex;justify-content:space-between;align-items:center;padding:0.6rem 0;border-bottom:1px solid var(--border-color)">
                  <span style="font-size:0.85rem;color:var(--text-secondary);">Asistencias por partido</span>
                  <span style="font-size:1rem;font-weight:800;color:var(--accent-secondary)">${j.stats.partidos > 0 ? (j.stats.asistencias / j.stats.partidos).toFixed(2) : '0'}</span>
                </div>
                <div style="display:flex;justify-content:space-between;align-items:center;padding:0.6rem 0;border-bottom:1px solid var(--border-color)">
                  <span style="font-size:0.85rem;color:var(--text-secondary);">Participación en goles (G+A)</span>
                  <span style="font-size:1rem;font-weight:800;color:var(--warning)">${j.stats.goles + j.stats.asistencias}</span>
                </div>
                <div style="display:flex;justify-content:space-between;align-items:center;padding:0.6rem 0;">
                  <span style="font-size:0.85rem;color:var(--text-secondary);">Minutos jugados por jornada</span>
                  <span style="font-size:1rem;font-weight:800;color:var(--text-primary)">${mediaMinutos}'</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // ---- Buscar Equipos (Club directory for players) ----
  function renderPlayerClubDirectory() {
    const container = $('#view-p-equipos');
    const clubs = MOCK_DATA.directorioClubes;

    const clubsHTML = clubs.map(c => {
      const needsHTML = c.necesidades.map(n => `
        <div class="club-need-item">
          <i class="fa-solid fa-caret-right"></i>
          <span><strong>${n.posicion}</strong> — ${n.desc}</span>
        </div>`).join('');

      return `
        <div class="club-card">
          <div class="club-card-top">
            <div class="club-logo-lg">${c.logo}</div>
            <div class="club-card-info">
              <h3>${c.nombre}</h3>
              <p>${c.categoria} · ${c.localidad}</p>
              <p style="margin-top:0.25rem;font-size:0.75rem;color:var(--text-muted)">${c.descripcion}</p>
            </div>
          </div>
          <div class="club-card-needs">
            <div style="font-size:0.68rem;font-weight:700;text-transform:uppercase;color:var(--text-muted);letter-spacing:0.5px;margin-bottom:0.35rem;">Buscan:</div>
            ${needsHTML}
          </div>
          <div class="club-card-bottom">
            <div class="club-distance"><i class="fa-solid fa-location-dot"></i> ${c.distancia}</div>
            <button class="btn btn-sm btn-blue" onclick="App.solicitarPlaza('${c.nombre}')"><i class="fa-solid fa-paper-plane"></i> Solicitar plaza</button>
          </div>
        </div>`;
    }).join('');

    container.innerHTML = `
      <h2 class="page-title">Buscar Equipos</h2>
      <p class="page-subtitle">Explora los clubes de la provincia de Jaén que tienen plazas abiertas. Envía tu solicitud directamente.</p>

      <div class="stats-row" style="margin-bottom:1.5rem;">
        <div class="stat-card">
          <div class="stat-icon blue"><i class="fa-solid fa-shield-halved"></i></div>
          <div class="stat-info"><h3>${clubs.length}</h3><p>Clubes con plazas</p></div>
        </div>
        <div class="stat-card">
          <div class="stat-icon green"><i class="fa-solid fa-bullseye"></i></div>
          <div class="stat-info"><h3>${clubs.reduce((sum, c) => sum + c.necesidades.length, 0)}</h3><p>Posiciones abiertas</p></div>
        </div>
        <div class="stat-card">
          <div class="stat-icon orange"><i class="fa-solid fa-map-marker-alt"></i></div>
          <div class="stat-info"><h3>Jaén</h3><p>Provincia</p></div>
        </div>
      </div>

      <div class="club-directory-grid">${clubsHTML}</div>
    `;
  }

  // ---- Mis Solicitudes (Player matchmaking view) ----
  function renderPlayerSolicitudes() {
    const container = $('#view-p-solicitudes');
    const matches = MOCK_DATA.getMatchesByJugador(PLAYER_ID);

    let matchesHTML = '';
    if (matches.length > 0) {
      matchesHTML = matches.map(m => {
        const statusLabel = m.estado === 'matched' ? '✅ Match confirmado' : m.estado === 'pending' ? '⏳ Pendiente de respuesta' : '❌ Rechazado';
        let chatHTML = '';
        if (m.estado === 'matched' && m.mensajes.length > 0) {
          const msgs = m.mensajes.map(msg => `<div class="chat-msg ${msg.tipo}">${msg.texto}</div>`).join('');
          chatHTML = `
            <div class="chat-container" style="margin-top:0.75rem;height:240px;">
              <div class="chat-messages">${msgs}</div>
              <div class="chat-input-bar">
                <input type="text" placeholder="Escribe un mensaje al club..." />
                <button onclick="App.showToast('Mensaje enviado (demo)', 'success')">Enviar</button>
              </div>
            </div>`;
        }
        return `
          <div class="match-card">
            <div class="match-card-header">
              <div class="match-club-logo">${m.clubLogo}</div>
              <div>
                <div class="match-club-name">${m.club}</div>
                <div class="match-club-info">${m.clubInfo}</div>
              </div>
            </div>
            <div class="match-status ${m.estado}">${statusLabel}</div>
            <div class="match-needs" style="margin-bottom:0.5rem"><strong>Lo que buscan:</strong> ${m.necesidad}</div>
            ${m.estado === 'pending' ? '<div style="font-size:0.78rem;color:var(--text-muted);font-style:italic;"><i class="fa-solid fa-hourglass-half"></i> Esperando a que el club revise tu solicitud...</div>' : ''}
            ${chatHTML}
          </div>`;
      }).join('');
    } else {
      matchesHTML = `
        <div class="empty-state" style="grid-column:1/-1">
          <i class="fa-solid fa-paper-plane"></i>
          <h3>Sin solicitudes enviadas</h3>
          <p>Explora el directorio de clubes y envía tu primera solicitud.</p>
          <button class="btn btn-primary" style="margin-top:1rem" onclick="App.showView('p-equipos')"><i class="fa-solid fa-shield-halved"></i> Ver equipos</button>
        </div>`;
    }

    const matchedCount = matches.filter(m => m.estado === 'matched').length;
    const pendingCount = matches.filter(m => m.estado === 'pending').length;

    container.innerHTML = `
      <h2 class="page-title">Mis Solicitudes</h2>
      <p class="page-subtitle">Gestiona tus solicitudes de plaza y chats con clubes interesados.</p>

      <div class="stats-row" style="margin-bottom:1.5rem;">
        <div class="stat-card">
          <div class="stat-icon green"><i class="fa-solid fa-check-circle"></i></div>
          <div class="stat-info"><h3>${matchedCount}</h3><p>Matches confirmados</p></div>
        </div>
        <div class="stat-card">
          <div class="stat-icon orange"><i class="fa-solid fa-clock"></i></div>
          <div class="stat-info"><h3>${pendingCount}</h3><p>Pendientes</p></div>
        </div>
        <div class="stat-card">
          <div class="stat-icon blue"><i class="fa-solid fa-paper-plane"></i></div>
          <div class="stat-info"><h3>${matches.length}</h3><p>Total enviadas</p></div>
        </div>
      </div>

      <div class="matchmaking-grid">${matchesHTML}</div>
    `;
  }

  // ---- Mis Servicios (Player active services) ----
  function renderPlayerServicios() {
    const j = MOCK_DATA.getJugadorById(PLAYER_ID);
    if (!j) return;
    const container = $('#view-p-servicios');

    // Active services
    let activeHTML = '';
    if (j.serviciosActivos.length > 0) {
      activeHTML = j.serviciosActivos.map(srvId => {
        const srv = MOCK_DATA.servicios.find(s => s.id === srvId);
        const info = j.serviciosInfo.find(si => si.icono === srv.icono);
        return `
          <div class="active-service-card">
            <div class="active-service-icon" style="background:rgba(0,230,118,0.12);color:var(--accent);">
              <i class="fa-solid ${srv.icono}"></i>
            </div>
            <div class="active-service-info">
              <h4>${srv.nombre}</h4>
              <p>${srv.partner}</p>
            </div>
            <div class="active-service-status">
              <span class="status-active"><i class="fa-solid fa-circle" style="font-size:0.45rem;"></i> Activo</span>
              <span class="status-duration">${info ? info.duracion : ''}</span>
            </div>
          </div>`;
      }).join('');
    } else {
      activeHTML = `
        <div class="empty-state">
          <i class="fa-solid fa-star"></i>
          <h3>Sin servicios activos</h3>
          <p>Contrata servicios del Marketplace para mejorar tu rendimiento y desbloquear el Sello.</p>
          <button class="btn btn-primary" style="margin-top:1rem" onclick="App.showView('marketplace')"><i class="fa-solid fa-store"></i> Ir al Marketplace</button>
        </div>`;
    }

    // Sello progress
    const selloServices = ['srv-1', 'srv-2', 'srv-3'];
    const activeSelloCount = selloServices.filter(s => j.serviciosActivos.includes(s)).length;
    const selloPercent = Math.round((activeSelloCount / selloServices.length) * 100);
    const circumference = 2 * Math.PI * 42;
    const dashOffset = circumference - (selloPercent / 100) * circumference;

    // Recommended services (not yet contracted)
    const recommended = MOCK_DATA.servicios.filter(s => !j.serviciosActivos.includes(s.id));
    const recommendedHTML = recommended.slice(0, 3).map(s => `
      <div class="service-card">
        <div class="service-card-top">
          <div class="service-icon ${s.iconClass}"><i class="fa-solid ${s.icono}"></i></div>
          <div class="service-info">
            <h3>${s.nombre}</h3>
            <p>${s.descripcion}</p>
            <div class="service-partner"><i class="fa-solid fa-handshake-angle"></i> ${s.partner}</div>
          </div>
        </div>
        <div class="service-card-bottom">
          <div class="service-price">${s.precio}€ <span>${s.periodo}</span></div>
          ${s.desbloqueaSello ? `<div class="service-unlocks"><i class="fa-solid fa-lock-open"></i> Desbloquea Sello</div>` : ''}
          <button class="btn btn-sm btn-primary" onclick="App.showToast('Servicio contratado (demo): ${s.nombre}', 'success')"><i class="fa-solid fa-cart-plus"></i> Contratar</button>
        </div>
      </div>
    `).join('');

    container.innerHTML = `
      <h2 class="page-title">Mis Servicios</h2>
      <p class="page-subtitle">Servicios que tienes activos y tu progreso hacia el Sello de Alto Rendimiento.</p>

      <!-- Sello Progress -->
      <div class="sello-progress-container" style="margin-bottom:1.5rem;">
        <div class="sello-progress-ring">
          <svg width="100" height="100" viewBox="0 0 100 100">
            <circle class="progress-bg" cx="50" cy="50" r="42" />
            <circle class="progress-fill" cx="50" cy="50" r="42" stroke-dasharray="${circumference}" stroke-dashoffset="${dashOffset}" />
          </svg>
          <div class="sello-progress-center">
            <span class="pct">${selloPercent}%</span>
            <span class="pct-label">Sello</span>
          </div>
        </div>
        <div class="sello-progress-info">
          <h3>${j.sello === 'gold' ? '🏆 ¡Sello desbloqueado!' : `${activeSelloCount}/3 servicios clave activos`}</h3>
          <p>${j.sello === 'gold' ? 'Tu Sello de Alto Rendimiento está activo. Los clubes valoran tu compromiso.' : 'Activa nutrición, psicología y preparación física para el Sello.'}</p>
          <ul class="sello-checklist">
            <li class="${j.serviciosActivos.includes('srv-1') ? 'completed' : 'not-completed'}">
              <i class="fa-solid ${j.serviciosActivos.includes('srv-1') ? 'fa-circle-check done' : 'fa-circle pending'}"></i> Nutrición
            </li>
            <li class="${j.serviciosActivos.includes('srv-2') ? 'completed' : 'not-completed'}">
              <i class="fa-solid ${j.serviciosActivos.includes('srv-2') ? 'fa-circle-check done' : 'fa-circle pending'}"></i> Psicología
            </li>
            <li class="${j.serviciosActivos.includes('srv-3') ? 'completed' : 'not-completed'}">
              <i class="fa-solid ${j.serviciosActivos.includes('srv-3') ? 'fa-circle-check done' : 'fa-circle pending'}"></i> Preparación Física
            </li>
          </ul>
        </div>
      </div>

      <!-- Active Services -->
      <div class="section-card" style="margin-bottom:1.5rem">
        <div class="section-card-header"><h3><i class="fa-solid fa-check-circle" style="color:var(--accent)"></i> Servicios Activos (${j.serviciosActivos.length})</h3></div>
        <div class="section-card-body" style="display:flex;flex-direction:column;gap:0.75rem;">
          ${activeHTML}
        </div>
      </div>

      <!-- Recommended -->
      ${recommended.length > 0 ? `
        <div class="section-card">
          <div class="section-card-header"><h3><i class="fa-solid fa-wand-magic-sparkles"></i> Recomendados para ti</h3></div>
          <div class="section-card-body">
            <div class="marketplace-grid">${recommendedHTML}</div>
          </div>
        </div>
      ` : ''}
    `;
  }

  // ---- Player: Solicitar Plaza ----
  function solicitarPlaza(clubName) {
    showToast(`Solicitud enviada a ${clubName} (demo)`, 'success');
  }

  // ===================== Toast Notifications =====================
  function showToast(message, type = 'info') {
    const container = $('#toast-container');
    const icons = {
      success: 'fa-check-circle',
      error: 'fa-times-circle',
      info: 'fa-info-circle',
    };
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <i class="fa-solid ${icons[type] || icons.info} toast-icon"></i>
      <span class="toast-text">${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = '0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  // ===================== Utils =====================
  function debounce(fn, ms) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), ms);
    };
  }

  // ===================== Public API =====================
  return {
    init,
    showView,
    openPlayerProfile,
    toggleAvailability,
    simulateMatch,
    goBack,
    showToast,
    switchRole,
    solicitarPlaza,
  };

})();

// Start app when DOM ready
document.addEventListener('DOMContentLoaded', App.init);
