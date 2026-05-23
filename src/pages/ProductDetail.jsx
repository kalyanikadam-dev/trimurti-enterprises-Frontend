import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getProductById } from '@/lib/api'
import { useCart } from '@/contexts/CartContext'

export default function ProductDetail() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { addToCart } = useCart()
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await getProductById(id)
                setProduct(res.data)
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        fetchProduct()
    }, [id])

    if (loading) return <div className="py-20 text-center">Loading...</div>
    if (!product) return <div className="py-20 text-center">Product not found</div>
    return (
        <div className="py-20 px-4">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
                <p className="text-2xl font-semibold text-orange-600 mb-8">₹{product.price}</p>
                <div className="bg-gradient-to-br from-primary/20 aspect-square rounded-lg flex items-center justify-center text-8xl mb-8 overflow-hidden">
                    {product.images && product.images[0] ? (
                        <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                    ) : (
                        '🧴'
                    )}
                </div>
                <p className="text-lg mb-8 text-gray-700">{product.description}</p>
                <div className="flex gap-4">
                    <button
                        onClick={() => {
                            addToCart(product)
                            navigate('/checkout')
                        }}
                        className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-orange-600"
                    >
                        Buy Now
                    </button>
                    <button
                        onClick={() => {
                            addToCart(product)
                            alert('Added to cart!')
                        }}
                        className="border border-primary text-primary px-8 py-3 rounded-lg font-semibold hover:bg-orange-50"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}

