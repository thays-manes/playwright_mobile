# mobile-wdio-appium

Projeto base de automação mobile com **WebdriverIO + Appium + JavaScript**, separado por plataforma (**Android** e **iOS**).

## Estrutura

```
config/
  wdio.shared.conf.js     # config comum (Appium service, waits, Mocha, reporter, print em falha)
  wdio.android.conf.js    # capabilities Android (UiAutomator2)
  wdio.ios.conf.js        # capabilities iOS (XCUITest)
test/
  helpers/
    waits.js              # waits explícitos (visível, clicável, texto)
    gestures.js           # swipe, scroll, tap com W3C Actions
  android/
    pages/                # Page Objects Android
    specs/                # testes Android
  ios/
    pages/                # Page Objects iOS
    specs/                # testes iOS
apps/                     # coloque aqui o .apk e o .app/.zip
Jenkinsfile               # exemplo de pipeline
```

## Pré-requisitos

- Node.js 18+
- **Android:** Android Studio, emulador criado, `ANDROID_HOME` configurado, JDK
- **iOS (somente macOS):** Xcode e um simulador

## Como rodar

```bash
npm install
npm run appium:drivers      # instala uiautomator2 e xcuitest

# coloque os apps em apps/ (veja apps/README.md)

npm run test:android
npm run test:ios
```

Variáveis opcionais: `APP_PATH`, `DEVICE_NAME`, `PLATFORM_VERSION`.

## Decisões de projeto

- **Waits explícitos**: nada de `sleep` fixo nem implicit wait. Os helpers em `waits.js` esperam uma condição real (visível, clicável, texto) e geram mensagem clara quando estouram o tempo.
- **Page Object por plataforma**: Android e iOS têm seletores diferentes (UiSelector vs. iOS predicate), então ficam separados e os specs ficam legíveis.
- **Gestos W3C**: swipe e scroll funcionam nas duas plataformas.
- **Print em falha**: o hook `afterTest` salva a imagem em `screenshots/` para facilitar a investigação de testes instáveis.
- **Pipeline**: `Jenkinsfile` de exemplo com disparo agendado e parâmetro de plataforma.

## Próximos passos

- Relatório com Allure
- Execução em device farm (BrowserStack/Sauce Labs)
- Mais fluxos (cadastro, navegação, formulários)
