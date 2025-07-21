'use client';

import SetMealTitleInput from '@/app/ui/set-meal/form/set-meal-title-input';
import SetMealRecipeInput from '@/app/ui/set-meal/form/set-meal-recipe-input';
import SetMealRecipeInputList from '@/app/ui/set-meal/form/set-meal-recipe-input-list';
import { useState } from 'react';
import { SetMealForm, SetMeal, Recipe } from '@/app/lib/definitions';
import { editSetMeal } from '@/app/lib/actions/set-meal-actions';
import { buttonClass } from '@/app/lib/classnames';
import PendingPage from '@/app/ui/pending-page';
import ErrorPage from '@/app/ui/error-page';
import { useRouter } from 'next/navigation';

export default function SetMealEditForm({
  setMeal,
  recipes,
}: {
  setMeal: SetMeal;
  recipes: Recipe[];
}) {
  const router = useRouter();
  const [isPending, setIsPending] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [formData, setFormData] = useState<SetMealForm>({
    title: setMeal.title,
    recipes: setMeal.recipes,
  });

  const submitForm = async () => {
    setIsPending(true);
    try {
      await editSetMeal(formData, setMeal.id);
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setIsPending(false);
      router.push(`/dashboard/set-meal/${setMeal.id}`);
    }
  };

  return (
    <form className="flex flex-col gap-4">
      {isPending && <PendingPage />}
      {error && <ErrorPage setError={setError} />}

      <SetMealTitleInput formData={formData} setFormData={setFormData} />
      <SetMealRecipeInput
        formData={formData}
        setFormData={setFormData}
        recipes={recipes}
      />
      <SetMealRecipeInputList formData={formData} setFormData={setFormData} />
      <div className="flex gap-4 mt-6">
        <button
          type="button"
          onClick={submitForm}
          className={`${buttonClass} bg-[#1F4529] text-[#E8ECD7] 
                shadow-[0_4px_0_#32633f] hover:bg-[#32633f] active:bg-[#32633f] 
                active:shadow-[0_3px_0_#32633f]`}
        >
          登録
        </button>
      </div>
    </form>
  );
}
