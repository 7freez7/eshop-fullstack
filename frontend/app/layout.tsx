// Soubor: frontend/app/layout.tsx

import React from 'react';
import { CartProvider } from '@/context/CartContext'; // NOVÝ IMPORT

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="cs">
      <body>
        <CartProvider> {/* ZABALENÍ DO PROVIDERU */}
          {children} 
        </CartProvider>
      </body>
    </html>
  );
}