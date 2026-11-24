import { $ } from '@wdio/globals';
import LoginPage from '../../shared/pages/login.page.js';

// Login no Android: herda os elementos com accessibility id do LoginPage
// e define só o que é específico (UiSelector).
// Se usar outro app, ajuste os seletores aqui.
class LoginPageAndroid extends LoginPage {
  get mensagemErroEmail() { return $('android=new UiSelector().textContains("valid email")'); }
  get mensagemErroSenha() { return $('android=new UiSelector().textContains("8 characters")'); }
  get alertaTitulo() { return $('android=new UiSelector().text("Success")'); }
  get alertaOk() { return $('android=new UiSelector().text("OK")'); }
}

export default new LoginPageAndroid();
