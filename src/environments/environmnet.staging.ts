import packageInfo from '../../package.json';

export const environment = {
  production: false,
  apiUrl: 'https://gym-api.cerburus.com/api/',
  debugMode: false,
  appVersion: packageInfo.version
};
