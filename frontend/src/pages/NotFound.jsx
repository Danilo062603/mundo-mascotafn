import { Link } from 'react-router-dom'
import styles from './NotFound.module.css'

export default function NotFound() {
  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.content}>
          <span className={styles.icon}>🐾</span>
          <h1 className={styles.code}>404</h1>
          <h2 className={styles.title}>Página no encontrada</h2>
          <p className={styles.sub}>Parece que tu mascota se comió esta página. ¡No la encontramos!</p>
          <Link to="/" className="btn btn-primary btn-lg">Volver al inicio</Link>
        </div>
      </div>
    </div>
  )
}
