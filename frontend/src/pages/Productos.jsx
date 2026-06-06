import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { productosService } from '../services/api.js'
import ProductCard from '../components/ProductCard.jsx'
import LoadingSpinner from '../components/LoadingSpinner.jsx'
import styles from './Productos.module.css'

const CATEGORIAS = [
  { id: '', label: '🐾 Todos' },
  { id: 'alimentos', label: '🍖 Alimentos' },
  { id: 'camas', label: '🛏️ Camas' },
  { id: 'arena', label: '🏖️ Arena' },
  { id: 'juguetes', label: '🎾 Juguetes' },
]

export default function Productos() {
  const [searchParams, setSearchParams] = useSearchParams()
  const categoriaParam = searchParams.get('categoria') || ''

  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [busqueda, setBusqueda] = useState('')

  useEffect(() => {
    setLoading(true)
    setError(null)
    productosService.getAll(categoriaParam || undefined)
      .then(data => setProductos(data.productos))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [categoriaParam])

  const productosFiltrados = productos.filter(p =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    p.descripcion.toLowerCase().includes(busqueda.toLowerCase())
  )

  function setCategoria(cat) {
    if (cat) setSearchParams({ categoria: cat })
    else setSearchParams({})
  }

  return (
    <div className={styles.page}>
      <div className="container">
        {/* HEADER */}
        <div className={styles.pageHeader}>
          <div>
            <h1 className="section-title">Nuestros Productos</h1>
            <p className="section-subtitle">Todo lo que tu mascota necesita para ser feliz</p>
          </div>
          <div className={styles.searchWrap}>
            <span className={styles.searchIcon}>🔍</span>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Buscar productos..."
              value={busqueda}
              onChange={e => setBusqueda(e.target.value)}
            />
          </div>
        </div>

        {/* FILTROS */}
        <div className={styles.filters}>
          {CATEGORIAS.map(c => (
            <button
              key={c.id}
              className={`${styles.filterBtn} ${categoriaParam === c.id ? styles.filterActive : ''}`}
              onClick={() => setCategoria(c.id)}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* CONTENIDO */}
        {loading ? (
          <LoadingSpinner message="Cargando productos..." />
        ) : error ? (
          <div className={styles.errorBox}>
            <p>⚠️ {error}</p>
            <button className="btn btn-primary" onClick={() => window.location.reload()}>
              Reintentar
            </button>
          </div>
        ) : productosFiltrados.length === 0 ? (
          <div className="empty-state">
            <span className="empty-state-icon">🔍</span>
            <h3>Sin resultados</h3>
            <p>No encontramos productos para "{busqueda}"</p>
          </div>
        ) : (
          <>
            <p className={styles.resultCount}>
              {productosFiltrados.length} producto{productosFiltrados.length !== 1 ? 's' : ''} encontrado{productosFiltrados.length !== 1 ? 's' : ''}
            </p>
            <div className={styles.grid}>
              {productosFiltrados.map(p => (
                <ProductCard key={p.id} producto={p} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
