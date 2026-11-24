import { expect } from '@wdio/globals';
import allure from '@wdio/allure-reporter';
import loginPage from '../pages/login.page.js';
import { getCredenciais } from '../../helpers/credentials.js';
import { waitVisible } from '../../helpers/waits.js';

// CENÁRIO 2 - o elemento da mensagem de erro é DIFERENTE em cada plataforma.
// Os campos e o botão vêm do Page Object compartilhado (accessibility id),
// mas a mensagem é localizada com seletor próprio de Android (veja pages/login.page.js).
describe('Login - senha inválida (Android)', () => {
  beforeEach(async () => {
    allure.addFeature('Login');
    allure.addLabel('plataforma', 'Android');
    await loginPage.abrir();
  });

  it('deve exibir erro quando a senha tem menos de 8 caracteres', async () => {
    allure.addSeverity('normal');
    const { email } = getCredenciais();

    await loginPage.logar(email, 'abc');

    await waitVisible(loginPage.mensagemErroSenha);
    await expect(loginPage.mensagemErroSenha).toBeDisplayed();
  });
});
