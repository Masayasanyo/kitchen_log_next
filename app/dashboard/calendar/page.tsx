import { Metadata } from 'next';
import Calendar from '@/app/ui/calendar/full-calendar';
import { fetchAllRecipeData } from '@/app/lib/actions/recipe-actions';
import { fetchAllEvents } from '@/app/lib/actions/calendar-actions';

export const metadata: Metadata = {
  title: 'カレンダー',
};

export default async function Page() {
  const recipeList = await fetchAllRecipeData();
  const events = await fetchAllEvents();

  return (
    <div className="w-full flex flex-col gap-8">
      <h1 className="font-bold text-2xl">カレンダー</h1>
      <Calendar allRecipeList={recipeList} events={events} />
    </div>
  );
}
