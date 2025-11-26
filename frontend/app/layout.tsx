import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CartProvider } from '@/context/CartContext';

// Import globálních stylů (pokud existuje)
// Vytvoř si soubor frontend/app/globals.css pro resetování stylů
import './globals.css'; 

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="cs">
      <body>
        <CartProvider>
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
            <main style={{ flexGrow: 1 }}>
                {children}
            </main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}