import type { Metadata } from 'next';
import Root from '../components/Root';
import '../styles/index.css';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mian.ru';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'ООО МИАН — Строительная компания',
    template: '%s | ООО МИАН',
  },
  description: 'Надежный застройщик качественного жилья с 2010 года. Квартиры от застройщика. Ипотека, рассрочка, онлайн-запись.',
  keywords: ['ООО МИАН', 'застройщик', 'новостройки', 'купить квартиру', 'жилые комплексы', 'ипотека'],
  authors: [{ name: 'ООО МИАН' }],
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: baseUrl,
    siteName: 'ООО МИАН',
    title: 'ООО МИАН — Строительная компания',
    description: 'Надежный застройщик качественного жилья с 2010 года.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <Root>{children}</Root>
      </body>
    </html>
  );
}
