import { Metadata } from 'next';
import Calendar from '@/app/ui/calendar/full-calendar';
import { fetchRecipes } from '@/app/lib/actions/recipe-actions';
import { fetchEvents } from '@/app/lib/actions/calendar-actions';

export const metadata: Metadata = {
  title: 'カレンダー',
};

export default async function Page() {
  const recipes = await fetchRecipes();
  const events = await fetchEvents();

  return (
    <div className="w-full flex flex-col gap-8">
      <h1 className="font-bold text-2xl">カレンダー</h1>
      <Calendar recipes={recipes} events={events} />
    </div>
  );
}
