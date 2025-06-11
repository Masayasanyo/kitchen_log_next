import '@/app/ui/global.css';
import { notoSansJP } from '@/app/ui/fonts';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | Kitchen Log',
    default: 'Kitchen Log',
  },
  description:
    'A simple app to manage recipes, meals, stock, and shopping lists — made for everyday kitchen life.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={`${notoSansJP.className} antialiased`}>{children}</body>
    </html>
  );
}
