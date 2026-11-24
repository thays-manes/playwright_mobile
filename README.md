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
    credentials.js        # lê USER_EMAIL e USER_PASSWORD do ambiente
    waits.js              # waits explícitos (visível, clicável, texto)
    gestures.js           # swipe, scroll, tap com W3C Actions
  shared/
    pages/                # só elementos: Page Objects base (login com accessibility id, home com métodos do fluxo)
  android/
    pages/                # Page Objects Android (herdam do shared, só o que é específico)
    specs/                # testes Android
  ios/
    pages/                # Page Objects iOS (herdam do shared, só o que é específico)
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

## Pipeline

- **GitHub Actions** (`.github/workflows/mobile-tests.yml`): sobe um emulador Android (API 34), roda os testes, gera o Allure e publica como artefato. Dispara em push, PR, todo dia às 2h e manualmente.
  - Configure em *Settings > Secrets and variables > Actions*: secrets `USER_EMAIL` e `USER_PASSWORD`, e a variável `APP_URL` (link do `.apk`).
- **Jenkins** (`Jenkinsfile`): parâmetro de plataforma, disparo agendado, credenciais via Credentials e relatório Allure.
- **Docker** (`Dockerfile`): imagem com Node, Java, Android SDK e Appium (driver UiAutomator2). O emulador não vai na imagem porque precisa de KVM; use o runner com emulador, um device conectado ou um device farm.

```bash
docker build -t mobile-tests .
docker run --rm -e USER_EMAIL=... -e USER_PASSWORD=... -e APP_PATH=/app/apps/android/app.apk mobile-tests
```

## Relatório (Allure)

Depois de rodar os testes, gere e abra o relatório HTML:

```bash
npm run report
```

Ele mostra os testes por feature e severidade, com print anexado nas falhas. Os resultados brutos ficam em `allure-results/` (ignorado pelo git).

## Credenciais

As credenciais não ficam no código. Copie o exemplo e preencha:

```bash
cp .env.example .env
```

O `.env` está no `.gitignore`. No Jenkins, use o Credentials (`withCredentials`) para injetar `USER_EMAIL` e `USER_PASSWORD`.

## Decisões de projeto

- **Waits explícitos**: nada de `sleep` fixo nem implicit wait. Os helpers em `waits.js` esperam uma condição real (visível, clicável, texto) e geram mensagem clara quando estouram o tempo.
- **Accessibility ID compartilhado**: elementos com `~id` funcionam nas duas plataformas (content-desc no Android, accessibility identifier no iOS), então ficam num Page Object base em `test/shared`. Só o que é específico (UiSelector no Android, iOS predicate no iOS) fica em cada plataforma, que herda do base.
- **Gestos W3C**: swipe e scroll funcionam nas duas plataformas.
- **Credenciais fora do código**: leitura via variáveis de ambiente (`.env` local, Credentials no Jenkins).
- **Cenário "Meus pedidos"** (ilustrativo, com `.skip`): o login usa os elementos compartilhados e a tela de pedidos usa elementos diferentes em cada plataforma (resource-id no Android, class chain no iOS). O fluxo fica no `HomePage` base e só os seletores mudam.
- **Print em falha**: o hook `afterTest` salva a imagem em `screenshots/` para facilitar a investigação de testes instáveis.
- **Pipeline**: `Jenkinsfile` de exemplo com disparo agendado e parâmetro de plataforma.

## Próximos passos

- Execução em device farm (BrowserStack/Sauce Labs)
- Mais fluxos (cadastro, navegação, formulários)
