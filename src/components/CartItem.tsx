import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '../types';
import { useCart } from '../context/CartContext';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleIncrease = () => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const handleDecrease = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    }
  };

  const handleRemove = () => {
    removeFromCart(item.id);
  };

  return (
    <div className="flex gap-4 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
      <img
        src={item.product.image}
        alt={item.product.name}
        className="w-20 h-20 object-cover rounded-md flex-shrink-0"
      />
      
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex justify-between items-start mb-1">
            <h3 className="font-semibold text-gray-800 pr-2">{item.product.name}</h3>
            <p className="font-bold text-lg text-purple-600 whitespace-nowrap">
              ₹{(item.product.price * item.quantity).toFixed(2)}
            </p>
        </div>
        <p className="text-sm text-gray-600">₹{item.product.price.toFixed(2)} each</p>
        
        <div className="flex items-center justify-between mt-auto pt-2">
          <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
            <button
              onClick={handleDecrease}
              className="px-2 py-1 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Decrease quantity"
              disabled={item.quantity <= 1}
            >
              <Minus className="w-4 h-4 text-gray-600" />
            </button>
            <span className="px-3 py-1 font-semibold border-x border-gray-300 text-center text-sm w-10">
              {item.quantity}
            </span>
            <button
              onClick={handleIncrease}
              className="px-2 py-1 hover:bg-gray-100 transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="w-4 h-4 text-gray-600" />
            </button>
          </div>
          
          <button
            onClick={handleRemove}
            className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors"
            aria-label="Remove item"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
