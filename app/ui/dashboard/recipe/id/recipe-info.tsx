'use client';

import { useEffect, useState } from 'react';
import { fetchRecipeInfo } from '@/app/lib/actions/recipe-actions';
import { Recipe, RecipeRow } from '@/app/lib/definitions/definitions';
import Image from 'next/image';

export default function RecipeInfo(props: { recipeId: string }) {
  const [recipeInfo, setRecipeInfo] = useState<Recipe>({
    id: null,
    imgUrl: '',
    title: '',
    memo: '',
    userId: null,
  });

  useEffect(() => {
    const fetch = async () => {
      const result = await fetchRecipeInfo(props.recipeId);
      const data = result?.data?.map((row: RecipeRow) => ({
        id: row.id,
        imgUrl: row.img_url,
        title: row.title,
        memo: row.memo,
        userId: row.user_id,
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
        unoptimized
      />
      <h2 className="text-xl font-semibold">{recipeInfo?.title}</h2>
      <p>{recipeInfo?.memo}</p>
    </div>
  );
}
