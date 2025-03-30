import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart, User, Smartphone } from 'lucide-react';
import { useCart } from '../context/CartContext';
import AuthModal from './auth/AuthModal';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const location = useLocation();
  const { state, dispatch } = useCart();

  const isActive = (path: string) => location.pathname === path;

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);

  const handleProfileClick = () => {
    setIsAuthModalOpen(true);
  };

  return (
    <>
      <nav className="bg-black shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-2">
              <Link to="/" className="flex items-center space-x-2">
                <Smartphone className="h-8 w-8 text-red-600" />
                <span className="text-2xl font-bold text-red-600">BALOSTECH</span>
              </Link>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link 
                to="/shop" 
                className={`${isActive('/shop') ? 'text-red-600' : 'text-gray-300'} hover:text-red-600`}
              >
                Shop
              </Link>
              <Link 
                to="/repair-services" 
                className={`${isActive('/repair-services') ? 'text-red-600' : 'text-gray-300'} hover:text-red-600`}
              >
                Repair Services
              </Link>
              <Link 
                to="/trade-in" 
                className={`${isActive('/trade-in') ? 'text-red-600' : 'text-gray-300'} hover:text-red-600`}
              >
                Trade-In
              </Link>
              <Link 
                to="/about" 
                className={`${isActive('/about') ? 'text-red-600' : 'text-gray-300'} hover:text-red-600`}
              >
                About
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <button 
                className="p-2 hover:bg-gray-900 rounded-full group relative"
                onClick={handleProfileClick}
              >
                <User className="h-5 w-5 text-gray-300 group-hover:text-red-600 transition-colors" />
                <span className="sr-only">Profile</span>
              </button>

              <button 
                className="p-2 hover:bg-gray-900 rounded-full relative group"
                onClick={() => dispatch({ type: 'TOGGLE_CART' })}
              >
                <ShoppingCart className="h-5 w-5 text-gray-300 group-hover:text-red-600 transition-colors" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-600 text-white text-xs rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>

              <button
                className="md:hidden p-2 hover:bg-gray-900 rounded-full"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? (
                  <X className="h-5 w-5 text-gray-300" />
                ) : (
                  <Menu className="h-5 w-5 text-gray-300" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                to="/shop"
                className="block px-3 py-2 text-gray-300 hover:bg-gray-900 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                Shop
              </Link>
              <Link
                to="/repair-services"
                className="block px-3 py-2 text-gray-300 hover:bg-gray-900 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                Repair Services
              </Link>
              <Link
                to="/trade-in"
                className="block px-3 py-2 text-gray-300 hover:bg-gray-900 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                Trade-In
              </Link>
              <Link
                to="/about"
                className="block px-3 py-2 text-gray-300 hover:bg-gray-900 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
            </div>
          </div>
        )}
      </nav>

      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
};

export default Navbar;