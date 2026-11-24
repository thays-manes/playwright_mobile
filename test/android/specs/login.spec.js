import { expect } from '@wdio/globals';
import loginPage from '../pages/login.page.js';
import { waitVisible, clickWhenReady } from '../../helpers/waits.js';

describe('Login - Android', () => {
  beforeEach(async () => {
    await loginPage.abrir();
  });

  it('deve logar com credenciais válidas', async () => {
    await loginPage.logar('teste@teste.com', 'Senha@1234');

    await waitVisible(loginPage.alertaTitulo);
    await expect(loginPage.alertaTitulo).toBeDisplayed();
    await clickWhenReady(loginPage.alertaOk);
  });

  it('deve exibir erro com e-mail inválido', async () => {
    await loginPage.logar('email-invalido', 'Senha@1234');

    await waitVisible(loginPage.mensagemErroEmail);
    await expect(loginPage.mensagemErroEmail).toBeDisplayed();
  });
});
