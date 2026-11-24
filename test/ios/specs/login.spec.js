import { expect } from '@wdio/globals';
import loginPage from '../pages/login.page.js';
import { getCredenciais } from '../../helpers/credentials.js';
import { waitVisible, clickWhenReady } from '../../helpers/waits.js';

describe('Login - iOS', () => {
  beforeEach(async () => {
    await loginPage.abrir();
  });

  it('deve logar com credenciais válidas', async () => {
    const { email, senha } = getCredenciais();
    await loginPage.logar(email, senha);

    await waitVisible(loginPage.alertaTitulo);
    await expect(loginPage.alertaTitulo).toBeDisplayed();
    await clickWhenReady(loginPage.alertaOk);
  });

  it('deve exibir erro com e-mail inválido', async () => {
    const { senha } = getCredenciais();
    await loginPage.logar('email-invalido', senha);

    await waitVisible(loginPage.mensagemErroEmail);
    await expect(loginPage.mensagemErroEmail).toBeDisplayed();
  });
});
