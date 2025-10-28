import { motion } from 'framer-motion';
import { FaExclamationTriangle, FaTimes } from 'react-icons/fa';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

const overlayVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const modalVariants = {
  visible: { opacity: 1, y: 0, scale: 1 },
  hidden: { opacity: 0, y: -50, scale: 0.9 },
};

export default function ConfirmModal({onClose, onConfirm, title, message }: ConfirmModalProps) {
  
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <>
      <motion.div
        className="fixed inset-0 bg-black/70 z-40"
        variants={overlayVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        onClick={onClose}
      />

      <motion.div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                   bg-slate-800 rounded-lg shadow-xl p-6 w-full max-w-sm z-50"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      >

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">{title}</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <FaTimes size={20} />
          </button>
        </div>

        <div className="flex items-start space-x-4 mt-4">
            
          <div className="shrink-0">
            <FaExclamationTriangle size={24} className="text-yellow-400" />
          </div>
          
          <div>
            <p className="text-slate-300">{message}</p>
          </div>
        </div>

        <div className="flex flex-row gap-2 mt-8">
          <button
            onClick={onClose}
            className="w-full bg-slate-600 text-white font-bold py-2 px-4 rounded-md hover:bg-slate-700 transition-colors"
          >
            iptal
          </button>
          <button
            onClick={handleConfirm}
            className="w-full bg-red-600 text-white font-bold py-2 px-4 rounded-md hover:bg-red-700 transition-colors"
          >
            onayla
          </button>
        </div>
      </motion.div>
    </>
  );
}