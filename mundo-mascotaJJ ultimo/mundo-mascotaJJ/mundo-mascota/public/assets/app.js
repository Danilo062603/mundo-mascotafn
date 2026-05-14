const BASE_URL = 'http://localhost:3000/api/citas';

// ── Utilidades de interfaz ──────────────────────────────────────────────────

function mostrarMensaje(texto, tipo) {
  const el = document.getElementById('mensaje');
  el.textContent = texto;
  el.className = `mensaje ${tipo}`;
  setTimeout(() => { el.className = 'mensaje'; }, 4000);
}

function actualizarStats(citas) {
  const atendidas = citas.filter(c => c.atendida).length;
  document.getElementById('statTotal').textContent      = citas.length;
  document.getElementById('statAtendidas').textContent  = atendidas;
  document.getElementById('statPendientes').textContent = citas.length - atendidas;
}

// ── Renderizar lista ────────────────────────────────────────────────────────

function renderizarLista(citas) {
  const lista = document.getElementById('lista');

  if (citas.length === 0) {
    lista.innerHTML = '<p class="vacia">No hay citas registradas.</p>';
    return;
  }

  lista.innerHTML = citas.map(c => `
    <div class="cita ${c.atendida ? 'atendida' : 'no-atendida'}">
      <div class="info">
        <div class="nombre-mascota">🐾 ${c.mascota} — ${c.nombre}</div>
        <div class="detalle">${c.servicio} · ${c.fecha} ${c.hora}</div>
      </div>
      <span class="badge ${c.atendida ? 'atendida' : 'no-atendida'}">
        ${c.atendida ? 'Atendida' : 'Pendiente'}
      </span>
      <div class="acciones">
        <button class="btn-toggle"
          onclick="toggleAtendida(${c.id}, ${JSON.stringify(c).replace(/"/g, '&quot;')})">
          ${c.atendida ? 'Marcar pendiente' : 'Marcar atendida'}
        </button>
        <button class="btn-eliminar" onclick="eliminarCita(${c.id})">
          Eliminar
        </button>
      </div>
    </div>
  `).join('');

  actualizarStats(citas);
}

// ── GET: cargar todas las citas ─────────────────────────────────────────────

async function cargarCitas() {
  try {
    const respuesta = await fetch(BASE_URL);
    if (!respuesta.ok) throw new Error(`Error ${respuesta.status}`);
    const citas = await respuesta.json();
    renderizarLista(citas);
  } catch (err) {
    document.getElementById('lista').innerHTML =
      '<p class="vacia" style="color:#ef4444">No se pudo conectar con la API. Verificar que el servidor esté corriendo.</p>';
  }
}

// ── POST: agendar cita ──────────────────────────────────────────────────────

async function agendarCita() {
  const nombre   = document.getElementById('nombre').value.trim();
  const mascota  = document.getElementById('mascota').value.trim();
  const servicio = document.getElementById('servicio').value;
  const fecha    = document.getElementById('fecha').value;
  const hora     = document.getElementById('hora').value;
  const btn      = document.getElementById('btnAgendar');

  if (!nombre || !mascota || !servicio || !fecha || !hora) {
    mostrarMensaje('Todos los campos son obligatorios.', 'error');
    return;
  }

  btn.disabled    = true;
  btn.textContent = 'Guardando...';

  try {
    const respuesta = await fetch(BASE_URL, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ nombre, mascota, servicio, fecha, hora })
    });

    if (!respuesta.ok) {
      const e = await respuesta.json();
      throw new Error(e.error);
    }

    const nueva = await respuesta.json();
    mostrarMensaje(`Cita para "${nueva.mascota}" agendada con ID ${nueva.id}.`, 'exito');
    document.getElementById('nombre').value   = '';
    document.getElementById('mascota').value  = '';
    document.getElementById('servicio').value = '';
    document.getElementById('fecha').value    = '';
    document.getElementById('hora').value     = '';
    await cargarCitas();

  } catch (err) {
    mostrarMensaje(err.message, 'error');
  } finally {
    btn.disabled    = false;
    btn.textContent = 'Agendar cita';
  }
}

// ── PUT: cambiar estado atendida ────────────────────────────────────────────

async function toggleAtendida(id, cita) {
  try {
    const respuesta = await fetch(`${BASE_URL}/${id}`, {
      method:  'PUT',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ ...cita, atendida: !cita.atendida })
    });

    if (!respuesta.ok) {
      const e = await respuesta.json();
      throw new Error(e.error);
    }

    await cargarCitas();

  } catch (err) { mostrarMensaje(err.message, 'error'); }
}

// ── DELETE: eliminar cita ───────────────────────────────────────────────────

async function eliminarCita(id) {
  if (!confirm(`¿Eliminar la cita con ID ${id}?`)) return;

  try {
    const respuesta = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });

    if (!respuesta.ok) {
      const e = await respuesta.json();
      throw new Error(e.error);
    }

    mostrarMensaje(`Cita ${id} eliminada.`, 'exito');
    await cargarCitas();

  } catch (err) { mostrarMensaje(err.message, 'error'); }
}

// ── Inicializar ─────────────────────────────────────────────────────────────

cargarCitas();
