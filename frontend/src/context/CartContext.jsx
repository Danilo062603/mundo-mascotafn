import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('carrito')) || []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(items))
  }, [items])

  const totalItems = items.reduce((acc, p) => acc + p.cantidad, 0)
  const totalPrecio = items.reduce((acc, p) => acc + p.precio * p.cantidad, 0)

  const agregarItem = useCallback((producto) => {
    setItems(prev => {
      const existe = prev.find(p => p.id === producto.id)
      if (existe) {
        return prev.map(p =>
          p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p
        )
      }
      return [...prev, { ...producto, cantidad: 1 }]
    })
  }, [])

  const eliminarItem = useCallback((id) => {
    setItems(prev => prev.filter(p => p.id !== id))
  }, [])

  const cambiarCantidad = useCallback((id, cantidad) => {
    if (cantidad <= 0) {
      setItems(prev => prev.filter(p => p.id !== id))
    } else {
      setItems(prev => prev.map(p => p.id === id ? { ...p, cantidad } : p))
    }
  }, [])

  const vaciar = useCallback(() => {
    setItems([])
  }, [])

  return (
    <CartContext.Provider value={{
      items, totalItems, totalPrecio,
      agregarItem, eliminarItem, cambiarCantidad, vaciar,
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
