// src/app/components/GTM.jsx
'use client';

import { useEffect } from 'react';

export default function GTM() {
  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
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