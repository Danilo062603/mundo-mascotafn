const db = require('../config/db');

// Crear cita
exports.create = (data, callback) => {
  const sql = `
    INSERT INTO citas (nombre, mascota, fecha, servicio, telefono, email)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [
    data.nombre,
    data.mascota,
    data.fecha,
    data.servicio,
    data.telefono,
    data.email
  ], callback);
};

// Obtener todas las citas
exports.getAll = (callback) => {
  db.query('SELECT * FROM citas', callback);
};

// Eliminar cita
exports.delete = (id, callback) => {
  db.query('DELETE FROM citas WHERE id = ?', [id], callback);
};