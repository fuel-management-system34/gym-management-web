import packageInfo from '../../package.json';

export const environment = {
  production: false,
  apiUrl: 'https://gym-api.cerburus.com/api/',
  debugMode: true,
  appVersion: packageInfo.version
};
