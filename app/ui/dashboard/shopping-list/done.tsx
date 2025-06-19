'use client';

import { useEffect, useState } from 'react';
import {
  fetchShoppingList,
  check,
  uncheck,
} from '@/app/lib/shopping-list-actions';
import CheckBox from '../../icons/check-box';
import CheckedBox from '../../icons/checked-box';
import { ShoppingList, ShoppingListRow } from '@/app/lib/definitions';

export default function Done() {
  const [doneList, setDoneList] = useState<ShoppingList[]>([]);

  const checkItem = async (id: number, progress: boolean) => {
    if (progress) {
      await uncheck(id);
    } else {
      await check(id);
    }
    const newList = doneList.map((item) =>
      item.id === id ? { ...item, progress: !progress } : item,
    );
    setDoneList(newList);
  };

  useEffect(() => {
    const fetch = async () => {
      const result = await fetchShoppingList(true);
      const data = result?.data?.map((row: ShoppingListRow) => ({
        id: row.id,
        userId: row.user_id,
        name: row.name,
        amount: row.amount,
        progress: row.progress,
      }));
      if (data) {
        setDoneList(data);
      }
    };
    fetch();
  }, []);
  return (
    <div className="flex flex-col bg-[#ffffff] rounded-2xl p-6">
      {doneList?.map((item) => (
        <div key={item.id}>
          <div className="flex gap-4 items-center">
            <button onClick={() => checkItem(item.id, item.progress)}>
              {item.progress && <CheckedBox />}
              {!item.progress && <CheckBox />}
            </button>
            <p className="text-xl">{item.name}</p>
            <p className="text-xl">...</p>
            <p className="text-xl">{item.amount}</p>
          </div>
          <hr className="my-4" />
        </div>
      ))}
    </div>
  );
}
