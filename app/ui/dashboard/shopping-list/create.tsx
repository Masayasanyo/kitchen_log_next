'use client';

import PlusBtn from '@/app/ui/icons/plus-btn';
import { create } from '@/app/lib/actions/shopping-list-actions';

export default function Create() {
  return (
    <form action={create} className="grid grid-cols-8 gap-2">
      <input
        className="bg-[#ffffff] p-2 rounded-2xl w-full col-span-3"
        placeholder="新規アイテムを入力"
        name="name"
        required
      />
      <input
        className="bg-[#ffffff] p-2 rounded-2xl w-full col-span-2"
        placeholder="量"
        name="amount"
      />
      <select name="unit" className="col-span-2 border p-2 rounded">
        <option value="g">g</option>
        <option value="kg">kg</option>
        <option value="mL">mL</option>
        <option value="L">L</option>
        <option value="大さじ">大さじ</option>
        <option value="小さじ">小さじ</option>
        <option value="カップ">カップ</option>
        <option value="個">個</option>
        <option value="本">本</option>
        <option value="枚">枚</option>
        <option value="片">片</option>
        <option value="適量">適量</option>
        <option value="少々">少々</option>
        <option value="その他">その他</option>
      </select>
      <button className="block ml-auto col-span-1" type="submit">
        <PlusBtn cN={'block w-8 ml-auto'} />
      </button>
    </form>
  );
}
