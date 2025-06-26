'use client';

import { useEffect, useState } from 'react';
import { fetchSetMeals } from '@/app/lib/actions/set-meal-actions';
import Image from 'next/image';
import Link from 'next/link';
import { SetMealRow, SetMeal } from '@/app/lib/definitions/definitions';

export default function SetMealList() {
  const [setMealList, setSetMealList] = useState<SetMeal[]>([]);
  useEffect(() => {
    const fetch = async () => {
      const result = await fetchSetMeals();
      const data = result?.data?.map((row: SetMealRow) => ({
        id: row.id,
        title: row.title,
        userId: row.user_id,
        recipes: row.recipes?.map((r) => r.recipes),
      }));
      if (data) {
        setSetMealList(data);
      }
    };
    fetch();
  }, []);

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {setMealList?.slice(0, 4).map((setMeal) => (
        <Link
          href={`/dashboard/set-meal/${setMeal.id}`}
          className="rounded-md p-4 flex flex-col gap-2 shadow-md"
          key={setMeal.id}
        >
          <div className="grid grid-cols-2 grid-rows-2 gap-2">
            {setMeal.recipes?.slice(0, 4).map((recipe) => (
              <div className="rounded-2xl" key={recipe.id}>
                <Image
                  src={recipe.img_url || '/no_image.png'}
                  width={160}
                  height={90}
                  alt={recipe.title}
                  className="object-cover aspect-video w-full rounded-2xl"
                  unoptimized
                />
              </div>
            ))}
          </div>
        </Link>
      ))}
    </div>
  );
}
