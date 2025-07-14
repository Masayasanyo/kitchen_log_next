'use client';

import { useState } from 'react';
import { createRecipe } from '@/app/lib/actions/recipe-actions';
import { RecipeForm } from '@/app/lib/definitions';
import RecipeImageInput from '@/app/ui/recipe/form/recipe-image-input';
import RecipeTitleInput from '@/app/ui/recipe/form/recipe-title-input';
import RecipeMemoInput from '@/app/ui/recipe/form/recipe-memo-input';
import RecipeIngInput from '@/app/ui/recipe/form/recipe-ing-input';
import ReciepStepInput from '@/app/ui/recipe/form/recipe-step-input';
import { GreenButton } from '@/app/lib/classnames';

export default function RecipeCreateForm() {
  const [isPending, setIsPending] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [formData, setFormData] = useState<RecipeForm>({
    prevImgUrl: '',
    imgUrl: '',
    imgFile: null,
    title: '',
    memo: '',
    ingList: [],
    stepList: [],
  });

  const submitForm = async () => {
    setIsPending(true);
    try {
      await createRecipe(formData);
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
        <p className="py-6 font-semibold text-red-500">処理に失敗しました。</p>
      )}
      {!isPending && !isError && (
        <div className="flex flex-col gap-4">
          <RecipeImageInput formData={formData} setFormData={setFormData} />
          <RecipeTitleInput formData={formData} setFormData={setFormData} />
          <RecipeMemoInput formData={formData} setFormData={setFormData} />
          <RecipeIngInput formData={formData} setFormData={setFormData} />
          <ReciepStepInput formData={formData} setFormData={setFormData} />
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
