import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { createOrder } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

export default function CheckoutPage() {
    const { cart, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        customerName: '',
        email: '',
        phone: '',
        shippingAddress: '',
        paymentMethod: 'cash_on_delivery'
    });
    const [loading, setLoading] = useState(false);

    const handleCheckout = async (e) => {
        e.preventDefault();
        if (cart.length === 0) return alert('Your cart is empty!');

        setLoading(true);
        try {
            const orderData = {
                ...formData,
                products: cart,
                totalAmount: getCartTotal()
            };
            await createOrder(orderData);
            clearCart();
            alert('Order placed successfully!');
            navigate('/');
        } catch (error) {
            console.error(error);
            alert('Failed to place order. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (cart.length === 0) {
        return (
            <div className="py-20 px-4 text-center">
                <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
                <p className="mb-8 text-gray-600">Add some products to your cart before checking out.</p>
                <Button onClick={() => navigate('/products')}>Browse Products</Button>
            </div>
        );
    }

    return (
        <div className="py-12 px-4 max-w-6xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">Checkout</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Cart Summary */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader><CardTitle>Order Summary</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            {cart.map(item => (
                                <div key={item.productId} className="flex justify-between items-center border-b pb-4">
                                    <div>
                                        <h3 className="font-semibold">{item.name}</h3>
                                        <p className="text-sm text-gray-500">${item.price} each</p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <Input 
                                            type="number" 
                                            min="1" 
                                            value={item.quantity} 
                                            onChange={(e) => updateQuantity(item.productId, Number(e.target.value))}
                                            className="w-20"
                                        />
                                        <div className="font-medium">${(item.price * item.quantity).toFixed(2)}</div>
                                        <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.productId)}>
                                            <Trash2 className="w-4 h-4 text-red-500" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                            <div className="pt-4 flex justify-between text-xl font-bold">
                                <span>Total:</span>
                                <span>${getCartTotal().toFixed(2)}</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Checkout Form */}
                <Card>
                    <CardHeader><CardTitle>Shipping Details</CardTitle></CardHeader>
                    <CardContent>
                        <form onSubmit={handleCheckout} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Full Name</label>
                                <Input required value={formData.customerName} onChange={e => setFormData({...formData, customerName: e.target.value})} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Email</label>
                                    <Input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Phone</label>
                                    <Input required type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Shipping Address</label>
                                <textarea required rows="3" className="w-full p-3 border rounded-md" value={formData.shippingAddress} onChange={e => setFormData({...formData, shippingAddress: e.target.value})}></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Payment Method</label>
                                <select className="w-full p-3 border rounded-md" value={formData.paymentMethod} onChange={e => setFormData({...formData, paymentMethod: e.target.value})}>
                                    <option value="cash_on_delivery">Cash on Delivery</option>
                                    <option value="online" disabled>Online Payment (Coming Soon)</option>
                                </select>
                            </div>
                            
                            <Button type="submit" className="w-full mt-6 bg-orange-600 hover:bg-orange-700 h-12 text-lg" disabled={loading}>
                                {loading ? 'Processing...' : 'Place Order'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
