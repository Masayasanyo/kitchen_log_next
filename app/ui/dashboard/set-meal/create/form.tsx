'use client';

import { useState } from 'react';
import { createSetMeal } from '@/app/lib/actions/set-meal-actions';
import { SetMealForm } from '@/app/lib/definitions/definitions';
import TitleInput from '@/app/ui/dashboard/set-meal/input/title-input';
import RecipeInput from '@/app/ui/dashboard/set-meal/input/recipe-input';
import RecipeList from '@/app/ui/dashboard/set-meal/input/recipe-list';

export default function CreateForm() {
  const [formData, setFormData] = useState<SetMealForm>({
    title: '',
    recipeList: [],
  });

  const submitForm = () => {
    createSetMeal(formData);
  };

  return (
    <form className="flex flex-col gap-4">
      <TitleInput formData={formData} setFormData={setFormData} />
      <RecipeInput formData={formData} setFormData={setFormData} />
      <RecipeList formData={formData} setFormData={setFormData} />
      <button
        className="mt-6 bg-[#1F4529] text-[#E8ECD7] w-full px-4 py-2 rounded-2xl"
        type="button"
        onClick={submitForm}
      >
        登録
      </button>
    </form>
  );
}
