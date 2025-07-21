import Image from 'next/image';
import { Recipe } from '@/app/lib/definitions';

export default async function RecipeInfo({ recipe }: { recipe: Recipe }) {
  return (
    <div className="flex flex-col gap-4">
      <Image
        src={recipe?.imgUrl || '/no_image.png'}
        width={160}
        height={90}
        alt="Recipe image"
        className="object-cover aspect-video rounded-2xl w-full"
        unoptimized
        priority={true}
      />
      <h2 className="text-xl font-semibold">{recipe?.title}</h2>
      <p>{recipe?.memo}</p>
    </div>
  );
}
