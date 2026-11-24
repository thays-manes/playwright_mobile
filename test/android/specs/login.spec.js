import { expect } from '@wdio/globals';
import allure from '@wdio/allure-reporter';
import loginPage from '../pages/login.page.js';
import { getCredenciais } from '../../helpers/credentials.js';
import { waitVisible, clickWhenReady } from '../../helpers/waits.js';

describe('Login - Android', () => {
  beforeEach(async () => {
    allure.addFeature('Login');
    allure.addLabel('plataforma', 'Android');
    await loginPage.abrir();
  });

  it('deve logar com credenciais válidas', async () => {
    allure.addSeverity('critical');
    const { email, senha } = getCredenciais();
    await loginPage.logar(email, senha);

    await waitVisible(loginPage.alertaTitulo);
    await expect(loginPage.alertaTitulo).toBeDisplayed();
    await clickWhenReady(loginPage.alertaOk);
  });

  it('deve exibir erro com e-mail inválido', async () => {
    allure.addSeverity('normal');
    const { senha } = getCredenciais();
    await loginPage.logar('email-invalido', senha);

    await waitVisible(loginPage.mensagemErroEmail);
    await expect(loginPage.mensagemErroEmail).toBeDisplayed();
  });
});
