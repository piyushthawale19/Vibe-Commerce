import React from 'react';
import { CartProvider, useCart } from './context/CartContext';
import Header from './components/Header';
import ProductsGrid from './components/ProductsGrid';
import Cart from './components/Cart';
import CheckoutModal from './components/CheckoutModal';
import ReceiptModal from './components/ReceiptModal';
import { Toaster } from 'react-hot-toast';

function PageLayout() {
  const { isCartOpen, openCart, closeCart, isCheckoutModalOpen, closeCheckoutModal, receipt, closeReceipt } = useCart();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Toaster position="bottom-center" toastOptions={{
        style: {
          background: '#333',
          color: '#fff',
        },
      }} />
      <Header onCartClick={openCart} />
      <main>
        <ProductsGrid />
      </main>
      <Cart isOpen={isCartOpen} onClose={closeCart} />
      {isCheckoutModalOpen && <CheckoutModal onClose={closeCheckoutModal} />}
      {receipt && <ReceiptModal receipt={receipt} onClose={closeReceipt} />}
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <PageLayout />
    </CartProvider>
  );
}

export default App;
