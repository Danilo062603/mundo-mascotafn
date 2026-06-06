const express = require('express');
const cors = require('cors');
const path = require('path');

const citasRoutes    = require('./routes/citas');
const pedidosRoutes  = require('./routes/pedidos');
const productosRoutes = require('./routes/productos');

const app = express();
const PORT = process.env.PORT || 3000;
const isProd = process.env.NODE_ENV === 'production';

// ─── CORS ─────────────────────────────────────────────────────
const corsOptions = {
  origin: isProd
    ? false
    : ['http://localhost:5173', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
};
app.use(cors(corsOptions));

// ─── MIDDLEWARES ───────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── RUTAS API ─────────────────────────────────────────────────
app.use('/api/citas',      citasRoutes);
app.use('/api/pedidos',    pedidosRoutes);
app.use('/api/productos',  productosRoutes);

// ─── FRONTEND ─────────────────────────────────────────────────
const distPath = path.join(__dirname, '../public/dist');
const legacyPath = path.join(__dirname, '../public');

app.use(express.static(distPath));
app.use(express.static(legacyPath));

// SPA fallback — serve React index for non-API routes
app.get('*', (req, res) => {
  const indexDist = path.join(distPath, 'index.html');
  const indexLegacy = path.join(__dirname, '../index.html');

  const fs = require('fs');
  if (fs.existsSync(indexDist)) {
    res.sendFile(indexDist);
  } else {
    res.sendFile(indexLegacy);
  }
});

// ─── MANEJO DE ERRORES ────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ ok: false, error: 'Error interno del servidor' });
});

// ─── INICIAR SERVIDOR ────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅ Servidor Mundo Mascota corriendo en http://localhost:${PORT}`);
  console.log(`📦 API disponible en http://localhost:${PORT}/api`);
  if (!isProd) {
    console.log(`⚛️  React dev: http://localhost:5173`);
  }
});

module.exports = app;
