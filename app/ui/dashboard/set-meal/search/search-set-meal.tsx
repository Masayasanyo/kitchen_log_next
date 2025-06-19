import { useState } from 'react';
import { searchSetMeal } from '@/app/lib/set-meal-actions';

interface Recipe {
  id: number;
  title: string;
  img_url: string;
}

interface SetMeal {
  id: number;
  title: string;
  userId: number;
  recipes: Recipe[];
}

interface Prop {
  setSetMealList: React.Dispatch<React.SetStateAction<SetMeal[]>>;
}

interface Row {
  id: number;
  title: string;
  user_id: number;
  recipes: Recipe[];
}

export default function SearchSetMeal({ setSetMealList }: Prop) {
  const [query, setQuery] = useState<string>('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      fetchSetMeal();
    }
  };

  const fetchSetMeal = async () => {
    const result = await searchSetMeal(query);
    const data = result?.data?.map((row: Row) => ({
      id: row.id,
      title: row.title,
      userId: row.user_id,
      recipes: row.recipes,
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
