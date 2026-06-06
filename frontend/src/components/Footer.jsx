import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <span className={styles.paw}>🐾</span>
          <div>
            <p className={styles.brandName}>Mundo Mascota</p>
            <p className={styles.brandSub}>Todo para tu mascota en un solo lugar</p>
          </div>
        </div>

        <nav className={styles.links}>
          <Link to="/">Inicio</Link>
          <Link to="/productos">Productos</Link>
          <Link to="/citas">Citas</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/carrito">Carrito</Link>
        </nav>

        <p className={styles.copy}>© {new Date().getFullYear()} Mundo Mascota. Todos los derechos reservados.</p>
      </div>
    </footer>
  )
}
