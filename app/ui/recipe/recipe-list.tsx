'use server';

import { fetchRecipes } from '@/app/lib/actions/recipe-actions';
import Image from 'next/image';
import Link from 'next/link';
import { Recipe } from '@/app/lib/definitions';

export async function LatestRecipeList() {
  const recipeList = await fetchRecipes();

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {recipeList
        ?.slice(0, 4)
        .map((recipe) => <RecipeImgCard key={recipe.id} recipe={recipe} />)}
    </div>
  );
}

export async function AllRecipeList({
  type,
  query,
}: {
  type: string;
  query: string;
}) {
  let recipeList = await fetchRecipes();

  if (type === 'title' && query) {
    recipeList = recipeList?.filter((recipe) => recipe.title.includes(query));
  }

  if (type === 'tag' && query) {
    recipeList = recipeList?.filter((recipe) =>
      recipe.tags.some((tag) => tag.name === query),
    );
  }

  if (type === 'ing' && query) {
    recipeList = recipeList?.filter((recipe) =>
      recipe.ingredients.some((ing) => ing.name === query),
    );
  }

  return (
    <div className="md:grid md:grid-cols-4 flex flex-col gap-6">
      {recipeList?.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}

export async function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <Link
      href={`/dashboard/recipe/${recipe.id}`}
      className="rounded-2xl shadow-md bg-white p-4 flex flex-col gap-2"
    >
      <Image
        src={recipe.imgUrl || '/no_image.png'}
        width={160}
        height={90}
        alt={recipe.title}
        className="object-cover aspect-video w-full rounded-md"
        unoptimized
      />
      <p>{recipe.title}</p>
    </Link>
  );
}

export async function RecipeImgCard({ recipe }: { recipe: Recipe }) {
  return (
    <Link
      href={`/dashboard/recipe/${recipe.id}`}
      className="rounded-2xl shadow-md bg-white"
    >
      <Image
        src={recipe.imgUrl || '/no_image.png'}
        width={160}
        height={90}
        alt={recipe.title}
        className="object-cover aspect-video w-full rounded-md"
        unoptimized
      />
    </Link>
  );
}
