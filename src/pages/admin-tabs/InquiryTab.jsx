import { useState, useEffect } from 'react';
import { getAdminQuotes, getAdminContacts, updateQuoteStatus, deleteQuote, updateContact, deleteContact } from '@/lib/api.js';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RefreshCw } from 'lucide-react';

export default function InquiryTab() {
    const [quotes, setQuotes] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => { loadData(); }, []);

    const loadData = async () => {
        setLoading(true);
        const [qRes, cRes] = await Promise.all([getAdminQuotes(), getAdminContacts()]);
        setQuotes(qRes.data || []); setContacts(cRes.data || []);
        setLoading(false);
    };

    const actionWrapper = async (actionFn) => { await actionFn(); loadData(); };

    return (
        <div className="space-y-8">
            <div className="flex justify-end">
                <Button onClick={loadData} variant="outline" size="sm">
                    <RefreshCw className="w-4 h-4 mr-1" /> Refresh All Inquiries
                </Button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                    <CardHeader><CardTitle>Quotes ({quotes.length})</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        {quotes.map((q) => (
                            <div key={q._id} className="border rounded-lg p-4">
                                <div className="flex justify-between"><h3 className="font-semibold">{q.name}</h3><Badge>{q.verified ? 'Verified' : 'Pending'}</Badge></div>
                                <p className="text-sm">{q.email} | {q.phone}</p>
                                <p className="text-xs bg-muted p-2 mt-2">{q.message}</p>
                                <div className="flex gap-2 mt-2">
                                    <Button size="sm" onClick={() => actionWrapper(() => updateQuoteStatus(q._id, 'confirmed'))}>Confirm</Button>
                                    <Button size="sm" variant="destructive" onClick={() => { if(confirm('Delete?')) actionWrapper(() => deleteQuote(q._id))}}>Delete</Button>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader><CardTitle>Contacts ({contacts.length})</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        {contacts.map((c) => (
                            <div key={c._id} className="border rounded-lg p-4">
                                <div className="flex justify-between"><h3 className="font-semibold">{c.name}</h3><Badge>{c.verified ? 'Verified' : 'Pending'}</Badge></div>
                                <p className="text-sm">{c.email} | {c.phone}</p>
                                <p className="text-xs bg-muted p-2 mt-2">{c.subject}: {c.message}</p>
                                <div className="flex gap-2 mt-2">
                                    <Button size="sm" onClick={() => actionWrapper(() => updateContact(c._id, { verified: true }))}>Verify</Button>
                                    <Button size="sm" variant="destructive" onClick={() => { if(confirm('Delete?')) actionWrapper(() => deleteContact(c._id))}}>Delete</Button>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
