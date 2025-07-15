'use client';

import RecipeImageInput from '@/app/ui/recipe/form/recipe-image-input';
import RecipeTitleInput from '@/app/ui/recipe/form/recipe-title-input';
import RecipeMemoInput from '@/app/ui/recipe/form/recipe-memo-input';
import RecipeIngInput from '@/app/ui/recipe/form/recipe-ing-input';
import ReciepStepInput from '@/app/ui/recipe/form/recipe-step-input';
import { buttonClass } from '@/app/lib/classnames';
import { useState } from 'react';
import { Recipe, Ingredient, Step, RecipeForm } from '@/app/lib/definitions';
import { editRecipe, deleteRecipe } from '@/app/lib/actions/recipe-actions';
import ProcessingPage from '@/app/ui/processing-page';

export default function RecipeEditForm({
  recipeId,
  recipeInfo,
  ingList,
  stepList,
}: {
  recipeId: string;
  recipeInfo: Recipe;
  ingList: Ingredient[];
  stepList: Step[];
}) {
  const [isPending, setIsPending] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [formData, setFormData] = useState<RecipeForm>({
    prevImgUrl: recipeInfo.imgUrl,
    imgUrl: recipeInfo.imgUrl,
    imgFile: null,
    title: recipeInfo.title,
    memo: recipeInfo.memo,
    ingList: ingList,
    stepList: stepList,
  });

  const submitForm = async () => {
    setIsPending(true);
    try {
      await editRecipe(formData, Number(recipeId));
    } catch (error) {
      console.error(error);
      setIsError(true);
    } finally {
      setIsPending(false);
    }
  };

  const submitDeleteRecipe = async () => {
    setIsPending(true);
    try {
      await deleteRecipe(formData.prevImgUrl, Number(recipeId));
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
            <button
              type="button"
              onClick={submitDeleteRecipe}
              className={`${buttonClass} bg-[#CC3300] text-[#E8ECD7] 
                shadow-[0_4px_0_#FF3366] hover:bg-[#FF3366] 
              active:bg-[#FF3366] active:shadow-[0_3px_0_#FF3366]`}
            >
              削除
            </button>
          </div>
        </>
      )}
    </form>
  );
}
