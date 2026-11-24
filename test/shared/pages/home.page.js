import { clickWhenReady, waitVisible } from '../../helpers/waits.js';

// Page Object base da home (tela depois do login).
// Aqui os elementos são DIFERENTES em cada plataforma, então as subclasses
// (test/android/pages e test/ios/pages) definem os seletores.
// O fluxo (clicar no menu e esperar a tela abrir) é o mesmo e fica aqui, uma vez só.
export default class HomePage {
  get menuMeusPedidos() { throw new Error('Implementar na subclasse da plataforma'); }
  get tituloMeusPedidos() { throw new Error('Implementar na subclasse da plataforma'); }

  async abrirMeusPedidos() {
    await clickWhenReady(this.menuMeusPedidos);
    await waitVisible(this.tituloMeusPedidos);
  }
}
