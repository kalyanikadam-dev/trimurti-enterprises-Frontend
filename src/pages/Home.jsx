// Components with .jsx or @ 
import { BottleProductionAnimation } from '@/components/BottleProductionAnimation';
import { ProductionGraphics } from '@/components/ProductionGraphics';
import { HeroSection } from '@/components/HeroSection';
import { FeaturedProducts } from '@/components/FeaturedProducts';
import { WhyChooseUs } from '@/components/WhyChooseUs';
import { TestimonialsSection } from '@/components/TestimonialsSection';
import { CertificationsSection } from '@/components/CertificationsSection';
import { SearchBar } from '@/components/SearchBar';

export default function Home() {
    return (
        <main className="w-full min-h-[calc(100vh-80px)] bg-gradient-to-br from-gray-100 via-red-50/90 to-rose-50 pb-0">
            {/* Hero */}
            <HeroSection />

            {/* Search */}
            <SearchBar />

            {/* Featured Product */}
            <FeaturedProducts />

            {/* Why Choose Us */}
            <WhyChooseUs />
        </main>
    );
}
