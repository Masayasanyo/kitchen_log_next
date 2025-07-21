'use server';

import { Event, EventRow } from '@/app/lib/definitions';
import { auth } from '@/auth';
import { supabase } from '@/app/lib/supabase';

async function getUserId() {
  const session = await auth();
  const userIdString: string = session?.user?.id as string;
  const userId = Number(userIdString);
  return userId;
}

export async function createEvent(eventData: Event) {
  const userId = await getUserId();

  const { error } = await supabase.from('calendar').insert({
    user_id: userId,
    recipe_id: eventData.recipeId,
    title: eventData.title,
    start: eventData.start,
    end: eventData.end,
    background_color: eventData.backgroundColor,
    border_color: eventData.borderColor,
    text_color: eventData.textColor,
  });

  if (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to create event.');
  }
}

export async function createEvents(eventData: Event[]) {
  const userId = await getUserId();

  for (let i = 0; i < eventData.length; i++) {
    const { error } = await supabase.from('calendar').insert({
      user_id: userId,
      recipe_id: eventData[i].recipeId,
      title: eventData[i].title,
      start: eventData[i].start,
      end: eventData[i].end,
      background_color: eventData[i].backgroundColor,
      border_color: eventData[i].borderColor,
      text_color: eventData[i].textColor,
    });

    if (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to create events.');
    }
  }
}

export async function fetchEvents() {
  const userId = await getUserId();

  const { data, error } = await supabase
    .from('calendar')
    .select()
    .eq('user_id', userId);

  if (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch events.');
  }

  if (data && data?.length > 0) {
    const convertedData = data.map((row: EventRow) => ({
      id: row.id,
      recipeId: row.recipe_id,
      title: row.title,
      start: row.start,
      end: row.end,
      backgroundColor: row.background_color,
      borderColor: row.border_color,
      textColor: row.text_color,
    }));

    return convertedData;
  }

  return [];
}

export async function deleteEvent(id: number) {
  const userId = await getUserId();

  const { error } = await supabase
    .from('calendar')
    .delete()
    .eq('user_id', userId)
    .eq('id', id);

  if (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to delete event.');
  }
}
