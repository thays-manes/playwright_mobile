import path from 'node:path';
import { config as shared } from './wdio.shared.conf.js';

// Caminho do .apk. Pode ser trocado por variável de ambiente: APP_PATH=/caminho/app.apk
const appPath =
  process.env.APP_PATH ||
  path.join(process.cwd(), 'apps', 'android', 'android.wdio.native.app.apk');

export const config = {
  ...shared,

  specs: ['../test/android/specs/**/*.spec.js'],

  capabilities: [
    {
      platformName: 'Android',
      'appium:automationName': 'UiAutomator2',
      'appium:deviceName': process.env.DEVICE_NAME || 'Pixel_7_API_34',
      'appium:platformVersion': process.env.PLATFORM_VERSION || '14',
      'appium:app': appPath,
      'appium:appWaitActivity': '*',
      'appium:autoGrantPermissions': true,
      'appium:newCommandTimeout': 240,
    },
  ],
};
