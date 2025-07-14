import SetMealEditForm from '@/app/ui/set-meal/form/set-meal-edit-form';
import {
  fetchSetMealInfo,
  fetchRecipeList,
} from '@/app/lib/actions/set-meal-actions';
import { fetchRecipes } from '@/app/lib/actions/recipe-actions';

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const setMealInfo = await fetchSetMealInfo(id);
  const recipeList = await fetchRecipeList(id);
  const allRecipeList = await fetchRecipes();

  return (
    <main className="w-full py-5 flex flex-col gap-4">
      <h1 className="font-bold text-2xl">献立を編集</h1>
      <SetMealEditForm
        setMealId={id}
        setMealInfo={setMealInfo}
        recipeList={recipeList}
        allRecipeList={allRecipeList}
      />
    </main>
  );
}
