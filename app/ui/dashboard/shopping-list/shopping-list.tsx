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

export default function Page() {
  const [shoppingList, setShoppingList] = useState<ShoppingList[]>([]);

  const checkItem = async (id: number, progress: boolean) => {
    if (progress) {
      await uncheck(id);
    } else {
      await check(id);
    }
    const newList = shoppingList.map((item) =>
      item.id === id ? { ...item, progress: !progress } : item,
    );
    setShoppingList(newList);
  };

  useEffect(() => {
    const fetch = async () => {
      const result = await fetchShoppingList(false);
      const data = result?.data?.map((row: ShoppingListRow) => ({
        id: row.id,
        userId: row.user_id,
        name: row.name,
        amount: row.amount,
        progress: row.progress,
      }));
      if (data) {
        setShoppingList(data);
      }
    };
    fetch();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col bg-[#ffffff] rounded-2xl p-6">
        {shoppingList?.map((item) => (
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
      <Link
        href={'/dashboard/shopping-list/done'}
        className="text-center mt-4 bg-[#1F4529] text-[#E8ECD7] w-full px-4 py-2 rounded-2xl"
      >
        購入済みを見る
      </Link>
    </div>
  );
}
