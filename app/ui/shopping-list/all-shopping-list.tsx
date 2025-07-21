'use client';

import { useState } from 'react';
import { check, uncheck } from '@/app/lib/actions/shopping-list-actions';
import CheckBox from '@/app/ui/icons/check-box';
import CheckedBox from '@/app/ui/icons/checked-box';
import Link from 'next/link';
import CreateItemForm from '@/app/ui/shopping-list/create-item-form';
import {
  createItem,
  fetchShoppingList,
  deleteShoppingList,
} from '@/app/lib/actions/shopping-list-actions';
import { ShoppingList, ShoppingListForm } from '@/app/lib/definitions';
import Cancel from '@/app/ui/icons/cancel';
import PendingPage from '@/app/ui/pending-page';
import ErrorPage from '@/app/ui/error-page';

export default function Page({ defaultList }: { defaultList: ShoppingList[] }) {
  const [isPending, setIsPending] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [shoppingList, setShoppingList] = useState<ShoppingList[]>(defaultList);
  const [formData, setFormData] = useState<ShoppingListForm>({
    name: '',
    amount: '',
    unit: '',
  });

  const checkItem = async (id: number, progress: boolean) => {
    const updatedList = shoppingList.map((item) => {
      return item.id === id ? { ...item, progress: !item.progress } : item;
    });
    setShoppingList(updatedList);

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

  const submitForm = async () => {
    if (!formData.name) return;

    setIsPending(true);
    try {
      await createItem(formData.name, formData.amount, formData.unit);
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      const data = await fetchShoppingList(false);
      setFormData({
        name: '',
        amount: '',
        unit: '',
      });
      setShoppingList(data);
      setIsPending(false);
    }
  };

  const deleteItem = async (id: number) => {
    setShoppingList(shoppingList.filter((item) => item.id !== id));
    try {
      await deleteShoppingList(id);
    } catch (error) {
      console.error(error);
      setError(true);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      {isPending && <PendingPage />}
      {error && <ErrorPage setError={setError} />}

      <CreateItemForm
        formData={formData}
        setFormData={setFormData}
        submitForm={submitForm}
      />
      <div className="flex flex-col gap-4">
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
                  <p>{item.name}</p>
                  <p>...</p>
                  <div className="flex gap-1">
                    <p>{item.amount}</p>
                    {item.unit !== 'その他' && <p>{item.unit}</p>}
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
          href={'/dashboard/shopping-list/done'}
          className={`text-center w-45 mt-6px-6 py-2 rounded-2xl font-bold 
              active:translate-y-1 bg-[#1F4529] text-[#E8ECD7] 
              shadow-[0_4px_0_#32633f] hover:bg-[#32633f] 
              active:bg-[#32633f] active:shadow-[0_3px_0_#32633f]`}
        >
          <div className="flex gap-1 items-center justify-center">
            購入済みを見る
          </div>
        </Link>
      </div>
    </div>
  );
}
