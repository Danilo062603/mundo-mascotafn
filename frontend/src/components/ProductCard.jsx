import { useCart } from '../context/CartContext.jsx'
import { useToast } from '../context/ToastContext.jsx'
import styles from './ProductCard.module.css'

function formatPrice(n) {
  return n.toLocaleString('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 })
}

export default function ProductCard({ producto }) {
  const { agregarItem, items } = useCart()
  const { addToast } = useToast()

  const enCarrito = items.find(p => p.id === producto.id)

  function handleAgregar() {
    agregarItem(producto)
    addToast(`${producto.nombre} añadido al carrito 🛒`)
  }

  return (
    <article className={styles.card}>
      <div className={styles.imgWrap}>
        <img
          src={`/img/${producto.imagen.split('/').pop()}`}
          alt={producto.nombre}
          className={styles.img}
          loading="lazy"
          onError={e => { e.target.src = '/img/dogchow.jpg' }}
        />
        <span className={styles.categoryBadge}>{producto.categoria}</span>
      </div>

      <div className={styles.body}>
        <h3 className={styles.name}>{producto.nombre}</h3>
        <p className={styles.desc}>{producto.descripcion}</p>

        <div className={styles.footer}>
          <span className={styles.price}>{formatPrice(producto.precio)}</span>
          <button
            className={`${styles.addBtn} ${enCarrito ? styles.added : ''}`}
            onClick={handleAgregar}
          >
            {enCarrito ? `🛒 (${enCarrito.cantidad})` : '+ Agregar'}
          </button>
        </div>
      </div>
    </article>
  )
}
