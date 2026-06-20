import { useState, useEffect } from 'react';
import { getAdminQuotes, getAdminContacts, updateQuoteStatus, deleteQuote, updateContact, deleteContact } from '@/lib/api.js';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RefreshCw, Check, AlertTriangle, Trash2, Mail, Phone, MessageSquare, ShieldCheck, User } from 'lucide-react';

export default function InquiryTab() {
    const [quotes, setQuotes] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => { loadData(); }, []);

    const loadData = async () => {
        setLoading(true);
        try {
            const [qRes, cRes] = await Promise.all([getAdminQuotes(), getAdminContacts()]);
            setQuotes(qRes.data || []); 
            setContacts(cRes.data || []);
        } catch (error) {
            console.error('Load inquires error:', error);
        }
        setLoading(false);
    };

    const actionWrapper = async (actionFn) => { 
        await actionFn(); 
        loadData(); 
    };

    return (
        <div className="space-y-8">
            {/* Header section */}
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                        <MessageSquare className="w-6 h-6 text-orange-500" />
                        Inquiries & Quotes
                    </h2>
                    <p className="text-sm text-gray-500">Review quote requests from the product page and customer contact messages.</p>
                </div>
                <Button onClick={loadData} variant="outline" size="sm" className="self-start sm:self-auto gap-2">
                    <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                    Refresh All Inquiries
                </Button>
            </div>

            {loading ? (
                <div className="flex justify-center items-center py-20 bg-white border border-gray-100 rounded-2xl shadow-sm">
                    <RefreshCw className="w-8 h-8 animate-spin text-orange-500" />
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Quotes Column */}
                    <Card className="border border-gray-100 shadow-sm overflow-hidden">
                        <CardHeader className="bg-gray-50/50 border-b border-gray-100">
                            <CardTitle className="text-lg font-bold text-gray-900">Quotes ({quotes.length})</CardTitle>
                            <CardDescription>Product customization requirements submitted by buyers.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4 p-6">
                            {quotes.length === 0 ? (
                                <p className="text-center text-sm text-gray-500 py-12">No quote requests found.</p>
                            ) : (
                                quotes.map((q) => {
                                    const isConfirmed = q.status === 'confirmed';
                                    const isRejected = q.status === 'rejected';
                                    const isPending = !isConfirmed && !isRejected;

                                    let cardClass = 'border-gray-200';
                                    if (isConfirmed) cardClass = 'border-green-300 bg-green-50/30 dark:border-green-900/30 dark:bg-green-950/10 shadow-sm';
                                    else if (isRejected) cardClass = 'border-red-300 bg-red-50/30 dark:border-red-900/30 dark:bg-red-950/10 shadow-sm';
                                    else if (isPending) cardClass = 'border-yellow-300 bg-yellow-50/30 dark:border-yellow-900/30 dark:bg-yellow-950/10 shadow-sm';

                                    return (
                                        <div key={q.id} className={`border rounded-xl p-5 transition-all duration-200 ${cardClass}`}>
                                            <div className="flex justify-between items-start mb-3 gap-2">
                                                <div className="space-y-0.5">
                                                    <h3 className="font-bold text-gray-900 flex items-center gap-1.5">
                                                        <User className="w-4 h-4 text-gray-400" />
                                                        {q.name}
                                                    </h3>
                                                    <div className="text-xs text-gray-500 space-y-1">
                                                        <p className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> {q.email}</p>
                                                        <p className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> {q.phone}</p>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col items-end gap-1.5">
                                                    <Badge className={`${q.verified ? 'bg-orange-100 text-orange-800 hover:bg-orange-100' : 'bg-gray-100 text-gray-800'} font-semibold border-none text-[10px] py-0.5 px-2`}>
                                                        OTP: {q.verified ? 'Verified' : 'Pending'}
                                                    </Badge>
                                                    {isConfirmed && (
                                                        <Badge className="bg-green-600 hover:bg-green-700 text-white font-bold border-none text-[10px] py-0.5 px-2">Confirmed</Badge>
                                                    )}
                                                    {isRejected && (
                                                        <Badge className="bg-red-600 hover:bg-red-700 text-white font-bold border-none text-[10px] py-0.5 px-2">Rejected</Badge>
                                                    )}
                                                    {isPending && (
                                                        <Badge className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold border-none text-[10px] py-0.5 px-2">Pending</Badge>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Details parameters if present */}
                                            <div className="bg-white/80 dark:bg-gray-900/60 p-3 rounded-lg border border-gray-100 text-xs space-y-1.5 my-3 shadow-inner">
                                                <div className="font-medium text-gray-500 uppercase tracking-wider text-[9px] mb-1">Quote Details</div>
                                                <p className="text-gray-800"><span className="font-bold">Message:</span> {q.message}</p>
                                                {(q.quantity || q.capacity || q.materials?.length > 0 || q.color || q.details) && (
                                                    <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 pt-1.5 border-t border-gray-50">
                                                        {q.quantity && <p className="text-gray-700"><span className="font-semibold text-gray-500">Qty:</span> {q.quantity} pcs</p>}
                                                        {q.capacity && <p className="text-gray-700"><span className="font-semibold text-gray-500">Capacity:</span> {q.capacity}</p>}
                                                        {q.materials?.length > 0 && <p className="text-gray-700 col-span-2"><span className="font-semibold text-gray-500">Material:</span> {q.materials.join(', ')}</p>}
                                                        {q.color && <p className="text-gray-700"><span className="font-semibold text-gray-500">Color:</span> {q.color}</p>}
                                                        {q.details && <p className="text-gray-700 col-span-2 leading-relaxed mt-1"><span className="font-semibold text-gray-500">Specifics:</span> {q.details}</p>}
                                                    </div>
                                                )}
                                            </div>

                                            <div className="flex gap-2 items-center">
                                                {isPending && (
                                                    <>
                                                        <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white font-semibold flex items-center gap-1" onClick={() => actionWrapper(() => updateQuoteStatus(q.id, 'confirmed'))}>
                                                            <Check className="w-3.5 h-3.5" /> Confirm
                                                        </Button>
                                                        <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 font-semibold flex items-center gap-1" onClick={() => actionWrapper(() => updateQuoteStatus(q.id, 'rejected'))}>
                                                            <AlertTriangle className="w-3.5 h-3.5" /> Reject
                                                        </Button>
                                                    </>
                                                )}
                                                <div className="flex-1"></div>
                                                <Button size="sm" variant="ghost" className="text-gray-400 hover:text-red-600 hover:bg-red-50" onClick={() => { if(confirm('Delete this quote record?')) actionWrapper(() => deleteQuote(q.id))}}>
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </CardContent>
                    </Card>

                    {/* Contacts Column */}
                    <Card className="border border-gray-100 shadow-sm overflow-hidden">
                        <CardHeader className="bg-gray-50/50 border-b border-gray-100">
                            <CardTitle className="text-lg font-bold text-gray-900">Contacts ({contacts.length})</CardTitle>
                            <CardDescription>Messages from customer inquiry contact forms.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4 p-6">
                            {contacts.length === 0 ? (
                                <p className="text-center text-sm text-gray-500 py-12">No contact inquiries found.</p>
                            ) : (
                                contacts.map((c) => {
                                    const isVerified = c.verified;
                                    let cardClass = isVerified 
                                        ? 'border-green-300 bg-green-50/30 dark:border-green-900/30 dark:bg-green-950/10 shadow-sm' 
                                        : 'border-yellow-300 bg-yellow-50/30 dark:border-yellow-900/30 dark:bg-yellow-950/10 shadow-sm';

                                    return (
                                        <div key={c.id} className={`border rounded-xl p-5 transition-all duration-200 ${cardClass}`}>
                                            <div className="flex justify-between items-start mb-3 gap-2">
                                                <div className="space-y-0.5">
                                                    <h3 className="font-bold text-gray-900 flex items-center gap-1.5">
                                                        <User className="w-4 h-4 text-gray-400" />
                                                        {c.name}
                                                    </h3>
                                                    <div className="text-xs text-gray-500 space-y-1">
                                                        <p className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> {c.email}</p>
                                                        <p className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> {c.phone}</p>
                                                    </div>
                                                </div>
                                                <div>
                                                    {isVerified ? (
                                                        <Badge className="bg-green-600 text-white border-none font-semibold text-[10px] py-0.5 px-2">Verified</Badge>
                                                    ) : (
                                                        <Badge className="bg-yellow-600 text-white border-none font-semibold text-[10px] py-0.5 px-2">Pending</Badge>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="bg-white/80 dark:bg-gray-900/60 p-3 rounded-lg border border-gray-100 text-xs my-3 shadow-inner">
                                                <p className="text-gray-900 font-semibold mb-1"><span className="font-bold text-gray-400 uppercase tracking-wider text-[9px] block">Subject</span> {c.subject}</p>
                                                <p className="text-gray-700 leading-relaxed"><span className="font-bold text-gray-400 uppercase tracking-wider text-[9px] block mt-2">Message</span> {c.message}</p>
                                            </div>

                                            <div className="flex gap-2 items-center">
                                                {!isVerified && (
                                                    <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white font-semibold flex items-center gap-1" onClick={() => actionWrapper(() => updateContact(c.id, { verified: true }))}>
                                                        <ShieldCheck className="w-3.5 h-3.5" /> Verify Inquiry
                                                    </Button>
                                                )}
                                                <div className="flex-1"></div>
                                                <Button size="sm" variant="ghost" className="text-gray-400 hover:text-red-600 hover:bg-red-50" onClick={() => { if(confirm('Delete this contact inquiry?')) actionWrapper(() => deleteContact(c.id))}}>
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}
