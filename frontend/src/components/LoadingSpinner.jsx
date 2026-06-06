import styles from './LoadingSpinner.module.css'

export default function LoadingSpinner({ message = 'Cargando...' }) {
  return (
    <div className={styles.wrap}>
      <div className={styles.spinner} />
      {message && <p className={styles.msg}>{message}</p>}
    </div>
  )
}
