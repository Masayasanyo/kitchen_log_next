'use client';

import { RecipeForm } from '@/app/lib/definitions';

export default function RecipeMemoInput({
  formData,
  setFormData,
}: {
  formData: RecipeForm;
  setFormData: React.Dispatch<React.SetStateAction<RecipeForm>>;
}) {
  const handleChange = async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      memo: e.target.value,
    }));
  };

  return (
    <label className="flex flex-col gap-1">
      メモ
      <textarea
        className="bg-[#ffffff] p-2 rounded-2xl w-full resize-none h-40 focus:outline-none"
        name="memo"
        placeholder="メモを入力"
        value={formData.memo}
        onChange={(e) => handleChange(e)}
      />
    </label>
  );
}
