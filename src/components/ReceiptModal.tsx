import React from 'react';
import { Receipt } from '../types';
import { CheckCircle, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface ReceiptModalProps {
  receipt: Receipt;
  onClose: () => void;
}

const ReceiptModal: React.FC<ReceiptModalProps> = ({ receipt, onClose }) => {
  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const confirmationVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 rounded-t-2xl relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
            aria-label="Close receipt"
          >
            <X className="w-5 h-5" />
          </button>
          
          <motion.div
            variants={confirmationVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center text-center"
          >
            <motion.div variants={itemVariants} className="bg-white/20 rounded-full p-3 mb-3">
              <CheckCircle className="w-12 h-12" />
            </motion.div>
            <motion.h2 variants={itemVariants} className="text-2xl font-bold mb-1">
              Order Successful!
            </motion.h2>
            <motion.p variants={itemVariants} className="text-green-100 text-sm">
              Thank you for your purchase
            </motion.p>
          </motion.div>
        </div>

        <div className="p-6 space-y-6">
          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Order ID:</span>
              <span className="font-mono font-semibold">{receipt.id}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Date:</span>
              <span className="font-semibold">{formatDate(receipt.timestamp)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Customer:</span>
              <span className="font-semibold">{receipt.customerName}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Email:</span>
              <span className="font-semibold truncate ml-2">{receipt.customerEmail}</span>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-gray-800 mb-3">Order Items</h3>
            <div className="space-y-3">
              {receipt.items.map((item) => (
                <div key={item.id} className="flex justify-between items-start text-sm">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">{item.product.name}</p>
                    <p className="text-gray-600">Qty: {item.quantity} × ₹{item.product.price.toFixed(2)}</p>
                  </div>
                  <p className="font-bold text-purple-600">
                    ₹{(item.product.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-gray-800">Total Paid:</span>
              <span className="text-3xl font-bold text-green-600">
                ₹{receipt.total.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              A confirmation email has been sent to <strong>{receipt.customerEmail}</strong>
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all duration-200"
          >
            Continue Shopping
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ReceiptModal;
