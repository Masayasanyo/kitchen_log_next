'use client';

import { useState } from 'react';
import { check, uncheck } from '@/app/lib/actions/shopping-list-actions';
import CheckBox from '@/app/ui/icons/check-box';
import CheckedBox from '@/app/ui/icons/checked-box';
import { ShoppingList } from '@/app/lib/definitions';
import DeleteSlBtn from './delete-sl-btn';

export default function Done({ defaultList }: { defaultList: ShoppingList[] }) {
  const [isPending, setIsPending] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [doneList, setDoneList] = useState<ShoppingList[]>(defaultList);

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
      const newList = doneList.map((item) =>
        item.id === id ? { ...item, progress: !progress } : item,
      );
      setDoneList(newList);
    }
  };

  return (
    <div className="flex flex-col bg-[#ffffff] rounded-2xl p-6">
      {isPending && <p className="py-6 font-semibold">処理中...</p>}
      {isError && (
        <p className="p-6 font-semibold text-red-500">処理に失敗しました。</p>
      )}
      {!isPending && !isError && (
        <>
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
                <DeleteSlBtn
                  id={item.id}
                  page={true}
                  setIsPending={setIsPending}
                  setIsError={setIsError}
                  setList={setDoneList}
                />
              </div>
              <hr className="my-4" />
            </div>
          ))}
        </>
      )}
    </div>
  );
}
