import packageInfo from '../../package.json';

export const environment = {
  production: false,
  apiUrl: 'http://staging-api/api',
  debugMode: false,
  appVersion: packageInfo.version
};
