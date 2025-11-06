import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import CheckoutForm from './CheckoutForm';
import { useCart } from '../context/CartContext';
import { Receipt } from '../types';

interface CheckoutModalProps {
  onClose: () => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ onClose }) => {
  const { handleCheckoutSuccess } = useCart();

  const handleSuccess = (receipt: Receipt) => {
    onClose();
    handleCheckoutSuccess(receipt);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl shadow-2xl max-w-md w-full"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6 relative">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Checkout</h2>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close checkout"
            >
              <X className="w-5 h-5" />
            </button>
            <CheckoutForm
              onSuccess={handleSuccess}
              onCancel={onClose}
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CheckoutModal;
