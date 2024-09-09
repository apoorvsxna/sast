import * as acorn from 'acorn';
import fs from 'fs';

export function generateAST(filePath) {
    const fileContent = fs.readFileSync(filePath);
    const ast = acorn.parse(fileContent, {ecmaVersion: 2020});
    return ast;
}

export function generateASTWithoutLocationData(filePath) {
    const fileContent = fs.readFileSync(filePath);
    const ast = acorn.parse(fileContent, {ecmaVersion: 2020, locations: false});
    return ast;
}

export function preprocessPatternAST(ast) {
    return ast.body;
}