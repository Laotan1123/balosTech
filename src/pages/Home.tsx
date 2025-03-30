import Hero from '../components/Hero';
import { ProductGrid } from '../components/ProductGrid';
import Services from '../components/Services';
import TradeInSection from '../components/TradeIn';

const Home = () => {
  return (
    <div>
      <Hero />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ProductGrid />
        <Services />
        <TradeInSection />
      </main>
    </div>
  );
};

export default Home;