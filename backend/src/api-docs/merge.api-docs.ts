import YAML from 'yamljs';
import fs from 'fs';
import path from 'path';
import { merge } from 'lodash';

function mergeYAMLFiles(files: string[]): object {
  let merged: any = {};
  files.forEach(file => {
    const docPath = path.join(__dirname, file);
    const doc = YAML.load(docPath);
    merged = merge(merged, doc);
  });
  return merged;
}

const files: string[] = [
  './docs/beesboost.api-docs.yaml',
  './docs/user.api-docs.yaml',
  './docs/auth.api-docs.yaml',
  './docs/student.api-docs.yaml',
  './docs/worker.api-docs.yaml',
  './docs/company.api-docs.yaml',
  './docs/companyOffers.api-docs.yaml'
];

const mergedSpec: object = mergeYAMLFiles(files);

const outputPath: string = 'src/api-docs/merged.api-docs.yaml';
fs.writeFileSync(outputPath, YAML.stringify(mergedSpec, 10, 2));

console.log('YAML files merged successfully!');