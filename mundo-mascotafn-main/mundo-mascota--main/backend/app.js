const express = require('express');
const cors = require('cors');
const path = require('path');

// 🔥 CONEXIÓN A MONGO
require('./config/db');

const app = express();

app.use(cors());
app.use(express.json());

// Servir frontend
app.use(express.static(path.join(__dirname, '../public')));

// API
app.use('/api/productos', require('./routes/productos'));
app.use('/api/citas', require('./routes/citas'));

// Home
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(3000, () => {
  console.log('🚀 http://localhost:3000');
});