import { generateAST } from './parser.js';
import { findPatternInSource } from './search.js';

const sourceFilePath = './sample/source.js';
const patternFilePath = './sample/pattern.js';

const sourceAst = generateAST(sourceFilePath);
const patternAst = generateAST(patternFilePath);

const match = findPatternInSource(sourceAst.body, patternAst.body[0]);
if (match) {
  console.log(`Pattern found at start: ${match.start}, end: ${match.end}`);
} else {
  console.log('Pattern not found.');
}
