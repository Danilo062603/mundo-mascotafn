import { Link } from 'react-router-dom'
import styles from './Home.module.css'

const features = [
  { icon: '🛒', title: 'Tienda Online', desc: 'Más de 13 productos premium para perros y gatos con entrega a domicilio.' },
  { icon: '🩺', title: 'Citas Veterinarias', desc: 'Agenda consultas, vacunación, peluquería y desparasitación en minutos.' },
  { icon: '📝', title: 'Blog de Mascotas', desc: 'Consejos y novedades sobre el cuidado de tus compañeros peludos.' },
]

const categories = [
  { icon: '🍖', label: 'Alimentos', desc: 'Nutrición premium', path: '/productos', cat: 'alimentos' },
  { icon: '🛏️', label: 'Camas', desc: 'Descanso con estilo', path: '/productos', cat: 'camas' },
  { icon: '🏖️', label: 'Arena', desc: 'Higiene garantizada', path: '/productos', cat: 'arena' },
  { icon: '🎾', label: 'Juguetes', desc: 'Diversión sin límites', path: '/productos', cat: 'juguetes' },
]

export default function Home() {
  return (
    <div className={styles.page}>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <span className={styles.heroBadge}>🐾 Tu tienda de confianza</span>
          <h1 className={styles.heroTitle}>
            Todo para tu mascota<br />en un solo lugar
          </h1>
          <p className={styles.heroSub}>
            Productos de calidad, citas veterinarias y consejos para que tu mascota viva feliz.
          </p>
          <div className={styles.heroActions}>
            <Link to="/productos" className="btn btn-primary btn-lg">
              🛒 Ver productos
            </Link>
            <Link to="/citas" className="btn btn-secondary btn-lg">
              🩺 Agendar cita
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className={styles.features}>
        <div className="container">
          <div className={styles.featuresGrid}>
            {features.map(f => (
              <div key={f.title} className={styles.featureCard}>
                <span className={styles.featureIcon}>{f.icon}</span>
                <h3 className={styles.featureTitle}>{f.title}</h3>
                <p className={styles.featureDesc}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className={styles.categories}>
        <div className="container">
          <div className={styles.catHeader}>
            <h2 className="section-title">Explorar categorías</h2>
            <p className="section-subtitle">Encuentra exactamente lo que tu mascota necesita</p>
          </div>
          <div className={styles.catGrid}>
            {categories.map(c => (
              <Link to={`/productos?categoria=${c.cat}`} key={c.label} className={styles.catCard}>
                <span className={styles.catIcon}>{c.icon}</span>
                <h3 className={styles.catLabel}>{c.label}</h3>
                <p className={styles.catDesc}>{c.desc}</p>
                <span className={styles.catArrow}>→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <div className="container">
          <div className={styles.ctaCard}>
            <div className={styles.ctaText}>
              <h2>¿Tu mascota necesita atención veterinaria?</h2>
              <p>Agenda tu cita en segundos y recibe la mejor atención profesional.</p>
            </div>
            <Link to="/citas" className="btn btn-primary btn-lg">
              Agendar cita ahora →
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
