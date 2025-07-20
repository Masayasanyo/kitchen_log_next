'use client';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { EventClickArg } from '@fullcalendar/core';
import jaLocale from '@fullcalendar/core/locales/ja';
import './full-calendar.css';
import { useState } from 'react';
import { AllRecipeData, DateClick, Event } from '@/app/lib/definitions';
import CancelBtn from '@/app/ui/icons/cancel-btn';
import { createEvent, deleteEvent } from '@/app/lib/actions/calendar-actions';
import { useRouter } from 'next/navigation';
import Trash from '@/app/ui/icons/trash';
import { buttonClass } from '@/app/lib/classnames';

export default function Calendar({
  allRecipeList,
  events,
}: {
  allRecipeList: AllRecipeData[];
  events: Event[];
}) {
  const router = useRouter();
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [isRecipeOpen, setIsRecipeOpen] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [currentEvent, setCurrentEvent] = useState<Event>({
    id: '',
    recipeId: 0,
    title: '',
    start: '',
    end: '',
    backgroundColor: '',
    borderColor: '',
    textColor: '',
  });
  const [recipeList, setRecipeList] = useState<AllRecipeData[]>([]);

  const handleDateClick = (info: DateClick) => {
    setSelectedDate(info.dateStr);
    setIsAdding(true);
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value;
    if (!keyword) {
      setRecipeList([]);
      return;
    }
    const newRecipeList = allRecipeList?.filter((recipe) =>
      recipe.title.includes(keyword),
    );
    setRecipeList(newRecipeList);
  };

  const selectRecipe = async (recipe: AllRecipeData) => {
    const newEvent = {
      id: String(events.length + 1),
      recipeId: recipe.id,
      title: recipe.title,
      start: String(selectedDate),
      end: String(selectedDate),
      backgroundColor: '#1f4529',
      borderColor: '#1f4529',
      textColor: '#ffffff',
    };

    await createEvent(newEvent);
    router.refresh();
    setRecipeList([]);
    setIsAdding(false);
  };

  const displayForm = () => {
    if (isAdding) {
      setRecipeList([]);
    }
    setIsAdding(!isAdding);
  };

  const displayEvent = () => {
    setIsRecipeOpen(!isRecipeOpen);
  };

  const handleEventClick = (info: EventClickArg) => {
    const id = info.event._def.publicId;
    const title = info.event._def.title;
    const recipeId = info.event._def.extendedProps.recipeId;
    const start = info.event._instance?.range.start.toISOString();

    setCurrentEvent((prev) => ({
      ...prev,
      id: id,
      recipeId: Number(recipeId),
      title: title,
      start: start?.split('T')[0] ?? '',
      end: start?.split('T')[0] ?? '',
    }));
    setIsRecipeOpen(true);
  };

  const goToRecipe = (id: number) => {
    if (id === 0) return;
    router.push(`/dashboard/recipe/${id}`);
  };

  const handleDeleteEvent = async (eventId: string) => {
    await deleteEvent(Number(eventId));
    setIsRecipeOpen(false);
    router.refresh();
  };

  return (
    <div>
      <FullCalendar
        locale={jaLocale}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        dateClick={handleDateClick}
        displayEventTime={false}
        height={750}
        eventDisplay="block"
        events={events}
        eventClick={handleEventClick}
      />
      <div
        className="fixed hidden insert-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
        id="modal"
      ></div>

      {isAdding && (
        <>
          <div
            className={`fixed w-full h-full bg-[rgba(0,0,0,.5)] 
              top-0 left-0 z-1000`}
          ></div>

          <div
            className={`fixed inset-0 m-auto z-1100 px-4 py-4 bg-[#e8ecd7] 
              rounded-2xl shadow-md size-72 flex flex-col gap-2`}
          >
            <button type="button" onClick={displayForm}>
              <CancelBtn fillColor={'#1f4529'} cN={'w-6 block ml-auto'} />
            </button>

            <div className="flex">
              <p>{selectedDate.split('-')[0]}年</p>
              <p>{selectedDate.split('-')[1]}月</p>
              <p>{selectedDate.split('-')[2]}日</p>
            </div>

            <div className="flex flex-col gap-4 overflow-auto">
              <input
                className="bg-[#ffffff] p-2 rounded-2xl w-full focus:outline-none"
                name="search"
                type="search"
                placeholder="レシピ名を入力"
                onChange={handleChange}
                required
              />
              <div className="flex flex-col gap-1">
                {recipeList.map((recipe) => (
                  <div
                    key={recipe.id}
                    onClick={() => selectRecipe(recipe)}
                    className="p-2 bg-[#f3eeee] rounded-2xl"
                  >
                    <p>{recipe.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {isRecipeOpen && (
        <>
          <div
            className={`fixed w-full h-full bg-[rgba(0,0,0,.5)] 
              top-0 left-0 z-1000`}
          ></div>

          <div
            className={`fixed inset-0 m-auto z-1100 px-4 py-4 bg-[#e8ecd7] 
              rounded-2xl shadow-md size-72 flex flex-col gap-2`}
          >
            <div className="flex gap-4 ml-auto">
              <button
                type="button"
                onClick={() => handleDeleteEvent(currentEvent.id)}
              >
                <Trash width={'w-6'} />
              </button>
              <button type="button" onClick={displayEvent}>
                <CancelBtn fillColor={'#1f4529'} cN={'w-6 block ml-auto'} />
              </button>
            </div>

            <div className="flex">
              <p>{currentEvent.start.split('-')[0]}年</p>
              <p>{currentEvent.start.split('-')[1]}月</p>
              <p>{currentEvent.start.split('-')[2]}日</p>
            </div>

            <p className="text-2xl font-bold break-words overflow-auto">
              {currentEvent.title}
            </p>

            <button
              type="button"
              onClick={() => goToRecipe(currentEvent.recipeId)}
              className={`${buttonClass} bg-[#1F4529] text-[#E8ECD7] 
                shadow-[0_4px_0_#32633f] hover:bg-[#32633f] active:bg-[#32633f] 
                active:shadow-[0_3px_0_#32633f] mt-auto w-40`}
            >
              レシピを見る
            </button>
          </div>
        </>
      )}
    </div>
  );
}
