import React from 'react';
import { ShoppingCart, Package } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';

interface HeaderProps {
  onCartClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onCartClick }) => {
  const { getCartItemsCount, isAnimatingCartIcon } = useCart();
  const itemCount = getCartItemsCount();

  return (
    <header className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Package className="w-8 h-8" />
            <div>
              <h1 className="text-2xl font-bold">Vibe Commerce</h1>
              <p className="text-xs text-purple-100">Your Shopping Destination</p>
            </div>
          </div>

          <motion.button
            onClick={onCartClick}
            className="relative bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2"
            animate={isAnimatingCartIcon ? { scale: [1, 1.1, 1], rotate: [0, -3, 3, -3, 0] } : {}}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="font-semibold hidden sm:inline">Cart</span>
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
                {itemCount}
              </span>
            )}
          </motion.button>
        </div>
      </div>
    </header>
  );
};

export default Header;
