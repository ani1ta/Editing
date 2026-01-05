import React from 'react';
import { MoreVertical } from 'lucide-react';

const TabNavigation = ({ activeTab, setActiveTab, darkMode }) => {
    const tabs = ['all', 'board', 'graph', 'recent'];

    return (
        <div className={darkMode ? 'flex items-center gap-6 px-4 py-2 border-b border-gray-700 bg-gray-800' : 'flex items-center gap-6 px-4 py-2 border-b border-gray-200 bg-white'}>
            {tabs.map(tab => (
                <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={activeTab === tab
                        ? 'px-3 py-2 text-sm font-medium transition-colors border-b-2 text-blue-600 border-blue-600'
                        : (darkMode
                            ? 'px-3 py-2 text-sm font-medium transition-colors border-b-2 text-gray-400 hover:text-gray-200 border-transparent'
                            : 'px-3 py-2 text-sm font-medium transition-colors border-b-2 text-gray-600 hover:text-gray-900 border-transparent')
                    }
                >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
            ))}
            <button className={darkMode ? 'p-1 rounded transition-colors text-gray-400 hover:bg-gray-700' : 'p-1 rounded transition-colors text-gray-600 hover:bg-gray-100'}>
                <MoreVertical size={16} />
            </button>
        </div>
    );
};

export default TabNavigation;
