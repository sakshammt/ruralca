import React, { useState } from 'react';
import { AppState, VitalRecord, Elder } from '../types';
import { t } from '../translations';

interface HealthTabProps {
  state: AppState;
  onUpdate: (updates: Partial<AppState> | Partial<Elder>) => void;
  isAshaMode?: boolean;
}

export const HealthTab: React.FC<HealthTabProps> = ({ state, onUpdate }) => {
  const [activeSection, setActiveSection] = useState<string>('vitals');
  const [bpSystolic, setBpSystolic] = useState('');
  const [bpDiastolic, setBpDiastolic] = useState('');
  const [bloodSugar, setBloodSugar] = useState('');
  const [breathingTimer, setBreathingTimer] = useState<number | null>(null);
  const [breathingActive, setBreathingActive] = useState(false);

  const addBPReading = () => {
    if (!bpSystolic || !bpDiastolic) return;

    const reading: VitalRecord = {
      id: Date.now().toString(),
      value: `${bpSystolic}/${bpDiastolic}`,
      systolic: parseInt(bpSystolic),
      diastolic: parseInt(bpDiastolic),
      timestamp: new Date().toISOString(),
    };

    onUpdate({
      vitals: {
        ...state.vitals,
        bp: [...state.vitals.bp, reading],
      },
    });

    setBpSystolic('');
    setBpDiastolic('');
  };

  const addSugarReading = () => {
    if (!bloodSugar) return;

    const reading: VitalRecord = {
      id: Date.now().toString(),
      value: bloodSugar,
      timestamp: new Date().toISOString(),
    };

    onUpdate({
      vitals: {
        ...state.vitals,
        sugar: [...state.vitals.sugar, reading],
      },
    });

    setBloodSugar('');
  };

  const incrementWater = () => {
    if (state.water < 8) {
      onUpdate({ water: state.water + 1 });
    }
  };

  const decrementWater = () => {
    if (state.water > 0) {
      onUpdate({ water: state.water - 1 });
    }
  };

  const startBreathing = (minutes: number) => {
    setBreathingTimer(minutes * 60);
    setBreathingActive(true);
    
    const interval = setInterval(() => {
      setBreathingTimer((prev) => {
        if (prev === null || prev <= 0) {
          clearInterval(interval);
          setBreathingActive(false);
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const exercises = [
    { name: 'Yoga for Seniors', icon: 'fa-person-yoga', duration: '15 min' },
    { name: 'Chair Exercises', icon: 'fa-chair', duration: '10 min' },
    { name: 'Physiotherapy', icon: 'fa-hands', duration: '20 min' },
    { name: 'Breathing Exercises', icon: 'fa-wind', duration: '5 min' },
  ];

  const brainGames = [
    { name: 'Memory Match', icon: 'fa-brain', difficulty: 'Easy' },
    { name: 'Quick Math', icon: 'fa-calculator', difficulty: 'Medium' },
  ];

  return (
    <div className="space-y-4 pb-20">
      {/* Section Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setActiveSection('vitals')}
          className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap ${
            activeSection === 'vitals'
              ? 'bg-[#13c5dd] text-white'
              : 'bg-white text-gray-600 shadow-sm'
          }`}
        >
          <i className="fas fa-heartbeat mr-2"></i>
          {t('vitals', state.language)}
        </button>
        <button
          onClick={() => setActiveSection('calm')}
          className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap ${
            activeSection === 'calm'
              ? 'bg-[#13c5dd] text-white'
              : 'bg-white text-gray-600 shadow-sm'
          }`}
        >
          <i className="fas fa-spa mr-2"></i>
          {t('calmMode', state.language)}
        </button>
        <button
          onClick={() => setActiveSection('exercises')}
          className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap ${
            activeSection === 'exercises'
              ? 'bg-[#13c5dd] text-white'
              : 'bg-white text-gray-600 shadow-sm'
          }`}
        >
          <i className="fas fa-dumbbell mr-2"></i>
          {t('exercises', state.language)}
        </button>
        {state.appMode === 'advanced' && (
          <button
            onClick={() => setActiveSection('brain')}
            className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap ${
              activeSection === 'brain'
                ? 'bg-[#13c5dd] text-white'
                : 'bg-white text-gray-600 shadow-sm'
            }`}
          >
            <i className="fas fa-brain mr-2"></i>
            {t('brainGames', state.language)}
          </button>
        )}
      </div>

      {/* Vitals Section */}
      {activeSection === 'vitals' && (
        <div className="space-y-4">
          {/* Blood Pressure */}
          <div className="bg-white rounded-xl p-4 shadow-md">
            <h3 className="text-gray-800 font-semibold text-lg mb-3 flex items-center gap-2">
              <i className="fas fa-heartbeat text-[#13c5dd]"></i>
              {t('bloodPressure', state.language)}
            </h3>
            <div className="flex gap-2 mb-3">
              <input
                type="number"
                value={bpSystolic}
                onChange={(e) => setBpSystolic(e.target.value)}
                placeholder="Systolic"
                className="flex-1 bg-gray-50 text-gray-800 placeholder-gray-400 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#13c5dd]"
              />
              <span className="text-gray-800 text-2xl">/</span>
              <input
                type="number"
                value={bpDiastolic}
                onChange={(e) => setBpDiastolic(e.target.value)}
                placeholder="Diastolic"
                className="flex-1 bg-gray-50 text-gray-800 placeholder-gray-400 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#13c5dd]"
              />
              <button
                onClick={addBPReading}
                className="bg-[#13c5dd] text-white px-4 rounded-lg font-semibold hover:bg-[#10a8bd]"
              >
                <i className="fas fa-plus"></i>
              </button>
            </div>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {state.vitals.bp.slice(-5).reverse().map((reading) => (
                <div key={reading.id} className="bg-gray-50 rounded-lg p-2 flex justify-between items-center border border-gray-100">
                  <span className="text-gray-800 font-medium">{reading.value} mmHg</span>
                  <span className="text-gray-500 text-sm">
                    {new Date(reading.timestamp).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Blood Sugar */}
          <div className="bg-white rounded-xl p-4 shadow-md">
            <h3 className="text-gray-800 font-semibold text-lg mb-3 flex items-center gap-2">
              <i className="fas fa-droplet text-[#13c5dd]"></i>
              {t('bloodSugar', state.language)}
            </h3>
            <div className="flex gap-2 mb-3">
              <input
                type="number"
                value={bloodSugar}
                onChange={(e) => setBloodSugar(e.target.value)}
                placeholder="mg/dL"
                className="flex-1 bg-gray-50 text-gray-800 placeholder-gray-400 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#13c5dd]"
              />
              <button
                onClick={addSugarReading}
                className="bg-[#13c5dd] text-white px-4 rounded-lg font-semibold hover:bg-[#10a8bd]"
              >
                <i className="fas fa-plus"></i>
              </button>
            </div>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {state.vitals.sugar.slice(-5).reverse().map((reading) => (
                <div key={reading.id} className="bg-gray-50 rounded-lg p-2 flex justify-between items-center border border-gray-100">
                  <span className="text-gray-800 font-medium">{reading.value} mg/dL</span>
                  <span className="text-gray-500 text-sm">
                    {new Date(reading.timestamp).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Water Intake */}
          <div className="bg-white rounded-xl p-4 shadow-md">
            <h3 className="text-gray-800 font-semibold text-lg mb-3 flex items-center gap-2">
              <i className="fas fa-glass-water text-[#13c5dd]"></i>
              {t('waterIntake', state.language)}
            </h3>
            <div className="flex items-center justify-between mb-3">
              <button
                onClick={decrementWater}
                className="bg-red-500 hover:bg-red-600 text-white w-12 h-12 rounded-full font-bold text-xl"
              >
                -
              </button>
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-800">{state.water}/8</div>
                <div className="text-gray-500">glasses</div>
              </div>
              <button
                onClick={incrementWater}
                className="bg-green-500 hover:bg-green-600 text-white w-12 h-12 rounded-full font-bold text-xl"
              >
                +
              </button>
            </div>
            <div className="flex gap-1 justify-center">
              {[...Array(8)].map((_, i) => (
                <i
                  key={i}
                  className={`fas fa-glass-water text-2xl ${
                    i < state.water ? 'text-blue-400' : 'text-gray-200'
                  }`}
                ></i>
              ))}
            </div>
          </div>

          {/* Steps Counter */}
          <div className="bg-white rounded-xl p-4 shadow-md">
            <h3 className="text-gray-800 font-semibold text-lg mb-3 flex items-center gap-2">
              <i className="fas fa-shoe-prints text-[#13c5dd]"></i>
              {t('steps', state.language)}
            </h3>
            <div className="text-center">
              <div className="text-5xl font-bold text-gray-800 mb-2">{state.steps}</div>
              <div className="text-gray-500">steps today</div>
              <button
                onClick={() => onUpdate({ steps: state.steps + 100 })}
                className="mt-3 bg-[#13c5dd] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#10a8bd]"
              >
                Add 100 steps
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Calm Mode Section */}
      {activeSection === 'calm' && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="text-gray-800 font-semibold text-xl mb-4 text-center">
              Breathing Exercise
            </h3>
            {!breathingActive ? (
              <div className="space-y-4">
                <p className="text-gray-600 text-center mb-4">
                  Choose your breathing session duration
                </p>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => startBreathing(1)}
                    className="bg-gradient-to-br from-green-500 to-green-600 text-white font-semibold py-6 rounded-xl hover:shadow-lg"
                  >
                    1 min
                  </button>
                  <button
                    onClick={() => startBreathing(3)}
                    className="bg-gradient-to-br from-blue-500 to-blue-600 text-white font-semibold py-6 rounded-xl hover:shadow-lg"
                  >
                    3 min
                  </button>
                  <button
                    onClick={() => startBreathing(5)}
                    className="bg-gradient-to-br from-purple-500 to-purple-600 text-white font-semibold py-6 rounded-xl hover:shadow-lg"
                  >
                    5 min
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <div className="relative w-48 h-48 mx-auto mb-4">
                  <div className="absolute inset-0 bg-[#13c5dd] rounded-full animate-ping opacity-75"></div>
                  <div className="absolute inset-0 bg-[#13c5dd] rounded-full flex items-center justify-center">
                    <span className="text-white text-3xl font-bold">
                      {breathingTimer !== null ? formatTime(breathingTimer) : ''}
                    </span>
                  </div>
                </div>
                <p className="text-gray-700 text-lg mb-2">Breathe In... Breathe Out...</p>
                <button
                  onClick={() => {
                    setBreathingActive(false);
                    setBreathingTimer(null);
                  }}
                  className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-semibold"
                >
                  Stop
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Exercises Section */}
      {activeSection === 'exercises' && (
        <div className="space-y-3">
          {exercises.map((exercise, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-4 shadow-md flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#13c5dd] rounded-full flex items-center justify-center">
                  <i className={`fas ${exercise.icon} text-white text-xl`}></i>
                </div>
                <div>
                  <h4 className="text-gray-800 font-semibold">{exercise.name}</h4>
                  <p className="text-gray-500 text-sm">{exercise.duration}</p>
                </div>
              </div>
              <button className="bg-[#13c5dd] hover:bg-[#10a8bd] text-white px-4 py-2 rounded-lg font-semibold">
                Start
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Brain Games Section */}
      {activeSection === 'brain' && state.appMode === 'advanced' && (
        <div className="space-y-3">
          {brainGames.map((game, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-4 shadow-md flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                  <i className={`fas ${game.icon} text-white text-xl`}></i>
                </div>
                <div>
                  <h4 className="text-gray-800 font-semibold">{game.name}</h4>
                  <p className="text-gray-500 text-sm">{game.difficulty}</p>
                </div>
              </div>
              <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold">
                Play
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
