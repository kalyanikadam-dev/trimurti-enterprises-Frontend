import { useState, useEffect } from 'react';
import { getProductsAdmin, createProduct, updateProduct, deleteProduct } from '@/lib/api.js';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { RefreshCw } from 'lucide-react';

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
        } catch (error) { console.error('Load error:', error); }
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
            } else { await createProduct(data); }
            setProductForm({ name: '', description: '', price: '', category: 'bottle', images: [] });
            loadData();
        } catch (error) { alert('Error saving product'); }
        finally { setFormLoading(false); }
    };

    const formatDate = (dateStr) => new Date(dateStr).toLocaleString('en-IN');

    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between items-center">
                    <CardTitle>Manage Products ({products.length})</CardTitle>
                    <Button onClick={loadData} variant="outline" size="sm">
                        <RefreshCw className="w-4 h-4 mr-1" />
                        Refresh
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <form onSubmit={handleSubmitProduct} className="space-y-4 p-4 border rounded-lg bg-muted/50">
                    <div>
                        <label className="block text-sm font-medium mb-1">Product Name</label>
                        <Input value={productForm.name} onChange={(e) => setProductForm({ ...productForm, name: e.target.value })} required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <textarea value={productForm.description} onChange={(e) => setProductForm({ ...productForm, description: e.target.value })} rows={3} className="w-full p-3 border rounded-md" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Price ($)</label>
                            <Input type="number" value={productForm.price} onChange={(e) => setProductForm({ ...productForm, price: e.target.value })} required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Category</label>
                            <Input value={productForm.category} onChange={(e) => setProductForm({ ...productForm, category: e.target.value })} />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Product Images</label>
                        <Input type="file" accept="image/*" multiple onChange={handleImageUpload} className="mb-2" />
                        {productForm.images && productForm.images.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-2">
                                {productForm.images.map((img, idx) => (
                                    <div key={idx} className="relative">
                                        <img src={img} alt="preview" className="w-16 h-16 object-cover rounded" />
                                        <button type="button" onClick={() => removeImage(idx)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">x</button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <Button type="submit" className="w-full" disabled={formLoading}>
                        {formLoading ? (editingProductId ? 'Updating...' : 'Adding...') : (editingProductId ? 'Update Product' : 'Add Product')}
                    </Button>
                    {editingProductId && (
                        <Button type="button" variant="outline" className="w-full" onClick={() => {
                            setEditingProductId(null);
                            setProductForm({ name: '', description: '', price: '', category: 'bottle', images: [] });
                        }}>Cancel Edit</Button>
                    )}
                </form>

                {loading ? <p>Loading...</p> : products.length === 0 ? <p className="text-center py-12">No products.</p> : (
                    <div className="space-y-3">
                        {products.map((product) => (
                            <div key={product.id} className="border rounded-lg p-4 hover:shadow-md">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-semibold">{product.name}</h3>
                                    <Badge>${product.price}</Badge>
                                </div>
                                <p className="text-sm text-muted-foreground mb-2">{product.description?.substring(0, 100)}...</p>
                                <Badge variant="outline">{product.category}</Badge>
                                {product.images?.[0] && <img src={product.images[0]} alt={product.name} className="w-20 h-20 object-cover rounded mt-2" />}
                                <div className="flex gap-2 mt-3">
                                    <Button size="sm" onClick={() => {
                                        setEditingProductId(product.id);
                                        setProductForm({ name: product.name, description: product.description, price: product.price, category: product.category, images: product.images || [] });
                                    }}>Edit</Button>
                                    <Button size="sm" variant="destructive" onClick={async () => {
                                        if (!confirm('Delete product?')) return;
                                        setDeletingProductId(product.id);
                                        await deleteProduct(product.id);
                                        loadData();
                                        setDeletingProductId(null);
                                    }} disabled={deletingProductId === product.id}>Delete</Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
