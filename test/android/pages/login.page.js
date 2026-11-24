import { $ } from '@wdio/globals';
import { clickWhenReady, typeWhenReady, waitVisible } from '../../helpers/waits.js';

// Page Object do login (Android).
// Seletores pensados para o app de exemplo do WebdriverIO (native-demo-app).
// Se usar outro app, ajuste os seletores aqui.
class LoginPageAndroid {
  get tabLogin() { return $('~Login'); }
  get inputEmail() { return $('~input-email'); }
  get inputSenha() { return $('~input-password'); }
  get botaoLogin() { return $('~button-LOGIN'); }
  get mensagemErroEmail() { return $('android=new UiSelector().textContains("valid email")'); }
  get alertaTitulo() { return $('android=new UiSelector().text("Success")'); }
  get alertaOk() { return $('android=new UiSelector().text("OK")'); }

  async abrir() {
    await clickWhenReady(this.tabLogin);
    await waitVisible(this.inputEmail);
  }

  async logar(email, senha) {
    await typeWhenReady(this.inputEmail, email);
    await typeWhenReady(this.inputSenha, senha);
    await clickWhenReady(this.botaoLogin);
  }
}

export default new LoginPageAndroid();
