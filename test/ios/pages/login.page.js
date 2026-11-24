import { $ } from '@wdio/globals';
import LoginPage from '../../shared/pages/login.page.js';

// Login no iOS: herda os elementos com accessibility id do LoginPage
// e define só o que é específico (iOS predicate string).
// Se usar outro app, ajuste os seletores aqui.
class LoginPageIOS extends LoginPage {
  get mensagemErroEmail() { return $('-ios predicate string:label CONTAINS "valid email"'); }
  get mensagemErroSenha() { return $('-ios predicate string:label CONTAINS "8 characters"'); }
  get alertaTitulo() { return $('-ios predicate string:label == "Success"'); }
  get alertaOk() { return $('-ios predicate string:label == "OK"'); }
}

export default new LoginPageIOS();
