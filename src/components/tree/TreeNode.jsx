import React, { useState, useEffect, useRef, useMemo } from 'react';
import { ChevronRight, ChevronDown, Plus, MoreVertical, Folder, File, Trash2, FileText, Video, HelpCircle, Image } from 'lucide-react';
import { CONTENT_TYPES } from '../../constants';
import { useTreeStore } from '../../store/treeStore';
import { findMaxRootCollectionNumber, findMaxChildNumber } from '../../utils/treeHelpers';

const TreeNode = ({ nodeId, level, selectedId, onSelect, onAddNode, onDeleteNode, onRenameNode, darkMode }) => {
    const node = useTreeStore((state) => state.tree[nodeId]);
    const toggleExpand = useTreeStore((state) => state.toggleExpand)
    const isExpanded = useTreeStore((state) => state.expandedNodes[nodeId]);

    const [showMenu, setShowMenu] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editName, setEditName] = useState(node.name);
    const menuRef = useRef(null);
    const inputRef = useRef(null);


    const isSelected = selectedId === node.id;
    const isContainer = node.type === 'container';
    const isRoot = node.id === 'root';

    useEffect(() => {
        const handleClick = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, []);

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [isEditing]);

    const handleRename = () => {
        if (editName.trim() && editName !== node.name) {
            onRenameNode(node.id, editName.trim());
        }
        setIsEditing(false);
    };

    const handleAddRootNode = () => {
        const maxNum = findMaxRootCollectionNumber(node.children);
        const newName = 'collection.' + (maxNum + 1);
        onAddNode(node.id, 'container', newName);
    };

    const handleAddNode = (parentId, type, contentType) => {
        let newName = "New Text"
        if (type === 'container') {
            const maxChildNum = findMaxChildNumber(node.children);
            newName = node.name + '.' + (maxChildNum + 1);
        }
        onAddNode(parentId, type, newName, contentType);
    }

    const baseClass = 'flex items-center py-1.5 px-2 cursor-pointer group relative transition-colors';

    const selectedClass = isSelected
        ? (darkMode ? 'bg-blue-900/50 border-l-4 border-blue-500' : 'bg-blue-100 border-l-4 border-blue-600')
        : (darkMode ? 'hover:bg-gray-700' : 'hover:bg-blue-200');

    return (
        <div>
            {isRoot && (
                <div className="flex items-center justify-between mb-2 px-2">
                    <span className={darkMode ? 'text-xs uppercase font-medium text-gray-400' : 'text-xs uppercase font-medium text-gray-500'}>DFIN</span>
                    <div className="flex items-center gap-1">
                        <button
                            onClick={handleAddRootNode}
                            className={darkMode ? 'p-1 rounded hover:bg-gray-700 text-gray-400' : 'p-1 rounded hover:bg-gray-200 text-gray-600'}
                            title="Add new collection (auto-increment)"
                        >
                            <Plus size={14} />
                        </button>
                        <button className={darkMode ? 'p-1 rounded hover:bg-gray-700 text-gray-400' : 'p-1 rounded hover:bg-gray-200 text-gray-600'} title="Expand all">
                            <ChevronDown size={14} />
                        </button>
                        <button className={darkMode ? 'p-1 rounded hover:bg-gray-700 text-gray-400' : 'p-1 rounded hover:bg-gray-200 text-gray-600'} title="Collapse all">
                            <ChevronRight size={14} />
                        </button>
                    </div>
                </div>
            )}

            {!isRoot && (
                <div
                    className={baseClass + ' ' + selectedClass}
                    style={{ paddingLeft: ((level || 0) * 20 + 8) + 'px' }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <div className="flex items-center flex-1 min-w-0" onClick={() => onSelect(node.id)}>
                        {isContainer && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleExpand(node.id);
                                }}
                                className={darkMode ? 'mr-1 p-0.5 rounded hover:bg-gray-600' : 'mr-1 p-0.5 rounded hover:bg-gray-200'}
                            >
                                {isExpanded ? (
                                    <ChevronDown size={14} className={darkMode ? 'text-gray-400' : 'text-gray-600'} />
                                ) : (
                                    <ChevronRight size={14} className={darkMode ? 'text-gray-400' : 'text-gray-600'} />
                                )}
                            </button>
                        )}
                        {!isContainer && <span className="w-5" />}

                        {isContainer ? (
                            <Folder size={14} className={darkMode ? 'mr-2 flex-shrink-0 text-gray-400' : 'mr-2 flex-shrink-0 text-gray-500'} />
                        ) : (
                            <File size={14} className={darkMode ? 'mr-2 flex-shrink-0 text-gray-400' : 'mr-2 flex-shrink-0 text-gray-500'} />
                        )}

                        {isEditing ? (
                            <input
                                ref={inputRef}
                                type="text"
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                                onBlur={handleRename}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') handleRename();
                                    if (e.key === 'Escape') { setEditName(node.name); setIsEditing(false); }
                                }}
                                className={darkMode ? 'flex-1 text-sm px-1 outline-none border rounded bg-gray-700 text-gray-300 border-blue-500' : 'flex-1 text-sm px-1 outline-none border rounded bg-white text-gray-700 border-blue-500'}
                                onClick={(e) => e.stopPropagation()}
                            />
                        ) : (
                            <span className={darkMode ? 'text-sm truncate text-gray-300' : 'text-sm truncate text-gray-700'}>
                                {node.name}
                            </span>
                        )}
                    </div>

                    {isHovered && (
                        <div className="flex items-center gap-1">
                            {isContainer && (
                                <>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleAddNode(node.id, 'leaf', CONTENT_TYPES.TEXT);
                                        }}
                                        className={darkMode ? 'p-1 rounded hover:bg-gray-600 bg-gray-700' : 'p-1 rounded hover:bg-gray-300 bg-gray-300/80'}
                                        title="New file"
                                    >
                                        <File size={12} className={darkMode ? 'text-gray-300' : 'text-gray-800'} />
                                    </button>

                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleAddNode(node.id, 'container');
                                        }}
                                        className={darkMode ? 'p-1 rounded hover:bg-gray-600 bg-gray-700' : 'p-1 rounded hover:bg-gray-300 bg-gray-300/80'}
                                        title="New folder"
                                    >
                                        <Folder size={12} className={darkMode ? 'text-gray-300' : 'text-gray-800'} />
                                    </button>
                                </>
                            )}

                            <div className="relative" ref={menuRef}>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setShowMenu(!showMenu);
                                    }}
                                    className={darkMode ? 'p-1 rounded hover:bg-gray-600 bg-gray-700' : 'p-1 rounded hover:bg-gray-300 bg-gray-300/80'}
                                >
                                    <MoreVertical size={12} className={darkMode ? 'text-gray-300' : 'text-gray-800'} />
                                </button>

                                {showMenu && (
                                    <div className={darkMode ? 'absolute right-0 top-full mt-1 border rounded shadow-lg z-50 py-1 min-w-[160px] bg-gray-800 border-gray-700' : 'absolute right-0 top-full mt-1 border rounded shadow-lg z-50 py-1 min-w-[160px] bg-white border-gray-200'}>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setIsEditing(true);
                                                setShowMenu(false);
                                            }}
                                            className={darkMode ? 'w-full text-left px-3 py-1.5 text-sm flex items-center gap-2 hover:bg-gray-700 text-gray-300' : 'w-full text-left px-3 py-1.5 text-sm flex items-center gap-2 hover:bg-gray-100 text-gray-700'}
                                        >
                                            <FileText size={14} />
                                            Rename
                                        </button>
                                        {isContainer && (
                                            <>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleAddNode(node.id, 'leaf', CONTENT_TYPES.VIDEO);
                                                        setShowMenu(false);
                                                    }}
                                                    className={darkMode ? 'w-full text-left px-3 py-1.5 text-sm flex items-center gap-2 hover:bg-gray-700 text-gray-300' : 'w-full text-left px-3 py-1.5 text-sm flex items-center gap-2 hover:bg-gray-100 text-gray-700'}
                                                >
                                                    <Video size={14} />
                                                    Add Video
                                                </button>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleAddNode(node.id, 'leaf', CONTENT_TYPES.IMAGE);
                                                        setShowMenu(false);
                                                    }}
                                                    className={darkMode ? 'w-full text-left px-3 py-1.5 text-sm flex items-center gap-2 hover:bg-gray-700 text-gray-300' : 'w-full text-left px-3 py-1.5 text-sm flex items-center gap-2 hover:bg-gray-100 text-gray-700'}
                                                >
                                                    <Image size={14} />
                                                    Add Image
                                                </button>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleAddNode(node.id, 'leaf', CONTENT_TYPES.QUIZ);
                                                        setShowMenu(false);
                                                    }}
                                                    className={darkMode ? 'w-full text-left px-3 py-1.5 text-sm flex items-center gap-2 hover:bg-gray-700 text-gray-300' : 'w-full text-left px-3 py-1.5 text-sm flex items-center gap-2 hover:bg-gray-100 text-gray-700'}
                                                >
                                                    <HelpCircle size={14} />
                                                    Add Assessment
                                                </button>
                                            </>
                                        )}
                                        <div className={darkMode ? 'border-t my-1 border-gray-700' : 'border-t my-1 border-gray-200'} />
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onDeleteNode(node.id);
                                                setShowMenu(false);
                                            }}
                                            className="w-full text-left px-3 py-1.5 text-sm hover:bg-red-50 text-red-600 flex items-center gap-2"
                                        >
                                            <Trash2 size={14} />
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {isContainer && isExpanded && node.children && (
                <div>
                    {node.children.map((child) => (
                        <TreeNode
                            key={child.id}
                            nodeId={child.id}
                            level={isRoot ? 0 : (level || 0) + 1}
                            selectedId={selectedId}
                            onSelect={onSelect}
                            onAddNode={onAddNode}
                            onDeleteNode={onDeleteNode}
                            onRenameNode={onRenameNode}
                            darkMode={darkMode}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default TreeNode;
