'use client';

import { ChildComponentProps } from '@/app/lib/definitions/definitions';

export default function MemoInput({
  formData,
  setFormData,
}: ChildComponentProps) {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      memo: e.target.value,
    });
  };

  return (
    <label className="flex flex-col gap-1">
      メモ
      <textarea
        className="bg-[#ffffff] p-2 rounded-2xl w-full resize-none h-40 focus:outline-none"
        name="memo"
        placeholder="メモを入力"
        value={formData.memo}
        onChange={handleChange}
      />
    </label>
  );
}
