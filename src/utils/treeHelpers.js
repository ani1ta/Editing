export const findNodePath = (node, targetId) => {
    let parentNodeId = targetId
    const paths = [];

    while (parentNodeId) {
        const parentNode = node[parentNodeId]
        if (!parentNode || parentNodeId === 'root') break;
        paths.unshift(parentNode.name)
        parentNodeId = parentNode.parentId
    }

    return paths
}


export const findMaxRootCollectionNumber = (nodes) => {
    let max = 0;
    nodes.forEach(node => {
        if (node.name.match(/^collection\.\d+$/)) {
            const numMatch = node.name.match(/^collection\.(\d+)$/);
            if (numMatch) {
                const num = parseInt(numMatch[1]);
                if (num > max) max = num;
            }
        }
    });
    return max;
};

export const findMaxChildNumber = (children) => {
    let max = 0;
    if (!children) return max;

    children.forEach(child => {
        const parts = child.name.split('.');
        const lastNum = parseInt(parts[parts.length - 1]);
        if (!isNaN(lastNum) && lastNum > max) {
            max = lastNum;
        }
    });
    return max;
};

