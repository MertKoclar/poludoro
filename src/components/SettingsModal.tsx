import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import type { TimeSettings } from '../App'; 

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newSettings: TimeSettings) => void;
  currentSettings: TimeSettings;
}

interface LocalTimeSettings {
  pomodoro: number;
  shortBreak: number;
  longBreak: number;
}

const overlayVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const modalVariants = {
  visible: { opacity: 1, y: 0, scale: 1 },
  hidden: { opacity: 0, y: -50, scale: 0.9 },
};

export default function SettingsModal({
  isOpen,
  onClose,
  onSave,
  currentSettings,
}: SettingsModalProps) {
  
  const [localSettings, setLocalSettings] = useState<LocalTimeSettings>({
    pomodoro: currentSettings.pomodoro / 60,
    shortBreak: currentSettings.shortBreak / 60,
    longBreak: currentSettings.longBreak / 60,
  });

  useEffect(() => {
    if (isOpen) {
      setLocalSettings({
        pomodoro: currentSettings.pomodoro / 60,
        shortBreak: currentSettings.shortBreak / 60,
        longBreak: currentSettings.longBreak / 60,
      });
    }
  }, [isOpen, currentSettings]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, valueAsNumber } = e.target;
    setLocalSettings((prev) => ({
      ...prev,
      [name]: valueAsNumber || 0,
    }));
  };

  const handleSave = () => {
    onSave({
      pomodoro: localSettings.pomodoro * 60,
      shortBreak: localSettings.shortBreak * 60,
      longBreak: localSettings.longBreak * 60,
    });
    onClose();
  };

  const handleReset = () => {
    onSave({
      pomodoro: 25 * 60,
      shortBreak: 5 * 60,
      longBreak: 15 * 60,
    });
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
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white text-center w-full">ayarlar</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <FaTimes size={20} />
          </button>
        </div>

        <div className="space-y-6">
          
          <div>
            <label htmlFor="pomodoro" className="flex justify-between items-center text-sm font-medium text-slate-300 mb-2">
              <span>pomodoro (dakika)</span>
              <span className="font-bold text-white bg-slate-700 px-2 py-0.5 rounded-md">
                {localSettings.pomodoro}
              </span>
            </label>
            <input
              type="range"
              id="pomodoro"
              name="pomodoro"
              min="1"
              max="60"
              step="1"
              value={localSettings.pomodoro}
              onChange={handleChange}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-sky-500"
            />
          </div>

          <div>
            <label htmlFor="shortBreak" className="flex justify-between items-center text-sm font-medium text-slate-300 mb-2">
              <span>kısa mola (dakika)</span>
              <span className="font-bold text-white bg-slate-700 px-2 py-0.5 rounded-md">
                {localSettings.shortBreak}
              </span>
            </label>
            <input
              type="range"
              id="shortBreak"
              name="shortBreak"
              min="1"
              max="15"
              step="1"
              value={localSettings.shortBreak}
              onChange={handleChange}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-sky-500"
            />
          </div>

          <div>
            <label htmlFor="longBreak" className="flex justify-between items-center text-sm font-medium text-slate-300 mb-2">
              <span>uzun mola (dakika)</span>
              <span className="font-bold text-white bg-slate-700 px-2 py-0.5 rounded-md">
                {localSettings.longBreak}
              </span>
            </label>
            <input
              type="range"
              id="longBreak"
              name="longBreak"
              min="1"
              max="30"
              step="1"
              value={localSettings.longBreak}
              onChange={handleChange}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-sky-500"
            />
          </div>
        </div>

        <div className='flex flex-row gap-2'>
          <button
            onClick={handleSave}
            className="w-full bg-sky-600 text-white font-bold py-2 px-4 rounded-md mt-8 hover:bg-sky-700 transition-colors"
          >
            kaydet
          </button>
          <button
            onClick={handleReset}
            className="w-full bg-slate-600 text-white font-bold py-2 px-4 rounded-md mt-8 hover:bg-slate-700 transition-colors"
          >
            sıfırla
          </button>
        </div>
      </motion.div>
    </>
  );
}
