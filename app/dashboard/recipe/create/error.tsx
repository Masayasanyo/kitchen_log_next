'use client';

import { useEffect } from 'react';
import { buttonClass } from '@/app/lib/classnames';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="py-5 flex flex-col gap-4">
      <h1 className="text-xl font-bold text-red-600">エラーが発生しました</h1>
      <button
        onClick={() => reset()}
        className={`${buttonClass} bg-[#1F4529] text-[#E8ECD7] 
          shadow-[0_4px_0_#32633f] hover:bg-[#32633f] active:bg-[#32633f] 
          active:shadow-[0_3px_0_#32633f]`}
      >
        再読み込み
      </button>
    </div>
  );
}
