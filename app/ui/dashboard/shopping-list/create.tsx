'use client';

import PlusBtn from '@/app/ui/icons/plus-btn';
import { create } from '@/app/lib/shopping-list-actions';

export default function Create() {
  return (
    <form action={create} className="grid grid-cols-7 gap-2">
      <input
        className="bg-[#ffffff] p-2 rounded-2xl w-full col-span-4"
        placeholder="新規アイテムを入力"
        name="name"
        required
      />
      <input
        className="bg-[#ffffff] p-2 rounded-2xl w-full col-span-2"
        placeholder="量"
        name="amount"
        required
      />
      <button className="block ml-auto col-span-1" type="submit">
        <PlusBtn cN={'block w-8 ml-auto'} />
      </button>
    </form>
  );
}
