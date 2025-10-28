import { motion } from "framer-motion";
import { FaPlay, FaPause, FaUndo } from "react-icons/fa";

interface ControlsProps {
  isActive: boolean;
  onStartPause: () => void; // Başlat/Durdur fonksiyonu
  onReset: () => void; // Sıfırla fonksiyonu
}

export default function Controls({
  isActive,
  onStartPause,
  onReset,
}: ControlsProps) {
  const buttonVariants = {
    hover: { scale: 1.1 },
    tap: { scale: 0.9 },
  };

  return (
    <div className="flex space-x-6">
      <motion.button
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        onClick={onStartPause}
        className="bg-white text-slate-900 p-4 rounded-full shadow-lg"
      >
        {isActive ? <FaPause size={24} /> : <FaPlay size={24} />}
      </motion.button>

      <motion.button
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        onClick={onReset}
        className="bg-slate-700 text-slate-300 hover:text-white p-4 rounded-full shadow-lg"
      >
        <FaUndo size={24} />
      </motion.button>
    </div>
  );
}
