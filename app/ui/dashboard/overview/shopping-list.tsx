'use client';

import { useEffect, useState } from 'react';
import {
  fetchShoppingList,
  check,
  uncheck,
} from '@/app/lib/shopping-list-actions';
import CheckBox from '../../icons/check-box';
import CheckedBox from '../../icons/checked-box';

interface Row {
  id: number;
  user_id: number;
  name: string;
  amount: string;
  progress: boolean;
}

interface ShoppingList {
  id: number;
  userId: number;
  name: string;
  amount: string;
  progress: boolean;
}

export default function ShoppingList() {
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
      const data = result?.data?.map((row: Row) => ({
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
      <div className="flex flex-col bg-[#ffffff] rounded-2xl">
        {shoppingList?.slice(0, 4).map((item) => (
          <div key={item.id}>
            <div className="flex gap-4 items-center">
              <p className="text-xl">{item.name}</p>
              <p className="text-xl">...</p>
              <p className="text-xl">{item.amount}</p>
            </div>
            <hr className="my-4" />
          </div>
        ))}
      </div>
    </div>
  );
}
