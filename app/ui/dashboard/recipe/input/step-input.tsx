'use client';

import { useState } from 'react';
import CancelBtn from '@/app/ui/icons/cancel-btn';

import { ChildComponentProps } from '@/app/lib/definitions';

export default function StepInput({
  formData,
  setFormData,
}: ChildComponentProps) {
  const [newStep, setNewStep] = useState<string>('');
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewStep(e.target.value);
  };
  const applyNewStep = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.nativeEvent.isComposing || e.key !== 'Enter') return;
    e.preventDefault();
    if (!newStep) return;
    const newStepList = [...formData.stepList, newStep];
    setFormData({
      ...formData,
      stepList: newStepList,
    });
    setNewStep('');
  };
  const handleStepChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    index: number,
  ) => {
    const currentStepList = [...formData.stepList];
    currentStepList[index] = e.target.value;
    setFormData({
      ...formData,
      stepList: currentStepList,
    });
  };
  const cancelStep = (index: number) => {
    let currentStepList = [...formData.stepList];
    currentStepList = currentStepList.filter((step, i) => i !== index);
    setFormData({
      ...formData,
      stepList: currentStepList,
    });
  };

  return (
    <label className="flex flex-col gap-1">
      手順
      <div className="grid grid-cols-6">
        <textarea
          name="step"
          className="col-span-5 bg-[#ffffff] p-2 rounded-2xl w-full resize-none h-40 focus:outline-none"
          placeholder="作り方を入力"
          value={newStep}
          onChange={handleChange}
          onKeyDown={applyNewStep}
        />
      </div>
      <div className="flex flex-col gap-1">
        {formData.stepList.map((step, index) => (
          <div key={index} className="w-full grid grid-cols-6 gap-2">
            <textarea
              name="step"
              className="col-span-5 bg-[#ffffff] p-2 rounded-2xl w-full resize-none h-40 focus:outline-none"
              value={step}
              onChange={(e) => handleStepChange(e, index)}
            />
            <button
              className="block ml-auto"
              type="button"
              onClick={() => cancelStep(index)}
            >
              <CancelBtn />
            </button>
          </div>
        ))}
      </div>
    </label>
  );
}
