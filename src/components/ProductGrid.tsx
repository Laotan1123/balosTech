import { useState } from 'react';
import { Star, ShoppingCart, Heart } from 'lucide-react';

const products = [
  {
    id: 1,
    name: 'iPhone 14 Pro',
    price: 999,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?auto=format&fit=crop&q=80',
    condition: 'New',
    stock: 5
  },
  {
    id: 2,
    name: 'Samsung Galaxy S23',
    price: 899,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1678685888468-5f8719c1dd7e?auto=format&fit=crop&q=80',
    condition: 'New',
    stock: 8
  },
  {
    id: 3,
    name: 'iPhone 13',
    price: 599,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?auto=format&fit=crop&q=80',
    condition: 'Refurbished',
    stock: 3
  },
  {
    id: 4,
    name: 'Google Pixel 7',
    price: 699,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1678685888474-13c68ee1ba44?auto=format&fit=crop&q=80',
    condition: 'New',
    stock: 6
  }
];

const USD_TO_NGN_RATE = 1300;

export const ProductGrid = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (productId: number) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const formatToNaira = (dollarPrice: number) => {
    const nairaPrice = dollarPrice * USD_TO_NGN_RATE;
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(nairaPrice);
  };

  return (
    <section className="py-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
        <h2 className="text-3xl font-bold text-red-600">Featured Products</h2>
        <div className="flex space-x-4">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-4 py-2 rounded-lg border-2 ${
              selectedFilter === 'all'
                ? 'bg-red-600 text-white border-red-600'
                : 'bg-gray-100 text-black hover:bg-gray-200 border-gray-300'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setSelectedFilter('new')}
            className={`px-4 py-2 rounded-lg ${
              selectedFilter === 'new'
                ? 'bg-red-600 text-white'
                : 'bg-gray-100 text-black hover:bg-gray-200'
            }`}
          >
            New
          </button>
          <button
            onClick={() => setSelectedFilter('refurbished')}
            className={`px-4 py-2 rounded-lg ${
              selectedFilter === 'refurbished'
                ? 'bg-red-600 text-white'
                : 'bg-gray-100 text-black hover:bg-gray-200'
            }`}
          >
            Refurbished
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {products
          .filter(
            product =>
              selectedFilter === 'all' ||
              product.condition.toLowerCase() === selectedFilter
          )
          .map(product => (
            <div key={product.id} className="bg-black rounded-xl shadow-lg overflow-hidden group">
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition duration-300"
                />
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className="absolute top-2 right-2 p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition duration-300"
                >
                  <Heart
                    className={`h-5 w-5 ${
                      favorites.includes(product.id)
                        ? 'text-red-500 fill-current'
                        : 'text-gray-400'
                    }`}
                  />
                </button>
                <span className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded-lg text-sm">
                  {product.condition}
                </span>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-white mb-2">{product.name}</h3>
                <div className="flex items-center mb-2">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="ml-1 text-sm text-white">{product.rating}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-xl font-bold text-white">{formatToNaira(product.price)}</span>
                    <p className="text-sm text-red-500">{product.stock} in stock</p>
                  </div>
                  <button 
                    className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 transition duration-300 flex items-center space-x-2"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};