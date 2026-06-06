import { useLocation, Link } from 'react-router-dom'
import styles from './Confirmacion.module.css'

function formatPrice(n) {
  return n?.toLocaleString('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }) || '$0'
}

export default function Confirmacion() {
  const { state } = useLocation()
  const pedido = state?.pedido

  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.card}>
          <div className={styles.iconWrap}>
            <span className={styles.icon}>🎉</span>
          </div>

          <h1 className={styles.title}>¡Pedido confirmado!</h1>
          <p className={styles.sub}>
            Gracias por tu compra. Hemos recibido tu pedido y nos pondremos en contacto contigo pronto.
          </p>

          {pedido && (
            <div className={styles.details}>
              <div className={styles.detailHeader}>
                <span>Pedido <strong>#{pedido.id}</strong></span>
                <span className={styles.statusBadge}>✅ Pendiente</span>
              </div>

              <div className={styles.clientInfo}>
                <p><strong>👤</strong> {pedido.cliente?.nombre}</p>
                <p><strong>📧</strong> {pedido.cliente?.email}</p>
                <p><strong>📍</strong> {pedido.cliente?.direccion}, {pedido.cliente?.ciudad}</p>
              </div>

              {pedido.productos?.length > 0 && (
                <div className={styles.productosList}>
                  <h3>Productos pedidos</h3>
                  {pedido.productos.map((p, i) => (
                    <div key={i} className={styles.productoRow}>
                      <span>{p.nombre} × {p.cantidad}</span>
                      <span>{formatPrice(p.precio * p.cantidad)}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className={styles.totalRow}>
                <span>Total pagado</span>
                <strong className={styles.totalAmount}>{formatPrice(pedido.total)}</strong>
              </div>
            </div>
          )}

          <div className={styles.actions}>
            <Link to="/productos" className="btn btn-primary btn-lg">
              🛒 Seguir comprando
            </Link>
            <Link to="/" className="btn btn-secondary">
              Ir al inicio
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
