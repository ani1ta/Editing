import React, { useRef, useEffect } from 'react';
import { User, HelpCircle, LogOut, Settings, FileText } from 'lucide-react';

const UserMenu = ({ showUserMenu, setShowUserMenu, darkMode, setDarkMode }) => {
    const userMenuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
                setShowUserMenu(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [setShowUserMenu]);

    return (
        <div className="relative" ref={userMenuRef}>
            <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium"
            >
                C
            </button>
            {showUserMenu && (
                <div className={darkMode ? 'absolute right-0 top-full mt-2 border rounded-lg shadow-xl z-50 py-2 min-w-[220px] bg-gray-800 border-gray-700' : 'absolute right-0 top-full mt-2 border rounded-lg shadow-xl z-50 py-2 min-w-[220px] bg-white border-gray-200'}>
                    <div className={darkMode ? 'px-4 py-3 border-b border-gray-700' : 'px-4 py-3 border-b border-gray-200'}>
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-medium">C</div>
                            <span className={darkMode ? 'text-sm font-medium text-gray-200' : 'text-sm font-medium text-gray-900'}>User</span>
                        </div>
                        <div className={darkMode ? 'flex items-center justify-between text-sm text-gray-300' : 'flex items-center justify-between text-sm text-gray-700'}>
                            <span>Dark mode</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" checked={darkMode} onChange={(e) => setDarkMode(e.target.checked)} className="sr-only peer" />
                                <div className={darkMode ? 'w-11 h-6 rounded-full peer after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full bg-blue-600' : 'w-11 h-6 rounded-full peer after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full bg-gray-300'} />
                            </label>
                        </div>
                    </div>
                    <div className="py-1">
                        <button className={darkMode ? 'w-full text-left px-4 py-2.5 text-sm flex items-center gap-3 hover:bg-gray-700 text-gray-300' : 'w-full text-left px-4 py-2.5 text-sm flex items-center gap-3 hover:bg-blue-200 text-gray-700'}>
                            <User size={18} />
                            <span>Profile</span>
                        </button>
                        <button className={darkMode ? 'w-full text-left px-4 py-2.5 text-sm flex items-center gap-3 hover:bg-gray-700 text-gray-300' : 'w-full text-left px-4 py-2.5 text-sm flex items-center gap-3 hover:bg-blue-200 text-gray-700'}>
                            <span className="w-2 h-2 bg-blue-500 rounded-full" />
                            <span className="ml-1">What is new</span>
                        </button>
                        <button className={darkMode ? 'w-full text-left px-4 py-2.5 text-sm flex items-center gap-3 hover:bg-gray-700 text-gray-300' : 'w-full text-left px-4 py-2.5 text-sm flex items-center gap-3 hover:bg-blue-200 text-gray-700'}>
                            <HelpCircle size={18} />
                            <span>Help</span>
                        </button>
                        <button className={darkMode ? 'w-full text-left px-4 py-2.5 text-sm flex items-center gap-3 hover:bg-gray-700 text-gray-300' : 'w-full text-left px-4 py-2.5 text-sm flex items-center gap-3 hover:bg-blue-200 text-gray-700'}>
                            <Settings size={18} />
                            <span>Send feedback</span>
                        </button>
                        <button className={darkMode ? 'w-full text-left px-4 py-2.5 text-sm flex items-center gap-3 hover:bg-gray-700 text-gray-300' : 'w-full text-left px-4 py-2.5 text-sm flex items-center gap-3 hover:bg-blue-200 text-gray-700'}>
                            <FileText size={18} />
                            <span>Hints and shortcuts</span>
                        </button>
                    </div>
                    <div className={darkMode ? 'border-t pt-1 border-gray-700' : 'border-t pt-1 border-gray-200'}>
                        <button className={darkMode ? 'w-full text-left px-4 py-2.5 text-sm flex items-center gap-3 hover:bg-gray-700 text-gray-300' : 'w-full text-left px-4 py-2.5 text-sm flex items-center gap-3 hover:bg-blue-200 text-gray-700'}>
                            <LogOut size={18} />
                            <span>Log out</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserMenu;
