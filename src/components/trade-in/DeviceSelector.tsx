interface DeviceSelectorProps {
  selectedDevice: string;
  onSelect: (device: "iPhone 13" | "iPhone 12" | "Samsung S22" | "Samsung S21" | "Google Pixel 6" | "") => void;
  onNext: () => void;
}

const DeviceSelector = ({ selectedDevice, onSelect, onNext }: DeviceSelectorProps) => {
  const devices = ['iPhone 13', 'iPhone 12', 'iPhone 11', 'Samsung Galaxy S21', 'Samsung Galaxy S20'];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Select Your Device</h2>
      <select
        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-600 focus:ring-purple-600"
        value={selectedDevice}
        onChange={(e) => onSelect(e.target.value as "iPhone 13" | "iPhone 12" | "Samsung S22" | "Samsung S21" | "Google Pixel 6" | "")}
      >
        <option value="">Select a device</option>
        {devices.map((device) => (
          <option key={device} value={device}>
            {device}
          </option>
        ))}
      </select>
      <button
        className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition duration-300 disabled:opacity-50"
        disabled={!selectedDevice}
        onClick={onNext}
      >
        Continue
      </button>
    </div>
  );
};

export default DeviceSelector;