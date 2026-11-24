// Configuração compartilhada entre Android e iOS.
// O que muda por plataforma (capabilities e specs) fica em wdio.android.conf.js e wdio.ios.conf.js.

export const config = {
  runner: 'local',

  // O Appium sobe sozinho via @wdio/appium-service
  port: 4723,
  services: [
    [
      'appium',
      {
        command: 'appium',
        args: { address: '127.0.0.1', port: 4723, relaxedSecurity: true },
        logPath: './logs',
      },
    ],
  ],

  // Uma sessão por vez (um device/emulador)
  maxInstances: 1,

  logLevel: 'info',

  // Espera padrão dos comandos waitFor* (waits explícitos).
  // Não usamos implicit wait nem sleep fixo.
  waitforTimeout: 10000,
  waitforInterval: 500,

  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,

  framework: 'mocha',
  mochaOpts: {
    ui: 'bdd',
    timeout: 90000,
  },

  reporters: ['spec'],

  // Print automático quando o teste falha (ajuda a investigar flaky)
  afterTest: async function (test, context, { passed }) {
    if (!passed) {
      const nome = test.title.replace(/\s+/g, '_');
      await driver.saveScreenshot(`./screenshots/${nome}.png`);
    }
  },
};
