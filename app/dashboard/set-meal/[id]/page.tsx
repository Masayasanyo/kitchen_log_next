import SetMeal from '@/app/ui/set-meal/set-meal';
import { fetchSetMeal } from '@/app/lib/actions/set-meal-actions';
import EditBtn from '@/app/ui/set-meal/edit-btn';

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const setMeal = await fetchSetMeal(id);

  return (
    <main className="w-full flex flex-col gap-8">
      {setMeal && <EditBtn setMeal={setMeal} />}
      {setMeal && <SetMeal setMeal={setMeal} />}
    </main>
  );
}
