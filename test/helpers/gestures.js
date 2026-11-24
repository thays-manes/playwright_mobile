import { driver } from '@wdio/globals';

// Gestos com W3C Actions (funcionam em Android e iOS).

async function swipe(from, to, duration = 600) {
  await driver
    .action('pointer', { parameters: { pointerType: 'touch' } })
    .move({ x: Math.round(from.x), y: Math.round(from.y) })
    .down()
    .pause(100)
    .move({ duration, x: Math.round(to.x), y: Math.round(to.y) })
    .up()
    .perform();
}

export async function swipeUp() {
  const { width, height } = await driver.getWindowSize();
  await swipe({ x: width / 2, y: height * 0.7 }, { x: width / 2, y: height * 0.3 });
}

export async function swipeDown() {
  const { width, height } = await driver.getWindowSize();
  await swipe({ x: width / 2, y: height * 0.3 }, { x: width / 2, y: height * 0.7 });
}

export async function swipeLeft() {
  const { width, height } = await driver.getWindowSize();
  await swipe({ x: width * 0.8, y: height / 2 }, { x: width * 0.2, y: height / 2 });
}

export async function swipeRight() {
  const { width, height } = await driver.getWindowSize();
  await swipe({ x: width * 0.2, y: height / 2 }, { x: width * 0.8, y: height / 2 });
}

// Rola a tela até o elemento aparecer (limite de tentativas para não ficar em loop)
export async function scrollUntilVisible(element, maxSwipes = 6) {
  for (let i = 0; i < maxSwipes; i++) {
    if (await element.isDisplayed()) return;
    await swipeUp();
  }
  throw new Error(`Elemento não encontrado após ${maxSwipes} swipes: ${element.selector}`);
}

export async function tap(x, y) {
  await driver
    .action('pointer', { parameters: { pointerType: 'touch' } })
    .move({ x: Math.round(x), y: Math.round(y) })
    .down()
    .pause(80)
    .up()
    .perform();
}
