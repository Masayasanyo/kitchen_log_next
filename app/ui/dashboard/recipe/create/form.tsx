'use client';

import { useState } from 'react';
import { createRecipe } from '@/app/lib/actions/recipe-actions';
import { RecipeForm } from '@/app/lib/definitions/definitions';
import TitleInput from '@/app/ui/dashboard/recipe/input/title-input';
import MemoInput from '@/app/ui/dashboard/recipe/input/memo-input';
import IngInput from '@/app/ui/dashboard/recipe/input/ing-input';
import StepInput from '@/app/ui/dashboard/recipe/input/step-input';
import ImgInput from '@/app/ui/dashboard/recipe/input/img-input';
import Button from '@/app/ui/button';

export default function CreateForm() {
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
        <p className="p-6 font-semibold text-red-500">処理に失敗しました。</p>
      )}
      {!isPending && !isError && (
        <>
          <ImgInput formData={formData} setFormData={setFormData} />
          <TitleInput formData={formData} setFormData={setFormData} />
          <MemoInput formData={formData} setFormData={setFormData} />
          <IngInput formData={formData} setFormData={setFormData} />
          <StepInput formData={formData} setFormData={setFormData} />
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
