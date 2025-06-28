'use client';

import { useEffect, useState } from 'react';
import { fetchRecipeIng } from '@/app/lib/actions/recipe-actions';
import { createFromSetMeal } from '@/app/lib/actions/shopping-list-actions';
import PlusBtn from '@/app/ui/icons/plus-circle';
import { Ingredient, IngRow } from '@/app/lib/definitions/definitions';
import { useRouter } from 'next/navigation';
import Button from '@/app/ui/button';

export default function Ingredients(props: { recipeId: string }) {
  const router = useRouter();
  const [isPending, setIsPending] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const addToList = async () => {
    setIsPending(true);
    try {
      await createFromSetMeal([
        {
          id: Number(props.recipeId),
          imgUrl: '',
          title: '',
          memo: '',
          userId: null,
        },
      ]);
    } catch (error) {
      console.error(error);
      setIsError(true);
    } finally {
      setIsPending(false);
      router.push('/dashboard/shopping-list');
    }
  };

  useEffect(() => {
    const fetch = async () => {
      const result = await fetchRecipeIng(props.recipeId);
      const data = result?.data?.map((row: IngRow) => ({
        id: row.id,
        recipeId: row.recipe_id,
        name: row.name,
        amount: row.amount,
        unit: row.unit,
      }));
      if (data) {
        setIngredients(data);
      }
    };
    fetch();
  }, [props.recipeId]);

  return (
    <div className="flex flex-col gap-2">
      {isPending && <p className="py-6 font-semibold">処理中...</p>}
      {isError && (
        <p className="p-6 font-semibold text-red-500">処理に失敗しました。</p>
      )}
      {!isPending && !isError && (
        <>
          <div className="bg-[#ffffff] rounded-2xl px-6 py-4">
            <h3 className="font-medium text-xl mb-4">材料</h3>
            <div className="flex flex-col gap-2">
              {ingredients?.map((ing, index) => (
                <div key={index}>
                  <div className="flex gap-2">
                    <p className="">{ing.name}</p>
                    <p className="">...</p>
                    <div className="flex gap-1">
                      <p className="">{ing.amount}</p>
                      {ing.unit !== 'その他' && <p className="">{ing.unit}</p>}
                    </div>
                  </div>
                  <hr className="my-2" />
                </div>
              ))}
            </div>
            <Button
              title="買い物リストに追加"
              action={addToList}
              color="mt-6 bg-[#1F4529] text-[#E8ECD7] shadow-[0_4px_0_#32633f] hover:bg-[#32633f] 
              active:bg-[#32633f] active:shadow-[0_3px_0_#32633f]"
            />
          </div>

          {/* <button
            type="button"
            onClick={addToList}
            className="flex gap-2 items-center justify-center mt-2"
          >
            買い物リストに追加
            <PlusBtn cN={'w-6'} />
          </button> */}
        </>
      )}
    </div>
  );
}
