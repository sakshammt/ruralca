import { AppState } from './types';

const STORAGE_KEY = 'careaide_state';

export const defaultState: AppState = {
  isSetup: false,
  mode: null,
  appMode: 'basic',
  language: 'en',
  currentTab: 'home',
  reminders: [],
  vitals: {
    bp: [],
    sugar: [],
  },
  water: 0,
  steps: 0,
  members: [],
  notes: [],
  medicines: [],
  medicalID: {},
  elders: [],
  settings: {
    voice: true,
    inactivity: true,
    escalationMins: 10,
  },
  lastActivity: new Date().toISOString(),
};

export function loadState(): AppState {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return { ...defaultState, ...parsed };
    }
  } catch (error) {
    console.error('Error loading state:', error);
  }
  return defaultState;
}

export function saveState(state: AppState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Error saving state:', error);
  }
}

export function updateLastActivity(state: AppState): AppState {
  return {
    ...state,
    lastActivity: new Date().toISOString(),
  };
}

export function resetState(): void {
  localStorage.removeItem(STORAGE_KEY);
}
