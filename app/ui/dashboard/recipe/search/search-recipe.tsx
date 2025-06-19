import { Recipe } from '@/app/lib/definitions';
import { useState } from 'react';
import { searchRecipe } from '@/app/lib/recipe-actions';

interface Prop {
  setRecipeList: React.Dispatch<React.SetStateAction<Recipe[]>>;
}

interface Row {
  id: number;
  img_url: string;
  title: string;
  memo: string;
  user_id: number;
}

export default function SearchRecipe({ setRecipeList }: Prop) {
  const [query, setQuery] = useState<string>('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      fetchRecipe();
    }
  };

  const fetchRecipe = async () => {
    const result = await searchRecipe(query);
    const data = result?.data?.map((row: Row) => ({
      id: row.id,
      imgUrl: row.img_url,
      title: row.title,
      memo: row.memo,
      user_id: row.user_id,
    }));
    if (data) {
      setRecipeList(data);
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
