import RegisterForm from '@/app/ui/register-form';
import { Suspense } from 'react';
import Image from 'next/image';

export default function Page() {
  return (
    <main className="p-5">
      <Suspense>
        <RegisterForm />
      </Suspense>
    </main>
  );
}
