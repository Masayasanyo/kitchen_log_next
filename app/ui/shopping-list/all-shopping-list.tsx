'use client';

import { useState } from 'react';
import { check, uncheck } from '@/app/lib/actions/shopping-list-actions';
import CheckBox from '@/app/ui/icons/check-box';
import CheckedBox from '@/app/ui/icons/checked-box';
import DeleteSlBtn from './delete-sl-btn';
import Link from 'next/link';
import CreateItemForm from '@/app/ui/shopping-list/create-item-form';
import {
  createItem,
  fetchShoppingList,
} from '@/app/lib/actions/shopping-list-actions';
import { ShoppingList, ShoppingListForm } from '@/app/lib/definitions';

export default function Page({ defaultList }: { defaultList: ShoppingList[] }) {
  const [isError, setIsError] = useState<boolean>(false);
  const [shoppingList, setShoppingList] = useState<ShoppingList[]>(defaultList);
  const [formData, setFormData] = useState<ShoppingListForm>({
    name: '',
    amount: '',
    unit: '',
  });

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
      const newList = shoppingList.map((item) =>
        item.id === id ? { ...item, progress: !progress } : item,
      );
      setShoppingList(newList);
    }
  };

  const submitForm = async () => {
    try {
      await createItem(formData);
    } catch (error) {
      console.error(error);
      setIsError(true);
    } finally {
      const data = await fetchShoppingList(false);
      setShoppingList(data);
    }
  };

  return (
    <>
      {isError && (
        <p className="p-6 font-semibold text-red-500">処理に失敗しました。</p>
      )}
      {!isError && (
        <div className="flex flex-col gap-8">
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
                      setIsError={setIsError}
                      setList={setShoppingList}
                    />
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
      )}
    </>
  );
}
