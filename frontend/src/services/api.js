const BASE = '/api'

async function request(url, options = {}) {
  const res = await fetch(`${BASE}${url}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Error en la solicitud')
  return data
}

export const productosService = {
  getAll: (categoria) => {
    const query = categoria ? `?categoria=${categoria}` : ''
    return request(`/productos${query}`)
  },
  getById: (id) => request(`/productos/${id}`),
}

export const citasService = {
  crear: (cita) => request('/citas', { method: 'POST', body: JSON.stringify(cita) }),
  getAll: () => request('/citas'),
}

export const pedidosService = {
  crear: (pedido) => request('/pedidos', { method: 'POST', body: JSON.stringify(pedido) }),
  getAll: () => request('/pedidos'),
}
