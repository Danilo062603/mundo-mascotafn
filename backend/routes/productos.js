const express = require('express');
const router = express.Router();

// Catálogo de productos de Mundo Mascota
const productos = [
  // ── ALIMENTOS ──────────────────────────────────────────────
  { id: 1, nombre: 'Dog Chow',    precio: 50000, categoria: 'alimentos', imagen: '/img/dogchow.jpg',   descripcion: 'Alimento balanceado para perros adultos.' },
  { id: 2, nombre: 'Pedigree',    precio: 48000, categoria: 'alimentos', imagen: '/img/pedigree.jpg',  descripcion: 'Croquetas con vitaminas para perros.' },
  { id: 3, nombre: 'Chunky',      precio: 45000, categoria: 'alimentos', imagen: '/img/chunky.jpg',    descripcion: 'Alimento húmedo y nutritivo para perros.' },
  { id: 4, nombre: 'Whiskas',     precio: 30000, categoria: 'alimentos', imagen: '/img/whiskas.jpg',   descripcion: 'Comida premium para gatos.' },
  { id: 5, nombre: 'Felix',       precio: 28000, categoria: 'alimentos', imagen: '/img/felix.jpg',     descripcion: 'Alimento en lata para gatos.' },

  // ── CAMAS ──────────────────────────────────────────────────
  { id: 6, nombre: 'Cama para perro', precio: 80000, categoria: 'camas', imagen: '/img/Cama_para_perro.jpg', descripcion: 'Cama suave y acolchada para perros.' },
  { id: 7, nombre: 'Cama para gato',  precio: 70000, categoria: 'camas', imagen: '/img/Cama_para_gato.jpg',  descripcion: 'Cama acogedora para gatos.' },

  // ── ARENA ──────────────────────────────────────────────────
  { id: 8,  nombre: 'Catsan',     precio: 35000, categoria: 'arena', imagen: '/img/catsan.jpg',     descripcion: 'Arena sanitaria de alta absorción.' },
  { id: 9,  nombre: 'Fresh Step', precio: 40000, categoria: 'arena', imagen: '/img/Fresh_Step.jpg', descripcion: 'Arena con control de olores.' },
  { id: 10, nombre: 'Tidy Cats',  precio: 38000, categoria: 'arena', imagen: '/img/Tidy_Cats.jpg',  descripcion: 'Arena clumpeable de larga duración.' },

  // ── JUGUETES ───────────────────────────────────────────────
  { id: 11, nombre: 'Hueso para perro',   precio: 15000, categoria: 'juguetes', imagen: '/img/Hueso_para_perro.jpg',   descripcion: 'Hueso masticable para perros.' },
  { id: 12, nombre: 'Pelota',             precio: 10000, categoria: 'juguetes', imagen: '/img/pelota.jpg',              descripcion: 'Pelota resistente para jugar.' },
  { id: 13, nombre: 'Juguete pluma gato', precio: 12000, categoria: 'juguetes', imagen: '/img/Juguete_pluma_gato.jpg', descripcion: 'Pluma interactiva para gatos.' },
];

// ─── GET /api/productos → Listar todos (con filtro opcional) ─
router.get('/', (req, res) => {
  const { categoria } = req.query;

  const resultado = categoria
    ? productos.filter(p => p.categoria === categoria.toLowerCase())
    : productos;

  res.status(200).json({
    ok: true,
    total: resultado.length,
    productos: resultado
  });
});

// ─── GET /api/productos/:id → Ver un producto ────────────────
router.get('/:id', (req, res) => {
  const producto = productos.find(p => p.id === parseInt(req.params.id));
  if (!producto) {
    return res.status(404).json({ ok: false, error: 'Producto no encontrado' });
  }
  res.status(200).json({ ok: true, producto });
});

module.exports = router;
