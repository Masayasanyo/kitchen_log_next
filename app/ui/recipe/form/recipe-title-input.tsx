import { RecipeForm } from '@/app/lib/definitions';

export default function RecipeTitleInput({
  formData,
  setFormData,
}: {
  formData: RecipeForm;
  setFormData: React.Dispatch<React.SetStateAction<RecipeForm>>;
}) {
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      title: e.target.value,
    }));
  };

  return (
    <label className="flex flex-col gap-1">
      タイトル
      <input
        className="bg-[#ffffff] p-2 rounded-2xl w-full focus:outline-none"
        name="title"
        type="text"
        placeholder="料理のタイトルを入力"
        value={formData.title}
        onChange={(e) => handleChange(e)}
        required
      />
    </label>
  );
}
