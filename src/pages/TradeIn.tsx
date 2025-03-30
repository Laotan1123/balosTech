import { useState } from 'react';
import DeviceSelector from '../components/trade-in/DeviceSelector';
import DeviceCondition from '../components/trade-in/DeviceCondition';
import DeviceDetails from '../components/trade-in/DeviceDetails';
import EstimateResult from '../components/trade-in/EstimateResult';

const TradeIn = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<{
    device: "iPhone 13" | "iPhone 12" | "Samsung S22" | "Samsung S21" | "Google Pixel 6" | "";
    condition: "Like New" | "Good" | "Fair" | "Poor";
    batteryHealth: number;
    batteryScreenshot: File | undefined;
    receipt: File | undefined;
    devicePhotos: {
      front: File | null;
      back: File | null;
      leftSide: File | null;
      rightSide: File | null;
    };
    problems: boolean | undefined;
    unlockStatus: string;
    previousRepairs: string;
    repairDetails: string;
  }>({
    device: '',
    condition: 'Good',
    batteryHealth: 100,
    batteryScreenshot: undefined,
    receipt: undefined,
    devicePhotos: {
      front: null,
      back: null,
      leftSide: null,
      rightSide: null
    },
    problems: undefined,
    unlockStatus: '',
    previousRepairs: '',
    repairDetails: ''
  });


  const updateFormData = (newData: Partial<typeof formData>) => {
    setFormData(prev => ({ ...prev, ...newData }));
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Trade In Your Device</h1>
        <p className="text-xl text-gray-600">Get an instant estimate for your device</p>
      </div>

      <div className="flex justify-center mb-8">
        <div className="flex items-center space-x-4">
          {[1, 2, 3, 4].map((number) => (
            <div key={number} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= number ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}
              >
                {number}
              </div>
              {number < 4 && (
                <div className={`w-12 h-1 ${step > number ? 'bg-purple-600' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        {step === 1 && (
          <DeviceSelector
            selectedDevice={formData.device}
            onSelect={(device: "iPhone 13" | "iPhone 12" | "Samsung S22" | "Samsung S21" | "Google Pixel 6" | "") => updateFormData({ device })}
            onNext={nextStep}
          />
        )}

        {step === 2 && (
          <DeviceCondition
            condition={formData.condition}
            onSelect={(state: string) => {
              if (state === "Like New" || state === "Good" || state === "Fair" || state === "Poor") {
                updateFormData({ condition: state });
              }
            }}
            onNext={nextStep}
            onBack={prevStep}
          />
        )}

        {step === 3 && (
          <DeviceDetails
            formData={{
              ...formData, 
              batteryHealth: formData.batteryHealth.toString(),
              problems: formData.problems !== undefined ? formData.problems.toString() : undefined
            }}
            updateFormData={(newData) => {
              const updatedData: Partial<typeof formData> = {};
              
              // Handle batteryHealth conversion
              if (typeof newData.batteryHealth === 'string') {
                updatedData.batteryHealth = parseInt(newData.batteryHealth) || 0;
              }
              
              // Handle problems conversion
              if (newData.problems !== undefined) {
                if (typeof newData.problems === 'string') {
                  updatedData.problems = newData.problems === 'true';
                } else {
                  updatedData.problems = newData.problems;
                }
              }
              
              // First spread newData (excluding properties we've handled)
              const { batteryHealth: _, problems: __, ...restNewData } = newData;
              // Then add our converted values
              updateFormData({...restNewData, ...updatedData});
            }}
            onNext={nextStep}
            onBack={prevStep}
          />
        )}

        {step === 4 && formData.device !== '' && (
          <EstimateResult
            formData={{...formData, device: formData.device as "iPhone 13" | "iPhone 12" | "Samsung S22" | "Samsung S21" | "Google Pixel 6"}}
            onReset={() => {
              setStep(1);
              setFormData({
                device: '',
                condition: 'Good',
                batteryHealth: 100,
                batteryScreenshot: undefined,
                receipt: undefined,
                devicePhotos: {
                  front: null,
                  back: null,
                  leftSide: null,
                  rightSide: null
                },
                problems: undefined,
                unlockStatus: '',
                previousRepairs: '',
                repairDetails: ''
              });
            }}
            onBack={prevStep}
          />
        )}
      </div>
    </div>
  );
};

export default TradeIn;