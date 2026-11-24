import { $ } from '@wdio/globals';
import HomePage from '../../shared/pages/home.page.js';

// Home no Android: o menu é localizado por resource-id e o título por texto (UiSelector).
// ATENÇÃO: package e ids abaixo são ilustrativos. Troque pelos do app real.
class HomePageAndroid extends HomePage {
  get menuMeusPedidos() {
    return $('android=new UiSelector().resourceId("com.exemplo.app:id/menu_meus_pedidos")');
  }
  get tituloMeusPedidos() {
    return $('android=new UiSelector().text("Meus pedidos")');
  }
}

export default new HomePageAndroid();
