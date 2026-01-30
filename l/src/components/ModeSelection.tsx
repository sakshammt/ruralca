import { useState } from 'react';
import { Mode, Language, AppMode } from '../types';
import { t } from '../translations';

interface ModeSelectionProps {
  onSetup: (mode: Mode, appMode: AppMode, name: string, language: Language) => void;
}

export function ModeSelection({ onSetup }: ModeSelectionProps) {
  const [step, setStep] = useState<'mode' | 'name' | 'language' | 'appMode'>('mode');
  const [selectedMode, setSelectedMode] = useState<Mode | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('en');
  const [selectedAppMode, setSelectedAppMode] = useState<AppMode>('basic');
  const [name, setName] = useState('');

  const languages: { code: Language; name: string; native: string }[] = [
    { code: 'en', name: 'English', native: 'English' },
    { code: 'hi', name: 'Hindi', native: 'हिंदी' },
    { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
    { code: 'te', name: 'Telugu', native: 'తెలుగు' },
    { code: 'bn', name: 'Bengali', native: 'বাংলা' },
    { code: 'mr', name: 'Marathi', native: 'मराठी' },
    { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' },
  ];

  const handleModeSelect = (mode: Mode) => {
    setSelectedMode(mode);
    setStep('language');
  };

  const handleLanguageSelect = (lang: Language) => {
    setSelectedLanguage(lang);
    if (selectedMode === 'elder') {
      setStep('appMode');
    } else {
      setStep('name');
    }
  };

  const handleAppModeSelect = (mode: AppMode) => {
    setSelectedAppMode(mode);
    setStep('name');
  };

  const handleComplete = () => {
    if (selectedMode && name.trim()) {
      onSetup(selectedMode, selectedAppMode, name.trim(), selectedLanguage);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#13c5dd] to-[#0ea5e9] rounded-full mb-4">
            <i className="fas fa-heartbeat text-white text-4xl"></i>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">CareAide</h1>
          <p className="text-gray-600">Your Healthcare Companion</p>
        </div>

        {/* Mode Selection */}
        {step === 'mode' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
              Select Your Role
            </h2>
            
            <button
              onClick={() => handleModeSelect('elder')}
              className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white p-6 rounded-2xl transition-all transform hover:scale-105 shadow-lg"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <i className="fas fa-user text-3xl"></i>
                </div>
                <div className="text-left flex-1">
                  <div className="font-bold text-xl mb-1">Elder / Patient</div>
                  <div className="text-sm opacity-90">Self-care with simple interface</div>
                </div>
                <i className="fas fa-chevron-right text-2xl"></i>
              </div>
            </button>

            <button
              onClick={() => handleModeSelect('caregiver')}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white p-6 rounded-2xl transition-all transform hover:scale-105 shadow-lg"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <i className="fas fa-hands-helping text-3xl"></i>
                </div>
                <div className="text-left flex-1">
                  <div className="font-bold text-xl mb-1">Family Caregiver</div>
                  <div className="text-sm opacity-90">Monitor and care for loved ones</div>
                </div>
                <i className="fas fa-chevron-right text-2xl"></i>
              </div>
            </button>

            <button
              onClick={() => handleModeSelect('asha')}
              className="w-full bg-gradient-to-r from-[#13c5dd] to-[#0ea5e9] hover:from-[#0ea5e9] hover:to-[#13c5dd] text-white p-6 rounded-2xl transition-all transform hover:scale-105 shadow-lg"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <i className="fas fa-user-nurse text-3xl"></i>
                </div>
                <div className="text-left flex-1">
                  <div className="font-bold text-xl mb-1">ASHA / Health Worker</div>
                  <div className="text-sm opacity-90">Manage multiple elders in village</div>
                </div>
                <i className="fas fa-chevron-right text-2xl"></i>
              </div>
            </button>

            <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-xl">
              <p className="text-sm text-amber-800 text-center">
                <i className="fas fa-info-circle mr-2"></i>
                This app supports healthcare, it does not replace medical professionals
              </p>
            </div>
          </div>
        )}

        {/* Language Selection */}
        {step === 'language' && (
          <div className="space-y-4">
            <button
              onClick={() => setStep('mode')}
              className="text-gray-600 hover:text-gray-800 mb-4"
            >
              <i className="fas fa-arrow-left mr-2"></i>
              Back
            </button>
            
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
              Choose Language / भाषा चुनें
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageSelect(lang.code)}
                  className="bg-white border-2 border-gray-200 hover:border-[#13c5dd] hover:bg-cyan-50 p-4 rounded-xl transition-all"
                >
                  <div className="font-semibold text-gray-800">{lang.name}</div>
                  <div className="text-2xl mt-1">{lang.native}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* App Mode Selection (Elder only) */}
        {step === 'appMode' && (
          <div className="space-y-4">
            <button
              onClick={() => setStep('language')}
              className="text-gray-600 hover:text-gray-800 mb-4"
            >
              <i className="fas fa-arrow-left mr-2"></i>
              Back
            </button>
            
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
              Choose Interface Type
            </h2>
            
            <button
              onClick={() => handleAppModeSelect('basic')}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white p-6 rounded-2xl transition-all shadow-lg"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <i className="fas fa-th-large text-3xl"></i>
                </div>
                <div className="text-left flex-1">
                  <div className="font-bold text-xl mb-1">Basic Mode</div>
                  <div className="text-sm opacity-90">Simple, large buttons, essential features only</div>
                </div>
              </div>
            </button>

            <button
              onClick={() => handleAppModeSelect('advanced')}
              className="w-full bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white p-6 rounded-2xl transition-all shadow-lg"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <i className="fas fa-grip-horizontal text-3xl"></i>
                </div>
                <div className="text-left flex-1">
                  <div className="font-bold text-xl mb-1">Advanced Mode</div>
                  <div className="text-sm opacity-90">Full features, detailed tracking and reports</div>
                </div>
              </div>
            </button>
          </div>
        )}

        {/* Name Input */}
        {step === 'name' && (
          <div className="space-y-6">
            <button
              onClick={() => selectedMode === 'elder' ? setStep('appMode') : setStep('language')}
              className="text-gray-600 hover:text-gray-800 mb-4"
            >
              <i className="fas fa-arrow-left mr-2"></i>
              Back
            </button>
            
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
              {selectedMode === 'asha' ? 'Enter Your Name' : 'What should we call you?'}
            </h2>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                {selectedMode === 'asha' ? 'ASHA Worker Name' : 'Your Name'}
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-4 py-4 text-lg border-2 border-gray-300 rounded-xl focus:border-[#13c5dd] focus:outline-none"
                autoFocus
              />
            </div>

            <button
              onClick={handleComplete}
              disabled={!name.trim()}
              className="w-full bg-gradient-to-r from-[#13c5dd] to-[#0ea5e9] hover:from-[#0ea5e9] hover:to-[#13c5dd] disabled:from-gray-300 disabled:to-gray-400 text-white font-bold py-4 rounded-xl transition-all shadow-lg disabled:cursor-not-allowed text-lg"
            >
              Get Started
              <i className="fas fa-arrow-right ml-2"></i>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
