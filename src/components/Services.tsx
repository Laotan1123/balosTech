import { useState } from 'react';
import { Smartphone, Laptop, Watch, Tablet } from 'lucide-react';

const USD_TO_NGN_RATE = 1300;

const formatToNaira = (priceInUSD: number): string => {
  const priceInNaira = priceInUSD * USD_TO_NGN_RATE;
  return `From ₦${priceInNaira.toLocaleString()}`;
};

const services = [
  {
    icon: Smartphone,
    title: 'Phone Repair',
    description: 'Screen replacement, battery service, and more for all major brands',
    price: formatToNaira(49),
    timeEstimate: '1-2 hours'
  },
  {
    icon: Laptop,
    title: 'Laptop Repair',
    description: 'Hardware upgrades, screen repairs, and system optimization',
    price: formatToNaira(79),
    timeEstimate: '2-3 hours'
  },
  {
    icon: Tablet,
    title: 'Tablet Repair',
    description: 'Screen repairs, charging port fixes, and general maintenance',
    price: formatToNaira(59),
    timeEstimate: '1-2 hours'
  },
  {
    icon: Watch,
    title: 'Smart Watch Repair',
    description: 'Screen replacement, battery service, and water damage repair',
    price: formatToNaira(39),
    timeEstimate: '1 hour'
  }
];

const Services = () => {
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [showBooking, setShowBooking] = useState(false);

  const handleServiceClick = (index: number) => {
    setSelectedService(index);
    setShowBooking(true);
  };

  return (
    <section className="py-12" id="services">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-red-700">Repair Services</h2>
        <span className="text-red-600">Same-day repairs available</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            className={`bg-black rounded-xl shadow-lg p-6 cursor-pointer transform transition duration-300 ${
              selectedService === index
                ? 'ring-2 ring-red-600 scale-105'
                : 'hover:scale-105'
            }`}
            onClick={() => handleServiceClick(index)}
          >
            <div className="flex justify-between items-start mb-4">
              <service.icon className="h-8 w-8 text-red-600" />
              <span className="text-sm font-semibold text-red-600">{service.timeEstimate}</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">{service.title}</h3>
            <p className="text-white mb-4">{service.description}</p>
            <div className="flex justify-between items-center">
              <span className="font-bold text-white">{service.price}</span>
              <button 
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300"
                onClick={(e) => {
                  e.stopPropagation();
                  handleServiceClick(index);
                }}
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {showBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-black rounded-xl p-6 max-w-md w-full">
            <h3 className="text-2xl font-bold text-red-600 mb-4">
              Book {selectedService !== null ? services[selectedService].title : ''}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-red-700 mb-1">
                  Select Date
                </label>
                <input
                  type="date"
                  className="w-full rounded-lg bg-black text-white border-gray-300 shadow-sm focus:border-indigo-600 focus:ring-indigo-600 [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-red-700 mb-1">
                  Select Time
                </label>
                <select className="w-full rounded-lg bg-black text-white border-gray-300 shadow-sm focus:border-indigo-600 focus:ring-indigo-600">
                  <option>9:00 AM</option>
                  <option>10:00 AM</option>
                  <option>11:00 AM</option>
                  <option>2:00 PM</option>
                  <option>3:00 PM</option>
                  <option>4:00 PM</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-red-700 mb-1">
                  Device Details
                </label>
                <textarea
                  className="w-full rounded-lg bg-black text-white border-gray-300 shadow-sm focus:border-indigo-600 focus:ring-indigo-600"
                  rows={3}
                  placeholder="Please describe your device and the issue..."
                />
              </div>
              <div className="flex space-x-4">
                <button
                  className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition duration-300"
                  onClick={() => setShowBooking(false)}
                >
                  Confirm Booking
                </button>
                <button
                  className="flex-1 border border-gray-300 text-red-600 py-2 rounded-lg hover:bg-gray-300 transition duration-300"
                  onClick={() => setShowBooking(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Services;