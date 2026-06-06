import styles from './Blog.module.css'

const posts = [
  {
    id: 1,
    emoji: '🐾',
    categoria: 'Bienvenida',
    titulo: 'Bienvenidos a Mundo Mascota',
    contenido: 'Somos tu plataforma web para el cuidado integral de mascotas. Encuentra citas veterinarias, tienda online con productos de calidad y mucho más. Nuestro compromiso es el bienestar de tus compañeros peludos.',
    fecha: 'Enero 2026',
  },
  {
    id: 2,
    emoji: '🚀',
    categoria: 'Plataforma',
    titulo: 'Nuestras Funcionalidades',
    contenido: 'Sistema completo de citas veterinarias con confirmación en tiempo real, carrito de compras con pedidos en línea y catálogo completo de productos premium para perros y gatos de todas las razas y edades.',
    fecha: 'Febrero 2026',
  },
  {
    id: 3,
    emoji: '💻',
    categoria: 'Tecnología',
    titulo: 'Stack Tecnológico',
    contenido: 'Desarrollado con React 18 y React Router en el frontend para una experiencia de usuario moderna y fluida. Node.js con Express en el backend para una API REST robusta y escalable. Arquitectura Full Stack profesional.',
    fecha: 'Marzo 2026',
  },
  {
    id: 4,
    emoji: '🛒',
    categoria: 'Tutorial',
    titulo: 'Cómo hacer un pedido',
    contenido: 'Elige tus productos favoritos en la sección de Productos, agrégalos al carrito con un clic y finaliza tu compra ingresando los datos de entrega en nuestro formulario seguro. Recibirás confirmación inmediata en pantalla.',
    fecha: 'Abril 2026',
  },
  {
    id: 5,
    emoji: '🩺',
    categoria: 'Veterinaria',
    titulo: 'Cuándo llevar tu mascota al veterinario',
    contenido: 'Las visitas regulares al veterinario son esenciales para mantener la salud de tu mascota. Recomendamos chequeos anuales, vacunación al día, y visitas inmediatas ante cualquier cambio de comportamiento, pérdida de apetito o síntomas físicos inusuales.',
    fecha: 'Mayo 2026',
  },
  {
    id: 6,
    emoji: '🍖',
    categoria: 'Nutrición',
    titulo: 'Alimentación balanceada para mascotas',
    contenido: 'Una dieta equilibrada es fundamental para la longevidad y calidad de vida de tus mascotas. Nuestros productos de alimentación están seleccionados cuidadosamente para ofrecer los mejores nutrientes. Consulta con tu veterinario para elegir la dieta ideal.',
    fecha: 'Junio 2026',
  },
]

export default function Blog() {
  return (
    <div className={styles.page}>
      {/* HERO */}
      <section className={styles.hero}>
        <div className="container">
          <span className={styles.heroBadge}>📝 Blog</span>
          <h1 className={styles.heroTitle}>Blog Mundo Mascota</h1>
          <p className={styles.heroSub}>Consejos, novedades y todo sobre el cuidado de tus mascotas</p>
        </div>
      </section>

      {/* POSTS */}
      <section className={styles.postsSection}>
        <div className="container">
          <div className={styles.grid}>
            {posts.map(post => (
              <article key={post.id} className={styles.card}>
                <div className={styles.cardHeader}>
                  <span className={styles.cardEmoji}>{post.emoji}</span>
                  <span className={styles.cardCat}>{post.categoria}</span>
                </div>
                <h2 className={styles.cardTitle}>{post.titulo}</h2>
                <p className={styles.cardContent}>{post.contenido}</p>
                <div className={styles.cardFooter}>
                  <span className={styles.cardDate}>📅 {post.fecha}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
