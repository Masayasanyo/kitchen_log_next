import Image from 'next/image';
import { Recipe } from '@/app/lib/definitions';

export default async function RecipeInfo({ recipe }: { recipe: Recipe }) {
  return (
    <div className="flex flex-col gap-4 bg-[#ffffff] rounded-2xl px-6 py-4">
      <Image
        src={recipe?.imgUrl || '/no_image.png'}
        width={160}
        height={90}
        alt="Recipe image"
        className="object-cover aspect-video rounded-2xl w-full"
        unoptimized
        priority={true}
      />
      <h2 className="text-2xl font-bold">{recipe?.title}</h2>
      <p>{recipe?.memo}</p>
      <div className="flex flex-wrap gap-2">
        {recipe.tags?.map((tag, index) => (
          <div
            key={index}
            className="bg-[#1f4529] text-white font-semibold rounded-2xl px-4 py-2"
          >
            <div>{tag.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
