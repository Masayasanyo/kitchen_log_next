import SetMealInfo from '@/app/ui/dashboard/set-meal/id/set-meal-info';
import RecipeList from '@/app/ui/dashboard/set-meal/id/recipe-list';
import EditBtn from '@/app/ui/icons/edit-btn';
import Link from 'next/link';

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const setMealId = params.id;

  return (
    <main className="w-full flex flex-col gap-8">
      <Link href={`${setMealId}/edit`}>
        <EditBtn />
      </Link>
      <SetMealInfo setMealId={setMealId} />
      <RecipeList setMealId={setMealId} />
    </main>
  );
}
