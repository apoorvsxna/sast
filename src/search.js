// simple regular expression search
export function regexSearch(source, pattern) {
  const regex = new RegExp(pattern, 'g'); // Create a RegExp object with global flag
  return source.match(regex);
}


// check if node matches
export function isMatch(node, pattern) {
  if (typeof node !== 'object' || typeof pattern !== 'object') {
    return node === pattern;
  }

  for (const key in pattern) {
    if (key === 'start' || key === 'end') continue;
    
    if (!(key in node) || !isMatch(node[key], pattern[key])) {
      return false;
    }
  }

  return true;
}


// traverse and search. return location if found (in JsonPath format)
export function searchAST(node, pattern, path = '$') {
  if (isMatch(node, pattern)) {
    return path;
  }

  if (typeof node === 'object' && node !== null) {
    for (const key in node) {
      if (typeof node[key] === 'object') {
        const newPath = Array.isArray(node) ? `${path}[${key}]` : `${path}.${key}`;
        const result = searchAST(node[key], pattern, newPath);
        if (result) return result;
      }
    }
  }

  return null;
}