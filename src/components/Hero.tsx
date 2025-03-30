import { Link } from 'react-router-dom';
import { ArrowRight, Wrench } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-r from-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-24 md:py-32">
          <div className="md:w-3/5">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Your Tech Journey Starts Here
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              At Balos Tech, we buy, sell, and repair all your favorite gadgets. Expert service with guaranteed satisfaction.
            </p>
            <div className="flex flex-col space-y-4 items-start">
              <Link 
                to="/shop"
                className="w-full sm:w-auto bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition duration-300"
              >
                <span className="flex items-center justify-center space-x-2">
                  <span>Explore Devices</span>
                  <ArrowRight className="h-5 w-5" />
                </span>
              </Link>
              <Link
                to="/repair-services"
                className="w-full sm:w-auto text-white border-2 border-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-red-600 transition duration-300 ml-0 sm:ml-8"
              >
                <span className="flex items-center justify-center space-x-2">
                  <Wrench className="h-5 w-5" />
                  <span>Repair Services</span>
                </span>
              </Link>
            </div>
            <div className="mt-12 grid grid-cols-3 gap-4">
              <div className="bg-black bg-opacity-50 rounded-lg p-4 backdrop-blur-lg border border-red-600">
                <div className="text-2xl font-bold text-white">1000+</div>
                <div className="text-gray-300">Repairs Completed</div>
              </div>
              <div className="bg-black bg-opacity-50 rounded-lg p-4 backdrop-blur-lg border border-red-600">
                <div className="text-2xl font-bold text-white">24/7</div>
                <div className="text-gray-300">Tech Support</div>
              </div>
              <div className="bg-black bg-opacity-50 rounded-lg p-4 backdrop-blur-lg border border-red-600">
                <div className="text-2xl font-bold text-white">90%</div>
                <div className="text-gray-300">Customer Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 right-0 w-full md:w-2/5 h-full hidden md:block">
        <img
          src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80"
          alt="Modern smartphones and gadgets"
          className="object-cover h-full w-full opacity-20 md:opacity-40"
        />
      </div>
    </div>
  );
};

export default Hero;