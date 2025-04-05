import packageInfo from '../../package.json';

export const environment = {
  production: false,
  apiUrl: 'https://localhost:44333/api',
  debugMode: true,
  appVersion: packageInfo.version
};
