"use client"

import { navItems } from '@/constant';
import { useSidebarStore } from '@/lib/store';
import {
  ChefHat,
  LogOut,
  Settings
} from 'lucide-react';
import Link from 'next/link';
// import { useAppContext } from '../context/AppContext';



const Sidebar = () => {
  // const { sidebarOpen } = useSidebarStore();
  const  sidebarOpen = true; //:TODO
  const isActive = false

  return (
    <aside
      className={`fixed top-0 left-0 h-full bg-indigo-950 text-white transition-all duration-300 z-10 ${
        sidebarOpen ? 'w-56' : 'w-20'
      }`}
    >
      <div className="h-16 flex items-center justify-center border-b border-indigo-700">
        <span className={`font-bold text-2xl transition-opacity duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0'}`}>
          {sidebarOpen ? 'CMS' : ''}
        </span>
        {!sidebarOpen && <ChefHat size={24} />}
      </div>
      <nav className="py-4">
        <ul className="space-y-2 px-3">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.path}
                className={
                  `flex items-center px-3 py-2 rounded-md ${
                    isActive
                      ? 'bg-indigo-900 text-white'
                      : 'text-indigo-100 hover:bg-indigo-700'
                  } transition-colors ${
                    sidebarOpen ? 'justify-start' : 'justify-center'
                  }`
                }
              >
                <span className="flex-shrink-0">{item.icon}</span>
                <span className={`ml-3 font-medium transition-opacity duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0 w-0'}`}>
                  {item.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="absolute bottom-4 w-full px-3">
          <ul className="space-y-2">
            <li>
              <Link
                href="/settings"
                className="flex items-center px-3 py-2 rounded-md text-indigo-100 hover:bg-indigo-700 transition-colors"
                style={{ justifyContent: sidebarOpen ? 'start' : 'center' }}
              >
                <span className="flex-shrink-0">
                  <Settings size={20} />
                </span>
                <span className={`ml-3 font-medium transition-opacity duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0 w-0'}`}>
                  Settings
                </span>
              </Link>
            </li>
            <li>
              <button className="w-full flex items-center px-3 py-2 rounded-md text-indigo-100 hover:bg-indigo-700 transition-colors"
                style={{ justifyContent: sidebarOpen ? 'start' : 'center' }}
              >
                <span className="flex-shrink-0">
                  <LogOut size={20} />
                </span>
                <span className={`ml-3 font-medium transition-opacity duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0 w-0'}`}>
                  Logout
                </span>
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;