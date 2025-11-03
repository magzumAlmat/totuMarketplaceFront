// // src/app/layout.js
// import { Inter } from 'next/font/google';
// import './globals.css';
// import Head from 'next/head';
// import dynamic from 'next/dynamic';
// import ReduxProvider from '@/store/provider';
// import ThemeProviderWrapper from '@/store/themeProvider';
// import Footer from '@/components/footer';
// import Header from '@/components/header';

// // Dynamically import LoggedDataDisplay, disabling SSR
// const LoggedDataDisplay = dynamic(() => import('@/components/LoggedDataDisplay'), { ssr: false });

// export const viewport = {
//   width: 'device-width',
//   initialScale: 1,
//   minimumScale: 1,
//   maximumScale: 1,
// };

// export const metadata = {
//   title: 'Купить опто-волоконный кабель',
//   description:
//     'Купить волконно-оптический кабель, Купить телекоммуникационные шкафы, Купить силовые кабеля Купить электрический провод Купить оптические кросы Купить оптические муфты',
//   verification: {
//     google: 'Qmi_pB30aPPO__Ht7NT-D8VY8E8xKifhiMwMRybaur4',
//   },
// };


// export default function RootLayout({ children }) {
  
//   return (
//     <html lang="en">
//       <Head>
//         <meta
//           name="viewport"
//           content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0"
//         />
//         <script
//           async
//           src="https://www.googletagmanager.com/gtag/js?id=AW-16464823771"
//         ></script>
//         <script
//           dangerouslySetInnerHTML={{
//             __html: `
//               window.dataLayer = window.dataLayer || [];
//               function gtag(){dataLayer.push(arguments)}
//               gtag('js', new Date());
//               gtag('config', 'AW-16464823771');
//             `,
//           }}
//         />
//        <script src="https://widget.tiptoppay.kz/bundles/widget.js"></script>
//       </Head>
//       <body>
//         <ThemeProviderWrapper>
//           <ReduxProvider>
//          <Header />
//             <main>{children}</main>
//             <Footer />
//             <LoggedDataDisplay />
//           </ReduxProvider>
//         </ThemeProviderWrapper>
//       </body>
//     </html>
//   );
// }
{/* <script src="https://widget.tiptoppay.kz/bundles/widget.js"></script> */}



'use client';

import './globals.css';
import Head from 'next/head';
import ReduxProvider from '@/store/provider';
import ThemeProviderWrapper from '@/store/themeProvider';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';
// Dynamically import LoggedDataDisplay, disabling SSR
const LoggedDataDisplay = dynamic(() => import('@/components/LoggedDataDisplay'), { ssr: false });

// Импортируем клиентский RootLayout
import RootLayout from './RootLayout';

// export const viewport = {
//   width: 'device-width',
//   initialScale: 1,
//   minimumScale: 1,
//   maximumScale: 1,
// };
 {/* <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0"/> */}



// export const metadata = {
//   title: 'Купить Чехол',
//   description:
//     'Купить аксессуары для смартфонов, купить зарядные устройства, купить кабели Lightning, Type-C, USB-C, купить беспроводные наушники, купить защитные стекла и чехлы, купить автомобильные держатели и кабели, купить сетевые адаптеры и переходники, купить электронику и гаджеты',
  
//   verification: {
//     // google: 'Qmi_pB30aPPO__Ht7NT-D8VY8E8xKifhiMwMRybaur4',
//     google:'Su2bLt19C5Hc5DOvhV2p9Oi2kMSHvIS0-5IpefdDy_Q'
//   },
// };



export const metadata = {
  metadataBase: new URL('https://totu.kz'),
  title: {
    default: 'Купить Чехол',
    template: '%s | Купить Чехол',
  },
  description:
    'Купить аксессуары для смартфонов, зарядные устройства, кабели Lightning, Type-C, USB-C, беспроводные наушники, защитные стекла и чехлы, автомобильные держатели, сетевые адаптеры и гаджеты в Казахстане.',
  
  keywords: [
    'купить чехол',
    'купить зарядку',
    'кабель lightning',
    'type-c кабель',
    'беспроводные наушники',
    'защитное стекло',
    'автомобильный держатель',
    'гаджеты алматы',
    'аксессуары для телефона'
  ].join(', '),

  // Open Graph / Соцсети
  openGraph: {
    title: 'Купить Чехол — Аксессуары для смартфонов в Казахстане',
    description: 'Чехлы, зарядки, кабели, наушники, защитные стекла — всё для вашего телефона. Доставка по Казахстану.',
    url: 'https://totu.kz',
    siteName: 'Totu.kz',
    images: [
      {
        url: '/og-image.jpg', // Создайте это изображение!
        width: 1200,
        height: 630,
        alt: 'Totu.kz — Аксессуары для смартфонов',
      },
    ],
    locale: 'ru_KZ',
    type: 'website',
  },

  // Twitter
  twitter: {
    card: 'summary_large_image',
    title: 'Купить Чехол — Аксессуары для смартфонов',
    description: 'Чехлы, зарядки, кабели, наушники — всё для телефона',
    images: ['/og-image.jpg'],
  },

  // Robots
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

  // Верификация
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

export function GTM() {
  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'GTM-PTPGV8NK');
  }, []);

  return (
    <>
      <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=GTM-PTPGV8NK"
      />
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-PTPGV8NK"
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>
    </>
  );
}


export default function ServerLayout({ children }) {
  return (
    <html lang="en">
      {/* <Head>
       
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=GTM-PTPGV8NK"
        ></script>



<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PTPGV8NK"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>


        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments)}
              gtag('js', new Date());
              gtag('config', 'GTM-PTPGV8NK');
            `,
          }}
        />
        
      </Head> */}
      <body>
        <GTM />
        <ThemeProviderWrapper>
          <ReduxProvider>
            <RootLayout>{children}</RootLayout>

          </ReduxProvider>
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}