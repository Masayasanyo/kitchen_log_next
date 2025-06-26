'use client';

import { useState } from 'react';
import { createRecipe } from '@/app/lib/actions/recipe-actions';
import { RecipeForm } from '@/app/lib/definitions/definitions';
import TitleInput from '@/app/ui/dashboard/recipe/input/title-input';
import MemoInput from '@/app/ui/dashboard/recipe/input/memo-input';
import IngInput from '@/app/ui/dashboard/recipe/input/ing-input';
import StepInput from '@/app/ui/dashboard/recipe/input/step-input';
import ImgInput from '@/app/ui/dashboard/recipe/input/img-input';

export default function CreateForm() {
  const [formData, setFormData] = useState<RecipeForm>({
    prevImgUrl: '',
    imgUrl: '',
    imgFile: null,
    title: '',
    memo: '',
    ingList: [],
    stepList: [],
  });

  const submitForm = () => {
    createRecipe(formData);
  };

  return (
    <form className="flex flex-col gap-4">
      <ImgInput formData={formData} setFormData={setFormData} />
      <TitleInput formData={formData} setFormData={setFormData} />
      <MemoInput formData={formData} setFormData={setFormData} />
      <IngInput formData={formData} setFormData={setFormData} />
      <StepInput formData={formData} setFormData={setFormData} />
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
