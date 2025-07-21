'use server';

import { fetchSetMeals } from '@/app/lib/actions/set-meal-actions';
import Image from 'next/image';
import Link from 'next/link';
import { SetMeal } from '@/app/lib/definitions';

export async function LatestSetMealList() {
  const setMeals = await fetchSetMeals();

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {setMeals
        ?.slice(0, 4)
        .map((setMeal) => (
          <SetMealImgCard key={setMeal.id} setMeal={setMeal} />
        ))}
    </div>
  );
}

export async function AllSetMealList({
  type,
  query,
}: {
  type: string;
  query: string;
}) {
  let setMeals = await fetchSetMeals();

  if (type === 'title' && query) {
    setMeals = setMeals?.filter((setMeal) => setMeal.title.includes(query));
  }

  if (type === 'recipeTitle' && query) {
    setMeals = setMeals?.filter((setMeal) =>
      setMeal.recipes.some((recipe) => recipe.title.includes(query)),
    );
  }

  return (
    <div className="flex flex-col md:grid md:grid-cols-2 rounded-2xl gap-6">
      {setMeals?.map((setMeal) => (
        <SetMealCard key={setMeal.id} setMeal={setMeal} />
      ))}
    </div>
  );
}

export async function SetMealCard({ setMeal }: { setMeal: SetMeal }) {
  return (
    <Link
      href={`/dashboard/set-meal/${setMeal.id}`}
      className="rounded-xl p-6 flex flex-col gap-2 shadow-md bg-[#ffffff]"
      key={setMeal.id}
    >
      <div className="grid grid-cols-2 grid-rows-2 gap-2">
        {setMeal.recipes?.map((recipe) => (
          <Image
            key={recipe.id}
            src={recipe.imgUrl || '/no_image.png'}
            width={160}
            height={90}
            alt={recipe.title}
            className="object-cover aspect-video w-full rounded-2xl"
            unoptimized
          />
        ))}
      </div>
      <p className="text-xl font-semibold">{setMeal.title}</p>
    </Link>
  );
}

export async function SetMealImgCard({ setMeal }: { setMeal: SetMeal }) {
  return (
    <Link
      href={`/dashboard/set-meal/${setMeal.id}`}
      className="rounded-xl p-6 flex flex-col gap-2 shadow-md"
      key={setMeal.id}
    >
      <div className="grid grid-cols-2 grid-rows-2 gap-2">
        {setMeal.recipes
          ?.slice(0, 4)
          .map((recipe) => (
            <Image
              src={recipe.imgUrl || '/no_image.png'}
              width={160}
              height={90}
              key={recipe.id}
              alt={recipe.title}
              className="object-cover aspect-video w-full rounded-2xl"
              unoptimized
            />
          ))}
      </div>
    </Link>
  );
}
