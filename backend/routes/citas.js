const express = require('express');
const router = express.Router();

// Base de datos en memoria (arreglo)
let citas = [];
let nextId = 1;

// ─── GET /api/citas → Listar todas las citas ──────────────────
router.get('/', (req, res) => {
  res.status(200).json({
    ok: true,
    total: citas.length,
    citas
  });
});

// ─── GET /api/citas/:id → Ver una cita por ID ─────────────────
router.get('/:id', (req, res) => {
  const cita = citas.find(c => c.id === parseInt(req.params.id));
  if (!cita) {
    return res.status(404).json({ ok: false, error: 'Cita no encontrada' });
  }
  res.status(200).json({ ok: true, cita });
});

// ─── POST /api/citas → Crear nueva cita ───────────────────────
router.post('/', (req, res) => {
  const { nombre, mascota, servicio, fecha } = req.body;

  // Validaciones
  if (!nombre || !mascota || !servicio || !fecha) {
    return res.status(400).json({
      ok: false,
      error: 'Todos los campos son obligatorios: nombre, mascota, servicio, fecha'
    });
  }

  const nuevaCita = {
    id: nextId++,
    nombre: nombre.trim(),
    mascota: mascota.trim(),
    servicio,
    fecha,
    creadaEn: new Date().toISOString()
  };

  citas.push(nuevaCita);

  res.status(201).json({
    ok: true,
    mensaje: `¡Cita agendada con éxito para ${nuevaCita.mascota}! 🐾`,
    cita: nuevaCita
  });
});

// ─── PUT /api/citas/:id → Actualizar cita ────────────────────
router.put('/:id', (req, res) => {
  const index = citas.findIndex(c => c.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ ok: false, error: 'Cita no encontrada' });
  }

  const { nombre, mascota, servicio, fecha } = req.body;
  citas[index] = {
    ...citas[index],
    nombre:  nombre  || citas[index].nombre,
    mascota: mascota || citas[index].mascota,
    servicio:servicio|| citas[index].servicio,
    fecha:   fecha   || citas[index].fecha,
    actualizadaEn: new Date().toISOString()
  };

  res.status(200).json({ ok: true, mensaje: 'Cita actualizada', cita: citas[index] });
});

// ─── DELETE /api/citas/:id → Eliminar cita ───────────────────
router.delete('/:id', (req, res) => {
  const index = citas.findIndex(c => c.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ ok: false, error: 'Cita no encontrada' });
  }

  const eliminada = citas.splice(index, 1)[0];
  res.status(200).json({ ok: true, mensaje: 'Cita eliminada', cita: eliminada });
});

module.exports = router;
