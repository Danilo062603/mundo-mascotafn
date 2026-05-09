const express = require('express');
const cors = require('cors');
const path = require('path');

const conectarDB = require('./config/db');

const app = express();

// Conectar MongoDB
conectarDB();

app.use(cors());
app.use(express.json());

// Frontend
app.use(express.static(path.join(__dirname, '../public')));

// Rutas API
app.use('/api/productos', require('./routes/productos'));
app.use('/api/citas', require('./routes/citas'));

// Home
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Puerto
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor en http://localhost:${PORT}`);
});