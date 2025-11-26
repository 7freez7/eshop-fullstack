'use client';

// Krok 1: Doplnění chybějících importů z Reactu a Next.js
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Products.module.css';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import ProductForm from '@/components/ProductForm'; 

// Krok 2: Definice rozhraní pro Product (musí odpovídat NestJS/Prisma schématu)
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  slug: string;
}

export type ProductFormPayload = Omit<Product, 'id'>;

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | undefined>(undefined);
  const router = useRouter();

  // Krok 3: Doplnění getAuthHeaders a fetchProducts (s useCallback)
  const getAuthHeaders = useCallback(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
      return null;
    }
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  }, [router]);

  const fetchProducts = useCallback(async () => {
    const headers = getAuthHeaders();
    if (!headers) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('http://localhost:3000/products', { headers });

      if (res.ok) {
        setProducts(await res.json());
      } else if (res.status === 401) {
        localStorage.removeItem('adminToken');
        router.push('/admin/login');
      } else {
        setError('Nepodařilo se načíst produkty.');
      }
    } catch (e) {
      setError('Chyba spojení se serverem. Zkontrolujte, zda běží backend.');
    } finally {
      setLoading(false);
    }
  }, [getAuthHeaders, router]);

  // Krok 4: Doplnění useEffect pro prvotní načtení
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Krok 5: Doplnění handleDelete
  const handleDelete = async (id: number) => {
    if (!window.confirm(`Opravdu chcete smazat produkt s ID ${id}?`)) return;

    const headers = getAuthHeaders();
    if (!headers) return;

    try {
      const res = await fetch(`http://localhost:3000/products/${id}`, {
        method: 'DELETE',
        headers,
      });

      if (res.ok) {
        alert('Produkt úspěšně smazán.');
        fetchProducts(); // Aktualizovat seznam
      } else {
        alert('Chyba při mazání produktu.');
      }
    } catch (e) {
      alert('Chyba spojení.');
    }
  };
  
  // Zbytek tvého kódu pro handleOpenForm a handleSave je již správný.
  const handleOpenForm = (product?: Product) => {
    setProductToEdit(product);
    setIsFormOpen(true);
  };

  const handleSave = async (data: Omit<Product, 'id'>, id?: number) => {
    const headers = getAuthHeaders();
    if (!headers) throw new Error('Chyba autentizace.');

    const method = id ? 'PUT' : 'POST';
    const url = id ? `http://localhost:3000/products/${id}` : 'http://localhost:3000/products';

    const res = await fetch(url, {
      method: method,
      headers: headers,
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Uložení selhalo. ${errorText}`);
    }
    fetchProducts();
  };

  if (loading) return <div>Načítám produkty...</div>;
  if (error) return <div>Chyba: {error}</div>;

  return (
    <div className={styles.container}>
      <h1>Správa Produktů</h1>
      <button 
        className={styles.addButton}
        onClick={() => handleOpenForm(undefined)} // Pro přidání nového
      >
        <FaPlus /> Přidat Nový Produkt
      </button>

      {/* Zobrazit formulář, pokud je otevřen */}
      {isFormOpen && (
        <ProductForm 
          initialData={productToEdit} 
          onSave={handleSave} 
          onClose={() => setIsFormOpen(false)}
        />
      )}

      <table className={styles.productTable}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Název</th>
            <th>Cena</th>
            <th>Akce</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>{p.price} Kč</td>
                <td>
                  <button 
                    className={styles.editButton} 
                    onClick={() => handleOpenForm(p)} // Pro úpravu
                  >
                    <FaEdit />
                  </button>
                  <button 
                    className={styles.deleteButton} 
                    onClick={() => handleDelete(p.id)}
                  >
                    <FaTrash />
                  </button>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}