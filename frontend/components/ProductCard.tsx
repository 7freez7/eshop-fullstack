// Soubor: frontend/components/ProductCard.tsx

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext'; 
// OPRAVA 1: Import stylu z CSS Modules
import styles from './ProductForm.module.css'; 
// OPRAVA 2: Import centrálního typu
import { Product } from '@/types/product'; 


// DEFINICE: Rozhraní pro props, které chybělo
interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem(product, 1);
    alert(`Přidáno 1x ${product.name} do košíku!`);
  };

  return (
    // Nyní je 'styles' importován a 'ProductCardProps' definován
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image 
          src={product.imageUrl || '/default-product.png'} 
          alt={product.name} 
          fill={true}
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 600px) 100vw, 300px"
        />
      </div>
      
      <div className={styles.details}>
        <Link href={`/products/${product.slug}`} className={styles.titleLink}>
            <h3>{product.name}</h3>
        </Link>
        <p className={styles.price}>{product.price} Kč</p>
        <button 
            className={styles.addToCartButton} 
            onClick={handleAddToCart}
        >
          Přidat do košíku
        </button>
      </div>
    </div>
  );
}