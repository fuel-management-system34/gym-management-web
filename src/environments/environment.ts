import packageInfo from '../../package.json';

export const environment = {
  production: false,
  apiUrl: 'http://127.0.0.1:8000/api',
  debugMode: true,
  appVersion: packageInfo.version
};
