import { useEffect, useRef, useState } from 'react';

export function BottleProductionAnimation() {
    const canvasRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let time = 0;
        let phase = 0;

        const resizeCanvas = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        const machine = {
            x: canvas.width * 0.2,
            y: canvas.height * 0.6,
            width: canvas.width * 0.6,
            height: canvas.height * 0.3
        };

        const drawMachine = () => {
            // Machine body
            ctx.fillStyle = '#2d3748';
            ctx.fillRect(machine.x, machine.y, machine.width, machine.height);

            // Machine details
            ctx.fillStyle = '#4a5568';
            ctx.fillRect(machine.x + 10, machine.y + 10, machine.width - 20, machine.height - 20);

            // Mold
            ctx.fillStyle = '#718096';
            ctx.fillRect(machine.x + machine.width * 0.3, machine.y + 20, machine.width * 0.4, machine.height - 60);

            // Lights
            const lights = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24'];
            lights.forEach((color, i) => {
                ctx.fillStyle = color;
                ctx.beginPath();
                ctx.arc(machine.x + 30 + i * 40, machine.y + 10, 8, 0, Math.PI * 2);
                ctx.fill();
            });
        };

        const drawPlasticPellets = () => {
            const pellets = [];
            for (let i = 0; i < 20; i++) {
                pellets.push({
                    x: machine.x + machine.width * 0.1 + Math.sin(time * 0.1 + i) * 20,
                    y: machine.y - 20 - Math.sin(time * 0.05 + i * 0.1) * 10,
                    size: 4 + Math.sin(time * 0.2 + i) * 2,
                    alpha: 0.8 + Math.sin(time * 0.15 + i) * 0.2
                });
            }
            pellets.forEach(pellet => {
                ctx.save();
                ctx.globalAlpha = pellet.alpha;
                ctx.fillStyle = '#f7fafc';
                ctx.beginPath();
                ctx.arc(pellet.x, pellet.y, pellet.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            });
        };

        const drawMoltenPlastic = () => {
            ctx.save();
            ctx.globalAlpha = 0.3 + Math.sin(time * 0.3) * 0.2;
            ctx.fillStyle = '#ed8936';
            ctx.beginPath();
            ctx.ellipse(machine.x + machine.width * 0.5, machine.y + machine.height * 0.3 + Math.sin(time * 0.4) * 5, 25, 15 + Math.sin(time * 0.3) * 3, time * 0.1, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        };

        const bottles = [];
        for (let i = 0; i < 5; i++) {
            const progress = (time * 0.02 + i * 0.5) % 1;
            const bottleX = machine.x + machine.width * 0.5 + (progress - 0.5) * machine.width * 0.8;
            const bottleY = machine.y + machine.height * 0.7;
            const bottleScale = 0.3 + Math.sin(progress * Math.PI) * 0.2;

            bottles.push({ x: bottleX, y: bottleY, scale: bottleScale, phase: progress, id: i });
        }

        const drawBottles = () => {
            bottles.forEach(bottle => {
                ctx.save();
                ctx.translate(bottle.x, bottle.y);
                ctx.scale(bottle.scale, bottle.scale);

                // Bottle body
                const gradient = ctx.createLinearGradient(0, -40, 0, 40);
                gradient.addColorStop(0, '#ffffff');
                gradient.addColorStop(1, '#e2e8f0');
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.roundRect(-12, -35, 24, 50, 12);
                ctx.fill();

                // Neck
                ctx.fillStyle = '#f7fafc';
                ctx.beginPath();
                ctx.roundRect(-8, -45, 16, 12, 8);
                ctx.fill();

                // Shine
                ctx.fillStyle = 'rgba(255,255,255,0.6)';
                ctx.beginPath();
                ctx.ellipse(8, -25, 6, 20, 0.3, 0, Math.PI * 0.7);
                ctx.fill();

                ctx.restore();
            });
        };

        const conveyorBelt = () => {
            ctx.save();
            ctx.fillStyle = 'rgba(100,100,100,0.3)';
            ctx.fillRect(machine.x - 20, machine.y + machine.height + 10, machine.width + 40, 20);

            // Moving belt pattern
            ctx.save();
            ctx.translate(time * 2 % 100, 0);
            ctx.fillStyle = 'rgba(80,80,80,0.4)';
            for (let i = 0; i < 10; i++) {
                ctx.fillRect(machine.x - 20 + i * 20, machine.y + machine.height + 10, 15, 20);
            }
            ctx.restore();
            ctx.restore();
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            drawMachine();
            drawPlasticPellets();
            drawMoltenPlastic();
            drawBottles();
            conveyorBelt();

            time += 1;
            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', resizeCanvas);
        };
    }, []);

    return (
        <div className="w-full h-[400px] sm:h-[500px] lg:h-[600px] relative overflow-hidden rounded-3xl border border-gray-200 shadow-2xl bg-gradient-to-br from-gray-50 to-white">
            <canvas
                ref={canvasRef}
                className="w-full h-full"
            />
            <div className="absolute inset-0 flex items-end justify-center pb-12 sm:pb-16">
                <div className="bg-white/90 backdrop-blur-md px-6 sm:px-8 py-4 sm:py-6 rounded-2xl border shadow-xl text-center max-w-md">
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 drop-shadow-lg">Live Production</h3>
                    <p className="text-sm sm:text-base text-gray-600 font-medium drop-shadow-md">Watch our automated bottle manufacturing process</p>
                </div>
            </div>
        </div>
    );
}

