import {
  SetRecipeListProp,
  RecipeRow,
} from '@/app/lib/definitions/definitions';
import { useState } from 'react';
import { searchRecipe } from '@/app/lib/actions/recipe-actions';

export default function SearchRecipe({ setRecipeList }: SetRecipeListProp) {
  const [query, setQuery] = useState<string>('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      fetchRecipe();
    }
  };

  const fetchRecipe = async () => {
    const result = await searchRecipe(query);
    const data = result?.data?.map((row: RecipeRow) => ({
      id: row.id,
      imgUrl: row.img_url,
      title: row.title,
      memo: row.memo,
      userId: row.user_id,
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
