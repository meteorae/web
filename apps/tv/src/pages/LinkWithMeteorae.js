import { Language, Lightning, Router, Utils } from '@lightningjs/sdk';

import { Button } from '../components';

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
      LabelLineOne: {
        x: 260,
        y: 370,
        h: 160,
        color: 0xffede9eb,
        text: {
          text: Language.translate('linkWithMeteoraeFirstLine'),
          fontFace: 'Light',
          fontSize: 48,
          lineHeight: 75,
        },
      },
      LabelLineTwo: {
        x: 260,
        y: 441,
        h: 160,
        color: 0xffc8bcc4,
        text: {
          text: Language.translate('linkWithMeteoraeSecondLine'),
          fontFace: 'Light',
          fontSize: 32,
        },
      },
      LabelLinkCode: {
        x: 280,
        y: 565,
        w: 1085,
        color: 0xffede9eb,
        text: {
          text: '5BSG',
          fontFace: 'Bold',
          fontSize: 175,
          textAlign: 'center',
          verticalAlign: 'middle',
        },
      },
      BackButton: {
        x: 1365,
        y: 815,
        type: Button,
        title: Language.translate('buttonBack'),
        onEnter: () => {
          Router.navigate('welcome');
        },
      },
    };
  }

  _getFocused() {
    return this.tag('BackButton');
  }
}
