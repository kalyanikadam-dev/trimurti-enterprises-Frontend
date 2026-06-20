import { useState, useEffect } from 'react';
import { getProductsAdmin, createProduct, updateProduct, deleteProduct } from '@/lib/api.js';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { RefreshCw, Package, Trash2, Edit3, Plus, X } from 'lucide-react';

export default function ProductTab() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [productForm, setProductForm] = useState({ name: '', description: '', price: '', category: 'bottle', images: [] });
    const [formLoading, setFormLoading] = useState(false);
    const [editingProductId, setEditingProductId] = useState(null);
    const [deletingProductId, setDeletingProductId] = useState(null);

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        const promises = files.map((file) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = (error) => reject(error);
            });
        });
        Promise.all(promises).then((base64Files) => {
            setProductForm({ ...productForm, images: [...(productForm.images || []), ...base64Files] });
        });
    };

    const removeImage = (index) => {
        const newImages = [...productForm.images];
        newImages.splice(index, 1);
        setProductForm({ ...productForm, images: newImages });
    };

    useEffect(() => { loadData(); }, []);

    const loadData = async () => {
        setLoading(true);
        try {
            const productsRes = await getProductsAdmin();
            setProducts(productsRes.data || []);
        } catch (error) { 
            console.error('Load error:', error); 
        }
        setLoading(false);
    };

    const handleSubmitProduct = async (e) => {
        e.preventDefault();
        setFormLoading(true);
        try {
            const data = {
                ...productForm,
                price: Number(productForm.price),
                images: productForm.images,
            };
            if (editingProductId) {
                await updateProduct(editingProductId, data);
                setEditingProductId(null);
            } else { 
                await createProduct(data); 
            }
            setProductForm({ name: '', description: '', price: '', category: 'bottle', images: [] });
            loadData();
        } catch (error) { 
            alert('Error saving product'); 
        } finally { 
            setFormLoading(false); 
        }
    };

    return (
        <div className="space-y-8">
            {/* Header section */}
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                        <Package className="w-6 h-6 text-orange-500" />
                        Manage Products
                    </h2>
                    <p className="text-sm text-gray-500">Create, edit, or delete products displayed in the catalog.</p>
                </div>
                <Button onClick={loadData} variant="outline" size="sm" className="self-start sm:self-auto gap-2">
                    <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                    Refresh List
                </Button>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Form Card (1 Column wide on extra large screens) */}
                <div className="xl:col-span-1">
                    <Card className="border border-gray-100 shadow-sm sticky top-24">
                        <CardHeader>
                            <CardTitle className="text-lg font-bold">
                                {editingProductId ? 'Edit Product' : 'Add New Product'}
                            </CardTitle>
                            <CardDescription>
                                {editingProductId ? 'Modify product details and images.' : 'Fill details to add a product to the catalog.'}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmitProduct} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Product Name</label>
                                    <Input 
                                        value={productForm.name} 
                                        onChange={(e) => setProductForm({ ...productForm, name: e.target.value })} 
                                        placeholder="e.g. Premium Glass Bottle 500ml" 
                                        required 
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Description</label>
                                    <textarea 
                                        value={productForm.description} 
                                        onChange={(e) => setProductForm({ ...productForm, description: e.target.value })} 
                                        rows={3} 
                                        placeholder="Describe the product material, design, uses..."
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-shadow" 
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Price (₹)</label>
                                        <Input 
                                            type="number" 
                                            value={productForm.price} 
                                            onChange={(e) => setProductForm({ ...productForm, price: e.target.value })} 
                                            placeholder="Price" 
                                            required 
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Category</label>
                                        <Input 
                                            value={productForm.category} 
                                            onChange={(e) => setProductForm({ ...productForm, category: e.target.value })} 
                                            placeholder="e.g. bottle" 
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Product Images</label>
                                    <Input type="file" accept="image/*" multiple onChange={handleImageUpload} className="cursor-pointer" />
                                    {productForm.images && productForm.images.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mt-3 p-2 bg-gray-50 rounded-lg border border-dashed">
                                            {productForm.images.map((img, idx) => (
                                                <div key={idx} className="relative group w-14 h-14 border rounded-md overflow-hidden bg-white">
                                                    <img src={img} alt="preview" className="w-full h-full object-cover" />
                                                    <button 
                                                        type="button" 
                                                        onClick={() => removeImage(idx)} 
                                                        className="absolute top-0.5 right-0.5 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center shadow hover:bg-red-600 transition-colors"
                                                    >
                                                        <X className="w-2.5 h-2.5" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div className="flex flex-col gap-2 pt-2">
                                    <Button type="submit" disabled={formLoading} className="bg-orange-500 hover:bg-orange-600 text-white shadow-md shadow-orange-500/10">
                                        {formLoading ? (
                                            <span className="flex items-center gap-2">
                                                <RefreshCw className="w-4 h-4 animate-spin" />
                                                Saving...
                                            </span>
                                        ) : editingProductId ? (
                                            <span className="flex items-center gap-1.5"><Edit3 className="w-4 h-4" /> Update Product</span>
                                        ) : (
                                            <span className="flex items-center gap-1.5"><Plus className="w-4 h-4" /> Add Product</span>
                                        )}
                                    </Button>
                                    {editingProductId && (
                                        <Button 
                                            type="button" 
                                            variant="outline" 
                                            onClick={() => {
                                                setEditingProductId(null);
                                                setProductForm({ name: '', description: '', price: '', category: 'bottle', images: [] });
                                            }}
                                        >
                                            Cancel Edit
                                        </Button>
                                    )}
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>

                {/* List View (2 Columns wide on extra large screens) */}
                <div className="xl:col-span-2 space-y-4">
                    {loading ? (
                        <div className="flex justify-center items-center py-20 bg-white border border-gray-100 rounded-2xl shadow-sm">
                            <RefreshCw className="w-8 h-8 animate-spin text-orange-500" />
                        </div>
                    ) : products.length === 0 ? (
                        <div className="text-center py-20 bg-white border border-gray-100 border-dashed rounded-2xl text-gray-500">
                            <Package className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                            <p className="text-lg font-medium text-gray-900">No products found</p>
                            <p className="text-sm">Use the form to add your first product.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {products.map((product) => (
                                <Card key={product.id} className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col justify-between">
                                    <div>
                                        {/* Product image at top */}
                                        <div className="h-48 w-full bg-gray-50 border-b relative">
                                            {product.images?.[0] ? (
                                                <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-300">
                                                    <Package className="w-10 h-10" />
                                                </div>
                                            )}
                                            <Badge className="absolute top-3 right-3 bg-white text-orange-600 hover:bg-white/95 border border-orange-100 font-bold px-2.5 py-1 text-sm shadow">
                                                ₹{product.price}
                                            </Badge>
                                        </div>
                                        <CardHeader className="p-4 pb-1">
                                            <div className="flex justify-between items-start gap-2">
                                                <h3 className="font-bold text-base text-gray-900 line-clamp-1">{product.name}</h3>
                                            </div>
                                            <div className="flex gap-1.5 mt-1">
                                                <Badge variant="secondary" className="text-[10px] uppercase font-bold tracking-wider text-gray-500 py-0.5 px-2">
                                                    {product.category}
                                                </Badge>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="p-4 pt-1 pb-4">
                                            <p className="text-xs text-gray-500 line-clamp-3 min-h-[48px]">
                                                {product.description || 'No description provided.'}
                                            </p>
                                        </CardContent>
                                    </div>
                                    <div className="p-4 pt-0 border-t border-gray-50 flex gap-2 mt-auto">
                                        <Button 
                                            size="sm" 
                                            variant="outline"
                                            className="flex-1 gap-1.5 text-gray-700 hover:bg-gray-50 text-xs font-semibold"
                                            onClick={() => {
                                                setEditingProductId(product.id);
                                                setProductForm({ 
                                                    name: product.name, 
                                                    description: product.description || '', 
                                                    price: product.price, 
                                                    category: product.category || 'bottle', 
                                                    images: product.images || [] 
                                                });
                                            }}
                                        >
                                            <Edit3 className="w-3.5 h-3.5" />
                                            Edit
                                        </Button>
                                        <Button 
                                            size="sm" 
                                            variant="destructive"
                                            className="flex-1 gap-1.5 text-xs font-semibold"
                                            onClick={async () => {
                                                if (!confirm('Are you sure you want to delete this product?')) return;
                                                setDeletingProductId(product.id);
                                                await deleteProduct(product.id);
                                                loadData();
                                                setDeletingProductId(null);
                                            }} 
                                            disabled={deletingProductId === product.id}
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                            Delete
                                        </Button>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
