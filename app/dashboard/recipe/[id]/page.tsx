import RecipeInfo from '@/app/ui/recipe/recipe-info';
import Tag from '@/app/ui/recipe/tag';
import Ingredients from '@/app/ui/recipe/ingredients';
import Step from '@/app/ui/recipe/step';
import EditBtn from '@/app/ui/recipe/edit-btn';
import { fetchRecipe } from '@/app/lib/actions/recipe-actions';

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const recipe = await fetchRecipe(id);

  return (
    <main className="w-full flex flex-col gap-8">
      <EditBtn recipe={recipe} />
      <RecipeInfo recipe={recipe} />
      <Tag recipe={recipe} />
      <Ingredients recipe={recipe} />
      <Step recipe={recipe} />
    </main>
  );
}
