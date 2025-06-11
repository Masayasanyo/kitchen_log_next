'use client';

import { useEffect, useState } from 'react';
import { fetchRecipeInfo } from '@/app/lib/recipe-actions';
import { Recipe } from '@/app/lib/definitions';
import Image from 'next/image';

export default function RecipeInfo(props: { recipeId: string }) {
  const [recipeInfo, setRecipeInfo] = useState<Recipe>({
    id: null,
    imgUrl: '',
    title: '',
    memo: '',
    user_id: null,
  });

  useEffect(() => {
    const fetch = async () => {
      const result = await fetchRecipeInfo(props.recipeId);
      const data = result?.data?.map((row: any) => ({
        id: row.id,
        imgUrl: row.img_url,
        title: row.title,
        memo: row.memo,
        user_id: row.user_id,
      }));
      if (data && data.length > 0) {
        setRecipeInfo(data[0]);
      }
    };
    fetch();
  }, [props.recipeId]);

  return (
    <div className="flex flex-col gap-4">
      <Image
        src={recipeInfo?.imgUrl || '/no_image.png'}
        width={160}
        height={90}
        alt="Recipe image"
        className="object-cover aspect-video rounded-2xl w-full"
      />
      <h2 className="text-xl font-semibold">{recipeInfo?.title}</h2>
      <p>{recipeInfo?.memo}</p>
    </div>
  );
}
