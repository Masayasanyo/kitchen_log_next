import { fetchRecipeList } from '@/app/lib/actions/set-meal-actions';
import Image from 'next/image';
import Link from 'next/link';
import AddToShoppingList from './add-to-shopping-list';

export default async function RecipeList(props: { setMealId: string }) {
  const recipeList = await fetchRecipeList(props.setMealId);

  return (
    <div>
      <div className="flex flex-col gap-8 md:grid md:grid-cols-4">
        {recipeList?.map((recipe) => (
          <Link
            href={`/dashboard/recipe/${recipe.id}`}
            key={recipe.id}
            className="bg-[#ffffff] rounded-2xl p-6 flex flex-col gap-2 shadow-md"
          >
            <Image
              src={recipe.imgUrl || '/no_image.png'}
              width={160}
              height={90}
              alt={recipe.title}
              className="object-cover aspect-video w-full rounded-2xl"
              unoptimized
            />
            <p>{recipe.title}</p>
          </Link>
        ))}
      </div>
      <AddToShoppingList recipeList={recipeList} />
    </div>
  );
}
