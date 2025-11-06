import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Receipt } from '../types';
import { api } from '../services/api';
import toast from 'react-hot-toast';

interface CartContextType {
  cart: CartItem[];
  loading: boolean;
  addToCart: (productId: string, quantity?: number) => Promise<void>;
  updateQuantity: (cartItemId: string, quantity: number) => Promise<void>;
  removeFromCart: (cartItemId: string) => Promise<void>;
  getCartTotal: () => number;
  getCartItemsCount: () => number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  isAnimatingCartIcon: boolean;
  isCheckoutModalOpen: boolean;
  openCheckoutModal: () => void;
  closeCheckoutModal: () => void;
  receipt: Receipt | null;
  handleCheckoutSuccess: (receipt: Receipt) => void;
  closeReceipt: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAnimatingCartIcon, setIsAnimatingCartIcon] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [receipt, setReceipt] = useState<Receipt | null>(null);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      setLoading(true);
      const cartData = await api.getCart();
      setCart(cartData);
    } catch (error) {
      console.error('Failed to load cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId: string, quantity: number = 1) => {
    try {
      setLoading(true);
      const updatedCart = await api.addToCart(productId, quantity);
      setCart(updatedCart);
      setIsAnimatingCartIcon(true);
      setTimeout(() => setIsAnimatingCartIcon(false), 600);
    } catch (error) {
      console.error('Failed to add to cart:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (cartItemId: string, quantity: number) => {
    try {
      setLoading(true);
      const updatedCart = await api.updateCartItem(cartItemId, quantity);
      setCart(updatedCart);
    } catch (error) {
      console.error('Failed to update quantity:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (cartItemId: string) => {
    try {
      setLoading(true);
      const updatedCart = await api.removeFromCart(cartItemId);
      setCart(updatedCart);
    } catch (error) {
      console.error('Failed to remove from cart:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const getCartItemsCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };
  
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const openCheckoutModal = () => setIsCheckoutModalOpen(true);
  const closeCheckoutModal = () => setIsCheckoutModalOpen(false);

  const handleCheckoutSuccess = (receiptData: Receipt) => {
    toast.success('Order Confirmed!');
    setReceipt(receiptData);
    clearCart();
  };

  const closeReceipt = () => {
    setReceipt(null);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        addToCart,
        updateQuantity,
        removeFromCart,
        getCartTotal,
        getCartItemsCount,
        isCartOpen,
        openCart,
        closeCart,
        isAnimatingCartIcon,
        isCheckoutModalOpen,
        openCheckoutModal,
        closeCheckoutModal,
        receipt,
        handleCheckoutSuccess,
        closeReceipt,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
