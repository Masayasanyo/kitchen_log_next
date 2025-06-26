'use client';

import { useEffect, useState } from 'react';
import { fetchSetMealInfo } from '@/app/lib/actions/set-meal-actions';
import { SetMealInfo, SetMealInfoRow } from '@/app/lib/definitions/definitions';

export default function Page(props: { setMealId: string }) {
  const [setMealInfo, setSetMealInfo] = useState<SetMealInfo>({
    id: null,
    title: '',
    userId: null,
  });

  useEffect(() => {
    const fetch = async () => {
      const result = await fetchSetMealInfo(props.setMealId);
      const data = result?.data?.map((row: SetMealInfoRow) => ({
        id: row.id,
        title: row.title,
        userId: row.user_id,
      }));
      if (data && data.length > 0) {
        setSetMealInfo(data[0]);
      }
    };
    fetch();
  }, [props.setMealId]);

  return <h2 className="text-xl font-semibold">{setMealInfo?.title}</h2>;
}
