import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, MessageCircle } from 'lucide-react';
import ChatBot from '../components/contact/ChatBot';
import ContactForm from '../components/contact/ContactForm';

const Contact = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
        <p className="text-xl text-gray-600">We're here to help! Reach out through any of these channels.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <ContactForm />

        <div className="space-y-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Phone className="h-6 w-6 text-red-600" />
                <div>
                  <h3 className="font-semibold">Phone</h3>
                  <a 
                    href="tel:+2341234567890" 
                    className="text-gray-600 hover:text-red-600 transition duration-300"
                  >
                    +234 123 456 7890
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Mail className="h-6 w-6 text-red-600" />
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <a 
                    href="mailto:support@balostech.com" 
                    className="text-gray-600 hover:text-red-600 transition duration-300"
                  >
                    support@balostech.com
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <MapPin className="h-6 w-6 text-red-600" />
                <div>
                  <h3 className="font-semibold">Address</h3>
                  <p className="text-gray-600">123 Tech Street, Digital City, Lagos</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Clock className="h-6 w-6 text-red-600" />
                <div>
                  <h3 className="font-semibold">Business Hours</h3>
                  <p className="text-gray-600">Mon-Fri: 9am - 7pm</p>
                  <p className="text-gray-600">Sat: 10am - 5pm</p>
                  <p className="text-gray-600">Sun: Closed</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 rounded-xl p-8">
            <h2 className="text-xl font-bold mb-4">Quick Support</h2>
            <p className="text-gray-600 mb-4">
              Need immediate assistance? Our AI chatbot is available 24/7 to help you with:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Order tracking and status</li>
              <li>Product information</li>
              <li>Return and refund policies</li>
              <li>Technical support</li>
              <li>Common troubleshooting</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Chatbot Toggle Button */}
      <button
        onClick={() => setIsChatOpen(true)}
        className={`fixed bottom-8 right-8 bg-red-600 text-white p-4 rounded-full shadow-lg hover:bg-red-700 transition duration-300 z-50 ${
          isChatOpen ? 'hidden' : 'flex'
        }`}
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      {/* Chatbot Interface */}
      {isChatOpen && <ChatBot onClose={() => setIsChatOpen(false)} />}
    </div>
  );
};

export default Contact;