'use client';

import { useState } from 'react';
import { createSetMeal } from '@/app/lib/actions/set-meal-actions';
import { Recipe, SetMealForm } from '@/app/lib/definitions';
import SetMealTitleInput from './set-meal-title-input';
import SetMealRecipeInput from './set-meal-recipe-input';
import SetMealRecipeInputList from './set-meal-recipe-input-list';
import { GreenButton } from '@/app/lib/classnames';
import ProcessingPage from '@/app/ui/processing-page';

export default function CreateForm({ recipes }: { recipes: Recipe[] }) {
  const [isPending, setIsPending] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [formData, setFormData] = useState<SetMealForm>({
    title: '',
    recipes: [],
  });

  const submitForm = async () => {
    setIsPending(true);
    try {
      await createSetMeal(formData);
    } catch (error) {
      console.error(error);
      setIsError(true);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form className="flex flex-col gap-4">
      {isPending && <ProcessingPage />}
      {isError && (
        <p className="p-6 font-semibold text-red-500">処理に失敗しました。</p>
      )}
      {!isPending && !isError && (
        <div className="flex flex-col gap-4">
          <SetMealTitleInput formData={formData} setFormData={setFormData} />
          <SetMealRecipeInput
            formData={formData}
            setFormData={setFormData}
            recipes={recipes}
          />
          <SetMealRecipeInputList
            formData={formData}
            setFormData={setFormData}
          />
          <button
            type="button"
            onClick={submitForm}
            className={`${GreenButton} w-20`}
          >
            登録
          </button>
        </div>
      )}
    </form>
  );
}
