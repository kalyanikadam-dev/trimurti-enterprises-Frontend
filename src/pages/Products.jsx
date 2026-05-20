import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '@/lib/api.js';


export default function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getProducts();
                setProducts(response.data.map(p => ({
                    id: p.id,
                    name: p.name,
                    price: `₹${p.price}`,
                    capacity: 'Varies',
                    material: p.category.toUpperCase(),
                    image: p.images[0] || '/produc_Image/prod1.jpeg'
                })));
            } catch (err) {
                setError('Failed to load products');
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    if (loading) return <div className="py-20 text-center">Loading products...</div>;
    if (error) return <div className="py-20 text-center text-red-500">{error}</div>;

    return (
        <div className="py-9 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-red-500 to-orange-500 text-transparent bg-clip-text">
                        Our Products
                    </h1>

                    {/* Thin Stylish Line */}
                    <div className="w-20 h-[2px] mx-auto mt-3 bg-gradient-to-r from-red-500 to-orange-500 rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {products.map((product) => (
                        <div key={product.id} className="group border border-border rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-card">
                            <div className="overflow-hidden rounded-lg mb-6">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>

                            <h2 className="font-bold text-xl mb-2 leading-tight">{product.name}</h2>
                            <p className="text-2xl font-bold text-primary mb-4">{product.price}</p>

                            <div className="space-y-2 mb-6 text-sm">
                                <p className="text-muted-foreground"><span className="font-semibold">Capacity:</span> {product.capacity}</p>
                                <p className="text-muted-foreground"><span className="font-semibold">Material:</span> {product.material}</p>
                            </div>

                            <Link
                                to={`/quote/${product.id}`}
                                className="block w-full text-center bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                            >
                                Get Quote
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

