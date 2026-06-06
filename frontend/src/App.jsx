import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext.jsx'
import { ToastProvider } from './context/ToastContext.jsx'
import Layout from './layouts/Layout.jsx'
import Home from './pages/Home.jsx'
import Productos from './pages/Productos.jsx'
import Citas from './pages/Citas.jsx'
import Carrito from './pages/Carrito.jsx'
import Blog from './pages/Blog.jsx'
import Confirmacion from './pages/Confirmacion.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <CartProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/productos" element={<Productos />} />
              <Route path="/citas" element={<Citas />} />
              <Route path="/carrito" element={<Carrito />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/confirmacion" element={<Confirmacion />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </CartProvider>
      </ToastProvider>
    </BrowserRouter>
  )
}
