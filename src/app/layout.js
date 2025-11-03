// src/app/layout.js

import './globals.css';
import ReduxProvider from '@/store/provider';
import ThemeProviderWrapper from '@/store/themeProvider';
import dynamic from 'next/dynamic';
import RootLayout from './RootLayout';
import GTM from '../components/gtm'; // ← Импорт клиентского компонента

// Динамический импорт без SSR
const LoggedDataDisplay = dynamic(() => import('@/components/LoggedDataDisplay'), { ssr: false });

// === МЕТАДАННЫЕ (Server Component) ===
export const metadata = {
  metadataBase: new URL('https://totu.kz'),
  title: {
    default: 'Купить Чехол',
    template: '%s | Купить Чехол',
  },
  description:
    'Купить аксессуары для смартфонов, зарядные устройства, кабели Lightning, Type-C, USB-C, беспроводные наушники, защитные стекла и чехлы, автомобильные держатели, сетевые адаптеры и гаджеты в Казахстане.',
  
  keywords: [
    'купить чехол', 'купить зарядку', 'кабель lightning', 'type-c кабель',
    'беспроводные наушники', 'защитное стекло', 'автомобильный держатель',
    'гаджеты алматы', 'аксессуары для телефона'
  ].join(', '),

  openGraph: {
    title: 'Купить Чехол — Аксессуары для смартфонов в Казахстане',
    description: 'Чехлы, зарядки, кабели, наушники, защитные стекла — всё для вашего телефона. Доставка по Казахстану.',
    url: 'https://totu.kz',
    siteName: 'Totu.kz',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Totu.kz — Аксессуары для смартфонов',
      },
    ],
    locale: 'ru_KZ',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Купить Чехол — Аксессуары для смартфонов',
    description: 'Чехлы, зарядки, кабели, наушники — всё для телефона',
    images: ['/og-image.jpg'],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  verification: {
    google: 'Su2bLt19C5Hc5DOvhV2p9Oi2kMSHvIS0-5IpefdDy_Q',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
};

// === ОСНОВНОЙ LAYOUT (Server Component) ===
export default function ServerLayout({ children }) {
  return (
    <html lang="ru">
      <body>
        <GTM /> {/* ← Клиентский компонент, работает! */}
        <ThemeProviderWrapper>
          <ReduxProvider>
            <RootLayout>{children}</RootLayout>
          </ReduxProvider>
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}