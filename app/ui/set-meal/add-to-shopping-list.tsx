'use client';

import { GreenButton } from '@/app/lib/classnames';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Recipe } from '@/app/lib/definitions';
import { createFromRecipe } from '@/app/lib/actions/shopping-list-actions';

export default function AddToShoppingList({
  recipeList,
}: {
  recipeList: Recipe[];
}) {
  const router = useRouter();
  const [isPending, setIsPending] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const addToList = async () => {
    setIsPending(true);
    try {
      await createFromRecipe(recipeList);
    } catch (error) {
      console.error(error);
      setIsError(true);
    } finally {
      setIsPending(false);
      router.push('/dashboard/shopping-list');
    }
  };

  return (
    <div>
      {isPending && <p className="py-6 font-semibold">処理中...</p>}
      {isError && (
        <p className="p-6 font-semibold text-red-500">処理に失敗しました。</p>
      )}
      {!isPending && !isError && (
        <button onClick={addToList} className={`${GreenButton} mt-6`}>
          買い物リストに追加
        </button>
      )}
    </div>
  );
}
