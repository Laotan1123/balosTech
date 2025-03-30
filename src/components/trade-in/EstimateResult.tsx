import { CheckCircle, AlertCircle } from 'lucide-react';

const baseValues = {
  'iPhone 13': 400000,
  'iPhone 12': 300000,
  'Samsung S22': 350000,
  'Samsung S21': 250000,
  'Google Pixel 6': 200000,
};

const conditionMultiplier = {
  'Like New': 1,
  'Good': 0.8,
  'Fair': 0.6,
  'Poor': 0.4,
};

// Add this interface before the component
interface EstimateFormData {
  device: keyof typeof baseValues;
  condition: keyof typeof conditionMultiplier;
  batteryHealth: number;
  unlockStatus: string;
  previousRepairs: string;
  problems?: boolean;
}

const EstimateResult = ({ formData, onReset, onBack }: {
  formData: EstimateFormData;
  onReset: () => void;
  onBack: () => void;
}) => {
  const calculateEstimate = () => {
    const baseValue = baseValues[formData.device] || 0;
    const multiplier = conditionMultiplier[formData.condition] || 0;
    let estimate = baseValue * multiplier;

    // Additional factors
    if (formData.batteryHealth > 90) estimate *= 1.1;
    if (formData.unlockStatus === 'factory' || formData.unlockStatus === 'worldwide') estimate *= 1.05;
    if (formData.previousRepairs === 'yes') estimate *= 0.9;
    if (formData.problems) estimate *= 0.95;

    return Math.round(estimate);
  };

  const estimate = calculateEstimate();

  return (
    <div className="text-center space-y-6">
      <div className="inline-block p-4 bg-green-100 rounded-full">
        <CheckCircle className="h-12 w-12 text-green-500" />
      </div>
      <h3 className="text-2xl font-bold">Estimated Value</h3>
      <div className="text-4xl font-bold text-purple-600">₦{estimate.toLocaleString()}</div>
      
      <div className="bg-gray-50 p-6 rounded-lg text-left">
        <h4 className="font-semibold mb-2">Estimate Breakdown:</h4>
        <ul className="space-y-2 text-sm">
          <li>Base Value: ₦{baseValues[formData.device].toLocaleString()}</li>
          <li>Condition Adjustment: {(conditionMultiplier[formData.condition] * 100)}%</li>
          {formData.batteryHealth > 90 && <li>Battery Health Bonus: +10%</li>}
          {(formData.unlockStatus === 'factory' || formData.unlockStatus === 'worldwide') && 
            <li>Unlock Status Bonus: +5%</li>}
          {formData.previousRepairs === 'yes' && <li>Previous Repairs Adjustment: -10%</li>}
          {formData.problems && <li>Current Issues Adjustment: -5%</li>}
        </ul>
      </div>

      <div className="bg-yellow-50 p-4 rounded-lg flex items-start space-x-2">
        <AlertCircle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-yellow-700">
          This is an estimated value based on the information provided.
          Final trade-in value may vary upon physical inspection of the device.
        </p>
      </div>

      <div className="flex space-x-4">
        <button
          className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition duration-300"
          onClick={onBack}
        >
          Back
        </button>
        <button
          className="flex-1 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition duration-300"
          onClick={onReset}
        >
          Start New Estimate
        </button>
      </div>
    </div>
  );
};

export default EstimateResult;