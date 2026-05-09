function agregarCarrito(nombre, precio, imagen) {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  carrito.push({
    nombre,
    precio,
    imagen
  });

  localStorage.setItem("carrito", JSON.stringify(carrito));

  actualizarContador();
}

function renderCarrito() {
  const contenedor = document.getElementById("carrito-items");

  if (!contenedor) return;

  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  contenedor.innerHTML = "";

  let total = 0;

  carrito.forEach((producto, index) => {
    total += producto.precio;

    contenedor.innerHTML += `
      <div class="carrito-item">
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <div class="carrito-info">
          <h4>${producto.nombre}</h4>
          <p>$${producto.precio.toLocaleString()}</p>
        </div>
        <button class="btn-eliminar" onclick="eliminar(${index})">X</button>
      </div>
    `;
  });

  const totalEl = document.getElementById("total");

  if (totalEl) {
    totalEl.textContent = `$${total.toLocaleString()}`;
  }
}

function eliminar(index) {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  carrito.splice(index, 1);

  localStorage.setItem("carrito", JSON.stringify(carrito));

  renderCarrito();
  actualizarContador();
}

function actualizarContador() {
  const contador = document.getElementById("contador-carrito");

  if (!contador) return;

  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  contador.textContent = carrito.length;
}

actualizarContador();
renderCarrito();

function vaciarCarrito() {
  localStorage.removeItem("carrito");
  renderCarrito();
  actualizarContador();
}


