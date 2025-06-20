'use client';

import { useEffect, useState } from 'react';
import { fetchRecipes } from '@/app/lib/recipe-actions';
import { Recipe, RecipeRow } from '@/app/lib/definitions';
import Image from 'next/image';
import Link from 'next/link';
import SearchRecipe from '@/app/ui/dashboard/recipe/search/search-recipe';

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
    <div className="flex flex-col gap-8">
      <SearchRecipe setRecipeList={setRecipeList} />
      <div className="md:grid md:grid-cols-4 gap-4">
        {recipeList?.map((recipe) => (
          <Link
            href={`/dashboard/recipe/${recipe.id}`}
            className="rounded-md p-4 flex flex-col gap-2 shadow-md"
            key={recipe.id}
          >
            <Image
              src={recipe.imgUrl || '/no_image.png'}
              width={160}
              height={90}
              alt={recipe.title}
              className="object-cover aspect-video w-full"
            />
            <p>{recipe.title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
