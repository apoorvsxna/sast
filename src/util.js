import * as yaml from 'js-yaml';
import { parse, Lang } from '@ast-grep/napi';

export function convertYamlToObject(yamlString) {
    const jsObject = yaml.load(yamlString);
    return jsObject;
}

export function generateAST(source) {
    const ast = parse(Lang.JavaScript, source);
    return ast;
}
export function findByRule(ast, ruleObject) {
    const root = ast.root();
    const foundList = root.findAll(ruleObject);
    return foundList;
}
