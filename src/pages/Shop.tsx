import { useState } from 'react';
import {SlidersHorizontal } from 'lucide-react';
import ProductCard from '../components/shop/ProductCard';
import FilterSection from '../components/shop/FilterSection';
import CategoryGrid from '../components/shop/CategoryGrid';
import SearchBar from '../components/shop/SearchBar';
import { products } from '../data/products';

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    priceRange: 'all',
    brand: 'all',
    condition: 'all',
    inStock: false,
    showLatest: false,
    compatibility: 'all',
    specifications: {
      storage: 'all',
      screenSize: 'all',
      batteryLife: 'all'
    }
  });

  const filterProducts = () => {
    return products.filter(product => {
      // Search query filter
      if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }
      
      // Price range filter
      if (filters.priceRange !== 'all') {
        const [min, max] = filters.priceRange.split('-').map(Number);
        const priceInNaira = product.price * 1500;
        if (priceInNaira < min || (max && priceInNaira > max)) {
          return false;
        }
      }
      
      // Brand filter
      if (filters.brand !== 'all' && product.brand !== filters.brand) {
        return false;
      }
      
      // Condition filter
      if (filters.condition !== 'all' && product.condition !== filters.condition) {
        return false;
      }
      
      // In stock filter
      if (filters.inStock && product.stock === 0) {
        return false;
      }

      // Latest arrivals filter (within last 7 days)
      if (filters.showLatest && new Date(product.addedDate) <= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) {
        return false;
      }

      // Specifications filters
      if (filters.specifications.storage !== 'all' && product.specifications?.storage !== filters.specifications.storage) {
        return false;
      }
      if (filters.specifications.screenSize !== 'all' && product.specifications?.screenSize !== filters.specifications.screenSize) {
        return false;
      }
      if (filters.specifications.batteryLife !== 'all' && product.specifications?.batteryLife !== filters.specifications.batteryLife) {
        return false;
      }

      // Compatibility filter (for accessories)
      if (filters.compatibility !== 'all' && product.compatibility && !product.compatibility.includes(filters.compatibility)) {
        return false;
      }
      
      return true;
    });
  };

  const filteredProducts = filterProducts();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <h1 className="text-4xl font-bold text-red-600">Shop</h1>
          <div className="flex items-center space-x-4 w-full md:w-auto">
            <SearchBar 
              searchQuery={searchQuery} 
              setSearchQuery={setSearchQuery} 
            />
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300"
            >
              <SlidersHorizontal className="h-5 w-5" />
              <span className="hidden md:inline">Filters</span>
            </button>
          </div>
        </div>

        {showFilters && (
          <FilterSection 
            filters={filters} 
            setFilters={setFilters} 
            selectedCategory={selectedCategory}
          />
        )}

        <CategoryGrid 
          selectedCategory={selectedCategory} 
          setSelectedCategory={setSelectedCategory} 
        />

        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;