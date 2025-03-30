import Services from '../components/Services';

const RepairServices = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-black">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-red-600 mb-4">Professional Repair Services</h1>
        <p className="text-xl text-red-600">Expert repairs for all your devices with same-day service available</p>
      </div>
      
      <Services />
      
      <div className="mt-12 bg-black rounded-xl p-8">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Why Choose Our Repair Service?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold text-white mb-2">Expert Technicians</h3>
            <p className="text-white">Certified professionals with years of experience</p>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-2">Warranty Guaranteed</h3>
            <p className="text-white">90-day warranty on all repairs</p>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-2">Quick Turnaround</h3>
            <p className="text-white">Most repairs completed same-day</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepairServices;