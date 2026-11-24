import { $ } from '@wdio/globals';
import { clickWhenReady, typeWhenReady, waitVisible } from '../../helpers/waits.js';

// Page Object do login (iOS).
// Mesmos accessibility ids do Android, mas mensagens e alertas usam iOS predicate.
// Se usar outro app, ajuste os seletores aqui.
class LoginPageIOS {
  get tabLogin() { return $('~Login'); }
  get inputEmail() { return $('~input-email'); }
  get inputSenha() { return $('~input-password'); }
  get botaoLogin() { return $('~button-LOGIN'); }
  get mensagemErroEmail() { return $('-ios predicate string:label CONTAINS "valid email"'); }
  get alertaTitulo() { return $('-ios predicate string:label == "Success"'); }
  get alertaOk() { return $('-ios predicate string:label == "OK"'); }

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

export default new LoginPageIOS();
