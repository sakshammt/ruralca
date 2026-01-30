import React, { useState } from 'react';
import { Reminder } from '../types';
import { t } from '../translations';

interface HomeTabProps {
  state: any;
  onUpdate: (updates: any) => void;
  isAshaMode?: boolean;
  elderName?: string;
}

export const HomeTab: React.FC<HomeTabProps> = ({ state, onUpdate }) => {
  const [showAddReminder, setShowAddReminder] = useState(false);
  const [reminderTitle, setReminderTitle] = useState('');
  const [reminderTime, setReminderTime] = useState('');

  const handleSOS = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const message = `SOS ALERT! I need help. My location: https://maps.google.com/?q=${latitude},${longitude}`;
          
          const emergencyContacts = state.members.filter((m: any) => m.isEmergency);
          emergencyContacts.forEach((contact: any) => {
            window.open(`sms:${contact.phone}?body=${encodeURIComponent(message)}`);
          });
          
          alert(t('sosAlert', state.language));
        },
        (error) => {
          console.error('Location error:', error);
          alert('SOS activated - please call emergency contacts');
        }
      );
    }
  };

  const quickAddReminder = (category: 'medicine' | 'water' | 'meal' | 'walk') => {
    const titles = {
      medicine: 'Take Medicine',
      water: 'Drink Water',
      meal: 'Have Meal',
      walk: 'Go for Walk',
    };

    const newReminder: Reminder = {
      id: Date.now().toString(),
      title: titles[category],
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      frequency: 'once',
      category,
      done: false,
      createdAt: new Date().toISOString(),
    };

    onUpdate({
      reminders: [...state.reminders, newReminder],
    });
  };

  const addCustomReminder = () => {
    if (!reminderTitle || !reminderTime) return;

    const newReminder: Reminder = {
      id: Date.now().toString(),
      title: reminderTitle,
      time: reminderTime,
      frequency: 'once',
      category: 'custom',
      done: false,
      createdAt: new Date().toISOString(),
    };

    onUpdate({
      reminders: [...state.reminders, newReminder],
    });

    setReminderTitle('');
    setReminderTime('');
    setShowAddReminder(false);
  };

  const markDone = (id: string) => {
    onUpdate({
      reminders: state.reminders.map((r: any) =>
        r.id === id ? { ...r, done: true } : r
      ),
    });
  };

  const snoozeReminder = (id: string) => {
    const snoozeTime = new Date();
    snoozeTime.setMinutes(snoozeTime.getMinutes() + 15);
    
    onUpdate({
      reminders: state.reminders.map((r: any) =>
        r.id === id ? { ...r, snoozedUntil: snoozeTime.toISOString() } : r
      ),
    });
  };

  const deleteReminder = (id: string) => {
    onUpdate({
      reminders: state.reminders.filter((r: any) => r.id !== id),
    });
  };

  const todayReminders = state.reminders.filter((r: any) => !r.done);

  const healthTips = [
    'Drink 8 glasses of water daily',
    'Take a 15-minute walk after meals',
    'Practice deep breathing for 5 minutes',
    'Get 7-8 hours of sleep',
    'Eat fruits and vegetables daily',
  ];

  return (
    <div className="space-y-4 pb-20">
      {/* SOS Button */}
      <button
        onClick={handleSOS}
        className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-6 px-6 rounded-2xl shadow-lg flex items-center justify-center gap-3 text-xl"
      >
        <i className="fas fa-exclamation-triangle text-2xl"></i>
        {t('sos', state.language)}
      </button>

      {/* Quick Add Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => quickAddReminder('medicine')}
          className="bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold py-6 px-4 rounded-xl shadow-md flex flex-col items-center gap-2"
        >
          <i className="fas fa-pills text-3xl"></i>
          <span>{t('addMedicine', state.language)}</span>
        </button>
        <button
          onClick={() => quickAddReminder('water')}
          className="bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-6 px-4 rounded-xl shadow-md flex flex-col items-center gap-2"
        >
          <i className="fas fa-glass-water text-3xl"></i>
          <span>{t('addWater', state.language)}</span>
        </button>
        <button
          onClick={() => quickAddReminder('meal')}
          className="bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-6 px-4 rounded-xl shadow-md flex flex-col items-center gap-2"
        >
          <i className="fas fa-utensils text-3xl"></i>
          <span>{t('addMeal', state.language)}</span>
        </button>
        <button
          onClick={() => quickAddReminder('walk')}
          className="bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-6 px-4 rounded-xl shadow-md flex flex-col items-center gap-2"
        >
          <i className="fas fa-walking text-3xl"></i>
          <span>{t('addWalk', state.language)}</span>
        </button>
      </div>

      {/* Add Custom Reminder */}
      <button
        onClick={() => setShowAddReminder(!showAddReminder)}
        className="w-full bg-[#13c5dd] hover:bg-[#10a8bd] text-white font-semibold py-4 px-6 rounded-xl shadow-md flex items-center justify-center gap-2"
      >
        <i className="fas fa-plus"></i>
        {t('addReminder', state.language)}
      </button>

      {showAddReminder && (
        <div className="bg-white rounded-xl p-4 shadow-md space-y-3">
          <input
            type="text"
            value={reminderTitle}
            onChange={(e) => setReminderTitle(e.target.value)}
            placeholder="Reminder title"
            className="w-full bg-gray-50 text-gray-800 placeholder-gray-400 px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#13c5dd]"
          />
          <input
            type="time"
            value={reminderTime}
            onChange={(e) => setReminderTime(e.target.value)}
            className="w-full bg-gray-50 text-gray-800 px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#13c5dd]"
          />
          <button
            onClick={addCustomReminder}
            className="w-full bg-[#13c5dd] hover:bg-[#10a8bd] text-white font-semibold py-3 rounded-lg"
          >
            {t('add', state.language)}
          </button>
        </div>
      )}

      {/* Today's Reminders */}
      <div className="bg-white rounded-xl p-4 shadow-md">
        <h3 className="text-gray-800 font-semibold text-lg mb-3 flex items-center gap-2">
          <i className="fas fa-bell text-[#13c5dd]"></i>
          {t('todayReminders', state.language)}
        </h3>
        <div className="space-y-2">
          {todayReminders.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No reminders for today</p>
          ) : (
            todayReminders.map((reminder: any) => (
              <div
                key={reminder.id}
                className="bg-gray-50 rounded-lg p-3 flex items-center justify-between border border-gray-100"
              >
                <div className="flex items-center gap-3">
                  <i className={`fas fa-${reminder.category === 'medicine' ? 'pills' : reminder.category === 'water' ? 'glass-water' : reminder.category === 'meal' ? 'utensils' : reminder.category === 'walk' ? 'walking' : 'bell'} text-[#13c5dd] text-xl`}></i>
                  <div>
                    <p className="text-gray-800 font-medium">{reminder.title}</p>
                    <p className="text-gray-500 text-sm">{reminder.time}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => markDone(reminder.id)}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm"
                  >
                    <i className="fas fa-check"></i>
                  </button>
                  <button
                    onClick={() => snoozeReminder(reminder.id)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md text-sm"
                  >
                    <i className="fas fa-clock"></i>
                  </button>
                  <button
                    onClick={() => deleteReminder(reminder.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Health Tips */}
      <div className="bg-white rounded-xl p-4 shadow-md">
        <h3 className="text-gray-800 font-semibold text-lg mb-3 flex items-center gap-2">
          <i className="fas fa-lightbulb text-[#13c5dd]"></i>
          {t('healthTips', state.language)}
        </h3>
        <div className="space-y-2">
          {healthTips.slice(0, 3).map((tip, index) => (
            <div key={index} className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg p-3 text-gray-700 border border-cyan-100">
              <p>{tip}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-4 border border-yellow-200">
        <p className="text-yellow-800 text-sm text-center">
          <i className="fas fa-info-circle mr-2"></i>
          {t('disclaimer', state.language)}
        </p>
      </div>
    </div>
  );
};
