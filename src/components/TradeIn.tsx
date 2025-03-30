import { useState } from 'react';
import { CheckCircle } from 'lucide-react';

// Add type for valid device names
type DeviceType = 'iPhone 13' | 'iPhone 12' | 'Samsung S22' | 'Samsung S21' | 'Google Pixel 6';
type ConditionType = 'Like New' | 'Good' | 'Fair' | 'Poor';

// Add this constant at the top with other constants
const USD_TO_NGN_RATE = 1300;

const TradeIn = () => {
  const [step, setStep] = useState(1);
  const [device, setDevice] = useState<DeviceType | ''>('');
  const [condition, setCondition] = useState<ConditionType | ''>('');
  const [estimate, setEstimate] = useState<number | null>(null);

  const handleEstimate = () => {
    // Simplified estimation logic
    const baseValues: Record<DeviceType, number> = {
      'iPhone 13': 400 * USD_TO_NGN_RATE,
      'iPhone 12': 300 * USD_TO_NGN_RATE,
      'Samsung S22': 350 * USD_TO_NGN_RATE,
      'Samsung S21': 250 * USD_TO_NGN_RATE,
      'Google Pixel 6': 200 * USD_TO_NGN_RATE,
    };

    const conditionMultiplier = {
      'Like New': 1,
      'Good': 0.8,
      'Fair': 0.6,
      'Poor': 0.4,
    };

    const baseValue = baseValues[device as DeviceType] || 0;
    const multiplier = condition ? conditionMultiplier[condition] : 0;
    setEstimate(Math.round(baseValue * multiplier));
    setStep(3);
  };

  return (
    <section className="py-12 bg-black rounded-2xl my-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-red-600 mb-4">Trade In Your Device</h2>
          <p className="text-red-600">Get an instant estimate for your device and upgrade to something new</p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((number) => (
              <div key={number} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step >= number ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {number}
                </div>
                {number < 3 && (
                  <div className={`w-12 h-1 ${step > number ? 'bg-red-600' : 'bg-gray-200'}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-black rounded-xl shadow-lg p-6">
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-4">Select Your Device</h3>
              <select
                className="w-full rounded-lg bg-black text-white border-gray-300 shadow-sm focus:border-indigo-600 focus:ring-indigo-600"
                value={device}
                onChange={(e) => setDevice(e.target.value as DeviceType)}
              >
                <option value="">Select a device</option>
                <option>iPhone 13</option>
                <option>iPhone 12</option>
                <option>Samsung S22</option>
                <option>Samsung S21</option>
                <option>Google Pixel 6</option>
              </select>
              <button
                className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition duration-300 disabled:opacity-50"
                disabled={!device}
                onClick={() => setStep(2)}
              >
                Continue
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-4">Device Condition</h3>
              <div className="grid grid-cols-2 gap-4">
                {['Like New', 'Good', 'Fair', 'Poor'].map((state) => (
                  <button
                    key={state}
                    className={`p-4 rounded-lg border-2 transition duration-300 ${
                      condition === state
                        ? 'border-red-600 bg-black'
                        : 'border-gray-200 hover:border-red-600'
                    }`}
                    onClick={() => setCondition(state as ConditionType)}
                  >
                    {state}
                  </button>
                ))}
              </div>
              <button
                className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition duration-300 disabled:opacity-50"
                disabled={!condition}
                onClick={handleEstimate}
              >
                Get Estimate
              </button>
            </div>
          )}

          {step === 3 && estimate !== null && (
            <div className="text-center space-y-6">
              <div className="inline-block p-4 bg-green-100 rounded-full">
                <CheckCircle className="h-12 w-12 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold">Estimated Value</h3>
              <div className="text-4xl font-bold text-red-600">
                ₦{estimate?.toLocaleString()}
              </div>
              <p className="text-yellow-600">
                This is an estimated value based on the information provided.
                Actual trade-in value may vary upon inspection.
              </p>
              <button
                className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition duration-300"
                onClick={() => {
                  setStep(1);
                  setDevice('');
                  setCondition('');
                  setEstimate(null);
                }}
              >
                Start New Estimate
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TradeIn;