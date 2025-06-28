'use client';

import { useState } from 'react';
import { createSetMeal } from '@/app/lib/actions/set-meal-actions';
import { SetMealForm } from '@/app/lib/definitions/definitions';
import TitleInput from '@/app/ui/dashboard/set-meal/input/title-input';
import RecipeInput from '@/app/ui/dashboard/set-meal/input/recipe-input';
import RecipeList from '@/app/ui/dashboard/set-meal/input/recipe-list';
import Button from '@/app/ui/button';

export default function CreateForm() {
  const [isPending, setIsPending] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [formData, setFormData] = useState<SetMealForm>({
    title: '',
    recipeList: [],
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
      {isPending && <p className="py-6 font-semibold">処理中...</p>}
      {isError && (
        <p className="p-6 font-semibold text-red-500">処理に失敗しました。</p>
      )}
      {!isPending && !isError && (
        <>
          <TitleInput formData={formData} setFormData={setFormData} />
          <RecipeInput formData={formData} setFormData={setFormData} />
          <RecipeList formData={formData} setFormData={setFormData} />
          <Button
            title="登録"
            action={submitForm}
            color="w-25 mt-6 bg-[#1F4529] text-[#E8ECD7] shadow-[0_4px_0_#32633f] 
              hover:bg-[#32633f] active:bg-[#32633f] active:shadow-[0_3px_0_#32633f]"
          />
        </>
      )}
    </form>
  );
}
