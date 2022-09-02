import { Language, Lightning, Utils } from '@lightningjs/sdk';

import { WelcomeButtons } from '../components';

export default class Welcome extends Lightning.Component {
  static _template() {
    return {
      Logo: {
        x: 260,
        y: 200,
        w: 564,
        h: 110,
        texture: Lightning.Tools.getSvgTexture(
          Utils.asset('images/logo.svg'),
          564,
          110,
        ),
      },
      LabelDescription: {
        x: 260,
        y: 370,
        w: 1050,
        h: 160,
        color: 0xffede9eb,
        text: {
          text: Language.translate('welcomeEnjoy'),
          fontFace: 'Light',
          fontSize: 48,
          lineHeight: 75,
        },
      },
      LabelCta: {
        x: 260,
        y: 827,
        w: 750,
        h: 65,
        color: 0xffede9eb,
        text: {
          fontSize: 26,
          verticalAlign: 'middle',
          text: Language.translate('welcomeGetStartedAt'),
        },
      },
      LabelSetup: {
        x: 1060,
        y: 764,
        color: 0xffede9eb,
        text: {
          fontSize: 26,
          text: Language.translate('welcomeAlreadySetup'),
        },
      },
      WelcomeButtons: {
        x: 1060,
        y: 812,
        w: 275,
        h: 65,
        type: WelcomeButtons,
      },
    };
  }

  _init() {
    this._setState('WelcomeButtons');
  }

  static _states() {
    return [
      class WelcomeButtons extends this {
        _getFocused() {
          return this.tag('WelcomeButtons');
        }
      },
    ];
  }
}
