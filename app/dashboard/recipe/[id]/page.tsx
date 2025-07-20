import RecipeInfo from '@/app/ui/recipe/recipe-info';
import Tag from '@/app/ui/recipe/tag';
import Ingredients from '@/app/ui/recipe/ingredients';
import Step from '@/app/ui/recipe/step';
import EditBtn from '@/app/ui/recipe/edit-btn';
import { fetchRecipe } from '@/app/lib/actions/recipe-actions';

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const recipeData = await fetchRecipe(id);

  return (
    <main className="w-full flex flex-col gap-8">
      <EditBtn recipeData={recipeData} />
      <RecipeInfo recipeData={recipeData} />
      <Tag recipeData={recipeData} />
      <Ingredients recipeData={recipeData} />
      <Step recipeData={recipeData} />
    </main>
  );
}
