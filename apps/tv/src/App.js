import { Router, Utils } from '@lightningjs/sdk';

import routes from './lib/routes';

export default class App extends Router.App {
  static getFonts() {
    return [
      { family: 'Bold', url: Utils.asset('fonts/Roboto-Bold.ttf') },
      { family: 'Regular', url: Utils.asset('fonts/Roboto-Regular.ttf') },
      { family: 'Light', url: Utils.asset('fonts/Roboto-Light.ttf') },
      { family: 'Thin', url: Utils.asset('fonts/Roboto-Thin.ttf') },
    ];
  }

  static language() {
    // TODO: Detect platform language
    return 'fr';
  }

  _setup() {
    Router.startRouter(routes, this);
  }

  static _template() {
    return {
      ...super._template(),
    };
  }

  _handleAppClose() {
    this.application.closeApp();
  }
}
