const fs = require('fs');

const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
const version = packageJson.version;

const content = `export const APP_VERSION = '${version}';\n`;
fs.writeFileSync('./src/environments/version.ts', content);

console.log(`✅ Version ${version} written to src/environments/version.ts`);
