'use client';

import { useState, useRef } from 'react';
import { NewIng, ChildComponentProps } from '@/app/lib/definitions/definitions';
import PlusBtn from '@/app/ui/icons/plus-circle';
import Cancel from '@/app/ui/icons/cancel';

export default function IngInput({
  formData,
  setFormData,
}: ChildComponentProps) {
  const [newIng, setNewIng] = useState<NewIng>({
    name: '',
    amount: '',
    unit: 'g',
  });
  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>,
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
  const applyNewIng = () => {
    if (!newIng.name) return;
    const newIngList = [
      ...formData.ingList,
      {
        name: newIng.name,
        amount: newIng.amount,
        unit: newIng.unit,
      },
    ];
    setFormData({
      ...formData,
      ingList: newIngList,
    });
    setNewIng({ name: '', amount: '', unit: 'g' });
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

  const dragIng = useRef<number>(0);
  const draggedOverIng = useRef<number>(0);
  const handleSort = () => {
    const ingClone = [...formData.ingList];
    const draggedItem = ingClone[dragIng.current];
    ingClone.splice(dragIng.current, 1);
    ingClone.splice(draggedOverIng.current, 0, draggedItem);
    setFormData({
      ...formData,
      ingList: ingClone,
    });
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
          onChange={handleChange}
        />
        <input
          name="ingAmount"
          className="col-span-2 bg-[#ffffff] p-2 rounded-2xl w-full focus:outline-none"
          type="text"
          placeholder="量を入力"
          value={newIng.amount}
          onChange={handleChange}
        />
        <select
          name="ingUnit"
          className="col-span-2 border p-2 rounded"
          value={newIng.unit}
          onChange={(e) => {
            handleChange(e);
          }}
        >
          <option value="g">g</option>
          <option value="kg">kg</option>
          <option value="mL">mL</option>
          <option value="L">L</option>
          <option value="大さじ">大さじ</option>
          <option value="小さじ">小さじ</option>
          <option value="カップ">カップ</option>
          <option value="個">個</option>
          <option value="本">本</option>
          <option value="枚">枚</option>
          <option value="片">片</option>
          <option value="適量">適量</option>
          <option value="少々">少々</option>
          <option value="その他">その他</option>
        </select>
        <button type="button" onClick={applyNewIng} className="col-span-1">
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
            onDragOver={(e) => e.preventDefault}
            data-ing-index={index}
            onTouchStart={() => {
              dragIng.current = index;
            }}
            onTouchMove={(e) => {
              const touch = e.touches[0];
              const target = document.elementFromPoint(
                touch.clientX,
                touch.clientY,
              );
              if (!target) return;
              const ingItem = target.closest('[data-ing-index]');
              if (ingItem) {
                const overIndex = Number(
                  ingItem.getAttribute('data-ing-index'),
                );
                if (!isNaN(overIndex)) {
                  draggedOverIng.current = overIndex;
                }
              }
            }}
            onTouchEnd={() => {
              if (
                dragIng.current !== null &&
                draggedOverIng.current !== null &&
                dragIng.current !== draggedOverIng.current
              ) {
                const ingClone = [...formData.ingList];
                const draggedItem = ingClone[dragIng.current];
                ingClone.splice(dragIng.current, 1);
                ingClone.splice(draggedOverIng.current, 0, draggedItem);
                setFormData({
                  ...formData,
                  ingList: ingClone,
                });
              }
              dragIng.current = 0;
              draggedOverIng.current = 0;
            }}
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
              <option value="g">g</option>
              <option value="kg">kg</option>
              <option value="mL">mL</option>
              <option value="L">L</option>
              <option value="大さじ">大さじ</option>
              <option value="小さじ">小さじ</option>
              <option value="カップ">カップ</option>
              <option value="個">個</option>
              <option value="本">本</option>
              <option value="枚">枚</option>
              <option value="片">片</option>
              <option value="適量">適量</option>
              <option value="少々">少々</option>
              <option value="その他">その他</option>
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
