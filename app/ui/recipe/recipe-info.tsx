import { fetchRecipeInfo } from '@/app/lib/actions/recipe-actions';
import Image from 'next/image';

export default async function RecipeInfo(props: { recipeId: string }) {
  const recipeInfo = await fetchRecipeInfo(props.recipeId);

  return (
    <div className="flex flex-col gap-4">
      <Image
        src={recipeInfo?.imgUrl || '/no_image.png'}
        width={160}
        height={90}
        alt="Recipe image"
        className="object-cover aspect-video rounded-2xl w-full"
        unoptimized
        priority={true}
      />
      <h2 className="text-xl font-semibold">{recipeInfo?.title}</h2>
      <p>{recipeInfo?.memo}</p>
    </div>
  );
}
