import { SetMealChildComponentProps } from '@/app/lib/definitions/definitions';
import Image from 'next/image';
import Trash from '@/app/ui/icons/trash';

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
    <div className="md:grid md:grid-cols-4 grid grid-cols-2 gap-4">
      {formData.recipeList.map((recipe) => (
        <div
          key={recipe.id}
          className="bg-[#ffffff] rounded-2xl p-4 flex flex-col gap-2 shadow-md"
        >
          <button
            className="block ml-auto"
            type="button"
            onClick={() => cancelRecipe(recipe.id)}
          >
            <Trash width="w-6" />
          </button>
          <Image
            width={160}
            height={90}
            src={recipe.imgUrl || '/no_image.png'}
            alt="recipe image"
            className="object-cover aspect-video w-full"
            unoptimized
          />
          <p>{recipe.title}</p>
        </div>
      ))}
    </div>
  );
}
