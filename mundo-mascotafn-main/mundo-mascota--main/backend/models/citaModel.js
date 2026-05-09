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

const mongoose = require('mongoose');

const citaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },

  mascota: {
    type: String,
    required: true
  },

  fecha: {
    type: String,
    required: true
  },

  servicio: {
    type: String,
    required: true
  },

  telefono: {
    type: String
  },

  correo: {
    type: String
  }

}, {
  timestamps: true
});

module.exports = mongoose.model('Cita', citaSchema);