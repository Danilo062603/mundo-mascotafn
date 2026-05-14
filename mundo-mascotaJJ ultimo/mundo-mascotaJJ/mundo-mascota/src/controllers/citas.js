const service = require('../services/citas');

const obtenerTodas = (req, res) => {
  res.json(service.leer());
};

const obtenerPorId = (req, res) => {
  const id   = parseInt(req.params.id);
  const cita = service.leer().find(c => c.id === id);
  if (!cita) return res.status(404).json({ error: 'Cita no encontrada' });
  res.json(cita);
};

const crear = (req, res) => {
  const { nombre, mascota, servicio, fecha, hora } = req.body;
  if (!nombre || !mascota || !servicio || !fecha || !hora) {
    return res.status(400).json({ error: 'nombre, mascota, servicio, fecha y hora son obligatorios' });
  }
  const citas = service.leer();
  const nueva = {
    id: citas.length > 0 ? Math.max(...citas.map(c => c.id)) + 1 : 1,
    nombre,
    mascota,
    servicio,
    fecha,
    hora,
    atendida: false
  };
  citas.push(nueva);
  service.guardar(citas);
  res.status(201).json(nueva);
};

const actualizar = (req, res) => {
  const id     = parseInt(req.params.id);
  const citas  = service.leer();
  const indice = citas.findIndex(c => c.id === id);
  if (indice === -1) return res.status(404).json({ error: 'Cita no encontrada' });
  const { nombre, mascota, servicio, fecha, hora, atendida } = req.body;
  if (!nombre || !mascota || !servicio || !fecha || !hora) {
    return res.status(400).json({ error: 'nombre, mascota, servicio, fecha y hora son obligatorios' });
  }
  citas[indice] = { id, nombre, mascota, servicio, fecha, hora, atendida: Boolean(atendida) };
  service.guardar(citas);
  res.json(citas[indice]);
};

const eliminar = (req, res) => {
  const id     = parseInt(req.params.id);
  const citas  = service.leer();
  const indice = citas.findIndex(c => c.id === id);
  if (indice === -1) return res.status(404).json({ error: 'Cita no encontrada' });
  citas.splice(indice, 1);
  service.guardar(citas);
  res.status(204).send();
};

module.exports = { obtenerTodas, obtenerPorId, crear, actualizar, eliminar };
