import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { Heart, Star, ShoppingCart, Eye } from 'lucide-react';
import { Product } from '../../types/product';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { dispatch } = useCart();
  const [showDetails, setShowDetails] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleAddToCart = () => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
      },
    });
  };

  return (
    <div className="bg-black rounded-xl shadow-lg overflow-hidden group">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition duration-300"
        />
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-2 right-2 p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition duration-300"
        >
          <Heart
            className={`h-5 w-5 ${
              isFavorite ? 'text-red-500 fill-current' : 'text-gray-400'
            }`}
          />
        </button>
        <div className="absolute top-2 left-2 flex space-x-2">
          <span className="bg-red-600 text-white px-2 py-1 rounded-lg text-sm">
            {product.condition}
          </span>
          {product.addedDate && (new Date(product.addedDate) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) && (
            <span className="bg-green-500 text-white px-2 py-1 rounded-lg text-sm">
              New
            </span>
          )}
        </div>
      </div>
      
      <div className="p-4">
        <div className="mb-2">
          <h3 className="text-lg font-semibold text-white">{product.name}</h3>
          <p className="text-sm text-white">{product.brand}</p>
        </div>
        
        <div className="flex items-center mb-2">
          <Star className="h-4 w-4 text-yellow-400 fill-current" />
          <span className="ml-1 text-sm text-white">{product.rating}</span>
        </div>

        {showDetails && (
          <div className="mb-4 text-sm text-white">
            {product.specifications && (
              <div className="space-y-1">
                {product.specifications.storage && (
                  <p>Storage: {product.specifications.storage}</p>
                )}
                {product.specifications.screenSize && (
                  <p>Screen: {product.specifications.screenSize}</p>
                )}
                {product.specifications.processor && (
                  <p>Processor: {product.specifications.processor}</p>
                )}
              </div>
            )}
          </div>
        )}

        <div className="flex justify-between items-center">
          <div>
            <span className="text-xl font-bold text-white">
              ₦{(product.price * 1500).toLocaleString()}
            </span>
            <p className="text-sm text-red-600">{product.stock} in stock</p>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition duration-300"
            >
              <Eye className="h-5 w-5 text-white" />
            </button>
            <button
              onClick={handleAddToCart}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300 flex items-center space-x-2"
            >
              <ShoppingCart className="h-5 w-5" />
              <span>Add</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;