'use client';

import { useEffect, useState } from 'react';
import { fetchShoppingList } from '@/app/lib/shopping-list-actions';
import { ShoppingList, ShoppingListRow } from '@/app/lib/definitions';

export default function Page() {
  const [shoppingList, setShoppingList] = useState<ShoppingList[]>([]);

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
