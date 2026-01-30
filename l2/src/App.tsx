import { useState, useEffect } from 'react';
import { AppState, Tab, Mode, AppMode, Language, Elder } from './types';
import { loadState, saveState, updateLastActivity, resetState } from './storage';
import { ModeSelection } from './components/ModeSelection';
import { ElderSelection } from './components/ElderSelection';
import { AddElderForm } from './components/AddElderForm';
import { HomeTab } from './components/HomeTab';
import { HealthTab } from './components/HealthTab';
import { FamilyTab } from './components/FamilyTab';
import { ReportsTab } from './components/ReportsTab';
import { SettingsModal } from './components/SettingsModal';

export function App() {
  const [state, setState] = useState<AppState>(loadState());
  const [showSettings, setShowSettings] = useState(false);
  const [showAddElder, setShowAddElder] = useState(false);

  // Save state whenever it changes
  useEffect(() => {
    saveState(state);
  }, [state]);

  const updateState = (updates: Partial<AppState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  const handleSetup = (mode: Mode, appMode: AppMode, name: string, language: Language) => {
    setState({
      ...state,
      isSetup: true,
      mode,
      appMode,
      language,
      ...(mode === 'asha' ? { ashaName: name } : { userName: name }),
    });
  };

  const handleAddElder = (elderData: Omit<Elder, 'id' | 'createdAt'>) => {
    const newElder: Elder = {
      ...elderData,
      id: `elder-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    
    setState({
      ...state,
      elders: [...state.elders, newElder],
      selectedElderId: newElder.id,
    });
    setShowAddElder(false);
  };

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout? All data will be cleared.')) {
      resetState();
      window.location.reload();
    }
  };

  const exportData = () => {
    const elder = getCurrentElder();
    const dataToExport = isAshaMode && elder ? elder : state;
    const fileName = isAshaMode && elder 
      ? `careaide-${elder.name}-${new Date().toISOString().split('T')[0]}.json`
      : `careaide-data-${new Date().toISOString().split('T')[0]}.json`;
    
    const dataStr = JSON.stringify(dataToExport, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);
  };

  const shareViaEmail = () => {
    const elder = getCurrentElder();
    const dataToExport = isAshaMode && elder ? elder : state;
    const dataStr = JSON.stringify(dataToExport, null, 2);
    const subject = encodeURIComponent(
      isAshaMode && elder 
        ? `CareAide Health Data - ${elder.name}`
        : 'CareAide Health Data'
    );
    const body = encodeURIComponent(
      `Health data from CareAide:\n\n${dataStr}\n\nThis data can be imported back into CareAide.`
    );
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const getCurrentElder = (): Elder | undefined => {
    if (state.mode === 'asha' && state.selectedElderId) {
      return state.elders.find(e => e.id === state.selectedElderId);
    }
    return undefined;
  };

  const updateCurrentElder = (updates: Partial<Elder>) => {
    if (state.mode === 'asha' && state.selectedElderId) {
      setState({
        ...state,
        elders: state.elders.map(e => 
          e.id === state.selectedElderId ? { ...e, ...updates } : e
        ),
      });
    }
  };

  // Show mode selection if not setup
  if (!state.isSetup || !state.mode) {
    return <ModeSelection onSetup={handleSetup} />;
  }

  // Show add elder form
  if (showAddElder) {
    return (
      <AddElderForm
        onSave={handleAddElder}
        onCancel={() => setShowAddElder(false)}
      />
    );
  }

  // Show elder selection for ASHA mode
  if (state.mode === 'asha' && !state.selectedElderId) {
    return (
      <ElderSelection
        elders={state.elders}
        selectedElderId={state.selectedElderId}
        ashaName={state.ashaName || 'ASHA Worker'}
        onSelectElder={(id) => updateState({ selectedElderId: id })}
        onAddElder={() => setShowAddElder(true)}
        onLogout={handleLogout}
      />
    );
  }

  // Get current elder for ASHA mode or use state directly for other modes
  const currentElder = getCurrentElder();
  const isAshaMode = state.mode === 'asha';

  // Determine visible tabs based on mode
  const getVisibleTabs = (): Tab[] => {
    if (state.appMode === 'basic' && state.mode === 'elder') {
      return ['home', 'health', 'family'];
    }
    if (state.mode === 'asha') {
      return ['home', 'health', 'family', 'reports'];
    }
    return ['home', 'health', 'family'];
  };

  const visibleTabs = getVisibleTabs();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {isAshaMode && currentElder && (
                <button
                  onClick={() => updateState({ selectedElderId: undefined })}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <i className="fas fa-arrow-left text-gray-600"></i>
                </button>
              )}
              
              <div className="w-12 h-12 bg-gradient-to-br from-[#13c5dd] to-[#0ea5e9] rounded-full flex items-center justify-center">
                <i className="fas fa-heartbeat text-white text-xl"></i>
              </div>
              
              <div>
                <h1 className="font-bold text-lg text-gray-800">
                  {isAshaMode && currentElder ? currentElder.name : 'CareAide'}
                </h1>
                <p className="text-xs text-gray-600">
                  {isAshaMode && currentElder 
                    ? `${currentElder.age} yrs • ${currentElder.village || 'No village'}` 
                    : state.userName || state.ashaName || 'Your Healthcare Companion'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {isAshaMode && currentElder && (
                <button
                  onClick={() => {
                    // Trigger SOS for current elder
                    if ('geolocation' in navigator && currentElder.sosContacts.length > 0) {
                      navigator.geolocation.getCurrentPosition(
                        (position) => {
                          const { latitude, longitude } = position.coords;
                          const message = `🚨 EMERGENCY ALERT for ${currentElder.name}!\n\nLocation: https://maps.google.com/?q=${latitude},${longitude}\n\nPlease check immediately!`;
                          
                          currentElder.sosContacts.forEach((contact) => {
                            window.open(
                              `sms:${contact.phone}?body=${encodeURIComponent(message)}`
                            );
                          });
                          
                          alert(`SOS sent to ${currentElder.sosContacts.length} contacts!`);
                        },
                        () => {
                          const message = `🚨 EMERGENCY ALERT for ${currentElder.name}!\n\nPlease check immediately!`;
                          currentElder.sosContacts.forEach((contact) => {
                            window.open(
                              `sms:${contact.phone}?body=${encodeURIComponent(message)}`
                            );
                          });
                          alert(`SOS sent to ${currentElder.sosContacts.length} contacts!`);
                        }
                      );
                    } else {
                      alert('No SOS contacts configured for this elder');
                    }
                  }}
                  className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold rounded-lg shadow-lg transition-all"
                >
                  <i className="fas fa-exclamation-triangle mr-2"></i>
                  SOS
                </button>
              )}
              
              <button
                onClick={() => setShowSettings(true)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <i className="fas fa-cog text-gray-600 text-xl"></i>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto p-4 pb-24">
        {state.currentTab === 'home' && (
          <HomeTab 
            state={isAshaMode && currentElder ? { ...state, ...currentElder } : state} 
            onUpdate={isAshaMode && currentElder ? updateCurrentElder : updateState}
            isAshaMode={isAshaMode}
            elderName={currentElder?.name}
          />
        )}
        {state.currentTab === 'health' && (
          <HealthTab 
            state={isAshaMode && currentElder ? { ...state, ...currentElder } : state} 
            onUpdate={isAshaMode && currentElder ? updateCurrentElder : updateState}
            isAshaMode={isAshaMode}
          />
        )}
        {state.currentTab === 'family' && (
          <FamilyTab 
            state={isAshaMode && currentElder ? { ...state, ...currentElder } : state} 
            onUpdate={isAshaMode && currentElder ? updateCurrentElder : updateState}
            isAshaMode={isAshaMode}
          />
        )}
        {state.currentTab === 'reports' && state.mode === 'asha' && (
          <ReportsTab 
            state={state}
            currentElder={currentElder}
          />
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40">
        <div className="max-w-4xl mx-auto flex justify-around">
          {visibleTabs.map((tab) => {
            const isActive = state.currentTab === tab;
            const icons = {
              home: 'home',
              health: 'heartbeat',
              family: 'users',
              reports: 'chart-line',
            };
            const labels = {
              home: 'Home',
              health: 'Health',
              family: 'Family',
              reports: 'Reports',
            };

            return (
              <button
                key={tab}
                onClick={() => updateState({ currentTab: tab })}
                className={`flex-1 py-3 px-4 flex flex-col items-center gap-1 transition-all ${
                  isActive
                    ? 'text-[#13c5dd] bg-cyan-50'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <i className={`fas fa-${icons[tab]} text-xl`}></i>
                <span className="text-xs font-medium">{labels[tab]}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Settings Modal */}
      {showSettings && (
        <SettingsModal
          state={state}
          onUpdate={updateState}
          onClose={() => setShowSettings(false)}
          onLogout={handleLogout}
          onExportData={exportData}
          onEmailData={shareViaEmail}
        />
      )}
    </div>
  );
}
