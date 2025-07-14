import RecipeCreateForm from '@/app/ui/recipe/form/recipe-create-form';

export default function Page() {
  return (
    <main className="w-full py-5 flex flex-col gap-4">
      <h1 className="font-bold text-2xl">レシピを追加</h1>
      <RecipeCreateForm />
    </main>
  );
}
