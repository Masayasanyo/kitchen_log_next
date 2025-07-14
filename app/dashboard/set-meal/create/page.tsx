import SetMealCreateForm from '@/app/ui/set-meal/form/set-meal-create-form';
import { fetchRecipes } from '@/app/lib/actions/recipe-actions';

export default async function Page() {
  const recipeList = await fetchRecipes();

  return (
    <main className="w-full py-5 flex flex-col gap-4">
      <h1 className="font-bold text-2xl">献立を追加</h1>
      <SetMealCreateForm recipeList={recipeList} />
    </main>
  );
}
