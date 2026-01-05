import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { Plus, FileText, Video, HelpCircle, Image, Trash2 } from 'lucide-react';
import SelectionToolbar from './SelectionToolbar';
import HeadingBlock from './HeadingBlock';
import ParagraphBlock from './ParagraphBlock';

const WYSIWYGEditor = ({ content, onChange, darkMode }) => {
    const [blocks, setBlocks] = useState(content.blocks || []);
    const [showAddMenu, setShowAddMenu] = useState(false);
    const [selectionToolbar, setSelectionToolbar] = useState(null);
    const [activeBlockId, setActiveBlockId] = useState(null);
    const [activeBlockType, setActiveBlockType] = useState('paragraph');
    const addMenuRef = useRef(null);
    const editorRef = useRef(null);

    useLayoutEffect(() => {
        setBlocks(content.blocks || []);
    }, [content]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (addMenuRef.current && !addMenuRef.current.contains(e.target)) {
                setShowAddMenu(false);
            }
        };

        const handleSelection = (e) => {
            setTimeout(() => {
                const selection = window.getSelection();
                const selectedText = selection?.toString().trim();

                if (selectedText && selectedText.length > 0) {
                    const range = selection.getRangeAt(0);
                    const container = range.commonAncestorContainer;

                    let isInEditor = false;
                    let element = container.nodeType === Node.TEXT_NODE ? container.parentElement : container;

                    while (element) {
                        if (element === editorRef.current) {
                            isInEditor = true;
                            break;
                        }
                        element = element.parentElement;
                    }

                    if (isInEditor) {
                        const rect = range.getBoundingClientRect();

                        let blockElement = container.nodeType === Node.TEXT_NODE ? container.parentElement : container;
                        let blockType = 'paragraph';

                        while (blockElement && blockElement !== editorRef.current) {
                            if (blockElement.dataset && blockElement.dataset.blockType) {
                                blockType = blockElement.dataset.blockType;
                                break;
                            }
                            blockElement = blockElement.parentElement;
                        }

                        setActiveBlockType(blockType);
                        setSelectionToolbar({
                            top: rect.top + window.scrollY,
                            left: rect.left + rect.width / 2
                        });
                    } else {
                        setSelectionToolbar(null);
                    }
                } else {
                    setSelectionToolbar(null);
                }
            }, 100);
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('mouseup', handleSelection);
        document.addEventListener('selectionchange', handleSelection);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('mouseup', handleSelection);
            document.removeEventListener('selectionchange', handleSelection);
        };
    }, []);

    const addBlock = (type) => {
        const newBlock = {
            id: 'block-' + Date.now(),
            type: type || 'paragraph',
            content: '',
            format: {}
        };
        const newBlocks = [...blocks, newBlock]
        setBlocks(newBlocks);
        onChange({ blocks: newBlocks });
    };

    const updateBlock = (blockId, updates) => {
        const newBlocks = blocks.map(block =>
            block.id === blockId ? { ...block, ...updates } : block
        );
        setBlocks(newBlocks);
        onChange({ blocks: newBlocks });
    };

    const deleteBlock = (blockId) => {
        const newBlocks = blocks.filter(block => block.id !== blockId);
        setBlocks(newBlocks);
        onChange({ blocks: newBlocks });
    };

    const handleFormat = (format) => {
        if (format === 'h1' || format === 'h2' || format === 'h3' || format === 'paragraph') {
            if (!activeBlockId) return;

            const block = blocks.find(b => b.id === activeBlockId);
            if (!block) return;

            if (format === 'paragraph') {
                updateBlock(activeBlockId, { type: 'paragraph', headingLevel: undefined });
            } else {
                updateBlock(activeBlockId, { type: 'heading', headingLevel: format });
            }

            setSelectionToolbar(null);
            window.getSelection().removeAllRanges();
            return;
        }

        if (format === 'image') {
            const url = prompt('Enter image URL:');
            if (url) {
                const newBlock = {
                    id: 'block-' + Date.now(),
                    type: 'image',
                    content: url,
                    format: {}
                };
                setBlocks([...blocks, newBlock]);
                setSelectionToolbar(null);
            }
            return;
        }

        const selection = window.getSelection();
        if (!selection || !selection.rangeCount) return;

        const range = selection.getRangeAt(0);

        let editableElement = null;
        let element = range.commonAncestorContainer;

        while (element && element !== editorRef.current) {
            if (element.getAttribute && element.getAttribute('contenteditable') === 'true') {
                editableElement = element;
                break;
            }
            element = element.parentElement;
        }

        if (!editableElement) return;

        editableElement.focus();

        selection.removeAllRanges();
        selection.addRange(range);

        if (format === 'bold') {
            document.execCommand('bold', false, null);
        } else if (format === 'italic') {
            document.execCommand('italic', false, null);
        } else if (format === 'underline') {
            document.execCommand('underline', false, null);
        } else if (format === 'code') {
            const code = document.createElement('code');
            code.style.fontFamily = 'monospace';
            code.style.backgroundColor = 'rgba(128, 128, 128, 0.1)';
            code.style.padding = '2px 4px';
            code.style.borderRadius = '3px';

            try {
                range.surroundContents(code);
            } catch (e) {
                document.execCommand('formatBlock', false, 'pre');
            }
        } else if (format === 'link') {
            const url = prompt('Enter URL:');
            if (url) {
                document.execCommand('createLink', false, url);
            }
        }

        setTimeout(() => {
            if (activeBlockId && editableElement) {
                updateBlock(activeBlockId, { content: editableElement.innerHTML });
            }
        }, 10);
    };

    const insertWidget = (widgetType) => {
        const newBlock = {
            id: 'block-' + Date.now(),
            type: widgetType,
            content: widgetType === 'video' ? 'https://example.com/video.mp4' : widgetType === 'image' ? 'https://example.com/image.jpg' : '',
            format: {}
        };
        setBlocks([...blocks, newBlock]);
        setShowAddMenu(false);
    };

    const addNewSection = (type) => {
        addBlock(type);
        setShowAddMenu(false);
    };

    if (blocks.length === 0) {
        return (
            <div className="p-8">
                <div className="relative inline-block" ref={addMenuRef}>
                    <button
                        onClick={() => setShowAddMenu(!showAddMenu)}
                        className="w-10 h-10 rounded-full border-2 border-blue-500 flex items-center justify-center transition-all text-blue-500 hover:bg-blue-50"
                    >
                        <Plus size={20} />
                    </button>

                    {showAddMenu && (
                        <div className={darkMode ? 'absolute left-0 top-full mt-2 border rounded shadow-lg z-50 py-1 min-w-[180px] bg-gray-800 border-gray-700' : 'absolute left-0 top-full mt-2 border rounded shadow-lg z-50 py-1 min-w-[180px] bg-white border-gray-200'}>
                            <button onClick={() => addNewSection('paragraph')} className={darkMode ? 'w-full text-left px-4 py-2 text-sm flex items-center gap-2 hover:bg-gray-700 text-gray-300' : 'w-full text-left px-4 py-2 text-sm flex items-center gap-2 hover:bg-gray-100 text-gray-700'}><FileText size={16} />Paragraph</button>
                            <button onClick={() => addNewSection('heading')} className={darkMode ? 'w-full text-left px-4 py-2 text-sm flex items-center gap-2 hover:bg-gray-700 text-gray-300' : 'w-full text-left px-4 py-2 text-sm flex items-center gap-2 hover:bg-gray-100 text-gray-700'}><FileText size={16} />Heading</button>
                            <button onClick={() => insertWidget('image')} className={darkMode ? 'w-full text-left px-4 py-2 text-sm flex items-center gap-2 hover:bg-gray-700 text-gray-300' : 'w-full text-left px-4 py-2 text-sm flex items-center gap-2 hover:bg-gray-100 text-gray-700'}><Image size={16} />Image</button>
                            <button onClick={() => insertWidget('video')} className={darkMode ? 'w-full text-left px-4 py-2 text-sm flex items-center gap-2 hover:bg-gray-700 text-gray-300' : 'w-full text-left px-4 py-2 text-sm flex items-center gap-2 hover:bg-gray-100 text-gray-700'}><Video size={16} />Video</button>
                            <button onClick={() => insertWidget('quiz')} className={darkMode ? 'w-full text-left px-4 py-2 text-sm flex items-center gap-2 hover:bg-gray-700 text-gray-300' : 'w-full text-left px-4 py-2 text-sm flex items-center gap-2 hover:bg-gray-100 text-gray-700'}><HelpCircle size={16} />Assessment</button>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="p-8" ref={editorRef}>
            <SelectionToolbar position={selectionToolbar} onFormat={handleFormat} blockType={activeBlockType} />

            {blocks.map((block) => (
                <div key={block.id} className="mb-4 group relative" onFocus={() => setActiveBlockId(block.id)} onClick={() => setActiveBlockId(block.id)} data-block-type={block.type}>
                    {block.type === 'heading' && (
                        <HeadingBlock block={block} updateBlock={updateBlock} setActiveBlockId={setActiveBlockId} darkMode={darkMode} />
                    )}

                    {block.type === 'paragraph' && (
                        <ParagraphBlock block={block} updateBlock={updateBlock} setActiveBlockId={setActiveBlockId} darkMode={darkMode} />
                    )}

                    {block.type === 'image' && (
                        <div className={darkMode ? 'border rounded p-4 border-gray-700 bg-gray-800' : 'border rounded p-4 border-gray-300 bg-white'}>
                            <div className="flex items-center gap-2 mb-2">
                                <Image size={20} className={darkMode ? 'text-gray-400' : 'text-gray-600'} />
                                <span className={darkMode ? 'font-medium text-gray-300' : 'font-medium text-gray-700'}>Image Widget</span>
                            </div>
                            <input type="text" value={block.content} onChange={(e) => updateBlock(block.id, { content: e.target.value })} placeholder="Enter image URL" className={darkMode ? 'w-full border rounded px-3 py-2 border-gray-600 bg-gray-900 text-gray-300' : 'w-full border rounded px-3 py-2 border-gray-300 bg-white text-gray-700'} />
                        </div>
                    )}

                    {block.type === 'video' && (
                        <div className={darkMode ? 'border rounded p-4 border-gray-700 bg-gray-800' : 'border rounded p-4 border-gray-300 bg-white'}>
                            <div className="flex items-center gap-2 mb-2">
                                <Video size={20} className={darkMode ? 'text-gray-400' : 'text-gray-600'} />
                                <span className={darkMode ? 'font-medium text-gray-300' : 'font-medium text-gray-700'}>Video Widget</span>
                            </div>
                            <input type="text" value={block.content} onChange={(e) => updateBlock(block.id, { content: e.target.value })} placeholder="Enter video URL" className={darkMode ? 'w-full border rounded px-3 py-2 border-gray-600 bg-gray-900 text-gray-300' : 'w-full border rounded px-3 py-2 border-gray-300 bg-white text-gray-700'} />
                        </div>
                    )}

                    {block.type === 'quiz' && (
                        <div className={darkMode ? 'border rounded p-4 border-gray-700 bg-gray-800' : 'border rounded p-4 border-gray-300 bg-white'}>
                            <div className="flex items-center gap-2 mb-2">
                                <HelpCircle size={20} className={darkMode ? 'text-gray-400' : 'text-gray-600'} />
                                <span className={darkMode ? 'font-medium text-gray-300' : 'font-medium text-gray-700'}>Assessment Item</span>
                            </div>
                            <textarea value={block.content} onChange={(e) => updateBlock(block.id, { content: e.target.value })} placeholder="Enter assessment question" className={darkMode ? 'w-full border rounded px-3 py-2 border-gray-600 bg-gray-900 text-gray-300' : 'w-full border rounded px-3 py-2 border-gray-300 bg-white text-gray-700'} rows={2} />
                        </div>
                    )}

                    <button onClick={() => deleteBlock(block.id)} className="absolute -right-8 top-2 p-1 text-red-600 opacity-0 group-hover:opacity-100 hover:bg-red-50 rounded transition-all" title="Delete block">
                        <Trash2 size={16} />
                    </button>
                </div>
            ))}

            <div className="mt-6 relative inline-block" ref={addMenuRef}>
                <button onClick={() => setShowAddMenu(!showAddMenu)} className="w-10 h-10 rounded-full border-2 border-blue-500 flex items-center justify-center transition-all text-blue-500 hover:bg-blue-50">
                    <Plus size={20} />
                </button>

                {showAddMenu && (
                    <div className={darkMode ? 'absolute left-0 top-full mt-2 border rounded shadow-lg z-50 py-1 min-w-[180px] bg-gray-800 border-gray-700' : 'absolute left-0 top-full mt-2 border rounded shadow-lg z-50 py-1 min-w-[180px] bg-white border-gray-200'}>
                        <button onClick={() => addNewSection('paragraph')} className={darkMode ? 'w-full text-left px-4 py-2 text-sm flex items-center gap-2 hover:bg-gray-700 text-gray-300' : 'w-full text-left px-4 py-2 text-sm flex items-center gap-2 hover:bg-gray-100 text-gray-700'}><FileText size={16} />Paragraph</button>
                        <button onClick={() => addNewSection('heading')} className={darkMode ? 'w-full text-left px-4 py-2 text-sm flex items-center gap-2 hover:bg-gray-700 text-gray-300' : 'w-full text-left px-4 py-2 text-sm flex items-center gap-2 hover:bg-gray-100 text-gray-700'}><FileText size={16} />Heading</button>
                        <button onClick={() => insertWidget('image')} className={darkMode ? 'w-full text-left px-4 py-2 text-sm flex items-center gap-2 hover:bg-gray-700 text-gray-300' : 'w-full text-left px-4 py-2 text-sm flex items-center gap-2 hover:bg-gray-100 text-gray-700'}><Image size={16} />Image</button>
                        <button onClick={() => insertWidget('video')} className={darkMode ? 'w-full text-left px-4 py-2 text-sm flex items-center gap-2 hover:bg-gray-700 text-gray-300' : 'w-full text-left px-4 py-2 text-sm flex items-center gap-2 hover:bg-gray-100 text-gray-700'}><Video size={16} />Video</button>
                        <button onClick={() => insertWidget('quiz')} className={darkMode ? 'w-full text-left px-4 py-2 text-sm flex items-center gap-2 hover:bg-gray-700 text-gray-300' : 'w-full text-left px-4 py-2 text-sm flex items-center gap-2 hover:bg-gray-100 text-gray-700'}><HelpCircle size={16} />Assessment</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WYSIWYGEditor;
