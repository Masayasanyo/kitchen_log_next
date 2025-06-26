'use client';

import { useEffect, useState } from 'react';
import { fetchRecipeIng } from '@/app/lib/actions/recipe-actions';
import { createFromSetMeal } from '@/app/lib/actions/shopping-list-actions';
import PlusBtn from '@/app/ui/icons/plus-btn';
import { Ingredient, IngRow } from '@/app/lib/definitions/definitions';

export default function Ingredients(props: { recipeId: string }) {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const addToList = () => {
    createFromSetMeal([
      {
        id: Number(props.recipeId),
        imgUrl: '',
        title: '',
        memo: '',
        userId: null,
      },
    ]);
  };

  useEffect(() => {
    const fetch = async () => {
      const result = await fetchRecipeIng(props.recipeId);
      const data = result?.data?.map((row: IngRow) => ({
        id: row.id,
        recipeId: row.recipe_id,
        name: row.name,
        amount: row.amount,
        unit: row.unit,
      }));
      if (data) {
        setIngredients(data);
      }
    };
    fetch();
  }, [props.recipeId]);

  return (
    <div className="flex flex-col gap-2">
      <div className="bg-[#ffffff] rounded-2xl px-6 py-4">
        <h3 className="font-medium text-xl mb-4">材料</h3>
        <div className="flex flex-col gap-2">
          {ingredients?.map((ing, index) => (
            <div key={index}>
              <div className="flex gap-2">
                <p className="">{ing.name}</p>
                <p className="">...</p>
                <div className="flex gap-1">
                  <p className="">{ing.amount}</p>
                  {ing.unit !== 'その他' && <p className="">{ing.unit}</p>}
                </div>
              </div>
              <hr className="my-2" />
            </div>
          ))}
        </div>
      </div>
      <button
        type="button"
        onClick={addToList}
        className="flex gap-2 items-center justify-center mt-2"
      >
        買い物リストに追加
        <PlusBtn cN={'w-6'} />
      </button>
    </div>
  );
}
