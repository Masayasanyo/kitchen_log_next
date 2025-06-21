'use client';

import { useState } from 'react';
import CancelBtn from '@/app/ui/icons/cancel-btn';
import { NewIng, ChildComponentProps } from '@/app/lib/definitions/definitions';

export default function IngInput({
  formData,
  setFormData,
}: ChildComponentProps) {
  const [newIng, setNewIng] = useState<NewIng>({ name: '', amount: '' });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'ing-name') {
      setNewIng({
        ...newIng,
        name: e.target.value,
      });
    } else {
      setNewIng({
        ...newIng,
        amount: e.target.value,
      });
    }
  };
  const applyNewIng = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing || e.key !== 'Enter') return;
    if (!newIng.name || !newIng.amount) return;
    const newIngList = [
      ...formData.ingList,
      {
        name: newIng.name,
        amount: newIng.amount,
      },
    ];
    setFormData({
      ...formData,
      ingList: newIngList,
    });
    setNewIng({ name: '', amount: '' });
  };
  const handleIngChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const currentIngList = [...formData.ingList];
    if (e.target.name === 'ing-name') {
      currentIngList[index].name = e.target.value;
    } else {
      currentIngList[index].amount = e.target.value;
    }
    setFormData({
      ...formData,
      ingList: currentIngList,
    });
  };
  const cancelIng = (index: number) => {
    let currentIngList = [...formData.ingList];
    currentIngList = currentIngList.filter((ing, i) => i !== index);
    setFormData({
      ...formData,
      ingList: currentIngList,
    });
  };

  return (
    <label className="flex flex-col gap-1">
      材料
      <div className="grid grid-cols-6 gap-2">
        <input
          name="ing-name"
          className="col-span-3 bg-[#ffffff] p-2 rounded-2xl w-full focus:outline-none"
          type="text"
          placeholder="材料名を入力"
          value={newIng.name}
          onChange={handleChange}
          onKeyDown={applyNewIng}
        />
        <input
          name="ing-amount"
          className="col-span-2 bg-[#ffffff] p-2 rounded-2xl w-full focus:outline-none"
          type="text"
          placeholder="量を入力"
          value={newIng.amount}
          onChange={handleChange}
          onKeyDown={applyNewIng}
        />
      </div>
      <div className="flex flex-col gap-1">
        {formData.ingList?.map((ing, index) => (
          <div key={index} className="w-full grid grid-cols-6 gap-2">
            <input
              name="ing-name"
              className="col-span-3 bg-[#ffffff] p-2 rounded-2xl w-full focus:outline-none"
              type="text"
              value={ing.name}
              onChange={(e) => handleIngChange(e, index)}
            />
            <input
              name="ing-amount"
              className="col-span-2 bg-[#ffffff] p-2 rounded-2xl w-full focus:outline-none"
              type="text"
              value={ing.amount}
              onChange={(e) => handleIngChange(e, index)}
            />
            <button
              className="block ml-auto"
              type="button"
              onClick={() => cancelIng(index)}
            >
              <CancelBtn />
            </button>
          </div>
        ))}
      </div>
    </label>
  );
}
