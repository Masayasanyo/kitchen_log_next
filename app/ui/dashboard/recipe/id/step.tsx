'use client';

import { useEffect, useState } from 'react';
import { fetchRecipeStep } from '@/app/lib/recipe-actions';
import { StepRow } from '@/app/lib/definitions';

export default function Step(props: { recipeId: string }) {
  const [steps, setSteps] = useState<string[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const result = await fetchRecipeStep(props.recipeId);
      const data = result?.data?.map((row: StepRow) => row.name);
      if (data) {
        setSteps(data);
      }
    };
    fetch();
  }, [props.recipeId]);

  return (
    <div className="flex flex-col gap-2">
      <h3 className="">手順</h3>
      <div className="flex flex-col gap-4 bg-[#ffffff] rounded-2xl px-6 py-4">
        {steps?.map((step, index) => (
          <div key={index}>
            <div>
              {index + 1}, {step}
            </div>
            <hr className="my-2" />
          </div>
        ))}
      </div>
    </div>
  );
}
