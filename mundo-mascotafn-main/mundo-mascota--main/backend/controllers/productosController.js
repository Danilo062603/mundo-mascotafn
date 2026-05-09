const Producto = require('../models/productoModel');

exports.getProductos = (req, res) => {
  Producto.getAll((err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error al obtener productos' });
    }
    res.json(results);
  });
};

exports.getProductoById = (req, res) => {
  const id = req.params.id;

  Producto.getById(id, (err, results) => {
    if (err) return res.status(500).json(err);

    if (results.length === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json(results[0]);
  });
};