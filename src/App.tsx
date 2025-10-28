import { useState, useEffect } from 'react';
import Timer from './components/Timer';
import Controls from './components/Controls';
import ModeSwitcher from './components/ModeSwitcher';
import SettingsModal from './components/SettingsModal';
import ConfirmModal from './components/ConfirmModal';
import { FaCog } from 'react-icons/fa';
import { AnimatePresence } from 'framer-motion';

type Mode = 'pomodoro' | 'shortBreak' | 'longBreak';

export interface TimeSettings {
  pomodoro: number;
  shortBreak: number;
  longBreak: number;
}

function App() {
  const [timeSettings, setTimeSettings] = useState<TimeSettings>({
    pomodoro: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60,
  });

  const [mode, setMode] = useState<Mode>('pomodoro');
  const [isActive, setIsActive] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(timeSettings.pomodoro);
  const [pomodoroCount, setPomodoroCount] = useState(0);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [targetMode, setTargetMode] = useState<Mode | null>(null);

  const handleStartPause = () => {
    setIsActive(!isActive);
  };

  const resetTimer = (newMode: Mode) => {
    setIsActive(false);
    if (newMode === 'pomodoro') {
      setSecondsLeft(timeSettings.pomodoro);
    } else if (newMode === 'shortBreak') {
      setSecondsLeft(timeSettings.shortBreak);
    } else {
      setSecondsLeft(timeSettings.longBreak);
    }
  };

  const handleReset = () => {
    if (isActive) {
      setTargetMode(null); 
      setIsConfirmModalOpen(true);
    } else {
      resetTimer(mode);
    }
  };

  const handleModeChange = (newMode: Mode) => {
    if (isActive) {
      setTargetMode(newMode);
      setIsConfirmModalOpen(true);
    } else {
      setMode(newMode);
    }
  };

  const handleConfirm = () => {
    if (targetMode) {
      setMode(targetMode);
    } else {
      resetTimer(mode);
    }
    
    setIsConfirmModalOpen(false);
    setTargetMode(null);
  };

  const handleCancelConfirm = () => {
    setIsConfirmModalOpen(false);
    setTargetMode(null);
  };

  const handleSaveSettings = (newSettings: TimeSettings) => {
    setTimeSettings(newSettings);
    
    setIsActive(false);
    if (mode === 'pomodoro') {
      setSecondsLeft(newSettings.pomodoro);
    } else if (mode === 'shortBreak') {
      setSecondsLeft(newSettings.shortBreak);
    } else {
      setSecondsLeft(newSettings.longBreak);
    }
  };

  const getBackgroundColor = () => {
    if (mode === 'pomodoro') return 'bg-emerald-700';
    if (mode === 'shortBreak') return 'bg-sky-700';
    if (mode === 'longBreak') return 'bg-orange-800';
    return 'bg-slate-900';
  };
  useEffect(() => {
    resetTimer(mode);
  }, [mode, timeSettings]);

  useEffect(() => {
    let interval: number | undefined = undefined;

    if (isActive && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else if (isActive && secondsLeft === 0) {
      clearInterval(interval);
      setIsActive(false);

      if (mode === 'pomodoro') {
        const newCount = pomodoroCount + 1;
        setPomodoroCount(newCount); 

        if (newCount % 4 === 0) {
          setMode('longBreak');
        } else {
          setMode('shortBreak');
        }
      } else if (mode === 'shortBreak') {
        setMode('pomodoro');
      } else if (mode === 'longBreak') {
        setMode('pomodoro');
        setPomodoroCount(0);
      }
    }

    return () => clearInterval(interval);

  }, [isActive, secondsLeft, mode, pomodoroCount]);

  const colorClasses = [
    'bg-emerald-700',
    'bg-sky-700',
    'bg-orange-800',
    'bg-slate-900'
  ];

  useEffect(() => {
    const newColorClass = getBackgroundColor();
    
    document.body.classList.remove(...colorClasses);
    
    document.body.classList.add(newColorClass);
  }, [mode]);

  return (
    <div 
      className={`flex flex-col items-center justify-center min-h-screen text-white transition-colors duration-500 ${getBackgroundColor()} relative`}
    >
      <button 
        onClick={() => setIsSettingsModalOpen(true)}
        className="absolute top-6 right-6 p-2 text-slate-400 hover:text-white transition-colors z-20"
        aria-label="Ayarlar"
      >
        <FaCog size={24} />
      </button>
      
      <h1 className="text-4xl font-bold mb-4 sm:mb-8">poludoro</h1>
      
      <ModeSwitcher 
        activeMode={mode} 
        onModeChange={handleModeChange} 
      />
      
      <Timer secondsLeft={secondsLeft} />
      
      <Controls 
        isActive={isActive} 
        onStartPause={handleStartPause} 
        onReset={handleReset} 
      />

      <AnimatePresence>
        {isSettingsModalOpen && (
          <SettingsModal 
            isOpen={isSettingsModalOpen}
            onClose={() => setIsSettingsModalOpen(false)}
            onSave={handleSaveSettings}
            currentSettings={timeSettings}
          />
        )}
        
        {isConfirmModalOpen && (
          <ConfirmModal
            isOpen={isConfirmModalOpen}
            onClose={handleCancelConfirm}
            onConfirm={handleConfirm}
            title={
              targetMode ? "zamanlayıcı çalışıyor" : "zamanlayıcıyı sıfırla"
            }
            message={
              targetMode 
                ? "modu değiştirmek mevcut zamanlayıcıyı sıfırlayacaktır. devam etmek istediğinize emin misiniz?"
                : "zamanlayıcı şu anda çalışıyor. zamanlayıcıyı sıfırlamak istediğinize emin misiniz?"
            }
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
