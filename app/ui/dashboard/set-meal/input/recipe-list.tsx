import { SetMealChildComponentProps } from '@/app/lib/definitions/definitions';
import CancelBtn from '@/app/ui/icons/cancel-btn';
import Image from 'next/image';

export default function RecipeList({
  formData,
  setFormData,
}: SetMealChildComponentProps) {
  const cancelRecipe = (id: number | null) => {
    let currentList = [...formData.recipeList];
    currentList = currentList.filter((recipe) => recipe.id !== id);
    setFormData({
      ...formData,
      recipeList: currentList,
    });
  };

  return (
    <div className="md:grid md:grid-cols-4 gap-4">
      {formData.recipeList.map((recipe) => (
        <div
          key={recipe.id}
          className="rounded-md p-4 flex flex-col gap-2 shadow-md"
        >
          <button
            className="block ml-auto"
            type="button"
            onClick={() => cancelRecipe(recipe.id)}
          >
            <CancelBtn />
          </button>
          <Image
            width={160}
            height={90}
            src={recipe.imgUrl || '/no_image.png'}
            alt="recipe image"
            className="object-cover aspect-video w-full"
          />
          <p>{recipe.title}</p>
        </div>
      ))}
    </div>
  );
}
