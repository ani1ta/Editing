# WYSIWYG Editor

A modern, block-based WYSIWYG editor built with React, featuring a clean UI, dark mode support, and persistent storage.

## Features

- 📝 **Block-based editing** - Headings (H1, H2, H3) and paragraphs
- 🎨 **Rich text formatting** - Bold, italic, code formatting
- 🔗 **Media support** - Links and images
- 🌲 **Tree navigation** - Organize documents in folders
- 🌙 **Dark mode** - Toggle between light and dark themes
- 💾 **Auto-save** - Automatically persists changes to localStorage
- ⌨️ **Keyboard shortcuts** - Efficient editing workflow

## Tech Stack

- **React** - UI framework
- **Vite** - Build tool and dev server
- **Zustand** - State management with Immer
- **TailwindCSS** - Styling
- **Lucide React** - Icons
- **localStorage** - Data persistence

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

### Build

```bash
npm run build
```

The production build will be created in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── editor/          # Editor blocks and toolbar
│   ├── sidebar/         # Sidebar navigation
│   └── ui/              # Reusable UI components
├── store/               # Zustand state management
├── utils/               # Utility functions
└── App.jsx              # Main application component
```

## Usage

1. **Create documents** - Use the sidebar to create new files and folders
2. **Edit content** - Click on a document to open it in the editor
3. **Format text** - Select text to see formatting options
4. **Switch themes** - Toggle dark mode using the theme button in the header
5. **Auto-save** - All changes are automatically saved to localStorage

## License

MIT
