import { Product, CartItem, Receipt, CheckoutFormData } from '../types';
import { MOCK_PRODUCTS } from '../data/products';

const STORAGE_KEY = 'vibe_commerce_cart';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  async getProducts(): Promise<Product[]> {
    await delay(300);
    return MOCK_PRODUCTS;
  },

  async getCart(): Promise<CartItem[]> {
    await delay(200);
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  },

  async addToCart(productId: string, quantity: number = 1): Promise<CartItem[]> {
    await delay(300);
    const cart = await this.getCart();
    const product = MOCK_PRODUCTS.find(p => p.id === productId);
    
    if (!product) {
      throw new Error('Product not found');
    }

    const existingItemIndex = cart.findIndex(item => item.productId === productId);
    
    if (existingItemIndex > -1) {
      cart[existingItemIndex].quantity += quantity;
    } else {
      const newItem: CartItem = {
        id: `cart-${Date.now()}-${Math.random()}`,
        productId,
        product,
        quantity
      };
      cart.push(newItem);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    return cart;
  },

  async updateCartItem(cartItemId: string, quantity: number): Promise<CartItem[]> {
    await delay(200);
    const cart = await this.getCart();
    const itemIndex = cart.findIndex(item => item.id === cartItemId);
    
    if (itemIndex === -1) {
      throw new Error('Cart item not found');
    }

    if (quantity <= 0) {
      return this.removeFromCart(cartItemId);
    }

    cart[itemIndex].quantity = quantity;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    return cart;
  },

  async removeFromCart(cartItemId: string): Promise<CartItem[]> {
    await delay(200);
    const cart = await this.getCart();
    const updatedCart = cart.filter(item => item.id !== cartItemId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCart));
    return updatedCart;
  },

  async checkout(formData: CheckoutFormData): Promise<Receipt> {
    await delay(500);
    const cart = await this.getCart();
    
    if (cart.length === 0) {
      throw new Error('Cart is empty');
    }

    const total = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    
    const receipt: Receipt = {
      id: `receipt-${Date.now()}`,
      items: cart,
      total,
      timestamp: new Date().toISOString(),
      customerName: formData.name,
      customerEmail: formData.email
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    
    return receipt;
  }
};
