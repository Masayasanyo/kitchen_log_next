import { SetMeal } from '@/app/lib/definitions';
import Image from 'next/image';
import Link from 'next/link';

export default async function Page({ setMeal }: { setMeal: SetMeal }) {
  return (
    <div className="flex flex-col gap-4 bg-[#ffffff] p-6 rounded-2xl">
      <h2 className="text-2xl font-bold">{setMeal?.title}</h2>
      <div className="grid grid-cols-1 gap-8 md:grid md:grid-cols-4">
        {setMeal.recipes?.map((recipe) => (
          <Link
            href={`/dashboard/recipe/${recipe.id}`}
            key={recipe.id}
            className=" rounded-2xl p-6 flex flex-col gap-2 shadow-md"
          >
            <Image
              src={recipe.imgUrl || '/no_image.png'}
              width={160}
              height={90}
              alt={recipe.title}
              className="object-cover aspect-video w-full rounded-2xl"
              unoptimized
            />
            <p className="text-xl font-semibold">{recipe.title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
