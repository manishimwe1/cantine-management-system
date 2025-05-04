import React from 'react';
import { MenuIcon, BellIcon, UserIcon } from 'lucide-react';
import { auth } from '@/auth';

const Header =async () => {
  const user = await auth()
  
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
            <span className="hidden md:block text-sm font-medium">{user?.user.name }</span>
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white cursor-pointer">
              {user?.user.image ? (
                <img
                  src={user?.user.image}
                  alt="User Avatar"
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <span className="text-sm font-medium text-white">
                  {user?.user?.name?.charAt(0).toUpperCase()}
                </span>
              )}
              
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;