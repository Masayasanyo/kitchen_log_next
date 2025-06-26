'use client';

import { useActionState } from 'react';
import { authenticate } from '@/app/lib/actions/account-actions';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );

  return (
    <form action={formAction} className="">
      <div className="">
        <h1 className="font-bold text-2xl mb-10">ログイン</h1>
        <div className="w-full">
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium"
              htmlFor="email"
            >
              メールアドレス
            </label>
            <div className="relative">
              <input
                className="bg-[#ffffff] p-3 rounded-2xl w-full"
                id="email"
                type="email"
                name="email"
                placeholder="メールアドレスを入力してください"
                required
              />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium"
              htmlFor="password"
            >
              パスワード
            </label>
            <div className="relative">
              <input
                className="bg-[#ffffff] p-3 rounded-2xl w-full"
                id="password"
                type="password"
                name="password"
                placeholder="パスワードを入力してください"
                required
                minLength={6}
              />
            </div>
          </div>
        </div>
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
            <>
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )}
        </div>
        <input type="hidden" name="redirectTo" value={callbackUrl} />
        <button
          className="mt-6 bg-[#1F4529] text-[#E8ECD7] w-full px-4 py-2 rounded-2xl"
          aria-disabled={isPending}
        >
          ログイン
        </button>
        <p className="mt-6 flex gap-4">
          アカウントがない場合
          <Link href="/register" className="font-medium">
            登録
          </Link>
        </p>
      </div>
    </form>
  );
}
