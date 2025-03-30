const conditions = ['Like New', 'Good', 'Fair', 'Poor'];

interface DeviceConditionProps {
  condition: string;
  onSelect: (state: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const DeviceCondition = ({ condition, onSelect, onNext, onBack }: DeviceConditionProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Device Condition</h2>
      <div className="grid grid-cols-2 gap-4">
        {conditions.map((state) => (
          <button
            key={state}
            className={`p-4 rounded-lg border-2 transition duration-300 ${
              condition === state
                ? 'border-purple-600 bg-purple-50'
                : 'border-gray-200 hover:border-purple-600'
            }`}
            onClick={() => onSelect(state)}
          >
            {state}
          </button>
        ))}
      </div>
      <div className="flex space-x-4">
        <button
          className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition duration-300"
          onClick={onBack}
        >
          Back
        </button>
        <button
          className="flex-1 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition duration-300 disabled:opacity-50"
          disabled={!condition}
          onClick={onNext}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default DeviceCondition;