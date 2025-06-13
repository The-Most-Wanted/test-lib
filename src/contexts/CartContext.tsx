import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './AuthContext';
import { useAnalytics } from '@/hooks/useAnalytics';
import { toast } from 'sonner';

interface CartItem {
  id: string;
  book_id: number;
  quantity: number;
  book: {
    id: number;
    title: string;
    title_en: string;
    price: number;
    image_url: string;
    stock_quantity: number;
  };
}

interface CartContextType {
  items: CartItem[];
  loading: boolean;
  addToCart: (bookId: number, quantity?: number) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { trackAddToCart } = useAnalytics();

  // Load cart items when user changes
  useEffect(() => {
    if (user) {
      loadCartItems();
    } else {
      setItems([]);
    }
  }, [user]);

  const loadCartItems = async () => {
    if (!user) return;

    setLoading(true);
    const { data, error } = await supabase
      .from('cart_items')
      .select(`
        id,
        book_id,
        quantity,
        book:books(
          id,
          title,
          title_en,
          price,
          image_url,
          stock_quantity
        )
      `)
      .eq('user_id', user.id);

    if (error) {
      console.error('Error loading cart:', error);
      toast.error('Erreur lors du chargement du panier');
    } else {
      setItems(data || []);
    }
    setLoading(false);
  };

  const addToCart = async (bookId: number, quantity = 1) => {
    if (!user) {
      toast.error('Veuillez vous connecter pour ajouter au panier');
      return;
    }

    // Get book details for analytics
    const { data: bookData } = await supabase
      .from('books')
      .select('title, price')
      .eq('id', bookId)
      .single();

    // Check if item already exists in cart
    const existingItem = items.find(item => item.book_id === bookId);
    
    if (existingItem) {
      await updateQuantity(existingItem.id, existingItem.quantity + quantity);
      return;
    }

    const { error } = await supabase
      .from('cart_items')
      .insert({
        user_id: user.id,
        book_id: bookId,
        quantity: quantity
      });

    if (error) {
      console.error('Error adding to cart:', error);
      toast.error('Erreur lors de l\'ajout au panier');
    } else {
      toast.success('Livre ajouté au panier');
      
      // Track analytics event
      if (bookData) {
        trackAddToCart(bookId, bookData.title, bookData.price);
      }
      
      await loadCartItems();
    }
  };

  const removeFromCart = async (itemId: string) => {
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('id', itemId);

    if (error) {
      console.error('Error removing from cart:', error);
      toast.error('Erreur lors de la suppression');
    } else {
      toast.success('Livre retiré du panier');
      await loadCartItems();
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      await removeFromCart(itemId);
      return;
    }

    const { error } = await supabase
      .from('cart_items')
      .update({ quantity })
      .eq('id', itemId);

    if (error) {
      console.error('Error updating quantity:', error);
      toast.error('Erreur lors de la mise à jour');
    } else {
      await loadCartItems();
    }
  };

  const clearCart = async () => {
    if (!user) return;

    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('user_id', user.id);

    if (error) {
      console.error('Error clearing cart:', error);
      toast.error('Erreur lors de la vidange du panier');
    } else {
      setItems([]);
      toast.success('Panier vidé');
    }
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + (item.book.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const value = {
    items,
    loading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};