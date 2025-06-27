'use client';

import TitleInput from '@/app/ui/dashboard/set-meal/input/title-input';
import RecipeInput from '@/app/ui/dashboard/set-meal/input/recipe-input';
import RecipeList from '@/app/ui/dashboard/set-meal/input/recipe-list';
import { useEffect, useState } from 'react';
import {
  fetchSetMealInfo,
  fetchRecipeList,
} from '@/app/lib/actions/set-meal-actions';
import {
  SetMealForm,
  SetMealInfoRow,
  RecipeListRow,
} from '@/app/lib/definitions/definitions';
import { editSetMeal, deleteSetMeal } from '@/app/lib/actions/set-meal-actions';

export default function EditForm(props: { setMealId: string }) {
  const [isPending, setIsPending] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [formData, setFormData] = useState<SetMealForm>({
    title: '',
    recipeList: [],
  });

  const submitForm = async () => {
    editSetMeal(formData, props.setMealId);

    setIsPending(true);
    try {
      await editSetMeal(formData, props.setMealId);
    } catch (error) {
      console.error(error);
      setIsError(true);
    } finally {
      setIsPending(false);
    }
  };

  const deletSM = async () => {
    setIsPending(true);
    try {
      await deleteSetMeal(props.setMealId);
    } catch (error) {
      console.error(error);
      setIsError(true);
    } finally {
      setIsPending(false);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      const setMealInfoResult = await fetchSetMealInfo(props.setMealId);
      const setMealInfoData = setMealInfoResult?.data?.map(
        (row: SetMealInfoRow) => ({
          id: row.id,
          title: row.title,
          userId: row.user_id,
        }),
      );
      const recipeListResult = await fetchRecipeList(props.setMealId);

      const recipeListData = recipeListResult?.data?.map(
        (row: RecipeListRow) => {
          const recipes = row.recipes;

          if (Array.isArray(recipes)) {
            return {
              id: recipes[0].id,
              imgUrl: recipes[0].img_url,
              title: recipes[0].title,
            };
          } else {
            return {
              id: recipes.id,
              imgUrl: recipes.img_url,
              title: recipes.title,
            };
          }
        },
      );

      if (setMealInfoData && setMealInfoData.length > 0 && recipeListData) {
        setFormData((prev) => ({
          ...prev,
          title: setMealInfoData[0].title,
          recipeList: recipeListData,
        }));
      }
    };
    fetch();
  }, [props.setMealId]);

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
            onClick={deletSM}
          >
            削除
          </button>
        </>
      )}
    </form>
  );
}
