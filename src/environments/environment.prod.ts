import packageInfo from '../../package.json';

export const environment = {
  production: true,
  apiUrl: 'https://gym-api.cerburus.com/api/',
  debugMode: false,
  appVersion: packageInfo.version
};
