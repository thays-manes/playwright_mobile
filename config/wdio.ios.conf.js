import path from 'node:path';
import { config as shared } from './wdio.shared.conf.js';

// Caminho do app do simulador (.app ou .zip). Pode ser trocado por: APP_PATH=/caminho/app.zip
const appPath =
  process.env.APP_PATH ||
  path.join(process.cwd(), 'apps', 'ios', 'wdio-native-app.zip');

export const config = {
  ...shared,

  specs: ['../test/ios/specs/**/*.spec.js'],

  capabilities: [
    {
      platformName: 'iOS',
      'appium:automationName': 'XCUITest',
      'appium:deviceName': process.env.DEVICE_NAME || 'iPhone 15',
      'appium:platformVersion': process.env.PLATFORM_VERSION || '17.5',
      'appium:app': appPath,
      'appium:newCommandTimeout': 240,
      'appium:wdaLaunchTimeout': 120000,
    },
  ],
};
