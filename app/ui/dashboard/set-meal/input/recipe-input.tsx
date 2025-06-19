'use client';

import { SetMealChildComponentProps } from '@/app/lib/definitions';
import { useState } from 'react';
import { fetchRecipeSugList } from '@/app/lib/set-meal-actions';

interface RecipeSug {
  id: number;
  imgUrl: string;
  title: string;
  memo: string;
  userId: string;
}

export default function RecipeInput({
  formData,
  setFormData,
}: SetMealChildComponentProps) {
  const [recipeList, setRecipeList] = useState<RecipeSug[]>([]);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value;

    const result = await fetchRecipeSugList(keyword);
    const data = result?.data?.map((row: any) => ({
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

  const selectRecipe = (recipe: RecipeSug) => {
    if (formData.recipeList.some((r) => r.id === recipe.id)) return;
    setFormData((prev) => ({
      ...prev,
      recipeList: [...prev.recipeList, recipe],
    }));
    setRecipeList([]);
  };

  return (
    <label className="flex flex-col gap-1">
      レシピ
      <input
        className="bg-[#ffffff] p-2 rounded-2xl w-full focus:outline-none"
        name="search"
        type="search"
        placeholder="レシピ名を入力"
        onChange={handleChange}
      />
      <div>
        {recipeList.map((recipe) => (
          <div
            key={recipe.id}
            onClick={() => selectRecipe(recipe)}
            className="p-2 bg-[#f3eeee] my-2 rounded-2xl"
          >
            <p>{recipe.title}</p>
          </div>
        ))}
      </div>
    </label>
  );
}
