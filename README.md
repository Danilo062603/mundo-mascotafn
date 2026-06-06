# 🐾 Mundo Mascota

Tienda web para mascotas con API REST en Node.js + Express.

## Estructura del Proyecto

```
mundo-mascota/
├── backend/
│   ├── server.js          ← Servidor principal
│   ├── package.json
│   └── routes/
│       ├── citas.js       ← CRUD citas veterinarias
│       ├── pedidos.js     ← CRUD pedidos de la tienda
│       └── productos.js   ← Catálogo de productos
├── public/
│   ├── css/styles.css
│   ├── js/
│   │   ├── app.js         ← Carrito + finalizar compra
│   │   └── citas.js       ← Formulario de citas
│   └── img/               ← Imágenes de productos
├── index.html
├── productos.html
├── citas.html
├── carrito.html
├── blog.html
└── confirmacion.html
```

## ▶️ Cómo correr el proyecto

### 1. Instalar dependencias del backend

```bash
cd backend
npm install
```

### 2. Iniciar el servidor

```bash
npm start
```

### 3. Abrir el frontend

Abre en el navegador: **http://localhost:3000**

---

## 🔌 Endpoints de la API REST

### Citas Veterinarias `/api/citas`

| Método | Ruta              | Descripción               |
|--------|-------------------|---------------------------|
| GET    | /api/citas        | Listar todas las citas    |
| GET    | /api/citas/:id    | Ver cita por ID           |
| POST   | /api/citas        | Crear nueva cita          |
| PUT    | /api/citas/:id    | Actualizar cita           |
| DELETE | /api/citas/:id    | Eliminar cita             |

**Body para crear cita:**
```json
{
  "nombre": "Juan Pérez",
  "mascota": "Max",
  "servicio": "Consulta General",
  "fecha": "2026-06-10 a las 10:30"
}
```

---

### Pedidos de la Tienda `/api/pedidos`

| Método | Ruta                     | Descripción               |
|--------|--------------------------|---------------------------|
| GET    | /api/pedidos             | Listar todos los pedidos  |
| GET    | /api/pedidos/:id         | Ver pedido por ID         |
| POST   | /api/pedidos             | Crear nuevo pedido        |
| PUT    | /api/pedidos/:id/estado  | Cambiar estado del pedido |
| DELETE | /api/pedidos/:id         | Eliminar pedido           |

**Body para crear pedido:**
```json
{
  "nombre": "Ana García",
  "email": "ana@email.com",
  "telefono": "3001234567",
  "direccion": "Calle 45 #12-34",
  "ciudad": "Medellín",
  "productos": [
    { "nombre": "Dog Chow", "precio": 50000, "cantidad": 2 },
    { "nombre": "Pelota",   "precio": 10000, "cantidad": 1 }
  ]
}
```

**Estados válidos:** `pendiente` | `confirmado` | `enviado` | `entregado` | `cancelado`

---

### Productos `/api/productos`

| Método | Ruta                                | Descripción                    |
|--------|-------------------------------------|--------------------------------|
| GET    | /api/productos                      | Listar todos los productos     |
| GET    | /api/productos?categoria=juguetes   | Filtrar por categoría          |
| GET    | /api/productos/:id                  | Ver producto por ID            |

**Categorías:** `alimentos` | `camas` | `arena` | `juguetes`

---

## 🛠️ Tecnologías

- **Frontend:** HTML5, CSS3, JavaScript (Vanilla)
- **Backend:** Node.js, Express
- **API:** REST con JSON
- **Almacenamiento:** En memoria (arreglos JS)
