'use client';

import PlusBtn from '@/app/ui/icons/plus-circle';
import { unitList } from '@/app/lib/ing-unit';
import { ShoppingListForm } from '@/app/lib/definitions';

export default function CreateItemForm({
  formData,
  setFormData,
  submitForm,
}: {
  formData: ShoppingListForm;
  setFormData: React.Dispatch<React.SetStateAction<ShoppingListForm>>;
  submitForm: () => Promise<void>;
}) {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form className="grid grid-cols-8 gap-2">
      <input
        className="bg-[#ffffff] p-2 rounded-2xl w-full col-span-3"
        placeholder="新規アイテムを入力"
        name="name"
        onChange={handleChange}
        value={formData.name}
        required
      />
      <input
        className="bg-[#ffffff] p-2 rounded-2xl w-full col-span-2"
        placeholder="量"
        name="amount"
        onChange={handleChange}
        value={formData.amount}
      />
      <select
        name="unit"
        className="col-span-2 border p-2 rounded"
        onChange={handleChange}
        value={formData.unit}
      >
        {unitList &&
          unitList.map((unit) => (
            <option key={unit.value} value={unit.value}>
              {unit.value}
            </option>
          ))}
      </select>
      <button
        className="block ml-auto col-span-1"
        type="button"
        onClick={submitForm}
      >
        <PlusBtn
          design="w-8 h-8 bg-[#1F4529] text-[#E8ECD7] shadow-[0_3px_0_#32633f] 
            hover:bg-[#32633f] active:bg-[#32633f] active:shadow-[0_3px_0_#32633f]"
        />
      </button>
    </form>
  );
}
