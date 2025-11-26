import styles from './Footer.module.css';
import Link from 'next/link'; // DŮLEŽITÉ: Musíš importovat komponentu Link

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p>&copy; {currentYear} Eshop. Všechna práva vyhrazena.</p>
        <div className={styles.links}>
            <Link href="/admin/login">Admin Přihlášení</Link>
            <Link href="/contact">Kontakt</Link>
        </div>
      </div>
    </footer>
  );
}