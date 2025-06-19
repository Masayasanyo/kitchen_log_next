import RegisterForm from '@/app/ui/register-form';
import { Suspense } from 'react';

export default function Page() {
  return (
    <main className="p-5">
      <Suspense>
        <RegisterForm />
      </Suspense>
    </main>
  );
}
