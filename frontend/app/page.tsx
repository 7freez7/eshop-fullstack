// Soubor: frontend/app/page.tsx (Homepage e-shopu)

import ProductCard from '@/components/ProductCard';
import styles from './Home.module.css'; // Mělo by odkazovat na tvůj Home.module.css
import { Product } from '@/types/product'; // Import centrálního typu

// Next.js Server Component pro získání dat
async function getProducts(): Promise<Product[]> {
  // NEXT.JS (na 3001) volá NESTJS (na 3000)
  const res = await fetch('http://127.0.0.1:3000/products', { cache: 'no-store' }); 
  
  if (!res.ok) {
    console.error('Failed to fetch products:', await res.text());
    return []; 
  }
  return res.json();
}

export default async function HomePage() {
  const products = await getProducts();

  return (
    <main className={styles.mainContainer}>
      <h1 className={styles.heading}>Nabídka našich produktů 🛍️</h1>
      <div className={styles.productGrid}>
        {products.length === 0 ? (
          <p>Nebyly nalezeny žádné produkty. Přidejte je prosím v administraci.</p>
        ) : (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
    </main>
  );
}