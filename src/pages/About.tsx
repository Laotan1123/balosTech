import { Shield, Clock, Wrench, Award } from 'lucide-react';

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">About Balos Tech</h1>
        <p className="text-xl text-gray-600">Your trusted partner in technology since 2010</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="text-2xl font-bold mb-4">Our Story</h2>
          <p className="text-gray-600 mb-4">
            Founded in 2010, Balos Tech has grown from a small repair shop to a leading technology
            solutions provider. We're passionate about helping our customers get the most out of
            their devices through expert repairs, quality refurbished products, and exceptional
            customer service.
          </p>
          <p className="text-gray-600">
            Our team of certified technicians brings decades of combined experience in device
            repair and customer service. We're committed to providing transparent, reliable
            service that puts our customers first.
          </p>
        </div>
        <div className="relative h-64 rounded-xl overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80"
            alt="Team at work"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
        {[
          {
            icon: Shield,
            title: "Quality Guaranteed",
            description: "90-day warranty on all repairs"
          },
          {
            icon: Clock,
            title: "Fast Service",
            description: "Same-day repairs available"
          },
          {
            icon: Wrench,
            title: "Expert Technicians",
            description: "Certified professionals"
          },
          {
            icon: Award,
            title: "Top Rated",
            description: "4.9/5 customer rating"
          }
        ].map((item, index) => (
          <div key={index} className="text-center p-6 bg-white rounded-xl shadow-lg">
            <item.icon className="h-8 w-8 text-purple-600 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-600">{item.description}</p>
          </div>
        ))}
      </div>

      <div className="bg-purple-50 rounded-xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Visit Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold mb-2">Location</h3>
            <p className="text-gray-600">123 Tech Street</p>
            <p className="text-gray-600">Digital City, DC 12345</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Hours</h3>
            <p className="text-gray-600">Monday - Friday: 9am - 7pm</p>
            <p className="text-gray-600">Saturday: 10am - 5pm</p>
            <p className="text-gray-600">Sunday: Closed</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;