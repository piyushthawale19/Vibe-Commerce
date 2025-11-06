import React, { useState, useEffect } from 'react';
import { Plus, Loader2, Check } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
}

type ButtonState = 'idle' | 'loading' | 'added';

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const [buttonState, setButtonState] = useState<ButtonState>('idle');

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (buttonState === 'added') {
      timer = setTimeout(() => {
        setButtonState('idle');
      }, 1500);
    }
    return () => clearTimeout(timer);
  }, [buttonState]);

  const handleAddToCart = async () => {
    if (buttonState !== 'idle') return;
    
    try {
      setButtonState('loading');
      await addToCart(product.id);
      setButtonState('added');
    } catch (error) {
      console.error('Error adding to cart:', error);
      setButtonState('idle');
    }
  };

  const renderButtonContent = () => {
    switch (buttonState) {
      case 'loading':
        return <Loader2 className="w-5 h-5 animate-spin" />;
      case 'added':
        return (
          <>
            <Check className="w-5 h-5" />
            Added
          </>
        );
      case 'idle':
      default:
        return (
          <>
            <Plus className="w-4 h-4" />
            Add
          </>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col"
    >
      <div className="relative overflow-hidden bg-gray-100 aspect-square">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        <span className="absolute top-2 right-2 bg-purple-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
          {product.category}
        </span>
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-bold text-lg text-gray-800 mb-1">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-3 flex-1">{product.description}</p>
        
        <div className="flex items-center justify-between mt-auto">
          <span className="text-2xl font-bold text-purple-600">
            ₹{product.price.toFixed(2)}
          </span>
          
          <button
            onClick={handleAddToCart}
            disabled={buttonState !== 'idle'}
            className={`w-28 h-10 px-4 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
              buttonState === 'added' 
                ? 'bg-green-500 hover:bg-green-600' 
                : 'bg-purple-600 hover:bg-purple-700'
            } text-white disabled:opacity-75 disabled:cursor-not-allowed`}
          >
            {renderButtonContent()}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
