const db = require('../config/db');

exports.getAll = (callback) => {
  db.query('SELECT * FROM productos', callback);
};

exports.getById = (id, callback) => {
  db.query('SELECT * FROM productos WHERE id = ?', [id], callback);
};