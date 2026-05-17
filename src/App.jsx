import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { CartProvider } from './contexts/CartContext'
import Layout from './Layout'
import Home from './pages/Home'
import About from './pages/About.jsx'
import Contact from './pages/Contact'
// import Gallery from './pages/Gallery'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import QuotePage from './pages/QuotePage.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import AdminLogin from './pages/AdminLogin.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import NotFoundPage from './pages/NotFound.jsx'
import ProductTab from './pages/admin-tabs/ProductTab.jsx'
import InquiryTab from './pages/admin-tabs/InquiryTab.jsx'
import CheckoutTab from './pages/admin-tabs/CheckoutTab.jsx'
import CheckoutPage from './pages/CheckoutPage.jsx'

function App() {
    return (
        <AuthProvider>
            <CartProvider>
                <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="about" element={<About />} />
                        <Route path="contact" element={<Contact />} />
                        {/* <Route path="gallery" element={<Gallery />} /> */}
                        <Route path="products" element={<Products />} />
                        <Route path="products/:id" element={<ProductDetail />} />
                        <Route path="quote/:id" element={<QuotePage />} />
                        <Route path="checkout" element={<CheckoutPage />} />
                        <Route path="*" element={<NotFoundPage />} />
                    </Route>
                    <Route path="/admin-login" element={<AdminLogin />} />
                    <Route
                        path="/admin"
                        element={
                            <ProtectedRoute>
                                <AdminDashboard />
                            </ProtectedRoute>
                        }
                    >
                        <Route index element={<Navigate to="products" replace />} />
                        <Route path="products" element={<ProductTab />} />
                        <Route path="inquiries" element={<InquiryTab />} />
                        <Route path="checkout" element={<CheckoutTab />} />
                    </Route>
                </Routes>
            </BrowserRouter>
            </CartProvider>
        </AuthProvider>
    )
}

export default App
