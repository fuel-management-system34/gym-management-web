import packageInfo from '../../package.json';

export const environment = {
  production: false,
  apiUrl: 'https://localhost:44325/api',
  debugMode: true,
  appVersion: packageInfo.version
};
