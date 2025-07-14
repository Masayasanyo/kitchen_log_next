import Main from '@/app/ui/main';
import Footer from '@/app/ui/footer';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-5 flex flex-col gap-2 max-w-[1120px] mx-auto my-0 min-h-screen">
      <Main>{children}</Main>
      <Footer />
    </div>
  );
}
