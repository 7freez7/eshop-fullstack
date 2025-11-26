// Soubor: frontend/components/ProductForm.tsx

'use client';

import React, { useState, useEffect } from 'react';
import styles from './ProductForm.module.css';

interface Product {
  id?: number;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  slug: string;
}

interface ProductFormProps {
  initialData?: Product; // Pro úpravu existujícího produktu
  onSave: (product: Omit<Product, 'id'>, id?: number) => Promise<void>;
  onClose: () => void;
}

const initialProductState: Omit<Product, 'id'> = {
  name: '',
  description: '',
  price: 0,
  imageUrl: '',
  slug: '',
};

export default function ProductForm({ initialData, onSave, onClose }: ProductFormProps) {
  const [product, setProduct] = useState<Omit<Product, 'id'>>(initialData || initialProductState);
  const [loading, setLoading] = useState(false);

  // Při změně initialData (např. při otevření formuláře pro editaci)
  useEffect(() => {
    if (initialData) {
      // Omit ID pro formulář
      const { id, ...rest } = initialData;
      setProduct(rest);
    } else {
      setProduct(initialProductState);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSave(product, initialData?.id);
      onClose(); // Zavřít formulář po úspěšném uložení
    } catch (error) {
      console.error('Chyba při ukládání produktu:', error);
      alert(`Chyba při ukládání: ${error instanceof Error ? error.message : 'Neznámá chyba'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>{initialData ? 'Upravit Produkt' : 'Přidat Nový Produkt'}</h2>
        <form onSubmit={handleSubmit}>
          <label>Název:</label>
          <input type="text" name="name" value={product.name} onChange={handleChange} required />

          <label>Popis:</label>
          <textarea name="description" value={product.description} onChange={handleChange} required />

          <label>Cena (Kč):</label>
          <input type="number" name="price" value={product.price} onChange={handleChange} required step="0.01" />

          <label>URL Obrázku:</label>
          <input type="text" name="imageUrl" value={product.imageUrl} onChange={handleChange} />

          <label>Slug (URL):</label>
          <input type="text" name="slug" value={product.slug} onChange={handleChange} required />

          <div className={styles.actions}>
            <button type="button" onClick={onClose} disabled={loading}>Zrušit</button>
            <button type="submit" disabled={loading}>
              {loading ? 'Ukládám...' : 'Uložit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}