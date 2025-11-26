'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Hlavní logo / název e-shopu */}
        <Link href="/" className={styles.logo}>
          <h1>🛍️ Eshop</h1>
        </Link>
        
        <nav className={styles.nav}>
          <Link href="/" className={styles.navItem}>
            Produkty
          </Link>
          <Link href="/cart" className={styles.navItem}>
            Košík ({totalItems}) 🛒
          </Link>
          <Link href="/admin/products" className={styles.navItem}>
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}