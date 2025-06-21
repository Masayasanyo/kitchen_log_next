'use client';

import { ChildComponentProps } from '@/app/lib/definitions/definitions';

export default function TitleInput({
  formData,
  setFormData,
}: ChildComponentProps) {
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
        placeholder="料理のタイトルを入力"
        onChange={handleChange}
        value={formData.title}
        required
      />
    </label>
  );
}
