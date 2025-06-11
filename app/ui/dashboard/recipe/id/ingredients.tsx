'use client';

import { useEffect, useState } from 'react';
import { fetchRecipeIng } from '@/app/lib/recipe-actions';

interface Ingredients {
  name: string;
  amount: string;
}

export default function Ingredients(props: { recipeId: string }) {
  const [ingredients, setIngredients] = useState<Ingredients[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const result = await fetchRecipeIng(props.recipeId);
      const data = result?.data?.map((row: any) => ({
        name: row.name,
        amount: row.amount,
      }));
      if (data) {
        setIngredients(data);
      }
    };
    fetch();
  }, [props.recipeId]);

  return (
    <div className="flex flex-col gap-2">
      <h3>材料</h3>
      <div className="flex flex-col gap-4 bg-[#ffffff] rounded-2xl px-6 py-4">
        {ingredients?.map((ing, index) => (
          <div key={index}>
            <div>
              <span>{ing.name}</span> … <span>{ing.amount}</span>
            </div>
            <hr className="my-2" />
          </div>
        ))}
      </div>
    </div>
  );
}
