import React from 'react';
import { AppState, Language } from '../types';
import { t } from '../translations';

interface SettingsModalProps {
  state: AppState;
  onUpdate: (updates: Partial<AppState>) => void;
  onClose: () => void;
  onLogout?: () => void;
  onExportData?: () => void;
  onEmailData?: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ state, onUpdate, onClose, onLogout, onExportData, onEmailData }) => {
  const languages: { code: Language; name: string; nativeName: string }[] = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
    { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
    { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
    { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
    { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
    { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white font-bold text-2xl flex items-center gap-2">
            <i className="fas fa-cog"></i>
            {t('settings', state.language)}
          </h2>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white text-2xl"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="space-y-6">
          {/* User Mode */}
          <div>
            <label className="text-white font-semibold mb-2 block">User Mode</label>
            <div className="space-y-2">
              <button
                onClick={() => onUpdate({ mode: 'elder' })}
                className={`w-full p-3 rounded-lg flex items-center gap-3 ${
                  state.mode === 'elder'
                    ? 'bg-[#13c5dd] text-white'
                    : 'bg-white/10 text-white/60'
                }`}
              >
                <i className="fas fa-user text-xl"></i>
                <div className="text-left">
                  <div className="font-semibold">{t('elderMode', state.language)}</div>
                  <div className="text-xs opacity-80">For elderly self-care</div>
                </div>
              </button>
              <button
                onClick={() => onUpdate({ mode: 'caregiver' })}
                className={`w-full p-3 rounded-lg flex items-center gap-3 ${
                  state.mode === 'caregiver'
                    ? 'bg-[#13c5dd] text-white'
                    : 'bg-white/10 text-white/60'
                }`}
              >
                <i className="fas fa-hands-helping text-xl"></i>
                <div className="text-left">
                  <div className="font-semibold">{t('caregiverMode', state.language)}</div>
                  <div className="text-xs opacity-80">For family caregivers</div>
                </div>
              </button>
              <button
                onClick={() => onUpdate({ mode: 'asha' })}
                className={`w-full p-3 rounded-lg flex items-center gap-3 ${
                  state.mode === 'asha'
                    ? 'bg-[#13c5dd] text-white'
                    : 'bg-white/10 text-white/60'
                }`}
              >
                <i className="fas fa-briefcase-medical text-xl"></i>
                <div className="text-left">
                  <div className="font-semibold">{t('ashaMode', state.language)}</div>
                  <div className="text-xs opacity-80">For health workers</div>
                </div>
              </button>
            </div>
          </div>

          {/* Display Mode */}
          <div>
            <label className="text-white font-semibold mb-2 block">Display Mode</label>
            <div className="flex gap-2">
              <button
                onClick={() => onUpdate({ appMode: 'basic' })}
                className={`flex-1 p-3 rounded-lg ${
                  state.appMode === 'basic'
                    ? 'bg-[#13c5dd] text-white'
                    : 'bg-white/10 text-white/60'
                }`}
              >
                <div className="font-semibold">{t('basicMode', state.language)}</div>
                <div className="text-xs opacity-80">Simplified</div>
              </button>
              <button
                onClick={() => onUpdate({ appMode: 'advanced' })}
                className={`flex-1 p-3 rounded-lg ${
                  state.appMode === 'advanced'
                    ? 'bg-[#13c5dd] text-white'
                    : 'bg-white/10 text-white/60'
                }`}
              >
                <div className="font-semibold">{t('advancedMode', state.language)}</div>
                <div className="text-xs opacity-80">Full features</div>
              </button>
            </div>
          </div>

          {/* Language */}
          <div>
            <label className="text-white font-semibold mb-2 block">
              {t('language', state.language)}
            </label>
            <select
              value={state.language}
              onChange={(e) => onUpdate({ language: e.target.value as Language })}
              className="w-full bg-white/10 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#13c5dd]"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code} className="bg-slate-800">
                  {lang.nativeName} ({lang.name})
                </option>
              ))}
            </select>
          </div>

          {/* Voice Reminders */}
          <div>
            <label className="flex items-center justify-between">
              <span className="text-white font-semibold">
                {t('voiceReminders', state.language)}
              </span>
              <button
                onClick={() =>
                  onUpdate({
                    settings: { ...state.settings, voice: !state.settings.voice },
                  })
                }
                className={`relative w-14 h-8 rounded-full transition-colors ${
                  state.settings.voice ? 'bg-[#13c5dd]' : 'bg-white/20'
                }`}
              >
                <div
                  className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${
                    state.settings.voice ? 'translate-x-7' : 'translate-x-1'
                  }`}
                ></div>
              </button>
            </label>
          </div>

          {/* Inactivity Alerts */}
          <div>
            <label className="flex items-center justify-between">
              <span className="text-white font-semibold">
                {t('inactivityAlerts', state.language)}
              </span>
              <button
                onClick={() =>
                  onUpdate({
                    settings: {
                      ...state.settings,
                      inactivity: !state.settings.inactivity,
                    },
                  })
                }
                className={`relative w-14 h-8 rounded-full transition-colors ${
                  state.settings.inactivity ? 'bg-[#13c5dd]' : 'bg-white/20'
                }`}
              >
                <div
                  className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${
                    state.settings.inactivity ? 'translate-x-7' : 'translate-x-1'
                  }`}
                ></div>
              </button>
            </label>
          </div>

          {/* Escalation Time */}
          <div>
            <label className="text-white font-semibold mb-2 block">
              {t('escalationTime', state.language)}
            </label>
            <select
              value={state.settings.escalationMins}
              onChange={(e) =>
                onUpdate({
                  settings: {
                    ...state.settings,
                    escalationMins: parseInt(e.target.value),
                  },
                })
              }
              className="w-full bg-white/10 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#13c5dd]"
            >
              <option value={5} className="bg-slate-800">5 minutes</option>
              <option value={10} className="bg-slate-800">10 minutes</option>
              <option value={15} className="bg-slate-800">15 minutes</option>
              <option value={30} className="bg-slate-800">30 minutes</option>
            </select>
          </div>

          {/* Data Management */}
          <div className="space-y-2">
            <h3 className="text-white font-semibold mb-2">Data Management</h3>
            {onExportData && (
              <button
                onClick={onExportData}
                className="w-full bg-gradient-to-r from-[#13c5dd] to-[#0ea5e9] hover:from-[#10a8bd] hover:to-[#0c8fc7] text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2"
              >
                <i className="fas fa-download"></i>
                Download Data (JSON)
              </button>
            )}
            {onEmailData && (
              <button
                onClick={onEmailData}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2"
              >
                <i className="fas fa-envelope"></i>
                Share via Email
              </button>
            )}
            {onLogout && (
              <button
                onClick={onLogout}
                className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2"
              >
                <i className="fas fa-sign-out-alt"></i>
                Logout
              </button>
            )}
          </div>

          {/* About */}
          <div className="bg-white/10 rounded-lg p-4 space-y-2">
            <h3 className="text-white font-semibold">About CareAide</h3>
            <p className="text-white/80 text-sm">
              Version 1.0.0
            </p>
            <p className="text-white/80 text-sm">
              Developed for rural healthcare under India's Unnat Bharat Abhiyan (UBA) scheme
            </p>
            <p className="text-white/60 text-xs mt-2">
              <i className="fas fa-info-circle mr-1"></i>
              {t('disclaimer', state.language)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
