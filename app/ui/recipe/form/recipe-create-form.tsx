'use client';

import { useState } from 'react';
import { createRecipe } from '@/app/lib/actions/recipe-actions';
import { RecipeForm } from '@/app/lib/definitions';
import RecipeImageInput from '@/app/ui/recipe/form/recipe-image-input';
import RecipeTitleInput from '@/app/ui/recipe/form/recipe-title-input';
import RecipeMemoInput from '@/app/ui/recipe/form/recipe-memo-input';
import RecipeTagInput from '@/app/ui/recipe/form/recipe-tag-input';
import RecipeIngInput from '@/app/ui/recipe/form/recipe-ing-input';
import ReciepStepInput from '@/app/ui/recipe/form/recipe-step-input';
import { GreenButton } from '@/app/lib/classnames';
import PendingPage from '@/app/ui/pending-page';
import ErrorPage from '@/app/ui/error-page';
import { useRouter } from 'next/navigation';

export default function RecipeCreateForm() {
  const router = useRouter();
  const [isPending, setIsPending] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [formData, setFormData] = useState<RecipeForm>({
    prevImgUrl: '',
    imgUrl: '',
    imgFile: null,
    title: '',
    memo: '',
    tagList: [],
    ingList: [],
    stepList: [],
  });

  const submitForm = async () => {
    setIsPending(true);
    try {
      await createRecipe(formData);
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setIsPending(false);
      router.push(`/dashboard/recipe`);
    }
  };

  return (
    <form className="flex flex-col gap-4">
      {isPending && <PendingPage />}
      {error && <ErrorPage setError={setError} />}

      <div className="flex flex-col gap-4">
        <RecipeImageInput formData={formData} setFormData={setFormData} />
        <RecipeTitleInput formData={formData} setFormData={setFormData} />
        <RecipeMemoInput formData={formData} setFormData={setFormData} />
        <RecipeTagInput formData={formData} setFormData={setFormData} />
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
    </form>
  );
}
