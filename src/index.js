import * as fs from 'fs';
import * as path from 'path';
import { convertYamlToObject, findByRule, generateAST } from './util.js';

const rules = convertYamlToObject(fs.readFileSync('rules.yaml')); // ruleset location

const results = {};

// Recursively traverse the directory
async function traverseDirectory(dir) {
  const files = await fs.promises.readdir(dir);
  
  await Promise.all(files.map(async (file) => {
    const filePath = path.join(dir, file);
    const stats = await fs.promises.stat(filePath);

    if (stats.isDirectory()) {
      await traverseDirectory(filePath);
    }
    
    else if (stats.isFile()) {
      const content = await fs.promises.readFile(filePath, 'utf8');
      const ast = generateAST(content);
      const matches = findByRule(ast, rules);

      results[filePath] = matches.map(match => ({
        text: match.text(),
        range: match.range()
      }));
    }
  }));
}

// Main execution (sample for now)
(async function() {
  try {
    await traverseDirectory(path.resolve('sample'));
    console.log(JSON.stringify(results, null, 2));
  }
  
  catch (error) {
    console.error("An error occurred:", error);
  }
})();
