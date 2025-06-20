'use client';

import { useEffect, useState } from 'react';
import { fetchRecipeList } from '@/app/lib/set-meal-actions';
import { createFromSetMeal } from '@/app/lib/shopping-list-actions';
import Image from 'next/image';
import Link from 'next/link';
import { Recipe, RecipeListRow } from '@/app/lib/definitions';

export default function RecipeList(props: { setMealId: string }) {
  const [recipeList, setRecipeList] = useState<Recipe[]>([]);

  const addToList = () => {
    createFromSetMeal(recipeList);
  };

  useEffect(() => {
    const fetch = async () => {
      const recipeListResult = await fetchRecipeList(props.setMealId);
      // const data = result?.data?.map((row: RecipeListRow) => ({
      //   id: row.recipes.id,
      //   imgUrl: row.recipes.img_url,
      //   title: row.recipes.title,
      //   userId: row.recipes,
      //   memo: row.recipes.memo,
      // }));
      const recipeListData = recipeListResult?.data?.map(
        (row: RecipeListRow) => {
          const recipes = row.recipes;

          if (Array.isArray(recipes)) {
            return {
              id: recipes[0].id,
              imgUrl: recipes[0].img_url,
              title: recipes[0].title,
              memo: recipes[0].memo,
              userId: recipes[0].user_id,
            };
          } else {
            return {
              id: recipes.id,
              imgUrl: recipes.img_url,
              title: recipes.title,
              memo: recipes.memo,
              userId: recipes.user_id,
            };
          }
        },
      );
      if (recipeListData && recipeListData.length > 0) {
        setRecipeList(recipeListData);
      }
    };
    fetch();
  }, [props.setMealId]);

  return (
    <div>
      <div className="flex flex-col gap-8">
        {recipeList?.map((recipe) => (
          <Link
            href={`/dashboard/recipe/${recipe.id}`}
            key={recipe.id}
            className="rounded-md p-4 flex flex-col gap-2 shadow-md"
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
      <button
        className="mt-4 bg-[#1F4529] text-[#E8ECD7] w-full px-4 py-2 rounded-2xl"
        type="button"
        onClick={addToList}
      >
        買い物リストに追加
      </button>
    </div>
  );
}
