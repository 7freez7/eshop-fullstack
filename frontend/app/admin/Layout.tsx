// Soubor: frontend/app/admin/layout.tsx (Upravený kód)

'use client'; 

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/adminSidebar';
import styles from './AdminLayout.module.css'; 

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    
    // Nyní přesměrujeme na nechráněnou cestu /login
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  // Zde by měla být zobrazená logika až po ověření (později přidáme loader)
  if (!localStorage.getItem('adminToken')) {
      return <div>Ověřování...</div>; // Zobrazíme loader, dokud se přesměrování neprovede
  }

  return (
    <div className={styles.layout}> 
      <AdminSidebar />
      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  );
}