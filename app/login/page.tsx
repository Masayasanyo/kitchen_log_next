import LoginForm from '@/app/ui/login-form';
import { Suspense } from 'react';
import Image from 'next/image';

export default function LoginPage() {
  return (
    <main className="p-5 flex flex-col gap-2 max-w-[500px] mx-auto my-0">
      <Image
        src="/logo.png"
        width={1000}
        height={1000}
        alt="logo"
        className="py-10 mx-auto w-30"
      />
      <Suspense>
        <LoginForm />
      </Suspense>
    </main>
  );
}
