import { motion, AnimatePresence } from 'framer-motion';

interface DigitProps {
  digit: number | string;
}

const digitVariants = {
  enter: { y: 20, opacity: 0 },
  center: { y: 0, opacity: 1 },
  exit: { y: -20, opacity: 0 },
};

export default function Digit({ digit }: DigitProps) {
  return (
    <div className="inline-block min-w-10 text-center overflow-hidden h-[70px]">
      <AnimatePresence 
        mode="popLayout"
        initial={false}
      >
        <motion.span
          key={digit} 
          variants={digitVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="inline-block w-full"
        >
          {digit}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}