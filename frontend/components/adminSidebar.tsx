// Soubor: frontend/components/AdminSidebar.tsx

import Link from 'next/link';
import { useRouter } from 'next/navigation';
// Zde je oprava: Musíme importovat objekt 'styles' z CSS Modules
import styles from './AdminSidebar.module.css'; 
// !!! Předpokládáme, že jsi přejmenoval componentsStyle.css na AdminSidebar.module.css !!!

export default function AdminSidebar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/admin/login');
  };

  return (
    // Nyní používáme třídy z importovaného objektu 'styles'
    <aside className={styles.sidebar}>
      <h2 className={styles.logo}>Admin Panel 🛠️</h2>
      <nav className={styles.nav}>
        <Link href="/admin/dashboard" className={styles.navItem}>
          Přehled
        </Link>
        <Link href="/admin/products" className={styles.navItem}>
          Produkty
        </Link>
        <Link href="/admin/content" className={styles.navItem}>
          Texty (CMS)
        </Link>
        <button onClick={handleLogout} className={styles.logoutButton}>
          Odhlásit se
        </button>
      </nav>
    </aside>
  );
}