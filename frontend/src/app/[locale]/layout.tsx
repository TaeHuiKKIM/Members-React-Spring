import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import '../globals.css';
import type { Metadata } from 'next';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';

export const metadata: Metadata = {
  title: '멤버스 성형외과',
  description: '프리미엄 성형외과 멤버스',
};

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className="antialiased text-gray-900 bg-white min-h-screen flex flex-col">
        <NextIntlClientProvider messages={messages}>
          <Header />
          <PageTransition>
            {children}
          </PageTransition>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
