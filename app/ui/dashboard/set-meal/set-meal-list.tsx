'use client';

import { useEffect, useState } from 'react';
import { fetchSetMeals } from '@/app/lib/set-meal-actions';
import Image from 'next/image';
import Link from 'next/link';
import SearchSetMeal from '@/app/ui/dashboard/set-meal/search/search-set-meal';

interface Recipe {
  id: number;
  title: string;
  img_url: string;
}

interface RecipeRow {
  recipes: {
    id: number;
    title: string;
    img_url: string;
  };
}

interface Row {
  id: number;
  title: string;
  user_id: number;
  recipes: RecipeRow[];
}

interface SetMeal {
  id: number;
  title: string;
  userId: number;
  recipes: Recipe[];
}

export default function SetMealList() {
  const [setMealList, setSetMealList] = useState<SetMeal[]>([]);
  useEffect(() => {
    const fetch = async () => {
      const result = await fetchSetMeals();
      const data = result?.data?.map((row: Row) => ({
        id: row.id,
        title: row.title,
        userId: row.user_id,
        recipes: row.recipes.map((r) => r.recipes),
      }));
      if (data) {
        setSetMealList(data);
      }
    };
    fetch();
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <SearchSetMeal setSetMealList={setSetMealList} />
      {setMealList?.map((setMeal) => (
        <Link
          href={`/dashboard/set-meal/${setMeal.id}`}
          className="rounded-md p-4 flex flex-col gap-2 shadow-md"
          key={setMeal.id}
        >
          <div className="grid grid-cols-2 grid-rows-2 gap-2">
            {setMeal.recipes?.map((recipe) => (
              <Image
                key={recipe.id}
                src={recipe.img_url || '/no_image.png'}
                width={160}
                height={90}
                alt={recipe.title}
                className="object-cover aspect-video w-full"
              />
            ))}
          </div>
          <p>{setMeal.title}</p>
        </Link>
      ))}
    </div>
  );
}
