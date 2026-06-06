import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import styles from './Navbar.module.css'

const navLinks = [
  { to: '/', label: 'Inicio' },
  { to: '/productos', label: 'Productos' },
  { to: '/citas', label: 'Citas' },
  { to: '/blog', label: 'Blog' },
]

export default function Navbar() {
  const { totalItems } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to="/" className={styles.logo}>
          <span className={styles.logoPaw}>🐾</span>
          <span className={styles.logoText}>Mundo Mascota</span>
        </Link>

        <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}>
          {navLinks.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
              }
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </NavLink>
          ))}

          <Link
            to="/carrito"
            className={styles.cartBtn}
            onClick={() => setMenuOpen(false)}
          >
            <span>🛒</span>
            {totalItems > 0 && (
              <span className={styles.cartBadge}>{totalItems}</span>
            )}
          </Link>
        </nav>

        <button
          className={styles.burger}
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Menú"
        >
          <span className={`${styles.burgerLine} ${menuOpen ? styles.burgerOpen1 : ''}`} />
          <span className={`${styles.burgerLine} ${menuOpen ? styles.burgerOpen2 : ''}`} />
          <span className={`${styles.burgerLine} ${menuOpen ? styles.burgerOpen3 : ''}`} />
        </button>
      </div>
    </header>
  )
}
