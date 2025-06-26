'use client';

import { useState } from 'react';
import { searchSetMeal } from '@/app/lib/actions/set-meal-actions';
import {
  SetSetMealListProp,
  SetMealRow,
} from '@/app/lib/definitions/definitions';

export default function SearchSetMeal({ setSetMealList }: SetSetMealListProp) {
  const [query, setQuery] = useState<string>('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      fetchSetMeal();
    }
  };

  const fetchSetMeal = async () => {
    const result = await searchSetMeal(query);
    // const data = result?.data?.map((row: SetMealRow) => ({
    //   id: row.id,
    //   title: row.title,
    //   userId: row.user_id,
    //   recipes: row.recipes,
    // }));
    const data = result?.data?.map((row: SetMealRow) => ({
      id: row.id,
      title: row.title,
      userId: row.user_id,
      recipes: row.recipes?.map((r) => r.recipes),
    }));
    if (data) {
      setSetMealList(data);
    }
  };

  return (
    <input
      className="bg-[#ffffff] p-2 rounded-2xl w-full"
      id="search"
      placeholder="検索"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      onKeyDown={handleKeyDown}
    />
  );
}
