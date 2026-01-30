import React, { useState } from 'react';
import { AppState, FamilyMember, HandoffNote, Medicine, Shift } from '../types';
import { t } from '../translations';

interface FamilyTabProps {
  state: any;
  onUpdate: (updates: any) => void;
  isAshaMode?: boolean;
}

export const FamilyTab: React.FC<FamilyTabProps> = ({ state, onUpdate }) => {
  const [activeSection, setActiveSection] = useState<string>('members');
  const [showAddMember, setShowAddMember] = useState(false);
  const [showAddNote, setShowAddNote] = useState(false);
  const [showAddMedicine, setShowAddMedicine] = useState(false);

  // Family Member States
  const [memberName, setMemberName] = useState('');
  const [memberPhone, setMemberPhone] = useState('');
  const [memberRelation, setMemberRelation] = useState('');
  const [memberEmergency, setMemberEmergency] = useState(false);

  // Handoff Note States
  const [noteShift, setNoteShift] = useState<Shift>('morning');
  const [noteText, setNoteText] = useState('');

  // Medicine States
  const [medName, setMedName] = useState('');
  const [medQuantity, setMedQuantity] = useState('');
  const [medExpiry, setMedExpiry] = useState('');

  // Medical ID States
  const [bloodType, setBloodType] = useState(state.medicalID.bloodType || '');
  const [allergies, setAllergies] = useState(state.medicalID.allergies || '');
  const [conditions, setConditions] = useState(state.medicalID.conditions || '');
  const [emergencyContact, setEmergencyContact] = useState(state.medicalID.emergencyContact || '');

  const addMember = () => {
    if (!memberName || !memberPhone) return;

    const newMember: FamilyMember = {
      id: Date.now().toString(),
      name: memberName,
      phone: memberPhone,
      relation: memberRelation,
      isEmergency: memberEmergency,
    };

    onUpdate({
      members: [...state.members, newMember],
    });

    setMemberName('');
    setMemberPhone('');
    setMemberRelation('');
    setMemberEmergency(false);
    setShowAddMember(false);
  };

  const deleteMember = (id: string) => {
    onUpdate({
      members: state.members.filter(m => m.id !== id),
    });
  };

  const addNote = () => {
    if (!noteText) return;

    const newNote: HandoffNote = {
      id: Date.now().toString(),
      shift: noteShift,
      date: new Date().toLocaleDateString(),
      note: noteText,
      author: state.mode,
    };

    onUpdate({
      notes: [...state.notes, newNote],
    });

    setNoteText('');
    setShowAddNote(false);
  };

  const addMedicine = () => {
    if (!medName || !medQuantity || !medExpiry) return;

    const newMedicine: Medicine = {
      id: Date.now().toString(),
      name: medName,
      quantity: parseInt(medQuantity),
      expiry: medExpiry,
    };

    onUpdate({
      medicines: [...state.medicines, newMedicine],
    });

    setMedName('');
    setMedQuantity('');
    setMedExpiry('');
    setShowAddMedicine(false);
  };

  const saveMedicalID = () => {
    onUpdate({
      medicalID: {
        bloodType,
        allergies,
        conditions,
        emergencyContact,
      },
    });
  };

  const isExpiringSoon = (expiry: string): boolean => {
    const expiryDate = new Date(expiry);
    const today = new Date();
    const diffDays = Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays <= 30;
  };

  return (
    <div className="space-y-4 pb-20">
      {/* Section Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setActiveSection('members')}
          className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap ${
            activeSection === 'members'
              ? 'bg-[#13c5dd] text-white'
              : 'bg-white/10 text-white/60'
          }`}
        >
          <i className="fas fa-users mr-2"></i>
          {t('members', state.language)}
        </button>
        <button
          onClick={() => setActiveSection('notes')}
          className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap ${
            activeSection === 'notes'
              ? 'bg-[#13c5dd] text-white'
              : 'bg-white/10 text-white/60'
          }`}
        >
          <i className="fas fa-note-sticky mr-2"></i>
          {t('handoffNotes', state.language)}
        </button>
        {state.appMode === 'advanced' && (
          <>
            <button
              onClick={() => setActiveSection('inventory')}
              className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap ${
                activeSection === 'inventory'
                  ? 'bg-[#13c5dd] text-white'
                  : 'bg-white/10 text-white/60'
              }`}
            >
              <i className="fas fa-pills mr-2"></i>
              {t('medInventory', state.language)}
            </button>
            <button
              onClick={() => setActiveSection('medical-id')}
              className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap ${
                activeSection === 'medical-id'
                  ? 'bg-[#13c5dd] text-white'
                  : 'bg-white/10 text-white/60'
              }`}
            >
              <i className="fas fa-id-card mr-2"></i>
              {t('medicalID', state.language)}
            </button>
          </>
        )}
      </div>

      {/* Family Members Section */}
      {activeSection === 'members' && (
        <div className="space-y-3">
          <button
            onClick={() => setShowAddMember(!showAddMember)}
            className="w-full bg-[#13c5dd] hover:bg-[#10a8bd] text-white font-semibold py-3 px-6 rounded-xl shadow-md flex items-center justify-center gap-2"
          >
            <i className="fas fa-plus"></i>
            {t('add', state.language)} {t('members', state.language)}
          </button>

          {showAddMember && (
            <div className="bg-white rounded-xl p-4 space-y-3 shadow-lg">
              <h4 className="font-bold text-gray-800 mb-2">Add Family Member</h4>
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-1">Name *</label>
                <input
                  type="text"
                  value={memberName}
                  onChange={(e) => setMemberName(e.target.value)}
                  placeholder="Enter name"
                  className="w-full bg-white border border-gray-300 text-gray-900 placeholder-gray-500 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#13c5dd]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-1">Phone *</label>
                <input
                  type="tel"
                  value={memberPhone}
                  onChange={(e) => setMemberPhone(e.target.value)}
                  placeholder="Enter phone number"
                  className="w-full bg-white border border-gray-300 text-gray-900 placeholder-gray-500 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#13c5dd]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-1">Relation</label>
                <input
                  type="text"
                  value={memberRelation}
                  onChange={(e) => setMemberRelation(e.target.value)}
                  placeholder="e.g., Son, Daughter, Neighbor"
                  className="w-full bg-white border border-gray-300 text-gray-900 placeholder-gray-500 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#13c5dd]"
                />
              </div>
              <label className="flex items-center gap-2 text-gray-800 bg-red-50 p-3 rounded-lg border border-red-200">
                <input
                  type="checkbox"
                  checked={memberEmergency}
                  onChange={(e) => setMemberEmergency(e.target.checked)}
                  className="w-5 h-5 accent-red-600"
                />
                <div>
                  <span className="font-medium">Emergency/SOS Contact</span>
                  <p className="text-sm text-gray-600">This person will receive SOS alerts</p>
                </div>
              </label>
              <button
                onClick={addMember}
                className="w-full bg-gradient-to-r from-[#13c5dd] to-[#0ea5e9] text-white font-semibold py-3 rounded-lg hover:from-[#10a8bd] hover:to-[#0284c7] transition-all"
              >
                <i className="fas fa-check mr-2"></i>
                {t('add', state.language)}
              </button>
            </div>
          )}

          {state.members.map((member) => (
            <div
              key={member.id}
              className="bg-white/10 backdrop-blur-md rounded-xl p-4"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="text-white font-semibold text-lg">{member.name}</h4>
                  <p className="text-white/60">{member.relation}</p>
                  <p className="text-white/80">{member.phone}</p>
                  {member.isEmergency && (
                    <span className="inline-block bg-red-500 text-white text-xs px-2 py-1 rounded mt-1">
                      Emergency Contact
                    </span>
                  )}
                </div>
                <button
                  onClick={() => deleteMember(member.id)}
                  className="text-red-400 hover:text-red-300"
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
              <div className="flex gap-2">
                <a
                  href={`tel:${member.phone}`}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg text-center"
                >
                  <i className="fas fa-phone mr-2"></i>
                  {t('call', state.language)}
                </a>
                <a
                  href={`sms:${member.phone}`}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg text-center"
                >
                  <i className="fas fa-message mr-2"></i>
                  {t('sms', state.language)}
                </a>
              </div>
            </div>
          ))}

          {state.members.length === 0 && (
            <p className="text-white/60 text-center py-8">No family members added yet</p>
          )}
        </div>
      )}

      {/* Handoff Notes Section */}
      {activeSection === 'notes' && (
        <div className="space-y-3">
          <button
            onClick={() => setShowAddNote(!showAddNote)}
            className="w-full bg-[#13c5dd] hover:bg-[#10a8bd] text-white font-semibold py-3 px-6 rounded-xl shadow-md flex items-center justify-center gap-2"
          >
            <i className="fas fa-plus"></i>
            Add Note
          </button>

          {showAddNote && (
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 space-y-3">
              <select
                value={noteShift}
                onChange={(e) => setNoteShift(e.target.value as Shift)}
                className="w-full bg-white/20 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#13c5dd]"
              >
                <option value="morning">Morning</option>
                <option value="afternoon">Afternoon</option>
                <option value="evening">Evening</option>
                <option value="night">Night</option>
              </select>
              <textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="Enter handoff notes..."
                rows={4}
                className="w-full bg-white/20 text-white placeholder-white/60 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#13c5dd]"
              />
              <button
                onClick={addNote}
                className="w-full bg-[#13c5dd] text-white font-semibold py-3 rounded-lg"
              >
                {t('add', state.language)}
              </button>
            </div>
          )}

          {state.notes.slice().reverse().map((note) => (
            <div
              key={note.id}
              className="bg-white/10 backdrop-blur-md rounded-xl p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="bg-[#13c5dd] text-white text-xs px-3 py-1 rounded-full uppercase">
                  {note.shift}
                </span>
                <span className="text-white/60 text-sm">{note.date}</span>
              </div>
              <p className="text-white">{note.note}</p>
            </div>
          ))}

          {state.notes.length === 0 && (
            <p className="text-white/60 text-center py-8">No handoff notes yet</p>
          )}
        </div>
      )}

      {/* Medicine Inventory Section */}
      {activeSection === 'inventory' && state.appMode === 'advanced' && (
        <div className="space-y-3">
          <button
            onClick={() => setShowAddMedicine(!showAddMedicine)}
            className="w-full bg-[#13c5dd] hover:bg-[#10a8bd] text-white font-semibold py-3 px-6 rounded-xl shadow-md flex items-center justify-center gap-2"
          >
            <i className="fas fa-plus"></i>
            Add Medicine
          </button>

          {showAddMedicine && (
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 space-y-3">
              <input
                type="text"
                value={medName}
                onChange={(e) => setMedName(e.target.value)}
                placeholder="Medicine Name"
                className="w-full bg-white/20 text-white placeholder-white/60 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#13c5dd]"
              />
              <input
                type="number"
                value={medQuantity}
                onChange={(e) => setMedQuantity(e.target.value)}
                placeholder="Quantity"
                className="w-full bg-white/20 text-white placeholder-white/60 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#13c5dd]"
              />
              <input
                type="date"
                value={medExpiry}
                onChange={(e) => setMedExpiry(e.target.value)}
                className="w-full bg-white/20 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#13c5dd]"
              />
              <button
                onClick={addMedicine}
                className="w-full bg-[#13c5dd] text-white font-semibold py-3 rounded-lg"
              >
                {t('add', state.language)}
              </button>
            </div>
          )}

          {state.medicines.map((med) => (
            <div
              key={med.id}
              className={`bg-white/10 backdrop-blur-md rounded-xl p-4 ${
                isExpiringSoon(med.expiry) ? 'border-2 border-yellow-500' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="text-white font-semibold text-lg">{med.name}</h4>
                  <p className="text-white/60">Quantity: {med.quantity}</p>
                  <p className="text-white/60">Expires: {new Date(med.expiry).toLocaleDateString()}</p>
                  {isExpiringSoon(med.expiry) && (
                    <span className="inline-block bg-yellow-500 text-white text-xs px-2 py-1 rounded mt-1">
                      <i className="fas fa-exclamation-triangle mr-1"></i>
                      Expiring Soon
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}

          {state.medicines.length === 0 && (
            <p className="text-white/60 text-center py-8">No medicines in inventory</p>
          )}
        </div>
      )}

      {/* Medical ID Section */}
      {activeSection === 'medical-id' && state.appMode === 'advanced' && (
        <div className="space-y-3">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 space-y-3">
            <h3 className="text-white font-semibold text-lg mb-3">Emergency Medical Information</h3>
            
            <div>
              <label className="text-white/80 text-sm mb-1 block">Blood Type</label>
              <input
                type="text"
                value={bloodType}
                onChange={(e) => setBloodType(e.target.value)}
                placeholder="e.g., A+, B-, O+"
                className="w-full bg-white/20 text-white placeholder-white/60 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#13c5dd]"
              />
            </div>

            <div>
              <label className="text-white/80 text-sm mb-1 block">Allergies</label>
              <textarea
                value={allergies}
                onChange={(e) => setAllergies(e.target.value)}
                placeholder="List any allergies"
                rows={2}
                className="w-full bg-white/20 text-white placeholder-white/60 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#13c5dd]"
              />
            </div>

            <div>
              <label className="text-white/80 text-sm mb-1 block">Medical Conditions</label>
              <textarea
                value={conditions}
                onChange={(e) => setConditions(e.target.value)}
                placeholder="List any medical conditions"
                rows={2}
                className="w-full bg-white/20 text-white placeholder-white/60 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#13c5dd]"
              />
            </div>

            <div>
              <label className="text-white/80 text-sm mb-1 block">Emergency Contact</label>
              <input
                type="text"
                value={emergencyContact}
                onChange={(e) => setEmergencyContact(e.target.value)}
                placeholder="Primary emergency contact"
                className="w-full bg-white/20 text-white placeholder-white/60 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#13c5dd]"
              />
            </div>

            <button
              onClick={saveMedicalID}
              className="w-full bg-[#13c5dd] text-white font-semibold py-3 rounded-lg"
            >
              {t('save', state.language)}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
