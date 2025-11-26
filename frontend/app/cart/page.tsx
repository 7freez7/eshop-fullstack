// Soubor: frontend/app/cart/page.tsx

'use client';

import { useCart } from '@/context/CartContext';
import styles from './Cart.module.css';
import Link from 'next/link';

export default function CartPage() {
  const { cart, removeItem, updateQuantity, getTotalPrice } = useCart();

  if (cart.length === 0) {
    return (
      <div className={styles.emptyCart}>
        <h1>Váš košík je prázdný 😕</h1>
        <p>Přejděte na <Link href="/" className={styles.shopLink}>hlavní stranu</Link> a vyberte si zboží.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1>Váš Nákupní Košík</h1>
      <table className={styles.cartTable}>
        <thead>
          <tr>
            <th>Produkt</th>
            <th>Cena</th>
            <th>Množství</th>
            <th>Celkem</th>
            <th>Odstranit</th>
          </tr>
        </thead>
        <tbody>
          {cart.map(item => (
            <tr key={item.id}>
              <td>
                <Link href={`/products/${item.slug}`} className={styles.productLink}>{item.name}</Link>
              </td>
              <td>{item.price} Kč</td>
              <td>
                <input
                  type="number"
                  value={item.quantity}
                  min="1"
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                  className={styles.quantityInput}
                />
              </td>
              <td>{(item.price * item.quantity).toFixed(2)} Kč</td>
              <td>
                <button onClick={() => removeItem(item.id)} className={styles.removeButton}>
                  &times;
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.summary}>
        <h2>Celkem k úhradě: {getTotalPrice().toFixed(2)} Kč</h2>
        <button className={styles.checkoutButton} onClick={() => alert('Pokračovat k platbě... (není implementováno)')}>
          Pokračovat k pokladně
        </button>
      </div>
    </div>
  );
}