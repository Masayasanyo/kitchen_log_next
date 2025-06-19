'use client';

import TitleInput from '@/app/ui/dashboard/set-meal/input/title-input';
import RecipeInput from '@/app/ui/dashboard/set-meal/input/recipe-input';
import RecipeList from '@/app/ui/dashboard/set-meal/input/recipe-list';
import { useEffect, useState } from 'react';
import { fetchSetMealInfo, fetchRecipeList } from '@/app/lib/set-meal-actions';
import { SetMealForm } from '@/app/lib/definitions';
import { editSetMeal, deleteSetMeal } from '@/app/lib/set-meal-actions';

interface SetMealRow {
  id: number;
  title: string;
  user_id: number;
}

interface RecipeListRow {
  id: number;
  img_url: string;
  title: string;
}

export default function EditForm(props: { setMealId: string }) {
  const [formData, setFormData] = useState<SetMealForm>({
    title: '',
    recipeList: [],
  });

  const submitForm = () => {
    editSetMeal(formData, props.setMealId);
  };

  const deletSM = () => {
    deleteSetMeal(props.setMealId);
  };

  useEffect(() => {
    const fetch = async () => {
      const setMealInfoResult = await fetchSetMealInfo(props.setMealId);
      const setMealInfoData = setMealInfoResult?.data?.map(
        (row: SetMealRow) => ({
          id: row.id,
          title: row.title,
          userId: row.user_id,
        }),
      );
      const recipeListResult = await fetchRecipeList(props.setMealId);
      const recipeListData = recipeListResult?.data?.map(
        (row: RecipeListRow) => ({
          id: row.id,
          imgUrl: row.img_url,
          title: row.title,
        }),
      );

      if (setMealInfoData && setMealInfoData.length > 0 && recipeListData) {
        setFormData({
          ...formData,
          title: setMealInfoData[0].title,
          recipeList: recipeListData,
        });
      }
    };
    fetch();
  }, [props.setMealId]);

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
      <button
        className="bg-amber-700 text-[#E8ECD7] w-full px-4 py-2 rounded-2xl"
        type="button"
        onClick={deletSM}
      >
        削除
      </button>
    </form>
  );
}
