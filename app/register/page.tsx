// import AcmeLogo from '@/app/ui/acme-logo';
import RegisterForm from '@/app/ui/register-form';
import { Suspense } from 'react';
import Image from 'next/image'

export default function RegisterPage() {
  return (
    <main className="p-5">
      <Image 
        src="/logo.png" 
        width={1000} 
        height={1000} 
        alt='logo' 
        className='py-10 mx-auto w-30'
      />
      <Suspense>
        <RegisterForm />
      </Suspense>
    </main>
  );
}