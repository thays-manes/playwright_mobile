# Apps de teste

Coloque aqui os binários (eles não são versionados):

- `android/android.wdio.native.app.apk`
- `ios/wdio-native-app.zip` (build para simulador)

O projeto usa o app de exemplo do WebdriverIO (**native-demo-app**), que pode ser baixado na página de releases do repositório `webdriverio/native-demo-app`.

Para usar outro app, passe o caminho por variável de ambiente:

```bash
APP_PATH=/caminho/do/app.apk npm run test:android
```
