// Soubor: frontend/app/admin/layout.tsx

'use client'; // Použijeme Client Component pro přístup k localStorage a Routeru

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import AdminSidebar from '@/components/adminSidebar';
// Zde je oprava: Musíme importovat objekt 'styles' z CSS Modules
import styles from './admin/AdminLayout.module.css';interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  
  // ... (Logika useEffect zůstává stejná) ...
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      if (pathname !== '/admin/login') {
        router.push('/admin/login');
      }
    } 
  }, [pathname, router]);

  // Speciální případ: Pokud je na přihlašovací stránce, nezobrazuj sidebar
  if (pathname === '/admin/login') {
      return <>{children}</>;
  }

  // Standardní layout pro chráněné stránky (s tokenem)
  return (
    // Používáme třídy z importovaného objektu 'styles'
    <div className={styles.layout}> 
      <AdminSidebar />
      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  );
}