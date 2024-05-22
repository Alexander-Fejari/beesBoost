"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yamljs_1 = __importDefault(require("yamljs"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const lodash_1 = require("lodash");
function mergeYAMLFiles(files) {
    let merged = {};
    files.forEach(file => {
        const docPath = path_1.default.join(__dirname, file);
        const doc = yamljs_1.default.load(docPath);
        merged = (0, lodash_1.merge)(merged, doc);
    });
    return merged;
}
const files = [
    './docs/beesboost.api-docs.yaml',
    './docs/user.api-docs.yaml',
    './docs/auth.api-docs.yaml',
    './docs/student.api-docs.yaml',
    './docs/worker.api-docs.yaml',
    './docs/company.api-docs.yaml',
    './docs/companyOffers.api-docs.yaml'
];
const mergedSpec = mergeYAMLFiles(files);
const outputPath = 'src/api-docs/merged.api-docs.yaml';
fs_1.default.writeFileSync(outputPath, yamljs_1.default.stringify(mergedSpec, 10, 2));
console.log('YAML files merged successfully!');
