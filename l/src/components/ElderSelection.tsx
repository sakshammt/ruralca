import { Elder } from '../types';

interface ElderSelectionProps {
  elders: Elder[];
  selectedElderId?: string;
  ashaName: string;
  onSelectElder: (elderId: string) => void;
  onAddElder: () => void;
  onLogout: () => void;
}

export function ElderSelection({ 
  elders, 
  selectedElderId, 
  ashaName,
  onSelectElder, 
  onAddElder,
  onLogout 
}: ElderSelectionProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100">
      {/* Header */}
      <div className="bg-white shadow-md">
        <div className="max-w-4xl mx-auto p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-[#13c5dd] to-[#0ea5e9] rounded-full flex items-center justify-center">
                <i className="fas fa-user-nurse text-white text-xl"></i>
              </div>
              <div>
                <h1 className="font-bold text-xl text-gray-800">ASHA Mode</h1>
                <p className="text-sm text-gray-600">{ashaName}</p>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
            >
              <i className="fas fa-sign-out-alt mr-2"></i>
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-4">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Select Elder to Manage</h2>
          <p className="text-gray-600">Choose an elder from your list or add a new one</p>
        </div>

        {/* Add Elder Button */}
        <button
          onClick={onAddElder}
          className="w-full bg-gradient-to-r from-[#13c5dd] to-[#0ea5e9] hover:from-[#0ea5e9] hover:to-[#13c5dd] text-white p-6 rounded-2xl transition-all shadow-lg mb-6"
        >
          <div className="flex items-center justify-center gap-3">
            <i className="fas fa-plus-circle text-3xl"></i>
            <span className="font-bold text-xl">Add New Elder</span>
          </div>
        </button>

        {/* Elders List */}
        {elders.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {elders.map((elder) => {
              const completedToday = elder.reminders.filter(
                r => r.done && new Date(r.createdAt).toDateString() === new Date().toDateString()
              ).length;
              const totalToday = elder.reminders.filter(
                r => new Date(r.createdAt).toDateString() === new Date().toDateString()
              ).length;
              const adherence = totalToday > 0 ? Math.round((completedToday / totalToday) * 100) : 0;

              return (
                <button
                  key={elder.id}
                  onClick={() => onSelectElder(elder.id)}
                  className={`bg-white hover:shadow-xl transition-all p-6 rounded-2xl text-left border-2 ${
                    selectedElderId === elder.id 
                      ? 'border-[#13c5dd] shadow-lg' 
                      : 'border-gray-200 hover:border-[#13c5dd]'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Avatar */}
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                      {elder.name.charAt(0).toUpperCase()}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-lg text-gray-800 truncate">{elder.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                        <span>{elder.age} years</span>
                        <span>•</span>
                        <span className="capitalize">{elder.gender}</span>
                      </div>
                      {elder.village && (
                        <div className="text-sm text-gray-500 mt-1">
                          <i className="fas fa-map-marker-alt mr-1"></i>
                          {elder.village}
                        </div>
                      )}
                      
                      {/* Stats */}
                      <div className="flex gap-2 mt-3">
                        <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                          <i className="fas fa-bell mr-1"></i>
                          {totalToday} tasks
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                          adherence >= 80 
                            ? 'bg-green-100 text-green-700' 
                            : adherence >= 50 
                            ? 'bg-yellow-100 text-yellow-700' 
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {adherence}% done
                        </div>
                      </div>
                    </div>

                    {/* Arrow */}
                    <i className="fas fa-chevron-right text-gray-400 text-xl"></i>
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center shadow-lg">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-users text-gray-400 text-4xl"></i>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No Elders Added Yet</h3>
            <p className="text-gray-600 mb-6">
              Start by adding elders you want to manage
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
