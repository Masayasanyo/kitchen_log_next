'use client';

import RecipeImageInput from '@/app/ui/recipe/form/recipe-image-input';
import RecipeTitleInput from '@/app/ui/recipe/form/recipe-title-input';
import RecipeMemoInput from '@/app/ui/recipe/form/recipe-memo-input';
import RecipeTagInput from '@/app/ui/recipe/form/recipe-tag-input';
import RecipeIngInput from '@/app/ui/recipe/form/recipe-ing-input';
import ReciepStepInput from '@/app/ui/recipe/form/recipe-step-input';
import { buttonClass } from '@/app/lib/classnames';
import { useState } from 'react';
import { Recipe, RecipeForm } from '@/app/lib/definitions';
import { editRecipe } from '@/app/lib/actions/recipe-actions';
import ProcessingPage from '@/app/ui/processing-page';

export default function RecipeEditForm({ recipe }: { recipe: Recipe }) {
  const [isPending, setIsPending] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [formData, setFormData] = useState<RecipeForm>({
    prevImgUrl: recipe.imgUrl,
    imgUrl: recipe.imgUrl,
    imgFile: null,
    title: recipe.title,
    memo: recipe.memo,
    tagList: recipe.tags,
    ingList: recipe.ingredients,
    stepList: recipe.steps,
  });

  const submitForm = async () => {
    setIsPending(true);
    try {
      await editRecipe(formData, recipe.id);
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
        <>
          <RecipeImageInput formData={formData} setFormData={setFormData} />
          <RecipeTitleInput formData={formData} setFormData={setFormData} />
          <RecipeMemoInput formData={formData} setFormData={setFormData} />
          <RecipeTagInput formData={formData} setFormData={setFormData} />
          <RecipeIngInput formData={formData} setFormData={setFormData} />
          <ReciepStepInput formData={formData} setFormData={setFormData} />
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
        </>
      )}
    </form>
  );
}
