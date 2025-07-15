'use client';

import { useState } from 'react';
import { check, uncheck } from '@/app/lib/actions/shopping-list-actions';
import CheckBox from '@/app/ui/icons/check-box';
import CheckedBox from '@/app/ui/icons/checked-box';
import { ShoppingList } from '@/app/lib/definitions';
import DeleteItemBtn from './delete-item-btn';
import Link from 'next/link';

export default function Done({ defaultList }: { defaultList: ShoppingList[] }) {
  const [isError, setIsError] = useState<boolean>(false);
  const [doneList, setDoneList] = useState<ShoppingList[]>(defaultList);

  const checkItem = async (id: number, progress: boolean) => {
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
      const newList = doneList.map((item) =>
        item.id === id ? { ...item, progress: !progress } : item,
      );
      setDoneList(newList);
    }
  };

  return (
    <>
      {isError && (
        <p className="p-6 font-semibold text-red-500">処理に失敗しました。</p>
      )}
      {!isError && (
        <div className="flex flex-col gap-4">
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
                      {item.unit !== 'その他' && (
                        <p className="">{item.unit}</p>
                      )}
                    </div>
                  </div>
                  <DeleteItemBtn
                    id={item.id}
                    page={true}
                    setIsError={setIsError}
                    setList={setDoneList}
                  />
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
      )}
    </>
  );
}
