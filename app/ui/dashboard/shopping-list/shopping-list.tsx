'use client';

import { useEffect, useState } from 'react';
import {
  fetchShoppingList,
  check,
  uncheck,
} from '@/app/lib/actions/shopping-list-actions';
import CheckBox from '../../icons/check-box';
import CheckedBox from '../../icons/checked-box';
import Link from 'next/link';
import {
  ShoppingList,
  ShoppingListRow,
} from '@/app/lib/definitions/definitions';
import { StringSort } from '@/app/lib/string-sort';
import DeleteSlBtn from './delete-sl-btn';
import LinkBtn from '../../linkBtn';

export default function Page() {
  const [isPending, setIsPending] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [shoppingList, setShoppingList] = useState<ShoppingList[]>([]);

  const checkItem = async (id: number, progress: boolean) => {
    setIsPending(true);
    try {
      if (progress) {
        await uncheck(id);
      } else {
        await check(id);
      }
    } catch (error) {
      console.error(error);
      setIsError(true);
    } finally {
      setIsPending(false);
      const newList = shoppingList.map((item) =>
        item.id === id ? { ...item, progress: !progress } : item,
      );
      setShoppingList(newList);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      const result = await fetchShoppingList(false);
      const data = result?.data?.map((row: ShoppingListRow) => ({
        id: row.id,
        userId: row.user_id,
        name: row.name,
        amount: row.amount,
        unit: row.unit,
        progress: row.progress,
      }));
      if (data) {
        setShoppingList(StringSort(data));
      }
    };
    fetch();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      {isPending && <p className="py-6 font-semibold">処理中...</p>}
      {isError && (
        <p className="p-6 font-semibold text-red-500">処理に失敗しました。</p>
      )}
      {!isPending && !isError && (
        <>
          <div className="flex flex-col bg-[#ffffff] rounded-2xl p-6">
            {shoppingList?.map((item) => (
              <div key={item.id}>
                <div className="flex justify-between items-center">
                  <div className="flex gap-4 items-center">
                    <button
                      type="button"
                      onClick={() => checkItem(item.id, item.progress)}
                    >
                      {item.progress && <CheckedBox />}
                      {!item.progress && <CheckBox />}
                    </button>
                    <p className="">{item.name}</p>
                    <p className="">...</p>
                    <div className="flex gap-1">
                      <p className="">{item.amount}</p>
                      {item.unit !== 'その他' && (
                        <p className="">{item.unit}</p>
                      )}
                    </div>
                  </div>
                  <DeleteSlBtn
                    id={item.id}
                    page={false}
                    setIsPending={setIsPending}
                    setIsError={setIsError}
                    setList={setShoppingList}
                  />
                </div>
                <hr className="my-4" />
              </div>
            ))}
          </div>
          <LinkBtn
            link={'/dashboard/shopping-list/done'}
            design="w-45 mt-6
              px-6 py-2 rounded-2xl font-bold active:translate-y-1
              bg-[#1F4529] text-[#E8ECD7] shadow-[0_4px_0_#32633f] hover:bg-[#32633f] 
              active:bg-[#32633f] active:shadow-[0_3px_0_#32633f]"
          >
            <div className="flex gap-1 items-center justify-center">
              購入済みを見る
            </div>
          </LinkBtn>
        </>
      )}
    </div>
  );
}
