import React, { useState } from 'react';
import DeviceSelector from '../components/trade-in/DeviceSelector';
import DeviceCondition from '../components/trade-in/DeviceCondition';
import DeviceDetails from '../components/trade-in/DeviceDetails';
import EstimateResult from '../components/trade-in/EstimateResult';

const TradeIn = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    device: '',
    condition: '',
    batteryHealth: '',
    batteryScreenshot: null,
    receipt: null,
    devicePhotos: {
      front: null,
      back: null,
      leftSide: null,
      rightSide: null
    },
    problems: '',
    unlockStatus: '',
    previousRepairs: '',
    repairDetails: ''
  });

  const updateFormData = (newData) => {
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
            onSelect={(device) => updateFormData({ device })}
            onNext={nextStep}
          />
        )}

        {step === 2 && (
          <DeviceCondition
            condition={formData.condition}
            onSelect={(condition) => updateFormData({ condition })}
            onNext={nextStep}
            onBack={prevStep}
          />
        )}

        {step === 3 && (
          <DeviceDetails
            formData={formData}
            updateFormData={updateFormData}
            onNext={nextStep}
            onBack={prevStep}
          />
        )}

        {step === 4 && (
          <EstimateResult
            formData={formData}
            onReset={() => {
              setStep(1);
              setFormData({
                device: '',
                condition: '',
                batteryHealth: '',
                batteryScreenshot: null,
                receipt: null,
                devicePhotos: {
                  front: null,
                  back: null,
                  leftSide: null,
                  rightSide: null
                },
                problems: '',
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