import React, { useState } from 'react';

interface HeaderProps {
  elderName?: string;
  mode: 'elder' | 'caregiver' | 'asha';
  onLogout: () => void;
  onExportData: () => void;
  onEmailData: () => void;
}

export const Header: React.FC<HeaderProps> = ({ elderName, mode, onLogout, onExportData, onEmailData }) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    if (confirm('Do you want to logout? Your data is saved locally.')) {
      onLogout();
    }
  };

  const handleLogoutWithExport = () => {
    if (confirm('Export data before logout?')) {
      onExportData();
      setTimeout(() => {
        onLogout();
      }, 500);
    } else {
      onLogout();
    }
  };

  return (
    <div className="bg-white shadow-md px-4 py-3 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-[#13c5dd] rounded-full flex items-center justify-center">
          <i className="fas fa-heartbeat text-white text-xl"></i>
        </div>
        <div>
          <h1 className="text-lg font-bold text-gray-800">CareAide</h1>
          {elderName && (
            <p className="text-sm text-gray-600">{elderName}</p>
          )}
        </div>
      </div>

      <div className="relative">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200"
        >
          <i className="fas fa-ellipsis-v text-gray-700"></i>
        </button>

        {showMenu && (
          <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2">
            <button
              onClick={() => {
                onExportData();
                setShowMenu(false);
              }}
              className="w-full px-4 py-2.5 text-left hover:bg-gray-100 flex items-center gap-3 text-gray-700"
            >
              <i className="fas fa-download text-[#13c5dd]"></i>
              <span>Download Data (JSON)</span>
            </button>
            
            <button
              onClick={() => {
                onEmailData();
                setShowMenu(false);
              }}
              className="w-full px-4 py-2.5 text-left hover:bg-gray-100 flex items-center gap-3 text-gray-700"
            >
              <i className="fas fa-envelope text-[#13c5dd]"></i>
              <span>Share via Email</span>
            </button>

            <hr className="my-2 border-gray-200" />
            
            <button
              onClick={() => {
                setShowMenu(false);
                handleLogoutWithExport();
              }}
              className="w-full px-4 py-2.5 text-left hover:bg-red-50 flex items-center gap-3 text-red-600"
            >
              <i className="fas fa-sign-out-alt"></i>
              <span>Logout & Export</span>
            </button>

            <button
              onClick={() => {
                setShowMenu(false);
                handleLogout();
              }}
              className="w-full px-4 py-2.5 text-left hover:bg-red-50 flex items-center gap-3 text-red-600"
            >
              <i className="fas fa-sign-out-alt"></i>
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
