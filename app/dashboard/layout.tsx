import Header from '@/app/ui/header';
import Footer from '@/app/ui/footer';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-5 flex flex-col gap-2">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
