import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { useToast } from '../context/ToastContext.jsx'
import CheckoutModal from '../components/CheckoutModal.jsx'
import styles from './Carrito.module.css'

function formatPrice(n) {
  return n.toLocaleString('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 })
}

export default function Carrito() {
  const { items, totalItems, totalPrecio, eliminarItem, cambiarCantidad, vaciar } = useCart()
  const { addToast } = useToast()
  const [showModal, setShowModal] = useState(false)

  function handleVaciar() {
    if (items.length === 0) return
    vaciar()
    addToast('Carrito vaciado', 'info')
  }

  if (items.length === 0) {
    return (
      <div className={styles.page}>
        <div className="container">
          <div className="empty-state">
            <span className="empty-state-icon">🛒</span>
            <h3>Tu carrito está vacío</h3>
            <p>Agrega productos desde nuestra tienda para comenzar tu pedido.</p>
            <Link to="/productos" className="btn btn-primary btn-lg">
              Ver productos
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.header}>
          <h1 className="section-title">Tu carrito</h1>
          <span className={styles.count}>{totalItems} artículo{totalItems !== 1 ? 's' : ''}</span>
        </div>

        <div className={styles.layout}>
          {/* ITEMS */}
          <div className={styles.itemsList}>
            {items.map(item => (
              <CartItemRow
                key={item.id}
                item={item}
                onEliminar={eliminarItem}
                onCambiar={cambiarCantidad}
              />
            ))}
            <button className={`btn btn-ghost ${styles.vaciarBtn}`} onClick={handleVaciar}>
              🗑️ Vaciar carrito
            </button>
          </div>

          {/* RESUMEN */}
          <aside className={styles.summary}>
            <h2 className={styles.summaryTitle}>Resumen del pedido</h2>

            <div className={styles.summaryRows}>
              {items.map(item => (
                <div key={item.id} className={styles.summaryRow}>
                  <span>{item.nombre} × {item.cantidad}</span>
                  <span>{formatPrice(item.precio * item.cantidad)}</span>
                </div>
              ))}
            </div>

            <div className={styles.divider} />

            <div className={styles.totalRow}>
              <span>Total</span>
              <strong className={styles.totalAmount}>{formatPrice(totalPrecio)}</strong>
            </div>

            <button
              className={`btn btn-primary btn-lg btn-full ${styles.checkoutBtn}`}
              onClick={() => setShowModal(true)}
            >
              ✅ Finalizar compra
            </button>
            <Link to="/productos" className={`btn btn-ghost btn-full`}>
              ← Seguir comprando
            </Link>
          </aside>
        </div>
      </div>

      {showModal && <CheckoutModal onClose={() => setShowModal(false)} />}
    </div>
  )
}

function CartItemRow({ item, onEliminar, onCambiar }) {
  return (
    <div className={styles.item}>
      <img
        src={`/img/${item.imagen?.split('/').pop() || 'dogchow.jpg'}`}
        alt={item.nombre}
        className={styles.itemImg}
        onError={e => { e.target.src = '/img/dogchow.jpg' }}
      />
      <div className={styles.itemInfo}>
        <h3 className={styles.itemName}>{item.nombre}</h3>
        <p className={styles.itemPrice}>{formatPrice(item.precio)} c/u</p>
        <div className={styles.qtyControl}>
          <button
            className={styles.qtyBtn}
            onClick={() => onCambiar(item.id, item.cantidad - 1)}
          >−</button>
          <span className={styles.qty}>{item.cantidad}</span>
          <button
            className={styles.qtyBtn}
            onClick={() => onCambiar(item.id, item.cantidad + 1)}
          >+</button>
        </div>
      </div>
      <div className={styles.itemRight}>
        <strong className={styles.itemTotal}>{formatPrice(item.precio * item.cantidad)}</strong>
        <button
          className={styles.removeBtn}
          onClick={() => onEliminar(item.id)}
          aria-label="Eliminar"
        >✕</button>
      </div>
    </div>
  )
}
