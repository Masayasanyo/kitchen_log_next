'use client';

import { useState } from 'react';
import {
  check,
  uncheck,
  deleteShoppingList,
} from '@/app/lib/actions/shopping-list-actions';
import CheckBox from '@/app/ui/icons/check-box';
import CheckedBox from '@/app/ui/icons/checked-box';
import { ShoppingList } from '@/app/lib/definitions';
import Link from 'next/link';
import Cancel from '@/app/ui/icons/cancel';
import ErrorPage from '@/app/ui/error-page';

export default function Done({ defaultList }: { defaultList: ShoppingList[] }) {
  const [error, setError] = useState<boolean>(false);
  const [doneList, setDoneList] = useState<ShoppingList[]>(defaultList);

  const checkItem = async (id: number, progress: boolean) => {
    const updatedList = doneList.map((item) => {
      return item.id === id ? { ...item, progress: !item.progress } : item;
    });
    setDoneList(updatedList);

    try {
      if (progress) {
        await uncheck(id);
      } else {
        await check(id);
      }
    } catch (error) {
      console.error(error);
      setError(true);
    }
  };

  const deleteItem = async (id: number) => {
    setDoneList(doneList.filter((item) => item.id !== id));
    try {
      await deleteShoppingList(id);
    } catch (error) {
      console.error(error);
      setError(true);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {error && <ErrorPage setError={setError} />}

      <div className="flex flex-col bg-[#ffffff] rounded-2xl p-6">
        {doneList?.map((item) => (
          <div key={item.id}>
            <div className="flex justify-between items-center">
              <div className="flex gap-4 items-center">
                <button onClick={() => checkItem(item.id, item.progress)}>
                  {item.progress && <CheckedBox />}
                  {!item.progress && <CheckBox />}
                </button>
                <p className="">{item.name}</p>
                <p className="">...</p>
                <div className="flex gap-1">
                  <p className="">{item.amount}</p>
                  {item.unit !== 'その他' && <p className="">{item.unit}</p>}
                </div>
              </div>
              <button type="button" onClick={() => deleteItem(item.id)}>
                <Cancel
                  design="w-6 bg-[#CC3300] text-[#E8ECD7] shadow-[0_3px_0_#FF3366] hover:bg-[#FF3366] 
                        active:bg-[#FF3366] active:shadow-[0_3px_0_#FF3366]"
                />
              </button>
            </div>
            <hr className="my-4" />
          </div>
        ))}
      </div>

      <Link
        href={'/dashboard/shopping-list'}
        className={`text-center w-45 mt-6px-6 py-2 rounded-2xl font-bold 
              active:translate-y-1 bg-[#1F4529] text-[#E8ECD7] 
              shadow-[0_4px_0_#32633f] hover:bg-[#32633f] 
              active:bg-[#32633f] active:shadow-[0_3px_0_#32633f]`}
      >
        <div className="flex gap-1 items-center justify-center">
          未購入を見る
        </div>
      </Link>
    </div>
  );
}
