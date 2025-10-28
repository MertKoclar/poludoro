import { motion } from 'framer-motion';
import Digit from './Digit';

interface TimerProps {
  secondsLeft: number;
}

export default function Timer({ secondsLeft }: TimerProps) {
  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  const minuteTens = Math.floor(minutes / 10);
  const minuteOnes = minutes % 10;
  
  const secondsString = seconds.toString().padStart(2, '0');
  const secondTens = secondsString[0];
  const secondOnes = secondsString[1];

  return (
    <motion.div
      className="bg-slate-800 rounded-full w-64 h-64 flex items-center justify-center shadow-2xl shadow-black/30 mb-8"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <span className="text-7xl font-bold text-white flex items-center">
        
        <Digit digit={minuteTens} />
        <Digit digit={minuteOnes} />

        <span className="w-[30px] text-center pb-2">:</span>

        <Digit digit={secondTens} />
        <Digit digit={secondOnes} />
        
      </span>
    </motion.div>
  );
}