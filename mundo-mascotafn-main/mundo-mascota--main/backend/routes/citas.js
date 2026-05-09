const form = document.querySelector('form');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = {
      nombre: document.getElementById('nombre').value,
      mascota: document.getElementById('mascota').value,
      fecha: document.getElementById('fecha').value,
      servicio: document.getElementById('servicio').value,
      telefono: document.getElementById('telefono').value,
      email: document.getElementById('email').value
    };

    try {
      const res = await fetch('/api/citas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await res.json();

      alert(result.mensaje);
      form.reset();

    } catch (error) {
      console.error('Error:', error);
    }
  });
}