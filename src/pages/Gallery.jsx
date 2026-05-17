// Stub
export default function Gallery() {
    return (
        <div className="py-20 px-4">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold mb-12">Gallery</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {Array(9).fill(0).map((_, i) => (
                        <div key={i} className="aspect-square bg-gradient-to-br from-primary/20 rounded-lg flex items-center justify-center text-6xl">
                            🏭
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

