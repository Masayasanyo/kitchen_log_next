'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

export default function RecipeSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [type, setType] = useState<string>('title');

  const handleType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setType(e.target.value);
  };

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('type', type);
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="bg-[#ffffff] p-2 rounded-2xl w-full flex gap-2">
      <input
        className="p-2 rounded-2xl w-full"
        id="search"
        placeholder="検索"
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get('query')?.toString()}
      />

      <select
        className="bg-[#1F4529] text-[#E8ECD7] px-4 rounded-2xl"
        onChange={(e) => {
          handleType(e);
        }}
      >
        <option value="title">タイトル</option>
        <option value="tag">タグ</option>
        <option value="ing">材料名</option>
      </select>
    </div>
  );
}
