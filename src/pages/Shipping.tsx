import { Truck, Package, Clock, Shield } from 'lucide-react';

const Shipping = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Shipping Information</h1>
        <p className="text-xl text-gray-600">Fast, secure shipping for all your tech needs</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {[
          {
            icon: Truck,
            title: "Free Shipping",
            description: "On orders over ₦75,000"
          },
          {
            icon: Package,
            title: "Secure Packaging",
            description: "Protected and insured"
          },
          {
            icon: Clock,
            title: "Fast Delivery",
            description: "2-3 business days"
          },
          {
            icon: Shield,
            title: "Shipping Protection",
            description: "Full coverage included"
          }
        ].map((item, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center">
            <item.icon className="h-8 w-8 text-purple-600 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-600">{item.description}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
        <h2 className="text-2xl font-bold mb-6">Shipping Methods</h2>
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-4 border-b">
            <div>
              <h3 className="font-semibold">Standard Shipping</h3>
              <p className="text-gray-600">2-3 business days</p>
            </div>
            <span className="font-semibold">₦7,500</span>
          </div>
          <div className="flex items-center justify-between pb-4 border-b">
            <div>
              <h3 className="font-semibold">Express Shipping</h3>
              <p className="text-gray-600">1-2 business days</p>
            </div>
            <span className="font-semibold">₦15,000</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Next Day Delivery</h3>
              <p className="text-gray-600">Next business day</p>
            </div>
            <span className="font-semibold">₦22,500</span>
          </div>
        </div>
      </div>

      <div className="bg-purple-50 rounded-xl p-8">
        <h2 className="text-2xl font-bold mb-6">Shipping Policy</h2>
        <div className="space-y-4">
          <p className="text-gray-600">
            We ship to all states in Nigeria. Orders are processed and shipped Monday through Friday, 
            excluding holidays. Orders placed after 2 PM WAT will be processed the next business day.
          </p>
          <p className="text-gray-600">
            All shipments include tracking information that will be emailed to you once your order ships.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Shipping;