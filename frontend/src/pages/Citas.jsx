import { useState } from 'react'
import { citasService } from '../services/api.js'
import { useToast } from '../context/ToastContext.jsx'
import styles from './Citas.module.css'

const SERVICIOS = [
  'Consulta General',
  'Vacunación',
  'Peluquería',
  'Desparasitación',
  'Cirugía Menor',
  'Radiografía',
]

const emptyForm = { nombre: '', mascota: '', servicio: '', fecha: '', hora: '' }

export default function Citas() {
  const { addToast } = useToast()
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(null)

  const today = new Date().toISOString().split('T')[0]

  function validate() {
    const e = {}
    if (!form.nombre.trim())   e.nombre   = 'Ingresa tu nombre'
    if (!form.mascota.trim())  e.mascota  = 'Ingresa el nombre de tu mascota'
    if (!form.servicio)        e.servicio = 'Selecciona un servicio'
    if (!form.fecha)           e.fecha    = 'Selecciona una fecha'
    if (!form.hora)            e.hora     = 'Selecciona una hora'
    return e
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    setLoading(true)
    try {
      const cita = {
        nombre: form.nombre.trim(),
        mascota: form.mascota.trim(),
        servicio: form.servicio,
        fecha: `${form.fecha} a las ${form.hora}`,
      }
      const data = await citasService.crear(cita)
      setSuccess(data.cita)
      setForm(emptyForm)
      addToast('¡Cita agendada con éxito! 🐾', 'success', 5000)
    } catch (err) {
      addToast(err.message || 'Error al agendar la cita', 'error')
    } finally {
      setLoading(false)
    }
  }

  function handleChange(e) {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
    if (errors[name]) setErrors(er => ({ ...er, [name]: '' }))
  }

  if (success) {
    return (
      <div className={styles.page}>
        <div className="container">
          <div className={styles.successCard}>
            <span className={styles.successIcon}>🎉</span>
            <h2>¡Cita agendada!</h2>
            <p>Tu cita para <strong>{success.mascota}</strong> ha sido registrada exitosamente.</p>
            <div className={styles.successDetails}>
              <div className={styles.detailRow}><span>👤 Propietario</span><strong>{success.nombre}</strong></div>
              <div className={styles.detailRow}><span>🐾 Mascota</span><strong>{success.mascota}</strong></div>
              <div className={styles.detailRow}><span>🩺 Servicio</span><strong>{success.servicio}</strong></div>
              <div className={styles.detailRow}><span>📅 Fecha</span><strong>{success.fecha}</strong></div>
              <div className={styles.detailRow}><span>🔖 ID cita</span><strong>#{success.id}</strong></div>
            </div>
            <button className="btn btn-primary btn-lg" onClick={() => setSuccess(null)}>
              Agendar otra cita
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.layout}>
          {/* INFO LATERAL */}
          <aside className={styles.info}>
            <h2 className={styles.infoTitle}>Servicios veterinarios</h2>
            <p className={styles.infoSub}>Atendemos a tus mascotas con amor y profesionalismo.</p>
            <ul className={styles.serviceList}>
              {SERVICIOS.map(s => (
                <li key={s} className={styles.serviceItem}>
                  <span className={styles.serviceCheck}>✓</span> {s}
                </li>
              ))}
            </ul>
            <div className={styles.infoBox}>
              <p>📍 Disponible de lunes a sábado</p>
              <p>⏰ 8:00 AM – 6:00 PM</p>
              <p>📞 Tu mascota merece lo mejor</p>
            </div>
          </aside>

          {/* FORMULARIO */}
          <div className={styles.formCard}>
            <h1 className={styles.formTitle}>Agenda tu cita 🩺</h1>
            <p className={styles.formSub}>Completa el formulario y nos comunicaremos contigo.</p>

            <form onSubmit={handleSubmit} className={styles.form} noValidate>
              <div className={styles.formGrid}>
                <div className="form-group">
                  <label className="form-label" htmlFor="nombre">Nombre completo</label>
                  <input id="nombre" name="nombre" className="form-input" value={form.nombre} onChange={handleChange} placeholder="Ej: Juan García" style={errors.nombre ? { borderColor: '#ef4444' } : undefined} />
                  {errors.nombre && <span className="form-error">{errors.nombre}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="mascota">Nombre de la mascota</label>
                  <input id="mascota" name="mascota" className="form-input" value={form.mascota} onChange={handleChange} placeholder="Ej: Firulais" style={errors.mascota ? { borderColor: '#ef4444' } : undefined} />
                  {errors.mascota && <span className="form-error">{errors.mascota}</span>}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="servicio">Tipo de servicio</label>
                <select id="servicio" name="servicio" className="form-select" value={form.servicio} onChange={handleChange} style={errors.servicio ? { borderColor: '#ef4444' } : undefined}>
                  <option value="">Seleccionar servicio...</option>
                  {SERVICIOS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                {errors.servicio && <span className="form-error">{errors.servicio}</span>}
              </div>

              <div className={styles.formGrid}>
                <div className="form-group">
                  <label className="form-label" htmlFor="fecha">Fecha</label>
                  <input id="fecha" name="fecha" type="date" className="form-input" value={form.fecha} onChange={handleChange} min={today} style={errors.fecha ? { borderColor: '#ef4444' } : undefined} />
                  {errors.fecha && <span className="form-error">{errors.fecha}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="hora">Hora</label>
                  <input id="hora" name="hora" type="time" className="form-input" value={form.hora} onChange={handleChange} min="08:00" max="18:00" style={errors.hora ? { borderColor: '#ef4444' } : undefined} />
                  {errors.hora && <span className="form-error">{errors.hora}</span>}
                </div>
              </div>

              <button type="submit" className="btn btn-primary btn-lg btn-full" disabled={loading}>
                {loading ? '⏳ Agendando...' : '🐾 Agendar cita'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
