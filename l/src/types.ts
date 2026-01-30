export type Mode = 'elder' | 'caregiver' | 'asha';
export type AppMode = 'basic' | 'advanced';
export type Language = 'en' | 'hi' | 'ta' | 'te' | 'bn' | 'mr' | 'kn';
export type Tab = 'home' | 'health' | 'family' | 'reports';
export type Shift = 'morning' | 'afternoon' | 'evening' | 'night';

export interface SosContact {
  id: string;
  name: string;
  phone: string;
  relation: string;
}

export interface Reminder {
  id: string;
  title: string;
  time: string;
  frequency: string;
  category: 'medicine' | 'water' | 'meal' | 'walk' | 'custom';
  done: boolean;
  snoozedUntil?: string;
  createdAt: string;
}

export interface VitalRecord {
  id: string;
  value: string;
  systolic?: number;
  diastolic?: number;
  timestamp: string;
}

export interface FamilyMember {
  id: string;
  name: string;
  phone: string;
  relation: string;
  isEmergency: boolean;
  isSosContact?: boolean;
}

export interface HandoffNote {
  id: string;
  shift: Shift;
  date: string;
  note: string;
  author: string;
}

export interface Medicine {
  id: string;
  name: string;
  quantity: number;
  expiry: string;
}

export interface MedicalID {
  bloodType?: string;
  allergies?: string;
  conditions?: string;
  emergencyContact?: string;
}

export interface Settings {
  voice: boolean;
  inactivity: boolean;
  escalationMins: number;
}

export interface Elder {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  phone?: string;
  address?: string;
  village?: string;
  photo?: string;
  bloodType?: string;
  allergies?: string[];
  conditions?: string[];
  sosContacts: SosContact[];
  reminders: Reminder[];
  vitals: {
    bp: VitalRecord[];
    sugar: VitalRecord[];
  };
  water: number;
  steps: number;
  members: FamilyMember[];
  notes: HandoffNote[];
  medicines: Medicine[];
  medicalID: MedicalID;
  createdAt: string;
}

export interface AppState {
  isSetup: boolean;
  mode: Mode | null;
  appMode: AppMode;
  language: Language;
  currentTab: Tab;
  
  // For Elder/Caregiver mode
  userName?: string;
  reminders: Reminder[];
  vitals: {
    bp: VitalRecord[];
    sugar: VitalRecord[];
  };
  water: number;
  steps: number;
  members: FamilyMember[];
  notes: HandoffNote[];
  medicines: Medicine[];
  medicalID: MedicalID;
  
  // For ASHA mode
  ashaName?: string;
  elders: Elder[];
  selectedElderId?: string;
  
  settings: Settings;
  lastActivity: string;
}
