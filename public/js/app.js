// ─── CARRITO ──────────────────────────────────────────────────

function agregarCarrito(nombre, precio, imagen) {
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  // Si ya existe el producto, aumentar cantidad
  const existente = carrito.find(p => p.nombre === nombre);
  if (existente) {
    existente.cantidad = (existente.cantidad || 1) + 1;
  } else {
    carrito.push({ nombre, precio, imagen, cantidad: 1 });
  }

  localStorage.setItem('carrito', JSON.stringify(carrito));
  actualizarContador();

  // Notificación visual breve
  mostrarToast(`✅ ${nombre} añadido al carrito`);
}

function renderCarrito() {
  const contenedor = document.getElementById('carrito-items');
  if (!contenedor) return;

  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  contenedor.innerHTML = '';
  let total = 0;

  if (carrito.length === 0) {
    contenedor.innerHTML = '<p class="carrito-vacio">Tu carrito está vacío 🛒</p>';
    document.getElementById('total').textContent = '$0';
    return;
  }

  carrito.forEach((producto, index) => {
    const subtotal = producto.precio * (producto.cantidad || 1);
    total += subtotal;

    contenedor.innerHTML += `
      <div class="carrito-item">
        <img src="${producto.imagen || 'public/img/dogchow.jpg'}" alt="${producto.nombre}">
        <div class="carrito-info">
          <h4>${producto.nombre}</h4>
          <p class="carrito-precio">$${producto.precio.toLocaleString('es-CO')} × ${producto.cantidad || 1}</p>
          <p><strong>Subtotal: $${subtotal.toLocaleString('es-CO')}</strong></p>
        </div>
        <button class="btn-eliminar" onclick="eliminar(${index})">✕</button>
      </div>
    `;
  });

  const totalEl = document.getElementById('total');
  if (totalEl) totalEl.textContent = `$${total.toLocaleString('es-CO')}`;
}

function eliminar(index) {
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  carrito.splice(index, 1);
  localStorage.setItem('carrito', JSON.stringify(carrito));
  renderCarrito();
  actualizarContador();
}

function actualizarContador() {
  const contador = document.getElementById('contador-carrito');
  if (!contador) return;
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const total = carrito.reduce((acc, p) => acc + (p.cantidad || 1), 0);
  contador.textContent = total;
}

function vaciarCarrito() {
  if (!confirm('¿Seguro que quieres vaciar el carrito?')) return;
  localStorage.removeItem('carrito');
  renderCarrito();
  actualizarContador();
}

// ─── FINALIZAR COMPRA → envía pedido al backend ───────────────
async function finalizarCompra() {
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  if (carrito.length === 0) {
    alert('Tu carrito está vacío.');
    return;
  }

  // Pedir datos del cliente
  const nombre   = prompt('Nombre completo:');
  const email    = prompt('Correo electrónico:');
  const telefono = prompt('Teléfono de contacto:');
  const direccion= prompt('Dirección de entrega:');
  const ciudad   = prompt('Ciudad:');

  if (!nombre || !email || !telefono || !direccion || !ciudad) {
    alert('Por favor completa todos los datos para continuar.');
    return;
  }

  const pedido = {
    nombre,
    email,
    telefono,
    direccion,
    ciudad,
    productos: carrito.map(p => ({
      nombre:   p.nombre,
      precio:   p.precio,
      cantidad: p.cantidad || 1
    }))
  };

  try {
    const respuesta = await fetch('http://localhost:3000/api/pedidos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pedido)
    });

    const datos = await respuesta.json();

    if (respuesta.ok) {
      alert(`🎉 ${datos.mensaje}\n\nPedido #${datos.pedido.id}\nTotal: $${datos.pedido.total.toLocaleString('es-CO')}`);
      localStorage.removeItem('carrito');
      renderCarrito();
      actualizarContador();
    } else {
      alert('Error al procesar el pedido: ' + datos.error);
    }

  } catch (err) {
    console.error('Error de conexión:', err);
    alert('No se pudo conectar con el servidor. Verifica que el backend esté encendido.');
  }
}

// ─── TOAST ───────────────────────────────────────────────────
function mostrarToast(mensaje) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.style.cssText = `
      position:fixed; bottom:25px; right:25px;
      background:#2ecc71; color:white;
      padding:12px 20px; border-radius:10px;
      font-weight:bold; z-index:9999;
      box-shadow:0 4px 15px rgba(0,0,0,0.2);
      transition: opacity 0.3s;
    `;
    document.body.appendChild(toast);
  }
  toast.textContent = mensaje;
  toast.style.opacity = '1';
  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => { toast.style.opacity = '0'; }, 2500);
}

// ─── INICIAR ────────────────────────────────────────────────
actualizarContador();
renderCarrito();
