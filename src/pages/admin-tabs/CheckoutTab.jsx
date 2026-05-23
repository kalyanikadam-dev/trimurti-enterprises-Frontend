import { useState, useEffect } from 'react';
import { getAdminOrders, updateOrderStatus, deleteOrder } from '@/lib/api.js';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RefreshCw, Package, Truck, CheckCircle, XCircle } from 'lucide-react';

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

    const formatDate = (dateStr) => new Date(dateStr).toLocaleString('en-IN');

    const getStatusColor = (status) => {
        switch(status) {
            case 'processing': return 'bg-yellow-500';
            case 'shipped': return 'bg-blue-500';
            case 'delivered': return 'bg-green-500';
            case 'cancelled': return 'bg-red-500';
            default: return 'bg-gray-500';
        }
    };

    const getPaymentColor = (status) => {
        switch(status) {
            case 'pending': return 'bg-yellow-500';
            case 'completed': return 'bg-green-500';
            case 'failed': return 'bg-red-500';
            default: return 'bg-gray-500';
        }
    };

    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between items-center">
                    <CardTitle className="text-2xl font-bold flex items-center gap-2">
                        <Package className="w-6 h-6 text-orange-500" />
                        Cart / Checkout Orders
                    </CardTitle>
                    <Button onClick={loadData} variant="outline" size="sm">
                        <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                        Refresh Orders
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                {loading ? (
                    <div className="flex justify-center items-center py-12">
                        <RefreshCw className="w-8 h-8 animate-spin text-orange-500" />
                    </div>
                ) : orders.length === 0 ? (
                    <div className="text-center py-16 text-muted-foreground bg-gray-50 rounded-lg border border-dashed border-gray-200">
                        <Package className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                        <p className="text-lg font-medium text-gray-900 mb-2">No orders yet</p>
                        <p className="text-sm">When customers checkout, their orders will appear here.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {orders.map((order) => (
                            <div key={order.id} className="border border-gray-200 rounded-xl p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex flex-col md:flex-row justify-between md:items-start mb-4 gap-4">
                                    <div>
                                        <div className="flex items-center gap-3 mb-1">
                                            <h3 className="text-lg font-bold text-gray-900">{order.customerName}</h3>
                                            <Badge className={`${getStatusColor(order.orderStatus)} text-white border-none capitalize`}>
                                                {order.orderStatus}
                                            </Badge>
                                        </div>
                                        <div className="text-sm text-gray-500 flex flex-wrap gap-x-4 gap-y-1">
                                            <span>{order.email}</span>
                                            <span>•</span>
                                            <span>{order.phone}</span>
                                            <span>•</span>
                                            <span>{formatDate(order.createdAt)}</span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-xl font-bold text-gray-900 mb-1">
                                            ₹{order.totalAmount.toFixed(2)}
                                        </div>
                                        <div className="flex items-center gap-2 justify-end">
                                            <span className="text-xs font-medium uppercase tracking-wider text-gray-500">
                                                {order.paymentMethod.replace(/_/g, ' ')}
                                            </span>
                                            <Badge className={`${getPaymentColor(order.paymentStatus)} text-white border-none capitalize text-xs`}>
                                                {order.paymentStatus}
                                            </Badge>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                                    <h4 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wider">Order Items</h4>
                                    <div className="space-y-2">
                                        {order.products.map((item, idx) => (
                                            <div key={idx} className="flex justify-between items-center text-sm">
                                                <div className="flex items-center gap-2">
                                                    <span className="w-6 h-6 bg-white rounded flex items-center justify-center text-xs font-medium border border-gray-200">
                                                        {item.quantity}x
                                                    </span>
                                                    <span className="text-gray-700">{item.name || 'Product'}</span>
                                                </div>
                                                <span className="font-medium text-gray-900">₹{(item.price * item.quantity).toFixed(2)}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-4 pt-3 border-t border-gray-200">
                                        <h4 className="text-sm font-semibold text-gray-900 mb-1">Shipping Address</h4>
                                        <p className="text-sm text-gray-600 whitespace-pre-wrap">{order.shippingAddress}</p>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2 items-center pt-2">
                                    {order.orderStatus === 'processing' && (
                                        <Button 
                                            size="sm" 
                                            onClick={() => handleUpdateStatus(order.id, 'shipped', order.paymentStatus)} 
                                            disabled={actionLoadingId === order.id}
                                            className="bg-blue-600 hover:bg-blue-700"
                                        >
                                            <Truck className="w-4 h-4 mr-2" /> Mark Shipped
                                        </Button>
                                    )}
                                    {order.orderStatus === 'shipped' && (
                                        <Button 
                                            size="sm" 
                                            onClick={() => handleUpdateStatus(order.id, 'delivered', 'completed')} 
                                            disabled={actionLoadingId === order.id}
                                            className="bg-green-600 hover:bg-green-700"
                                        >
                                            <CheckCircle className="w-4 h-4 mr-2" /> Mark Delivered
                                        </Button>
                                    )}
                                    {order.orderStatus !== 'cancelled' && order.orderStatus !== 'delivered' && (
                                        <Button 
                                            size="sm" 
                                            variant="outline" 
                                            onClick={() => handleUpdateStatus(order.id, 'cancelled', order.paymentStatus)} 
                                            disabled={actionLoadingId === order.id}
                                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                        >
                                            <XCircle className="w-4 h-4 mr-2" /> Cancel Order
                                        </Button>
                                    )}
                                    <div className="flex-1"></div>
                                    <Button 
                                        size="sm" 
                                        variant="ghost" 
                                        onClick={() => handleDeleteOrder(order.id)} 
                                        disabled={actionLoadingId === order.id}
                                        className="text-gray-500 hover:text-red-600 hover:bg-red-50"
                                    >
                                        Delete Record
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
