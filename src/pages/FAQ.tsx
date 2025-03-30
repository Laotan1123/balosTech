import React from 'react';
import { Plus, Minus } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  const faqs = [
    {
      question: "What types of devices do you repair?",
      answer: "We repair a wide range of devices including smartphones (iPhone, Samsung, Google Pixel), tablets, laptops, and smartwatches. Our certified technicians are trained to handle repairs for all major brands and models."
    },
    {
      question: "How long does a typical repair take?",
      answer: "Most common repairs like screen replacements or battery services can be completed within 1-2 hours. More complex repairs might take up to 24 hours. We'll provide you with an estimated completion time when you bring in your device."
    },
    {
      question: "Do you offer a warranty on repairs?",
      answer: "Yes, all our repairs come with a 90-day warranty covering both parts and labor. If you experience any issues related to our repair work within this period, we'll fix it at no additional cost."
    },
    {
      question: "What's your trade-in process like?",
      answer: "Our trade-in process is simple: Get an instant online estimate, bring your device to our store for inspection, and receive payment on the spot. We accept most smartphones, tablets, and laptops in any condition."
    },
    {
      question: "Do you sell refurbished devices?",
      answer: "Yes, we offer a selection of certified refurbished devices. All refurbished devices undergo thorough testing, repairs if needed, and come with a 90-day warranty for peace of mind."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
        <p className="text-xl text-gray-600">Find answers to common questions about our services</p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
            <button
              className="w-full px-6 py-4 flex justify-between items-center hover:bg-gray-50 transition duration-300"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <span className="font-semibold text-left">{faq.question}</span>
              {openIndex === index ? (
                <Minus className="h-5 w-5 text-purple-600" />
              ) : (
                <Plus className="h-5 w-5 text-purple-600" />
              )}
            </button>
            {openIndex === index && (
              <div className="px-6 py-4 bg-gray-50">
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;