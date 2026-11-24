import { expect } from '@wdio/globals';
import allure from '@wdio/allure-reporter';
import loginPage from '../pages/login.page.js';
import homePage from '../pages/home.page.js';
import { getCredenciais } from '../../helpers/credentials.js';

// CENÁRIO ILUSTRATIVO: login (elementos iguais nas duas plataformas)
// seguido de "Meus pedidos" (elementos diferentes em cada plataforma).
// O app de exemplo do WebdriverIO não tem essa tela, por isso está com .skip.
// Com um app que tenha "Meus pedidos", troque os seletores em pages/home.page.js
// e remova o .skip.
describe.skip('Meus pedidos - Android', () => {
  beforeEach(async () => {
    allure.addFeature('Meus pedidos');
    allure.addLabel('plataforma', 'Android');
    await loginPage.abrir();
  });

  it('deve abrir Meus pedidos depois do login', async () => {
    allure.addSeverity('critical');
    const { email, senha } = getCredenciais();

    // 1. Login: usa os elementos compartilhados (accessibility id)
    await loginPage.logar(email, senha);

    // 2. Meus pedidos: usa os elementos específicos de Android
    await homePage.abrirMeusPedidos();

    await expect(homePage.tituloMeusPedidos).toBeDisplayed();
  });
});
