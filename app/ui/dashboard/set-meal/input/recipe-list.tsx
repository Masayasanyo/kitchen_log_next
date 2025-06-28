import { SetMealChildComponentProps } from '@/app/lib/definitions/definitions';
import Image from 'next/image';
import Cancel from '@/app/ui/icons/cancel';

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
          className="bg-[#ffffff] rounded-2xl px-4 py-4 flex flex-col gap-4 shadow-md"
        >
          <button
            className="block ml-auto"
            type="button"
            onClick={() => cancelRecipe(recipe.id)}
          >
            <Cancel
              design="w-6 bg-[#CC3300] text-[#E8ECD7] shadow-[0_4px_0_#FF3366] hover:bg-[#FF3366] 
                active:bg-[#FF3366] active:shadow-[0_3px_0_#FF3366]"
            />
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
