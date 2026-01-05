import React from 'react';
import { Menu, Search, Users, Bell } from 'lucide-react';
import UserMenu from './UserMenu';

const Header = ({ sidebarOpen, setSidebarOpen, showUserMenu, setShowUserMenu, darkMode, setDarkMode }) => {
    return (
        <header className={darkMode ? 'flex items-center justify-between px-4 py-2 border-b border-gray-700 bg-gray-800' : 'flex items-center justify-between px-4 py-2 border-b border-gray-200 bg-white'}>
            <div className="flex items-center gap-4">
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className={darkMode ? 'p-2 rounded hover:bg-gray-700 text-gray-300' : 'p-2 rounded hover:bg-gray-100 text-gray-700'}
                >
                    <Menu size={20} />
                </button>
                <div className="flex items-center gap-2">
                    <Search size={16} className="text-gray-400" />
                    <input
                        type="text"
                        placeholder="dfin"
                        className={darkMode ? 'outline-none text-sm bg-gray-800 text-gray-300' : 'outline-none text-sm bg-white text-gray-700'}
                    />
                </div>
            </div>
            <div className="flex items-center gap-2">
                <button className={darkMode ? 'px-3 py-1.5 border rounded text-sm flex items-center gap-2 border-gray-600 hover:bg-gray-700 text-gray-300' : 'px-3 py-1.5 border rounded text-sm flex items-center gap-2 border-gray-300 hover:bg-gray-50 text-gray-700'}>
                    <Users size={16} />
                    INVITE TEAM MEMBER
                </button>
                <button className={darkMode ? 'p-2 rounded hover:bg-gray-700 text-gray-300' : 'p-2 rounded hover:bg-gray-100 text-gray-700'}>
                    <Bell size={20} />
                </button>
                <UserMenu
                    showUserMenu={showUserMenu}
                    setShowUserMenu={setShowUserMenu}
                    darkMode={darkMode}
                    setDarkMode={setDarkMode}
                />
            </div>
        </header>
    );
};

export default Header;
