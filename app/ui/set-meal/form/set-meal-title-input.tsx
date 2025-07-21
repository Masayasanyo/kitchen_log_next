'use client';

import { SetMealForm } from '@/app/lib/definitions';

export default function SetMealTitleInput({
  formData,
  setFormData,
}: {
  formData: SetMealForm;
  setFormData: React.Dispatch<React.SetStateAction<SetMealForm>>;
}) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      title: e.target.value,
    });
  };

  return (
    <label className="flex flex-col gap-1">
      タイトル
      <input
        className="bg-[#ffffff] p-2 rounded-2xl w-full focus:outline-none"
        name="title"
        type="text"
        placeholder="献立のタイトルを入力"
        onChange={handleChange}
        value={formData.title}
        required
      />
    </label>
  );
}
