'use client';

import TitleInput from '@/app/ui/dashboard/recipe/input/title-input';
import MemoInput from '@/app/ui/dashboard/recipe/input/memo-input';
import ImgInput from '@/app/ui/dashboard/recipe/input/img-input';
import IngInput from '@/app/ui/dashboard/recipe/input/ing-input';
import StepInput from '@/app/ui/dashboard/recipe/input/step-input';
import { useEffect, useState } from 'react';
import {
  fetchRecipeInfo,
  fetchRecipeIng,
  fetchRecipeStep,
} from '@/app/lib/actions/recipe-actions';
import {
  RecipeForm,
  RecipeRow,
  IngRow,
  StepRow,
} from '@/app/lib/definitions/definitions';
import { editRecipe, deleteRecipe } from '@/app/lib/actions/recipe-actions';

export default function EditForm(props: { recipeId: string }) {
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
      await editRecipe(formData, props.recipeId);
    } catch (error) {
      console.error(error);
      setIsError(true);
    } finally {
      setIsPending(false);
    }
  };

  const deletR = async () => {
    setIsPending(true);
    try {
      await deleteRecipe(formData, props.recipeId);
    } catch (error) {
      console.error(error);
      setIsError(true);
    } finally {
      setIsPending(false);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      const recipeInfoResult = await fetchRecipeInfo(props.recipeId);
      const recipeInfoData = recipeInfoResult?.data?.map((row: RecipeRow) => ({
        id: row.id,
        imgUrl: row.img_url,
        title: row.title,
        memo: row.memo,
        user_id: row.user_id,
      }));
      const ingResult = await fetchRecipeIng(props.recipeId);
      const ingData = ingResult?.data?.map((row: IngRow) => ({
        name: row.name as string,
        amount: row.amount as string,
        unit: row.unit as string,
      }));
      const stepResult = await fetchRecipeStep(props.recipeId);
      const stepData = stepResult?.data?.map((row: StepRow) => ({
        name: row.name as string,
      }));

      if (recipeInfoData && recipeInfoData.length > 0 && ingData && stepData) {
        setFormData((prev) => ({
          ...prev,
          prevImgUrl: recipeInfoData[0].imgUrl,
          imgUrl: recipeInfoData[0].imgUrl,
          title: recipeInfoData[0].title,
          memo: recipeInfoData[0].memo,
          ingList: ingData,
          stepList: stepData,
        }));
      }
    };
    fetch();
  }, [props.recipeId]);

  return (
    <form className="flex flex-col gap-4">
      {isPending && <p className="py-6 font-semibold">処理中...</p>}
      {isError && (
        <p className="p-6 font-semibold text-red-500">処理に失敗しました。</p>
      )}
      {!isPending && !isError && (
        <>
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
          <button
            className="bg-amber-700 text-[#E8ECD7] w-full px-4 py-2 rounded-2xl"
            type="button"
            onClick={deletR}
          >
            削除
          </button>
        </>
      )}
    </form>
  );
}
