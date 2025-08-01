'use client';

import { useState, useRef } from 'react';
import Cancel from '@/app/ui/icons/cancel';
import { Step, RecipeForm } from '@/app/lib/definitions';
import PlusBtn from '@/app/ui/icons/plus-circle';

export default function ReciepStepInput({
  formData,
  setFormData,
}: {
  formData: RecipeForm;
  setFormData: React.Dispatch<React.SetStateAction<RecipeForm>>;
}) {
  const [newStep, setNewStep] = useState<Step>({
    id: 0,
    recipeId: 0,
    name: '',
  });

  const handleNewStepChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewStep({ ...newStep, name: e.target.value });
  };

  const submitNewStep = () => {
    if (!newStep.name) return;
    const newStepList = [
      ...formData.stepList,
      { id: 0, recipeId: 0, name: newStep.name },
    ];
    setFormData((prev) => ({
      ...prev,
      stepList: newStepList,
    }));
    setNewStep({ id: 0, recipeId: 0, name: '' });
  };

  const handleStepChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    index: number,
  ) => {
    const currentStepList = [...formData.stepList];
    currentStepList[index].name = e.target.value;
    setFormData((prev) => ({
      ...prev,
      stepList: currentStepList,
    }));
  };

  const cancelStep = (index: number) => {
    let currentStepList = [...formData.stepList];
    currentStepList = currentStepList.filter((step, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      stepList: currentStepList,
    }));
  };

  const dragStep = useRef<number>(0);
  const draggedOverStep = useRef<number>(0);
  const handleSort = () => {
    const stepClone = [...formData.stepList];
    const draggedItem = stepClone[dragStep.current];
    stepClone.splice(dragStep.current, 1);
    stepClone.splice(draggedOverStep.current, 0, draggedItem);
    setFormData((prev) => ({
      ...prev,
      stepList: stepClone,
    }));
  };

  return (
    <label className="flex flex-col gap-1">
      手順
      <div className="grid grid-cols-9 mb-4 gap-2">
        <textarea
          name="newStep"
          className="col-span-8 bg-[#ffffff] p-2 rounded-2xl w-full resize-none h-40 focus:outline-none"
          placeholder="作り方を入力"
          value={newStep.name}
          onChange={handleNewStepChange}
        />
        <button type="button" onClick={submitNewStep} className="col-span-1">
          <PlusBtn
            design="w-8 h-8 bg-[#1F4529] text-[#E8ECD7] shadow-[0_3px_0_#32633f] 
              hover:bg-[#32633f] active:bg-[#32633f] active:shadow-[0_3px_0_#32633f]"
          />
        </button>
      </div>
      <div className="flex flex-col gap-1">
        {formData.stepList.map((step, index) => (
          <div
            key={index}
            className="w-full grid grid-cols-9 gap-2"
            draggable
            onDragStart={() => (dragStep.current = index)}
            onDragEnter={() => (draggedOverStep.current = index)}
            onDragEnd={handleSort}
            onDragOver={(e) => e.preventDefault()}
          >
            <textarea
              name="newStep"
              className="col-span-8 bg-[#ffffff] p-2 rounded-2xl w-full resize-none h-40 focus:outline-none"
              value={step.name}
              onChange={(e) => handleStepChange(e, index)}
            />
            <button
              className="block col-span-1"
              type="button"
              onClick={() => cancelStep(index)}
            >
              <Cancel
                design="w-8 bg-[#CC3300] text-[#E8ECD7] shadow-[0_3px_0_#FF3366] hover:bg-[#FF3366] 
                  active:bg-[#FF3366] active:shadow-[0_3px_0_#FF3366]"
              />
            </button>
          </div>
        ))}
      </div>
    </label>
  );
}
