'use client';

import ThreeDots from '@/app/ui/icons/three-dots';
import Link from 'next/link';
import { useState } from 'react';
import { createFromRecipe } from '@/app/lib/actions/shopping-list-actions';
import PendingPage from '@/app/ui/pending-page';
import ErrorPage from '@/app/ui/error-page';
import { deleteSetMeal } from '@/app/lib/actions/set-meal-actions';
import { SetMeal } from '@/app/lib/definitions';
import { createEvents } from '@/app/lib/actions/calendar-actions';
import DatePicker, { registerLocale } from 'react-datepicker';
import ja from 'date-fns/locale/ja';
import 'react-datepicker/dist/react-datepicker.css';
import { useRouter } from 'next/navigation';

export default function EditBtn({ setMeal }: { setMeal: SetMeal }) {
  const router = useRouter();
  const [isButtonClicked, setIsButtonClicked] = useState<boolean>(false);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const Today = new Date();
  registerLocale('ja', ja);

  const addToShoppingList = async () => {
    setIsButtonClicked(false);
    setIsPending(true);
    try {
      await createFromRecipe(setMeal.recipes);
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setIsPending(false);
    }
  };

  const submitDeleteSetMeal = async () => {
    setIsButtonClicked(false);

    setIsPending(true);
    try {
      await deleteSetMeal(setMeal.id);
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setIsPending(false);
      router.push(`/dashboard/set-meal`);
    }
  };

  const submitEvent = async (date: Date) => {
    setIsButtonClicked(false);

    const dateString = date
      .toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
      .replace(/\//g, '-');

    const events = [];
    for (let i = 0; i < setMeal.recipes.length; i++) {
      events.push({
        id: '',
        recipeId: setMeal.recipes[i].id,
        title: setMeal.recipes[i].title,
        start: String(dateString),
        end: String(dateString),
        backgroundColor: '#1f4529',
        borderColor: '#1f4529',
        textColor: '#ffffff',
      });
    }

    setIsPending(true);
    try {
      await createEvents(events);
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="relative">
      <button
        type="button"
        className="block ml-auto"
        onClick={() => setIsButtonClicked(!isButtonClicked)}
      >
        <ThreeDots />
      </button>

      {isPending && <PendingPage />}

      {error && <ErrorPage setError={setError} />}

      {isButtonClicked && (
        <div
          className={`z-1100 px-4 py-4 bg-[#1F4529] text-[#e8ecd7] size-48 my-auto
            rounded-lg shadow-md flex flex-col gap-4 absolute right-0 font-semibold`}
        >
          <div>
            <Link
              href={`/dashboard/set-meal/${setMeal.id}/edit`}
              className="block"
            >
              編集
            </Link>
          </div>
          <div>
            <button
              type="button"
              onClick={addToShoppingList}
              className="block w-full text-left"
            >
              買い物リストに追加
            </button>
          </div>
          <div>
            <DatePicker
              onChange={(selectedDate) => {
                submitEvent(selectedDate || Today);
              }}
              dateFormat="yyyy/MM/dd"
              locale="ja"
              customInput={<button type="button">カレンダーに追加</button>}
            />
          </div>
          <div>
            <button
              type="button"
              onClick={submitDeleteSetMeal}
              className="block w-full text-left"
            >
              削除
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
