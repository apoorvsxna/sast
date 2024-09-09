import * as parser from './parser.js';
import * as search from './search.js'

const sourceFilePath = './sample/source.js';
const patternFilePath = './sample/pattern.js';

const sourceAst = parser.generateAST(sourceFilePath);
const patternAst = parser.generateAST(patternFilePath);

// sample testing
const result = search.searchAST(sourceAst, parser.preprocessPatternAST(patternAst));
console.log(result);