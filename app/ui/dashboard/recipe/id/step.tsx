'use client';

import { useEffect, useState } from 'react';
import { fetchRecipeStep } from '@/app/lib/actions/recipe-actions';
import { Step, StepRow } from '@/app/lib/definitions/definitions';

export default function Page(props: { recipeId: string }) {
  const [steps, setSteps] = useState<Step[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const result = await fetchRecipeStep(props.recipeId);
      const data = result?.data?.map((row: StepRow) => ({
        id: row.id,
        recipeId: row.recipe_id,
        name: row.name,
      }));
      if (data) {
        setSteps(data);
      }
    };
    fetch();
  }, [props.recipeId]);

  return (
    <div className="bg-[#ffffff] rounded-2xl px-6 py-4">
      <h3 className="font-medium text-xl mb-4">手順</h3>
      <div className="flex flex-col gap-2">
        {steps?.map((step, index) => (
          <div key={index}>
            <div className="font-semibold">{index + 1}</div>
            <div>{step.name}</div>
            <hr className="my-2" />
          </div>
        ))}
      </div>
    </div>
  );
}
