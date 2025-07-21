'use client';

import { Recipe, SetMealForm } from '@/app/lib/definitions';
import { useState } from 'react';

export default function SetMealRecipeInput({
  formData,
  setFormData,
  recipes,
}: {
  formData: SetMealForm;
  setFormData: React.Dispatch<React.SetStateAction<SetMealForm>>;
  recipes: Recipe[];
}) {
  const [recipeList, setRecipeList] = useState<Recipe[]>([]);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value;

    if (!keyword) {
      setRecipeList([]);
      return;
    }

    const newRecipeList = recipes?.filter((recipe) =>
      recipe.title.includes(keyword),
    );

    setRecipeList(newRecipeList);
  };

  const selectRecipe = (recipe: Recipe) => {
    if (formData.recipes.some((r) => r.id === recipe.id)) return;
    setFormData((prev) => ({
      ...prev,
      recipeList: [...prev.recipes, recipe],
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
