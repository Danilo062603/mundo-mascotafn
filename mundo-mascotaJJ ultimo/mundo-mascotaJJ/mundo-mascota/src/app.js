const express = require('express');
const path    = require('path');
const app     = express();

// Middleware: parsear cuerpo JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware: logger de peticiones
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// Middleware: CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Archivos estáticos (frontend)
app.use(express.static(path.join(__dirname, '../public')));

// Rutas de la API
const citasRoutes = require('./routes/citas');
app.use('/api/citas', citasRoutes);

// Ruta raíz informativa
app.get('/api', (req, res) => {
  res.json({ mensaje: 'API Mundo Mascota funcionando', endpoints: { citas: '/api/citas' } });
});

// 404
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada', ruta: req.originalUrl });
});

module.exports = app;
