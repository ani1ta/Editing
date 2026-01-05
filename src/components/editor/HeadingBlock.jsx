import React, { useRef, useState, useEffect } from 'react';

const HeadingBlock = ({ block, updateBlock, setActiveBlockId, darkMode }) => {
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

    const headingLevel = block.headingLevel || 'h1';
    let textSizeClass = 'text-2xl';
    if (headingLevel === 'h2') {
        textSizeClass = 'text-xl';
    } else if (headingLevel === 'h3') {
        textSizeClass = 'text-lg';
    }

    return (
        <div className="relative">
            {showPlaceholder && (
                <div
                    className={darkMode ? `absolute top-2 left-0 ${textSizeClass} text-gray-500 italic font-normal pointer-events-none` : `absolute top-2 left-0 ${textSizeClass} text-gray-400 italic font-normal pointer-events-none`}
                >
                    Topic name
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
                className={darkMode ? `w-full ${textSizeClass} font-semibold outline-none border-b border-transparent focus:border-gray-300 py-2 bg-gray-900 text-gray-100 min-h-[40px]` : `w-full ${textSizeClass} font-semibold outline-none border-b border-transparent focus:border-gray-300 py-2 bg-white text-gray-900 min-h-[40px]`}
            />
        </div>
    );
};

export default HeadingBlock;
