import packageInfo from '../../package.json';

export const environment = {
  production: true,
  apiUrl: 'http://production-api/api',
  debugMode: false,
  appVersion: packageInfo.version
};
