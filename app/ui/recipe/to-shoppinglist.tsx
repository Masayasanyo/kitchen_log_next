'use client';

import { useState } from 'react';
import { createFromRecipe } from '@/app/lib/actions/shopping-list-actions';
import { useRouter } from 'next/navigation';
import { buttonClass } from '@/app/lib/classnames';

export default function ToShoppingList(props: { recipeId: string }) {
  const router = useRouter();
  const [error, setError] = useState<boolean>(false);
  const [isPending, setIsPending] = useState<boolean>(false);
  const addToShoppingList = async () => {
    setIsPending(true);
    try {
      await createFromRecipe([
        {
          id: Number(props.recipeId),
          imgUrl: '',
          title: '',
          memo: '',
          userId: null,
        },
      ]);
      router.push('/dashboard/shopping-list');
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div>
      <button
        onClick={addToShoppingList}
        className={`${buttonClass} mt-4 bg-[#1F4529] text-[#E8ECD7] 
            shadow-[0_4px_0_#32633f] hover:bg-[#32633f] active:bg-[#32633f] 
            active:shadow-[0_3px_0_#32633f]`}
      >
        買い物リストに追加
      </button>

      {isPending && <p className="mt-2 text-sm font-semibold">追加中...</p>}

      {error && (
        <p className="mt-2 text-sm text-red-600 font-semibold">
          追加に失敗しました。
        </p>
      )}
    </div>
  );
}
