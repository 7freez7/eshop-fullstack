// Soubor: frontend/context/CartContext.tsx

'use client';

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Product, CartItem } from '@/types/product';

interface CartContextType {
  cart: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Načítání a ukládání košíku do localStorage pro perzistenci
const loadCart = (): CartItem[] => {
  if (typeof window !== 'undefined') {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  }
  return [];
};

const saveCart = (cart: CartItem[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>(loadCart());

  // Ukládáme košík do localStorage při každé změně stavu 'cart'
  useEffect(() => {
    saveCart(cart);
  }, [cart]);

  const addItem = (product: Product, quantity: number = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);

      if (existingItem) {
        // Produkt už v košíku je, zvýšíme množství
        const newCart = prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
        return newCart;
      } else {
        // Nový produkt, přidáme do košíku
        return [...prevCart, { ...product, quantity }];
      }
    });
  };

  const removeItem = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
      if (newQuantity <= 0) {
          removeItem(productId);
          return;
      }
      setCart(prevCart => prevCart.map(item =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
      ));
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ cart, addItem, removeItem, updateQuantity, getTotalItems, getTotalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};