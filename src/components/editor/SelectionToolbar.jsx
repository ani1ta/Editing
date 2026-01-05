import React, { useRef, useEffect } from 'react';
import { Link, Bold, Italic, Code, Image } from 'lucide-react';

const SelectionToolbar = ({ position, onFormat, blockType }) => {
    if (!position) return null;

    const isParagraph = blockType === 'paragraph';

    return (
        <div
            className="fixed bg-gray-900 text-white rounded shadow-lg py-2 px-2 flex gap-1 z-50"
            style={{
                top: (position.top - 50) + 'px',
                left: position.left + 'px',
                transform: 'translateX(-50%)'
            }}
        >
            {isParagraph ? (
                <>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onFormat('bold');
                        }}
                        className="px-2 py-1.5 rounded transition-colors hover:bg-gray-700 text-white"
                        title="Bold"
                    >
                        <Bold size={16} />
                    </button>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onFormat('italic');
                        }}
                        className="px-2 py-1.5 rounded transition-colors hover:bg-gray-700 text-white"
                        title="Italic"
                    >
                        <Italic size={16} />
                    </button>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onFormat('code');
                        }}
                        className="px-2 py-1.5 rounded transition-colors hover:bg-gray-700 text-white"
                        title="Code"
                    >
                        <Code size={16} />
                    </button>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onFormat('link');
                        }}
                        className="px-2 py-1.5 rounded transition-colors hover:bg-gray-700 text-white"
                        title="Link"
                    >
                        <Link size={16} />
                    </button>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onFormat('image');
                        }}
                        className="px-2 py-1.5 rounded transition-colors hover:bg-gray-700 text-white"
                        title="Image"
                    >
                        <Image size={16} />
                    </button>
                </>
            ) : (
                <>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onFormat('paragraph');
                        }}
                        className="px-3 py-1.5 text-sm font-medium rounded transition-colors hover:bg-gray-700 text-white"
                        title="Paragraph"
                    >
                        P
                    </button>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onFormat('h1');
                        }}
                        className="px-3 py-1.5 text-sm font-medium rounded transition-colors hover:bg-gray-700 text-white"
                        title="Heading 1"
                    >
                        H1
                    </button>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onFormat('h2');
                        }}
                        className="px-3 py-1.5 text-sm font-medium rounded transition-colors hover:bg-gray-700 text-pink-400"
                        title="Heading 2"
                    >
                        H2
                    </button>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onFormat('h3');
                        }}
                        className="px-3 py-1.5 text-sm font-medium rounded transition-colors hover:bg-gray-700 text-white"
                        title="Heading 3"
                    >
                        H3
                    </button>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onFormat('link');
                        }}
                        className="px-2 py-1.5 rounded transition-colors hover:bg-gray-700 text-white"
                        title="Link"
                    >
                        <Link size={16} />
                    </button>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onFormat('image');
                        }}
                        className="px-2 py-1.5 rounded transition-colors hover:bg-gray-700 text-white"
                        title="Image"
                    >
                        <Image size={16} />
                    </button>
                </>
            )}
        </div>
    );
};

export default SelectionToolbar;
