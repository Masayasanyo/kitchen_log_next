import RecipeInfo from '@/app/ui/recipe/recipe-info';
import Ingredients from '@/app/ui/recipe/ingredients';
import Step from '@/app/ui/recipe/step';
import EditBtn from '@/app/ui/icons/edit-btn';
import Link from 'next/link';

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;

  return (
    <main className="w-full flex flex-col gap-8">
      <Link href={`${id}/edit`} className="flex justify-end">
        <EditBtn
          color="bg-[#1F4529] text-[#E8ECD7] shadow-[0_3px_0_#32633f] hover:bg-[#32633f] 
            active:bg-[#32633f] active:shadow-[0_3px_0_#32633f]"
          size="w-4 h-4"
        />
      </Link>
      <RecipeInfo recipeId={id} />
      <Ingredients recipeId={id} />
      <Step recipeId={id} />
    </main>
  );
}
