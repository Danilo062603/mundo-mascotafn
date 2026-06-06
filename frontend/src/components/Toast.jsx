import styles from './Toast.module.css'

const icons = {
  success: '✅',
  error: '❌',
  info: 'ℹ️',
  warning: '⚠️',
}

export default function Toast({ toast, onClose }) {
  return (
    <div className={`${styles.toast} ${styles[toast.type]}`} style={{ pointerEvents: 'all' }}>
      <span className={styles.icon}>{icons[toast.type] || icons.success}</span>
      <span className={styles.message}>{toast.message}</span>
      <button className={styles.close} onClick={onClose} aria-label="Cerrar">✕</button>
    </div>
  )
}
