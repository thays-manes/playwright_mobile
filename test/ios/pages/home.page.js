import { $ } from '@wdio/globals';
import HomePage from '../../shared/pages/home.page.js';

// Home no iOS: o menu é localizado por class chain e o título por predicate na barra de navegação.
// ATENÇÃO: labels abaixo são ilustrativos. Troque pelos do app real.
class HomePageIOS extends HomePage {
  get menuMeusPedidos() {
    return $('-ios class chain:**/XCUIElementTypeButton[`label == "Meus pedidos"`]');
  }
  get tituloMeusPedidos() {
    return $('-ios predicate string:type == "XCUIElementTypeNavigationBar" AND name == "Meus pedidos"');
  }
}

export default new HomePageIOS();
