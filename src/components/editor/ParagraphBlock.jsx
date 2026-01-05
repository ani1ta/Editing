import React, { useRef, useState, useEffect } from 'react';

const ParagraphBlock = ({ block, updateBlock, setActiveBlockId, darkMode }) => {
    const ref = useRef(null);
    const [showPlaceholder, setShowPlaceholder] = useState(!block.content);

    useEffect(() => {
        if (ref.current && ref.current.innerHTML !== block.content) {
            const isActive = ref.current.contains(document.activeElement);
            if (!isActive) {
                ref.current.innerHTML = block.content || '';
            }
        }
        setShowPlaceholder(!block.content || block.content === '<br>' || block.content.trim() === '');
    }, [block.content]);

    const handleInput = (e) => {
        const content = e.currentTarget.innerHTML;
        setShowPlaceholder(!content || content === '<br>' || content.trim() === '');
        updateBlock(block.id, { content });
    };

    return (
        <div className="relative">
            {showPlaceholder && (
                <div
                    className={darkMode ? 'absolute top-2 left-2 text-gray-500 italic pointer-events-none' : 'absolute top-2 left-2 text-gray-400 italic pointer-events-none'}
                >
                    Start typing...
                </div>
            )}
            <div
                ref={ref}
                contentEditable
                suppressContentEditableWarning
                onInput={handleInput}
                onMouseUp={() => setActiveBlockId(block.id)}
                onKeyUp={() => setActiveBlockId(block.id)}
                onFocus={() => setActiveBlockId(block.id)}
                className={darkMode ? 'w-full outline-none border border-transparent focus:border-gray-300 rounded p-2 bg-gray-900 text-gray-300 min-h-[80px]' : 'w-full outline-none border border-transparent focus:border-gray-300 rounded p-2 bg-white text-gray-700 min-h-[80px]'}
            />
        </div>
    );
};

export default ParagraphBlock;
