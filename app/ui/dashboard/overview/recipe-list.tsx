'use client';

import { useEffect, useState } from 'react';
import { fetchRecipes } from '@/app/lib/actions/recipe-actions';
import { Recipe, RecipeRow } from '@/app/lib/definitions/definitions';
import Image from 'next/image';
import Link from 'next/link';

export default function RecipeList() {
  const [recipeList, setRecipeList] = useState<Recipe[]>([]);
  useEffect(() => {
    const fetch = async () => {
      const result = await fetchRecipes();
      const data = result?.data?.map((row: RecipeRow) => ({
        id: row.id,
        imgUrl: row.img_url,
        title: row.title,
        memo: row.memo,
        userId: row.user_id,
      }));
      if (data) {
        setRecipeList(data);
      }
    };
    fetch();
  }, []);

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {recipeList?.slice(0, 4).map((recipe) => (
        <Link
          href={`/dashboard/recipe/${recipe.id}`}
          className="rounded-2xl shadow-md"
          key={recipe.id}
        >
          <div className="rounded-2xl">
            <Image
              src={recipe.imgUrl || '/no_image.png'}
              width={160}
              height={90}
              alt={recipe.title}
              className="object-cover aspect-video w-full rounded-2xl"
              unoptimized
            />
          </div>
        </Link>
      ))}
    </div>
  );
}
