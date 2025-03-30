import { RefreshCcw, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const Returns = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Return Policy</h1>
        <p className="text-xl text-gray-600">Simple, hassle-free returns within 30 days</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-4 mb-4">
            <CheckCircle className="h-8 w-8 text-green-500" />
            <h2 className="text-xl font-semibold">Eligible Items</h2>
          </div>
          <ul className="space-y-2 text-gray-600">
            <li>• Unopened items</li>
            <li>• Defective products</li>
            <li>• Wrong items received</li>
            <li>• Damaged in shipping</li>
          </ul>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-4 mb-4">
            <XCircle className="h-8 w-8 text-red-500" />
            <h2 className="text-xl font-semibold">Non-Eligible Items</h2>
          </div>
          <ul className="space-y-2 text-gray-600">
            <li>• Opened software</li>
            <li>• Custom orders</li>
            <li>• Physical damage</li>
            <li>• Beyond 30 days</li>
          </ul>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-4 mb-4">
            <RefreshCcw className="h-8 w-8 text-purple-600" />
            <h2 className="text-xl font-semibold">Return Process</h2>
          </div>
          <ul className="space-y-2 text-gray-600">
            <li>1. Contact support</li>
            <li>2. Get RMA number</li>
            <li>3. Pack items securely</li>
            <li>4. Ship to our address</li>
          </ul>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
        <h2 className="text-2xl font-bold mb-6">Return Instructions</h2>
        <div className="space-y-6">
          <p className="text-gray-600">
            To initiate a return, please contact our customer service team with your order number
            and reason for return. We'll provide you with a Return Merchandise Authorization (RMA)
            number and return shipping label if applicable.
          </p>
          <div className="bg-purple-50 p-4 rounded-lg flex items-start space-x-2">
            <AlertCircle className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-gray-700">
              All returns must include original packaging and accessories. Items must be in their
              original condition to be eligible for a full refund.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-xl p-8">
        <h2 className="text-2xl font-bold mb-6">Refund Process</h2>
        <div className="space-y-4">
          <p className="text-gray-600">
            Once we receive your return, we'll inspect the item and process your refund within
            3-5 business days. Refunds will be issued to the original payment method used for
            the purchase.
          </p>
          <p className="text-gray-600">
            Shipping costs are non-refundable unless the return is due to our error. If you
            received free shipping on your original order, the actual shipping cost will be
            deducted from your refund.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Returns;