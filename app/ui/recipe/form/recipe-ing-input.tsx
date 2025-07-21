'use client';

import { useState, useRef } from 'react';
import { Ingredient, RecipeForm } from '@/app/lib/definitions';
import PlusBtn from '@/app/ui/icons/plus-circle';
import Cancel from '@/app/ui/icons/cancel';
import { unitList } from '@/app/lib/ing-unit';

export default function RecipeIngInput({
  formData,
  setFormData,
}: {
  formData: RecipeForm;
  setFormData: React.Dispatch<React.SetStateAction<RecipeForm>>;
}) {
  const [newIng, setNewIng] = useState<Ingredient>({
    id: 0,
    recipeId: 0,
    name: '',
    amount: '',
    unit: 'g',
  });

  const handleNewIngChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    if (e.target.name === 'ingName') {
      setNewIng({
        ...newIng,
        name: e.target.value,
      });
    }
    if (e.target.name === 'ingAmount') {
      setNewIng({
        ...newIng,
        amount: e.target.value,
      });
    }
    if (e.target.name === 'ingUnit') {
      setNewIng({
        ...newIng,
        unit: e.target.value,
      });
    }
  };

  const submitNewIng = () => {
    if (!newIng.name) return;
    const newIngList = [
      ...formData.ingList,
      {
        id: 0,
        name: newIng.name,
        amount: newIng.amount,
        unit: newIng.unit,
        recipeId: 0,
      },
    ];
    setFormData((prev) => ({
      ...prev,
      ingList: newIngList,
    }));
    setNewIng({ id: 0, recipeId: 0, name: '', amount: '', unit: 'g' });
  };

  const handleIngChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>,
    index: number,
  ) => {
    const currentIngList = [...formData.ingList];
    if (e.target.name === 'ingName') {
      currentIngList[index].name = e.target.value;
    }
    if (e.target.name === 'ingAmount') {
      currentIngList[index].amount = e.target.value;
    }
    if (e.target.name === 'ingUnit') {
      currentIngList[index].unit = e.target.value;
    }
    setFormData((prev) => ({
      ...prev,
      ingList: currentIngList,
    }));
  };

  const cancelIng = (index: number) => {
    let currentIngList = [...formData.ingList];
    currentIngList = currentIngList.filter((ing, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      ingList: currentIngList,
    }));
  };

  const dragIng = useRef<number>(0);
  const draggedOverIng = useRef<number>(0);
  const handleSort = () => {
    const ingClone = [...formData.ingList];
    const draggedItem = ingClone[dragIng.current];
    ingClone.splice(dragIng.current, 1);
    ingClone.splice(draggedOverIng.current, 0, draggedItem);
    setFormData((prev) => ({
      ...prev,
      ingList: ingClone,
    }));
  };

  return (
    <label className="flex flex-col gap-1">
      材料
      <div className="grid grid-cols-9 gap-2 mb-4">
        <input
          name="ingName"
          className="col-span-4 bg-[#ffffff] p-2 rounded-2xl w-full focus:outline-none"
          type="text"
          placeholder="材料名を入力"
          value={newIng.name}
          onChange={handleNewIngChange}
        />
        <input
          name="ingAmount"
          className="col-span-2 bg-[#ffffff] p-2 rounded-2xl w-full focus:outline-none"
          type="text"
          placeholder="量を入力"
          value={newIng.amount}
          onChange={handleNewIngChange}
        />
        <select
          name="ingUnit"
          className="col-span-2 border p-2 rounded"
          value={newIng.unit}
          onChange={(e) => {
            handleNewIngChange(e);
          }}
        >
          {unitList &&
            unitList.map((unit) => (
              <option key={unit.value} value={unit.value}>
                {unit.value}
              </option>
            ))}
        </select>
        <button type="button" onClick={submitNewIng} className="col-span-1">
          <PlusBtn
            design="w-8 h-8 bg-[#1F4529] text-[#E8ECD7] shadow-[0_4px_0_#32633f] 
              hover:bg-[#32633f] active:bg-[#32633f] active:shadow-[0_3px_0_#32633f]"
          />
        </button>
      </div>
      <div className="flex flex-col gap-1">
        {formData.ingList?.map((ing, index) => (
          <div
            key={index}
            className="w-full grid grid-cols-9 gap-2"
            draggable
            onDragStart={() => (dragIng.current = index)}
            onDragEnter={() => (draggedOverIng.current = index)}
            onDragEnd={handleSort}
            onDragOver={(e) => e.preventDefault()}
          >
            <input
              name="ingName"
              className="col-span-4 bg-[#ffffff] p-2 rounded-2xl w-full focus:outline-none"
              type="text"
              value={ing.name}
              onChange={(e) => handleIngChange(e, index)}
            />
            <input
              name="ingAmount"
              className="col-span-2 bg-[#ffffff] p-2 rounded-2xl w-full focus:outline-none"
              type="text"
              value={ing.amount}
              onChange={(e) => handleIngChange(e, index)}
            />
            <select
              name="ingUnit"
              className="col-span-2 border p-2 rounded"
              value={ing.unit}
              onChange={(e) => handleIngChange(e, index)}
            >
              {unitList &&
                unitList.map((unit) => (
                  <option key={unit.value} value={unit.value}>
                    {unit.value}
                  </option>
                ))}
            </select>
            <button
              className="col-span-1 block"
              type="button"
              onClick={() => cancelIng(index)}
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
