import { generateAST } from './parser.js';

const filePath = './test.js';
const ast = generateAST(filePath);

console.log(ast);