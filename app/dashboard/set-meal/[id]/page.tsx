import SetMeal from '@/app/ui/set-meal/set-meal';
import EditBtn from '@/app/ui/icons/edit-btn';
import Link from 'next/link';
import { fetchSetMeal } from '@/app/lib/actions/set-meal-actions';

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const setMeal = await fetchSetMeal(id);

  return (
    <main className="w-full flex flex-col gap-8">
      <Link href={`${id}/edit`} className="flex justify-end">
        <EditBtn
          color="bg-[#1F4529] text-[#E8ECD7] shadow-[0_3px_0_#32633f] hover:bg-[#32633f] 
            active:bg-[#32633f] active:shadow-[0_3px_0_#32633f]"
          size="w-4 h-4"
        />
      </Link>
      {setMeal && <SetMeal setMeal={setMeal} />}
    </main>
  );
}
