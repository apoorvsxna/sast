function isNodeMatching(node, patternNode) {
    if (!node || !patternNode) return false;
  
    if (node.type !== patternNode.type) return false;
  
    // Check properties of the nodes
    for (const key in patternNode) {
      if (key === 'loc' || key === 'start' || key === 'end') continue; // Skip location and position properties
      if (typeof patternNode[key] === 'object' && patternNode[key] !== null) {
        if (!isNodeMatching(node[key], patternNode[key])) return false;
      } else {
        if (node[key] !== patternNode[key]) return false;
      }
    }
  
    return true;
  }
  
  function findPatternInSource(sourceNode, patternNode) {
    // Try matching the current node
    if (isNodeMatching(sourceNode, patternNode)) {
      return { start: sourceNode.start, end: sourceNode.end };
    }
  
    // Recursively check child nodes
    for (const key in sourceNode) {
      if (typeof sourceNode[key] === 'object' && sourceNode[key] !== null) {
        if (Array.isArray(sourceNode[key])) {
          for (const childNode of sourceNode[key]) {
            const match = findPatternInSource(childNode, patternNode);
            if (match) return match;
          }
        } else {
          const match = findPatternInSource(sourceNode[key], patternNode);
          if (match) return match;
        }
      }
    }
  
    return null; // No match found
  }
  
  export { isNodeMatching, findPatternInSource };
  