document.getElementById('formularioCitas').addEventListener('submit', async function (e) {
  e.preventDefault();

  const nombre   = document.getElementById('nombre').value.trim();
  const mascota  = document.getElementById('mascota').value.trim();
  const servicio = document.getElementById('servicio').value;
  const fechaInput = document.getElementById('fecha').value;
  const horaInput  = document.getElementById('hora').value;

  if (!nombre || !mascota || !servicio || !fechaInput || !horaInput) {
    alert('Por favor completa todos los campos.');
    return;
  }

  const fecha = `${fechaInput} a las ${horaInput}`;

  const nuevaCita = { nombre, mascota, servicio, fecha };

  const btnSubmit = e.target.querySelector('button[type="submit"]');
  btnSubmit.disabled = true;
  btnSubmit.textContent = 'Agendando...';

  try {
    const respuesta = await fetch('http://localhost:3000/api/citas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevaCita)
    });

    const datos = await respuesta.json();

    if (respuesta.ok) {
      alert(`✅ ${datos.mensaje}`);
      document.getElementById('formularioCitas').reset();
    } else {
      alert('Error al agendar: ' + datos.error);
    }

  } catch (error) {
    console.error('Error de conexión:', error);
    alert('No se pudo conectar con el servidor. Verifica que el backend esté encendido con: npm start');
  } finally {
    btnSubmit.disabled = false;
    btnSubmit.textContent = 'Agendar cita';
  }
});
