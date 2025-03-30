import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  // Handle social media clicks
  const handleSocialClick = (platform: 'facebook' | 'twitter' | 'instagram') => {
    const urls = {
      facebook: 'https://www.facebook.com/share/LJYCtyEggiLBM4W9/?mibextid=LQQJ4d',
      twitter: 'https://x.com/balostechnonni?s=11&t=80QvJJ40khM6cx3yBT1hbQ',
      instagram: 'https://www.instagram.com/balostech/profilecard/?igsh=YTFybTRkMHV3dzB3'
    };
    window.open(urls[platform], '_blank');
  };

  return (
    <footer className="bg-gradient-to-r from-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white text-lg font-bold mb-4">BALOSTECH</h3>
            <p className="text-sm">Your trusted partner for all things tech. Buy, sell, and repair with confidence.</p>
            <div className="flex space-x-4 mt-4">
              <button onClick={() => handleSocialClick('facebook')}>
                <Facebook className="h-5 w-5 cursor-pointer hover:text-red-600" />
              </button>
              <button onClick={() => handleSocialClick('twitter')}>
                <Twitter className="h-5 w-5 cursor-pointer hover:text-red-600" />
              </button>
              <button onClick={() => handleSocialClick('instagram')}>
                <Instagram className="h-5 w-5 cursor-pointer hover:text-red-600" />
              </button>
            </div>
          </div>

          <div>
            <h4 className="text-white text-sm font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/shop" className="hover:text-red-600">Shop</Link></li>
              <li><Link to="/repair-services" className="hover:text-red-600">Repair Services</Link></li>
              <li><Link to="/trade-in" className="hover:text-red-600">Trade-In</Link></li>
              <li><Link to="/about" className="hover:text-red-600">About Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-sm font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/contact" className="hover:text-red-600">Contact Us</Link></li>
              <li><Link to="/faq" className="hover:text-red-600">FAQs</Link></li>
              <li><Link to="/shipping" className="hover:text-red-600">Shipping Info</Link></li>
              <li><Link to="/returns" className="hover:text-red-600">Return Policy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-sm font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a 
                  href="tel:+2347087910759" 
                  className="flex items-center space-x-2 hover:text-red-600"
                >
                  <Phone className="h-4 w-4 text-red-600" />
                  <span>+234 708 791 0759</span>
                </a>
              </li>
              <li>
                <a 
                  href="Mujeebidogbe07@gmail.com" 
                  className="flex items-center space-x-2 hover:text-red-600"
                >
                  <Mail className="h-4 w-4 text-red-600" />
                  <span>Mujeebidogbe07@gmail.com</span>
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-red-600" />
                <span>Education Shopping Plaza, University of Lagos</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} BALOSTECH. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;