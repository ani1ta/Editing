import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { initialTree } from '../constants/initialData';

export const useTreeStore = create(
    persist(
        immer((set, get) => ({
            tree: initialTree,
            contents: {},
            expandedNodes: {
                root: true,
                'collection-1-1': true,
                'collection-1-1-1': true,
                'collection-2': true
            },

            expandNode: (nodeId) => set((state) => {
                state.expandedNodes[nodeId] = true;
            }),

            collapseNode: (nodeId) => set((state) => {
                state.expandedNodes[nodeId] = false;
            }),

            toggleExpand: (nodeId) => set((state) => {
                state.expandedNodes[nodeId] = !state.expandedNodes[nodeId];
            }),

            addNode: (node) => set((state) => {
                state.tree[node.id] = node;

                if (node.parentId && state.tree[node.parentId]) {
                    if (!state.tree[node.parentId].children) {
                        state.tree[node.parentId].children = [];
                    }
                    state.tree[node.parentId].children.push({ id: node.id, name: node.name });
                }
            }),

            updateNode: (nodeId, node) => set((state) => {
                Object.assign(state.tree[nodeId], node);
            }),

            removeNode: (nodeId) => set((state) => {
                const node = state.tree[nodeId];
                
                if (node.parentId && state.tree[node.parentId]) {
                    state.tree[node.parentId].children = state.tree[node.parentId].children.filter(
                        (child) => child.id !== node.id
                    );
                }

                node.children.forEach((child) => {
                    delete state.tree[child.id];
                });
                delete state.tree[node.id];
            }),

            saveContent: (nodeId, content) => set((state) => {
                state.contents[nodeId] = content;
            }),

            loadContent: (nodeId) => {
                const contents = get().contents;
                return contents[nodeId] || { blocks: [] };
            },

            clearAll: () => set((state) => {
                state.tree = initialTree;
                state.contents = {};
                state.expandedNodes = {
                    root: true,
                    'collection-1-1': true,
                    'collection-1-1-1': true,
                    'collection-2': true
                };
            })
        })),
        {
            name: 'wysiwyg-storage',
            partialize: (state) => ({
                tree: state.tree,
                contents: state.contents,
                expandedNodes: state.expandedNodes
            })
        }
    )
);
