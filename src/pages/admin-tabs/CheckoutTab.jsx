import { useState, useEffect } from 'react';
import { getAdminOrders, updateOrderStatus, deleteOrder } from '@/lib/api.js';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RefreshCw, Package, Truck, CheckCircle, XCircle, Calendar, Mail, Phone, MapPin, CreditCard } from 'lucide-react';

export default function CheckoutTab() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [actionLoadingId, setActionLoadingId] = useState(null);

    useEffect(() => { loadData(); }, []);

    const loadData = async () => {
        setLoading(true);
        try {
            const res = await getAdminOrders();
            setOrders(res.data || []);
        } catch (error) {
            console.error('Load orders error:', error);
        }
        setLoading(false);
    };

    const handleUpdateStatus = async (id, status, paymentStatus) => {
        setActionLoadingId(id);
        try {
            await updateOrderStatus(id, { status, paymentStatus });
            loadData();
        } catch (error) {
            console.error('Update order error:', error);
        } finally {
            setActionLoadingId(null);
        }
    };

    const handleDeleteOrder = async (id) => {
        if (!confirm('Are you sure you want to delete this order?')) return;
        setActionLoadingId(id);
        try {
            await deleteOrder(id);
            loadData();
        } catch (error) {
            console.error('Delete order error:', error);
        } finally {
            setActionLoadingId(null);
        }
    };

    const formatDate = (dateStr) => new Date(dateStr).toLocaleString('en-IN', {
        dateStyle: 'medium',
        timeStyle: 'short'
    });

    const getStatusStyles = (status) => {
        switch(status) {
            case 'processing': 
                return 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900/30';
            case 'shipped': 
                return 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-900/30';
            case 'delivered': 
                return 'bg-green-50 text-green-700 border-green-200 dark:bg-green-950/20 dark:text-green-400 dark:border-green-900/30';
            case 'cancelled': 
                return 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/20 dark:text-red-400 dark:border-red-900/30';
            default: 
                return 'bg-gray-50 text-gray-700 border-gray-200';
        }
    };

    const getPaymentStyles = (status) => {
        switch(status) {
            case 'pending': 
                return 'bg-amber-50 text-amber-700 border-amber-100';
            case 'completed': 
                return 'bg-green-50 text-green-700 border-green-100';
            case 'failed': 
                return 'bg-red-50 text-red-700 border-red-100';
            default: 
                return 'bg-gray-50 text-gray-700 border-gray-100';
        }
    };

    return (
        <div className="space-y-8">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                        <Package className="w-6 h-6 text-orange-500" />
                        Cart & Checkout Orders
                    </h2>
                    <p className="text-sm text-gray-500">Track and manage customer checkouts, shipping status, and payments.</p>
                </div>
                <Button onClick={loadData} variant="outline" size="sm" className="self-start sm:self-auto gap-2">
                    <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                    Refresh Orders
                </Button>
            </div>

            {loading ? (
                <div className="flex justify-center items-center py-20 bg-white border border-gray-100 rounded-2xl shadow-sm">
                    <RefreshCw className="w-8 h-8 animate-spin text-orange-500" />
                </div>
            ) : orders.length === 0 ? (
                <div className="text-center py-20 bg-white border border-gray-100 border-dashed rounded-2xl text-gray-500">
                    <Package className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                    <p className="text-lg font-medium text-gray-900">No checkout orders yet</p>
                    <p className="text-sm">Active orders placed by customers will be listed here.</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {orders.map((order) => (
                        <div key={order.id} className="border border-gray-100 rounded-2xl p-6 bg-white shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
                            {/* Accent indicator line matching status */}
                            <div className={`absolute top-0 left-0 w-1.5 h-full ${
                                order.orderStatus === 'delivered' ? 'bg-green-500' :
                                order.orderStatus === 'shipped' ? 'bg-blue-500' :
                                order.orderStatus === 'cancelled' ? 'bg-red-500' : 'bg-amber-500'
                            }`} />

                            <div className="pl-2">
                                {/* Top metadata section */}
                                <div className="flex flex-col lg:flex-row justify-between lg:items-start mb-6 gap-4 border-b border-gray-50 pb-4">
                                    <div className="space-y-1.5">
                                        <div className="flex flex-wrap items-center gap-2.5">
                                            <h3 className="text-lg font-bold text-gray-900">{order.customerName}</h3>
                                            <Badge className={`${getStatusStyles(order.orderStatus)} border font-bold capitalize px-2 py-0.5 text-xs`}>
                                                {order.orderStatus}
                                            </Badge>
                                        </div>
                                        <div className="text-xs text-gray-500 flex flex-wrap items-center gap-3">
                                            <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> {order.email}</span>
                                            <span>•</span>
                                            <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> {order.phone}</span>
                                            <span>•</span>
                                            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {formatDate(order.createdAt)}</span>
                                        </div>
                                    </div>
                                    <div className="lg:text-right">
                                        <div className="text-2xl font-black text-gray-900 tracking-tight mb-1">
                                            ₹{order.totalAmount.toFixed(2)}
                                        </div>
                                        <div className="flex items-center gap-2 lg:justify-end">
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">
                                                {order.paymentMethod.replace(/_/g, ' ')}
                                            </span>
                                            <Badge className={`${getPaymentStyles(order.paymentStatus)} border font-bold capitalize text-[10px] py-0.5 px-2`}>
                                                Payment: {order.paymentStatus}
                                            </Badge>
                                        </div>
                                    </div>
                                </div>

                                {/* Order details grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    {/* Products lists */}
                                    <div className="bg-gray-50/50 rounded-xl p-4 border border-gray-100/50">
                                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                                            <Package className="w-3.5 h-3.5 text-orange-400" />
                                            Order Items
                                        </h4>
                                        <div className="divide-y divide-gray-100 max-h-48 overflow-y-auto pr-1">
                                            {order.products.map((item, idx) => (
                                                <div key={idx} className="flex justify-between items-center text-sm py-2 first:pt-0 last:pb-0">
                                                    <div className="flex items-center gap-2">
                                                        <span className="w-6 h-6 bg-white rounded-md flex items-center justify-center text-xs font-bold border border-gray-200 text-orange-600">
                                                            {item.quantity}x
                                                        </span>
                                                        <span className="text-gray-700 font-medium">{item.name || 'Product'}</span>
                                                    </div>
                                                    <span className="font-bold text-gray-900">₹{(item.price * item.quantity).toFixed(2)}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Shipping details */}
                                    <div className="bg-gray-50/50 rounded-xl p-4 border border-gray-100/50 flex flex-col justify-between">
                                        <div>
                                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                                                <MapPin className="w-3.5 h-3.5 text-orange-400" />
                                                Shipping Address
                                            </h4>
                                            <p className="text-sm text-gray-600 whitespace-pre-wrap leading-relaxed">
                                                {order.shippingAddress}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Actions toolbar */}
                                <div className="flex flex-wrap gap-3 items-center border-t border-gray-50 pt-4">
                                    {order.orderStatus === 'processing' && (
                                        <Button 
                                            size="sm" 
                                            onClick={() => handleUpdateStatus(order.id, 'shipped', order.paymentStatus)} 
                                            disabled={actionLoadingId === order.id}
                                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md shadow-blue-500/10 gap-1.5"
                                        >
                                            <Truck className="w-4 h-4" /> Mark Shipped
                                        </Button>
                                    )}
                                    {order.orderStatus === 'shipped' && (
                                        <Button 
                                            size="sm" 
                                            onClick={() => handleUpdateStatus(order.id, 'delivered', 'completed')} 
                                            disabled={actionLoadingId === order.id}
                                            className="bg-green-600 hover:bg-green-700 text-white font-semibold shadow-md shadow-green-500/10 gap-1.5"
                                        >
                                            <CheckCircle className="w-4 h-4" /> Mark Delivered
                                        </Button>
                                    )}
                                    {order.orderStatus !== 'cancelled' && order.orderStatus !== 'delivered' && (
                                        <Button 
                                            size="sm" 
                                            variant="outline" 
                                            onClick={() => handleUpdateStatus(order.id, 'cancelled', order.paymentStatus)} 
                                            disabled={actionLoadingId === order.id}
                                            className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200 gap-1.5 font-semibold"
                                        >
                                            <XCircle className="w-4 h-4" /> Cancel Order
                                        </Button>
                                    )}
                                    <div className="flex-1"></div>
                                    <Button 
                                        size="sm" 
                                        variant="ghost" 
                                        onClick={() => handleDeleteOrder(order.id)} 
                                        disabled={actionLoadingId === order.id}
                                        className="text-gray-400 hover:text-red-600 hover:bg-red-50 gap-1.5 font-semibold"
                                    >
                                        Delete Record
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
