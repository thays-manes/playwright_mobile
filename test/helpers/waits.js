import { driver } from '@wdio/globals';

// Waits explícitos: sempre esperam uma condição real, nunca um tempo fixo.

const TIMEOUT = 10000;

export async function waitVisible(element, timeout = TIMEOUT) {
  await element.waitForDisplayed({
    timeout,
    timeoutMsg: `Elemento não ficou visível em ${timeout}ms: ${element.selector}`,
  });
  return element;
}

export async function waitClickable(element, timeout = TIMEOUT) {
  await element.waitForClickable({
    timeout,
    timeoutMsg: `Elemento não ficou clicável em ${timeout}ms: ${element.selector}`,
  });
  return element;
}

export async function clickWhenReady(element, timeout = TIMEOUT) {
  await waitClickable(element, timeout);
  await element.click();
}

export async function typeWhenReady(element, texto, timeout = TIMEOUT) {
  await waitVisible(element, timeout);
  await element.setValue(texto);
}

export async function waitGone(element, timeout = TIMEOUT) {
  await element.waitForDisplayed({ timeout, reverse: true });
}

// Wait customizado com driver.waitUntil, para condições que não são só "visível"
export async function waitForText(element, textoEsperado, timeout = TIMEOUT) {
  await driver.waitUntil(async () => (await element.getText()).includes(textoEsperado), {
    timeout,
    interval: 500,
    timeoutMsg: `Texto "${textoEsperado}" não apareceu em ${timeout}ms`,
  });
}
