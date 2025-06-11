'use client';

import { useActionState } from 'react';
import { register, State } from '@/app/lib/actions';
import Link from 'next/link';

export default function RegisterForm() {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(register, initialState);

  return (
    <form action={formAction} className="">
      <div className=''>
        <h1 className='font-bold text-2xl mb-10'>会員登録</h1>
        <div className="w-full">
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium"
              htmlFor="username"
            >
              ユーザーネーム
            </label>
            <div className="relative">
              <input
                className="bg-[#ffffff] p-3 rounded-2xl w-full"
                id="username"
                type="text"
                name="username"
                placeholder="ユーザーネームを入力してください" 
                maxLength={50}
                required
              />
            </div>
          </div>
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
                maxLength={50}
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
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium"
              htmlFor="confirmed-password"
            >
              確認用パスワード
            </label>
            <div className="relative">
              <input
                className="bg-[#ffffff] p-3 rounded-2xl w-full"
                id="confirmed-password"
                type="password"
                name="confirmed-password"
                placeholder="再度パスワードを入力してください"
                required
                minLength={6}
              />
            </div>
          </div>
        </div>
        <button className="mt-6 bg-[#1F4529] text-[#E8ECD7] w-full px-4 py-2 rounded-2xl">
          登録
        </button>
        <p className='mt-6'>
          アカウントがある場合
          <Link href="/login" className='font-medium'> ログイン</Link>
        </p>
      </div>
    </form>
  );
}
