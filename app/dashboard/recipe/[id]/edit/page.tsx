import EditForm from '@/app/ui/dashboard/recipe/id/edit/form';

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const recipeId = params.id;

  return (
    <main className="w-full py-5 flex flex-col gap-4">
      <h1 className="font-bold text-2xl">レシピを編集</h1>
      <EditForm recipeId={recipeId} />
    </main>
  );
}
