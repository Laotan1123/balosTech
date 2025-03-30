import { Upload } from 'lucide-react';

interface DeviceDetailsProps {
  formData: {
    batteryHealth: string;
    batteryScreenshot?: File;
    devicePhotos: {
      front: File | null;
      back: File | null;
      leftSide: File | null;
      rightSide: File | null;
    };
    receipt?: File;
    unlockStatus: string;
    previousRepairs: string;
    repairDetails?: string;
    problems?: string;
  };
  updateFormData: (data: Partial<DeviceDetailsProps['formData']>) => void;
  onNext: () => void;
  onBack: () => void;
}

const DeviceDetails = ({ formData, updateFormData, onNext, onBack }: DeviceDetailsProps) => {
  const handleFileChange = (field: string, file: File | { name: string; value: File }) => {
    if (field === 'devicePhotos') {
      updateFormData({
        devicePhotos: {
          ...formData.devicePhotos,
          [(file as { name: string }).name || file.name]: 'name' in file ? (file as { value: File }).value : file
        }
      });
    } else {
      updateFormData({ [field]: file as File });
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Device Details</h2>

      {/* Battery Health */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Battery Health Percentage
        </label>
        <input
          type="number"
          min="0"
          max="100"
          className="w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-600 focus:ring-purple-600"
          value={formData.batteryHealth}
          onChange={(e) => updateFormData({ batteryHealth: e.target.value })}
        />
      </div>

      {/* Battery Screenshot */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Battery Health Screenshot
        </label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
          <div className="space-y-1 text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <div className="flex text-sm text-gray-600">
              <label className="relative cursor-pointer rounded-md font-medium text-purple-600 hover:text-purple-500">
                <span>Upload a file</span>
                <input
                  type="file"
                  className="sr-only"
                  accept="image/*"
                  onChange={(e) => e.target.files && handleFileChange('batteryScreenshot', e.target.files[0])}
                />
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Device Photos */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Device Photos
        </label>
        <div className="grid grid-cols-2 gap-4">
          {['front', 'back', 'leftSide', 'rightSide'].map((side) => (
            <div key={side} className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
              <div className="space-y-1 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label className="relative cursor-pointer rounded-md font-medium text-purple-600 hover:text-purple-500">
                    <span>Upload {side}</span>
                    <input
                      type="file"
                      className="sr-only"
                      accept="image/*"
                      onChange={(e) => e.target.files && handleFileChange('devicePhotos', { name: side, value: e.target.files[0] })}
                    />
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Receipt Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Receipt (Optional)
        </label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
          <div className="space-y-1 text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <div className="flex text-sm text-gray-600">
              <label className="relative cursor-pointer rounded-md font-medium text-purple-600 hover:text-purple-500">
                <span>Upload receipt</span>
                <input
                  type="file"
                  className="sr-only"
                  accept="image/*,.pdf"
                  onChange={(e) => e.target.files && handleFileChange('receipt', e.target.files[0])}
                />
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Unlock Status */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Unlock Status
        </label>
        <select
          className="w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-600 focus:ring-purple-600"
          value={formData.unlockStatus}
          onChange={(e) => updateFormData({ unlockStatus: e.target.value })}
        >
          <option value="">Select status</option>
          <option value="factory">Factory Unlocked</option>
          <option value="worldwide">Worldwide Unlocked</option>
          <option value="locked">Carrier Locked</option>
        </select>
      </div>

      {/* Previous Repairs */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Has this device been repaired before?
        </label>
        <select
          className="w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-600 focus:ring-purple-600"
          value={formData.previousRepairs}
          onChange={(e) => updateFormData({ previousRepairs: e.target.value })}
        >
          <option value="">Select option</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>

      {formData.previousRepairs === 'yes' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Repair Details
          </label>
          <textarea
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-600 focus:ring-purple-600"
            rows={3}
            value={formData.repairDetails}
            onChange={(e) => updateFormData({ repairDetails: e.target.value })}
            placeholder="Please describe the previous repairs..."
          />
        </div>
      )}

      {/* Device Problems */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Any Current Problems? (Optional)
        </label>
        <textarea
          className="w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-600 focus:ring-purple-600"
          rows={3}
          value={formData.problems}
          onChange={(e) => updateFormData({ problems: e.target.value })}
          placeholder="Describe any current issues with the device..."
        />
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
          onClick={onNext}
        >
          Get Estimate
        </button>
      </div>
    </div>
  );
};

export default DeviceDetails;