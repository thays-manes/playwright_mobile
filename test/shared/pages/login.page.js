import { $ } from '@wdio/globals';
import { clickWhenReady, typeWhenReady, waitVisible } from '../../helpers/waits.js';

// Page Object base do login, compartilhado entre Android e iOS.
//
// Aqui ficam só os elementos com ACCESSIBILITY ID (seletor "~"):
//   - no Android, o "~id" procura pelo content-desc
//   - no iOS, o "~id" procura pelo accessibility identifier
// Como o mesmo seletor funciona nas duas plataformas, escrevemos uma vez só.
//
// O que é diferente em cada plataforma (mensagens, alertas) fica nas subclasses
// em test/android/pages e test/ios/pages.
export default class LoginPage {
  get tabLogin() { return $('~Login'); }
  get inputEmail() { return $('~input-email'); }
  get inputSenha() { return $('~input-password'); }
  get botaoLogin() { return $('~button-LOGIN'); }

  // Específicos da plataforma: cada subclasse implementa
  get mensagemErroEmail() { throw new Error('Implementar na subclasse da plataforma'); }
  get alertaTitulo() { throw new Error('Implementar na subclasse da plataforma'); }
  get alertaOk() { throw new Error('Implementar na subclasse da plataforma'); }

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
