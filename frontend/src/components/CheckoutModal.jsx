import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { useToast } from '../context/ToastContext.jsx'
import { pedidosService } from '../services/api.js'
import styles from './CheckoutModal.module.css'

const emptyForm = { nombre: '', email: '', telefono: '', direccion: '', ciudad: '' }

export default function CheckoutModal({ onClose }) {
  const { items, totalPrecio, vaciar } = useCart()
  const { addToast } = useToast()
  const navigate = useNavigate()
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  function validate() {
    const e = {}
    if (!form.nombre.trim())    e.nombre    = 'Requerido'
    if (!form.email.trim())     e.email     = 'Requerido'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Email inválido'
    if (!form.telefono.trim())  e.telefono  = 'Requerido'
    if (!form.direccion.trim()) e.direccion = 'Requerido'
    if (!form.ciudad.trim())    e.ciudad    = 'Requerido'
    return e
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const e2 = validate()
    if (Object.keys(e2).length) { setErrors(e2); return }

    setLoading(true)
    try {
      const pedido = {
        ...form,
        productos: items.map(p => ({ nombre: p.nombre, precio: p.precio, cantidad: p.cantidad })),
      }
      const data = await pedidosService.crear(pedido)
      vaciar()
      onClose()
      addToast('¡Pedido realizado con éxito! 🎉', 'success', 5000)
      navigate('/confirmacion', { state: { pedido: data.pedido } })
    } catch (err) {
      addToast(err.message || 'Error al procesar el pedido', 'error')
    } finally {
      setLoading(false)
    }
  }

  function handleChange(e) {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
    if (errors[name]) setErrors(er => ({ ...er, [name]: '' }))
  }

  function formatPrice(n) {
    return n.toLocaleString('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 })
  }

  return (
    <div className={styles.overlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>Datos de entrega</h2>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Cerrar">✕</button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form} noValidate>
          <div className={styles.grid}>
            <Field label="Nombre completo" name="nombre" value={form.nombre} onChange={handleChange} error={errors.nombre} placeholder="Ej: María García" />
            <Field label="Correo electrónico" name="email" type="email" value={form.email} onChange={handleChange} error={errors.email} placeholder="tu@email.com" />
            <Field label="Teléfono" name="telefono" value={form.telefono} onChange={handleChange} error={errors.telefono} placeholder="300 123 4567" />
            <Field label="Ciudad" name="ciudad" value={form.ciudad} onChange={handleChange} error={errors.ciudad} placeholder="Medellín" />
          </div>
          <Field label="Dirección de entrega" name="direccion" value={form.direccion} onChange={handleChange} error={errors.direccion} placeholder="Calle 45 # 12-34, Apto 201" />

          <div className={styles.summary}>
            <span>Total del pedido:</span>
            <strong className={styles.total}>{formatPrice(totalPrecio)}</strong>
          </div>

          <div className={styles.actions}>
            <button type="button" className="btn btn-ghost" onClick={onClose}>Cancelar</button>
            <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
              {loading ? 'Procesando...' : '✅ Confirmar pedido'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function Field({ label, name, type = 'text', value, onChange, error, placeholder }) {
  return (
    <div className="form-group">
      <label className="form-label" htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`form-input ${error ? 'form-input-error' : ''}`}
        style={error ? { borderColor: '#ef4444' } : undefined}
      />
      {error && <span className="form-error">{error}</span>}
    </div>
  )
}
