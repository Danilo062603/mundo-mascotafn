const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // ← pon tu contraseña si tienes
  database: 'mundo_mascota'
});

db.connect(err => {
  if (err) {
    console.error('❌ Error conexión:', err);
  } else {
    console.log('🟢 Conectado a MySQL');
  }
});

module.exports = db;

const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/mundo_mascota')
  .then(() => console.log('✅ MongoDB conectado'))
  .catch(err => console.error('❌ Error MongoDB:', err));