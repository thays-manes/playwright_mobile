import { expect, driver } from '@wdio/globals';
import allure from '@wdio/allure-reporter';
import LoginPage from '../pages/login.page.js';

// CENÁRIO 1 - mesmo código nas duas plataformas.
// Usa só o Page Object compartilhado, com elementos de accessibility id (~).
// Este spec é carregado pelas duas configs (Android e iOS).
const loginPage = new LoginPage();

describe('Login - elementos da tela (compartilhado)', () => {
  beforeEach(async () => {
    allure.addFeature('Login');
    allure.addLabel('plataforma', driver.isAndroid ? 'Android' : 'iOS');
    await loginPage.abrir();
  });

  it('deve exibir campos de e-mail, senha e botão de login', async () => {
    allure.addSeverity('normal');

    await expect(loginPage.inputEmail).toBeDisplayed();
    await expect(loginPage.inputSenha).toBeDisplayed();
    await expect(loginPage.botaoLogin).toBeDisplayed();
  });
});
