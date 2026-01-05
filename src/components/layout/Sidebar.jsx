import React from 'react';
import TreeNode from '../tree/TreeNode';

const Sidebar = ({
    sidebarOpen,
    selectedNode,
    onSelect,
    onAddNode,
    onDeleteNode,
    onRenameNode,
    expandedNodes,
    toggleExpand,
    darkMode
}) => {
    if (!sidebarOpen) return null;

    return (
        <div className={darkMode ? 'w-80 border-r overflow-y-auto transition-all border-gray-700 bg-gray-800' : 'w-80 border-r overflow-y-auto transition-all border-gray-200 bg-white'}>
            <div className="p-4">
                <TreeNode
                    nodeId="root"
                    level={0}
                    selectedId={selectedNode || null}
                    onSelect={onSelect}
                    onAddNode={onAddNode}
                    onDeleteNode={onDeleteNode}
                    onRenameNode={onRenameNode}
                    expandedNodes={expandedNodes}
                    toggleExpand={toggleExpand}
                    darkMode={darkMode}
                />
            </div>
        </div>
    );
};

export default Sidebar;
