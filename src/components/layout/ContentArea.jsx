import React from 'react';
import { Folder, FileText } from 'lucide-react';
import WYSIWYGEditor from '../editor/WYSIWYGEditor';
import { useTreeStore } from '../../store/treeStore';
import { useShallow } from 'zustand/shallow';

const ContentArea = ({
    selectedNodeId,
    onContentChange,
    getBreadcrumb,
    darkMode
}) => {
    const selectedNode = useTreeStore((state) => state.tree[selectedNodeId]);
    const content = useTreeStore((state) => state.contents[selectedNodeId]) || { blocks: [] };

    if (!selectedNode) {
        return (
            <div className={darkMode ? 'flex-1 overflow-y-auto bg-gray-900' : 'flex-1 overflow-y-auto bg-white'}>
                <div className={darkMode ? 'flex items-center justify-center h-full text-gray-400' : 'flex items-center justify-center h-full text-gray-500'}>
                    <div className="text-center">
                        <FileText size={48} className={darkMode ? 'mx-auto mb-4 text-gray-600' : 'mx-auto mb-4 text-gray-400'} />
                        <p>Select an item from the tree to start editing</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={darkMode ? 'flex-1 overflow-y-auto bg-gray-900' : 'flex-1 overflow-y-auto bg-white'}>
            <div>
                <div className={darkMode ? 'border-b px-8 py-4 border-gray-700 bg-gray-800' : 'border-b px-8 py-4 border-gray-200 bg-white'}>
                    <div className="flex items-center gap-6">
                        <div className={darkMode ? 'text-xs text-gray-400' : 'text-xs text-gray-500'}>{getBreadcrumb()}</div>
                        <button className={darkMode ? 'text-xs text-gray-400 hover:text-gray-300 transition-colors whitespace-nowrap' : 'text-xs text-gray-500 hover:text-gray-600 transition-colors whitespace-nowrap'}>
                            Add item member
                        </button>
                    </div>
                    <h1 className={darkMode ? 'text-2xl font-semibold text-gray-100 mt-1' : 'text-2xl font-semibold text-gray-900 mt-1'}>{selectedNode.name}</h1>
                </div>
                {selectedNode.type === 'leaf' ? (
                    <WYSIWYGEditor content={content} onChange={onContentChange} darkMode={darkMode} />
                ) : (
                    <div className={darkMode ? 'p-8 text-center text-gray-400' : 'p-8 text-center text-gray-500'}>
                        <Folder size={48} className={darkMode ? 'mx-auto mb-4 text-gray-600' : 'mx-auto mb-4 text-gray-400'} />
                        <p>This is a container. Select a content item to edit.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ContentArea;
