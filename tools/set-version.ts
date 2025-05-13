import { writeFileSync, readFileSync } from 'fs';

const packageJson = JSON.parse(readFileSync('./package.json', 'utf-8'));
const version = packageJson.version;

const content = `export const APP_VERSION = '${version}';\n`;
writeFileSync('./src/environments/version.ts', content);
console.log(`✅ Version ${version} written to src/environments/version.ts`);
