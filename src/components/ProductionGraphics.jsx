export function ProductionGraphics() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Machine Graphic */}
            <div className="relative group p-8 bg-gradient-to-br from-slate-50 to-slate-100 rounded-3xl border border-slate-200 hover:shadow-2xl hover:border-blue-300 transition-all duration-500 cursor-pointer">
                <svg viewBox="0 0 400 300" className="w-full h-64">
                    {/* Machine Body */}
                    <rect x="50" y="100" width="300" height="150" rx="10" fill="#374151" stroke="#1f2937" strokeWidth="3" />
                    <rect x="60" y="110" width="280" height="130" rx="8" fill="#4b5563" stroke="#2d3748" strokeWidth="2" />

                    {/* Hopper */}
                    <path d="M120 80 L200 50 L280 80 L260 100 L140 100 Z" fill="#6b7280" stroke="#4a5568" strokeWidth="2" />

                    {/* Control Panel */}
                    <rect x="70" y="120" width="100" height="60" rx="8" fill="#1a202c" />
                    <rect x="80" y="130" width="15" height="15" fill="#48bb78" />
                    <rect x="100" y="130" width="15" height="15" fill="#ed8936" />
                    <rect x="120" y="130" width="15" height="15" fill="#f56565" />

                    {/* Mold */}
                    <rect x="170" y="150" width="60" height="80" rx="5" fill="#a0aec0" />
                    <circle cx="200" cy="165" r="12" fill="#718096" />

                    {/* Bottles in production */}
                    <g transform="translate(190, 200)">
                        <ellipse cx="0" cy="0" rx="8" ry="25" fill="#4299e1" stroke="#3182ce" strokeWidth="1.5" />
                        <ellipse cx="0" cy="-5" rx="5" ry="8" fill="#bee3f8" />
                    </g>

                    {/* Steam */}
                    <circle cx="200" cy="110" r="20" fill="none" stroke="url(#steamGrad)" strokeWidth="3" strokeLinecap="round" opacity="0.6">
                        <animate attributeName="stroke-dasharray" values="0,100;100,0" dur="3s" repeatCount="indefinite" />
                    </circle>

                    <defs>
                        <radialGradient id="steamGrad" cx="50%" cy="50%">
                            <stop offset="0%" stopColor="rgba(255,255,255,0.8)" />
                            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                        </radialGradient>
                    </defs>
                </svg>
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl flex items-end p-6">
                    <div className="bg-white/95 backdrop-blur-xl px-4 py-2 rounded-xl text-xs font-bold text-primary">
                        INJECTION MOLDING
                    </div>
                </div>
            </div>

            {/* Bottle Line */}
            <div className="relative group p-8 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-3xl border border-emerald-200 hover:shadow-2xl hover:border-blue-300 transition-all duration-500 cursor-pointer">
                <svg viewBox="0 0 400 300" className="w-full h-64">
                    {/* Conveyor */}
                    <rect x="20" y="220" width="360" height="40" rx="20" fill="#4a5568" stroke="#2d3748" strokeWidth="4" />

                    {/* Bottles on conveyor */}
                    {Array.from({ length: 8 }).map((_, i) => (
                        <g key={i} transform={`translate(${60 + i * 45}, 240)`}>
                            <ellipse cx="0" cy="0" rx="10" ry="30" fill={`hsl(${220 + i * 10}, 70%, 60%)`} stroke="#3182ce" strokeWidth="1.5" />
                            <ellipse cx="3" cy="-8" rx="6" ry="12" fill="rgba(255,255,255,0.6)" />
                            <circle cx="12" cy="-5" r="2" fill="rgba(255,255,255,0.8)" />
                        </g>
                    ))}

                    {/* Conveyor rollers */}
                    {Array.from({ length: 5 }).map((_, i) => (
                        <circle key={i} cx={50 + i * 80} cy="250" r="12" fill="#2d3748" stroke="#1a202c" strokeWidth="3" />
                    ))}
                </svg>
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl flex items-end p-6">
                    <div className="bg-white/95 backdrop-blur-xl px-4 py-2 rounded-xl text-xs font-bold text-emerald-700">
                        CONVEYOR LINE
                    </div>
                </div>
            </div>

            {/* Quality Control */}
            <div className="relative group p-8 xl:col-span-2 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl border border-blue-200 hover:shadow-2xl hover:border-primary transition-all duration-500 cursor-pointer">
                <svg viewBox="0 0 800 300" className="w-full h-64">
                    {/* Inspection conveyor */}
                    <rect x="50" y="200" width="700" height="50" rx="25" fill="#f7fafc" stroke="#e2e8f0" strokeWidth="4" />

                    {/* Scanner */}
                    <rect x="300" y="80" width="200" height="100" rx="15" fill="#2d3748" />
                    <rect x="320" y="100" width="160" height="60" rx="8" fill="#1a202c" />
                    <rect x="340" y="110" width="20" height="20" fill="#48bb78" />
                    <rect x="380" y="110" width="20" height="20" fill="#f56565" />
                    <rect x="420" y="110" width="20" height="20" fill="#ed8936" />

                    {/* Laser scan line */}
                    <defs>
                        <linearGradient id="laserGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#3b82f6" />
                            <stop offset="50%" stopColor="#1e40af" />
                            <stop offset="100%" stopColor="#3b82f6" />
                        </linearGradient>
                    </defs>
                    <rect x="300" y="105" width="200" height="2" fill="url(#laserGrad)" opacity="0.8">
                        <animate attributeName="opacity" values="0.8;0.2;0.8" dur="1.5s" repeatCount="indefinite" />
                        <animateTransform attributeName="transform" type="translate" values="0,0; 0,5; 0,0" dur="0.5s" repeatCount="indefinite" />
                    </rect>

                    {/* Bottles being scanned */}
                    {Array.from({ length: 12 }).map((_, i) => {
                        const x = 80 + i * 55;
                        return (
                            <g key={i} transform={`translate(${x}, 225)`}>
                                <ellipse cx="0" cy="0" rx="12" ry="35" fill={`hsl(${i * 20}, 70%, 65%)`} stroke="#374151" strokeWidth="1" />
                                <ellipse cx="4" cy="-12" rx="7" ry="15" fill="rgba(255,255,255,0.5)" />
                            </g>
                        );
                    })}
                </svg>
                <div className="absolute inset-0 bg-gradient-to-t from-blue-500/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl flex items-end p-6">
                    <div className="bg-white/95 backdrop-blur-xl px-6 py-3 rounded-2xl text-sm font-bold text-blue-700 shadow-lg">
                        AI QUALITY CONTROL SCANNER
                    </div>
                </div>
            </div>
        </div>
    );
}

