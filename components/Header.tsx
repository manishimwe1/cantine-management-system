import React from 'react';
import { MenuIcon, BellIcon, UserIcon } from 'lucide-react';

const Header = () => {

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-4">
          <button
            // onClick={toggleSidebar}
            className="p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none"
          >
            <MenuIcon size={24} />
          </button>
          <h1 className="text-lg font-semibold text-gray-800 md:text-xl">
            Canteen Management System
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none">
            <BellIcon size={24} />
          </button>
          <div className="flex items-center gap-2">
            <span className="hidden md:block text-sm font-medium">Manzi</span>
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white">
              <UserIcon size={18} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;