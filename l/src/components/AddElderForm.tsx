import { useState } from 'react';
import { Elder, SosContact } from '../types';

interface AddElderFormProps {
  onSave: (elder: Omit<Elder, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
}

export function AddElderForm({ onSave, onCancel }: AddElderFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: 'female' as 'male' | 'female' | 'other',
    phone: '',
    address: '',
    village: '',
    bloodType: '',
  });

  const [sosContacts, setSosContacts] = useState<Omit<SosContact, 'id'>[]>([
    { name: '', phone: '', relation: '' }
  ]);

  const [allergies, setAllergies] = useState('');
  const [conditions, setConditions] = useState('');

  const addSosContact = () => {
    setSosContacts([...sosContacts, { name: '', phone: '', relation: '' }]);
  };

  const updateSosContact = (index: number, field: keyof SosContact, value: string) => {
    const updated = [...sosContacts];
    updated[index] = { ...updated[index], [field]: value };
    setSosContacts(updated);
  };

  const removeSosContact = (index: number) => {
    setSosContacts(sosContacts.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validSosContacts = sosContacts
      .filter(c => c.name && c.phone)
      .map((c, i) => ({ ...c, id: `sos-${Date.now()}-${i}` }));

    const allergyList = allergies.split(',').map(a => a.trim()).filter(a => a);
    const conditionList = conditions.split(',').map(c => c.trim()).filter(c => c);

    onSave({
      name: formData.name,
      age: parseInt(formData.age),
      gender: formData.gender,
      phone: formData.phone,
      address: formData.address,
      village: formData.village,
      bloodType: formData.bloodType || undefined,
      allergies: allergyList.length > 0 ? allergyList : undefined,
      conditions: conditionList.length > 0 ? conditionList : undefined,
      sosContacts: validSosContacts,
      reminders: [],
      vitals: { bp: [], sugar: [] },
      water: 0,
      steps: 0,
      members: [],
      notes: [],
      medicines: [],
      medicalID: {
        bloodType: formData.bloodType || undefined,
        allergies: allergyList.join(', ') || undefined,
        conditions: conditionList.join(', ') || undefined,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100 p-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Add New Elder</h2>
              <p className="text-gray-600 text-sm">Enter elder's details and emergency contacts</p>
            </div>
            <button
              onClick={onCancel}
              className="text-gray-500 hover:text-gray-700 p-2"
            >
              <i className="fas fa-times text-2xl"></i>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Info */}
            <div className="bg-cyan-50 rounded-xl p-4">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <i className="fas fa-user text-[#13c5dd]"></i>
                Basic Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-[#13c5dd] focus:outline-none"
                    placeholder="Elder's name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Age *
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    max="120"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-[#13c5dd] focus:outline-none"
                    placeholder="Age"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gender *
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-[#13c5dd] focus:outline-none"
                  >
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-[#13c5dd] focus:outline-none"
                    placeholder="Phone number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Village
                  </label>
                  <input
                    type="text"
                    value={formData.village}
                    onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-[#13c5dd] focus:outline-none"
                    placeholder="Village name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Blood Type
                  </label>
                  <select
                    value={formData.bloodType}
                    onChange={(e) => setFormData({ ...formData, bloodType: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-[#13c5dd] focus:outline-none"
                  >
                    <option value="">Select blood type</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <textarea
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-[#13c5dd] focus:outline-none"
                  placeholder="Full address"
                  rows={2}
                ></textarea>
              </div>
            </div>

            {/* Medical Info */}
            <div className="bg-blue-50 rounded-xl p-4">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <i className="fas fa-notes-medical text-[#13c5dd]"></i>
                Medical Information
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Allergies (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={allergies}
                    onChange={(e) => setAllergies(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-[#13c5dd] focus:outline-none"
                    placeholder="e.g., Penicillin, Peanuts, Dust"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Medical Conditions (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={conditions}
                    onChange={(e) => setConditions(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-[#13c5dd] focus:outline-none"
                    placeholder="e.g., Diabetes, Hypertension, Arthritis"
                  />
                </div>
              </div>
            </div>

            {/* SOS Contacts */}
            <div className="bg-red-50 rounded-xl p-4">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <i className="fas fa-phone-alt text-red-600"></i>
                Emergency SOS Contacts *
              </h3>
              
              {sosContacts.map((contact, index) => (
                <div key={index} className="bg-white rounded-lg p-4 mb-3 border border-red-200">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium text-gray-700">Contact {index + 1}</span>
                    {sosContacts.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeSosContact(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <input
                      type="text"
                      value={contact.name}
                      onChange={(e) => updateSosContact(index, 'name', e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:border-[#13c5dd] focus:outline-none"
                      placeholder="Name"
                      required={index === 0}
                    />
                    <input
                      type="tel"
                      value={contact.phone}
                      onChange={(e) => updateSosContact(index, 'phone', e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:border-[#13c5dd] focus:outline-none"
                      placeholder="Phone number"
                      required={index === 0}
                    />
                    <input
                      type="text"
                      value={contact.relation}
                      onChange={(e) => updateSosContact(index, 'relation', e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:border-[#13c5dd] focus:outline-none"
                      placeholder="Relation"
                    />
                  </div>
                </div>
              ))}
              
              <button
                type="button"
                onClick={addSosContact}
                className="w-full border-2 border-dashed border-red-300 text-red-600 py-3 rounded-lg hover:bg-red-50 transition-colors"
              >
                <i className="fas fa-plus mr-2"></i>
                Add Another Contact
              </button>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={onCancel}
                className="flex-1 px-6 py-4 border-2 border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-4 bg-gradient-to-r from-[#13c5dd] to-[#0ea5e9] text-white font-bold rounded-xl hover:from-[#0ea5e9] hover:to-[#13c5dd] transition-all shadow-lg"
              >
                <i className="fas fa-check mr-2"></i>
                Save Elder
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
