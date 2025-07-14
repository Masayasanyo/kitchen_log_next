'use client';

import { Recipe, SetMealChildComponentProps } from '@/app/lib/definitions';
import { useState } from 'react';

interface ExtendedSetMealChildComponentProps
  extends SetMealChildComponentProps {
  AllRecipeList: Recipe[];
}

export default function SetMealRecipeInput({
  formData,
  setFormData,
  AllRecipeList,
}: ExtendedSetMealChildComponentProps) {
  const [recipeList, setRecipeList] = useState<Recipe[]>([]);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value;

    if (!keyword) {
      setRecipeList([]);
      return;
    }

    const newRecipeList = AllRecipeList?.filter((recipe) =>
      recipe.title.includes(keyword),
    );

    setRecipeList(newRecipeList);
  };

  const selectRecipe = (recipe: Recipe) => {
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
        required
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
