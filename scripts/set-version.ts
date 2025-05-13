import { writeFileSync, readFileSync } from 'fs';
const { version } = JSON.parse(readFileSync('./package.json', 'utf8'));

const content = `export const APP_VERSION = '${version}';\n`;
writeFileSync('./src/environments/version.ts', content);
console.log(`Version ${version} written to src/environments/version.ts`);
