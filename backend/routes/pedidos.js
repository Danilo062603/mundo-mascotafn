const express = require('express');
const router = express.Router();

// Base de datos en memoria
let pedidos = [];
let nextId = 1;

// ─── GET /api/pedidos → Listar todos los pedidos ──────────────
router.get('/', (req, res) => {
  res.status(200).json({
    ok: true,
    total: pedidos.length,
    pedidos
  });
});

// ─── GET /api/pedidos/:id → Ver un pedido por ID ─────────────
router.get('/:id', (req, res) => {
  const pedido = pedidos.find(p => p.id === parseInt(req.params.id));
  if (!pedido) {
    return res.status(404).json({ ok: false, error: 'Pedido no encontrado' });
  }
  res.status(200).json({ ok: true, pedido });
});

// ─── POST /api/pedidos → Crear pedido ────────────────────────
// Body esperado:
// {
//   "nombre": "Juan Pérez",
//   "email": "juan@email.com",
//   "telefono": "3001234567",
//   "direccion": "Calle 45 #12-34",
//   "ciudad": "Medellín",
//   "productos": [
//     { "nombre": "Dog Chow", "precio": 50000, "cantidad": 2 }
//   ]
// }
router.post('/', (req, res) => {
  const { nombre, email, telefono, direccion, ciudad, productos } = req.body;

  // Validaciones básicas
  if (!nombre || !email || !telefono || !direccion || !ciudad) {
    return res.status(400).json({
      ok: false,
      error: 'Faltan datos del cliente: nombre, email, teléfono, dirección y ciudad son obligatorios'
    });
  }

  if (!productos || !Array.isArray(productos) || productos.length === 0) {
    return res.status(400).json({
      ok: false,
      error: 'El pedido debe tener al menos un producto'
    });
  }

  // Calcular total
  const total = productos.reduce((acc, p) => {
    const cantidad = p.cantidad || 1;
    return acc + (p.precio * cantidad);
  }, 0);

  const nuevoPedido = {
    id: nextId++,
    cliente: {
      nombre: nombre.trim(),
      email: email.trim().toLowerCase(),
      telefono: telefono.trim(),
      direccion: direccion.trim(),
      ciudad: ciudad.trim()
    },
    productos,
    total,
    estado: 'pendiente',
    creadoEn: new Date().toISOString()
  };

  pedidos.push(nuevoPedido);

  res.status(201).json({
    ok: true,
    mensaje: `¡Pedido #${nuevoPedido.id} recibido con éxito! Te contactaremos pronto. 🐾`,
    pedido: nuevoPedido
  });
});

// ─── PUT /api/pedidos/:id/estado → Cambiar estado del pedido ─
router.put('/:id/estado', (req, res) => {
  const index = pedidos.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ ok: false, error: 'Pedido no encontrado' });
  }

  const estadosValidos = ['pendiente', 'confirmado', 'enviado', 'entregado', 'cancelado'];
  const { estado } = req.body;

  if (!estadosValidos.includes(estado)) {
    return res.status(400).json({
      ok: false,
      error: `Estado inválido. Opciones: ${estadosValidos.join(', ')}`
    });
  }

  pedidos[index].estado = estado;
  pedidos[index].actualizadoEn = new Date().toISOString();

  res.status(200).json({
    ok: true,
    mensaje: `Pedido #${pedidos[index].id} actualizado a "${estado}"`,
    pedido: pedidos[index]
  });
});

// ─── DELETE /api/pedidos/:id → Cancelar / eliminar pedido ────
router.delete('/:id', (req, res) => {
  const index = pedidos.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ ok: false, error: 'Pedido no encontrado' });
  }

  const eliminado = pedidos.splice(index, 1)[0];
  res.status(200).json({ ok: true, mensaje: 'Pedido eliminado', pedido: eliminado });
});

module.exports = router;
