import React, { useState, useEffect, useCallback, useRef } from 'react';
import Header from './components/layout/Header';
import TabNavigation from './components/layout/TabNavigation';
import Sidebar from './components/layout/Sidebar';
import ContentArea from './components/layout/ContentArea';
import { CONTENT_TYPES } from './constants';
import { findNodePath } from './utils/treeHelpers';
import { useTreeStore } from './store/treeStore';
import { nanoid } from 'nanoid';

const App = () => {
    const tree = useTreeStore((state) => state.tree);
    const addNode = useTreeStore((state) => state.addNode);
    const updateNode = useTreeStore((state) => state.updateNode);
    const removeNode = useTreeStore((state) => state.removeNode);
    const expandNode = useTreeStore((state) => state.expandNode);
    const saveContent = useTreeStore((state) => state.saveContent);
    const loadContent = useTreeStore((state) => state.loadContent);

    const [selectedNode, setSelectedNode] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [activeTab, setActiveTab] = useState('all');
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [darkMode, setDarkMode] = useState(true);
    const lastSavedContent = useRef({});

    useEffect(() => {
        if (selectedNode) {
            const loadedContent = loadContent(selectedNode);
            lastSavedContent.current = { nodeId: selectedNode, content: loadedContent };
        }
    }, [selectedNode]);

    const getBreadcrumb = () => {
        if (!selectedNode) return '';
        const path = findNodePath(tree, selectedNode);
        return path ? path.join(' / ') : '';
    };

    const handleAddNode = useCallback((parentId, nodeType, name, contentType) => {
        const ct = contentType || CONTENT_TYPES.TEXT;

        const newNode = {
            id: nanoid(8),
            name,
            type: nodeType,
            parentId,
            contentType: nodeType === 'leaf' ? ct : undefined,
            children: nodeType === 'container' ? [] : undefined
        };

        addNode(newNode);
        expandNode(parentId);
    }, []);

    const renameNode = useCallback((nodeId, newName) => {
        updateNode(nodeId, { name: newName });
    }, []);

    const deleteNode = useCallback((nodeId) => {
        removeNode(nodeId);

        if (selectedNode && selectedNode === nodeId) {
            setSelectedNode(null);
        }
    }, [selectedNode]);

    const handleContentChange = useCallback((newContent) => {
        if (selectedNode) {
            saveContent(selectedNode, newContent);
            lastSavedContent.current = { nodeId: selectedNode, content: newContent };
        }
    }, [selectedNode]);

    return (
        <div className={darkMode ? 'h-screen flex flex-col bg-gray-900' : 'h-screen flex flex-col bg-white'}>
            <Header
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                showUserMenu={showUserMenu}
                setShowUserMenu={setShowUserMenu}
                darkMode={darkMode}
                setDarkMode={setDarkMode}
            />
            <TabNavigation
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                darkMode={darkMode}
            />
            <div className="flex-1 flex overflow-hidden">
                <Sidebar
                    sidebarOpen={sidebarOpen}
                    selectedNode={selectedNode}
                    onSelect={setSelectedNode}
                    onAddNode={handleAddNode}
                    onDeleteNode={deleteNode}
                    onRenameNode={renameNode}
                    darkMode={darkMode}
                />
                <ContentArea
                    selectedNodeId={selectedNode}
                    onContentChange={handleContentChange}
                    getBreadcrumb={getBreadcrumb}
                    darkMode={darkMode}
                />
            </div>
        </div>
    );
};

export default App;
