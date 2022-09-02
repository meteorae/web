import { Language, Lightning, Router, Utils } from '@lightningjs/sdk';
import { Column, Keyboard } from '@lightningjs/ui-components';

import { Button } from '../components';

const keyboard = {
  lowercase: [
    [
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '0',
      { label: 'http://', size: 'large' },
    ],
    [
      'q',
      'w',
      'e',
      'r',
      't',
      'y',
      'u',
      'i',
      'o',
      'p',
      { label: 'https://', size: 'large' },
    ],
    [
      'a',
      's',
      'd',
      'f',
      'g',
      'h',
      'j',
      'k',
      'l',
      '@',
      { label: '/', size: 'large' },
    ],
    [
      'z',
      'x',
      'c',
      'v',
      'b',
      'n',
      'm',
      { label: '_', announce: 'underscore, button' },
      { label: '.', announce: 'period, button' },
      { label: '-', announce: 'dash, button' },
      { label: ':', size: 'large' },
    ],
  ],
};

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
          text: Language.translate('linkManuallyDescription'),
          fontFace: 'Light',
          fontSize: 48,
          lineHeight: 75,
        },
      },
      Keyboard: {
        x: 260,
        y: 615,
        type: Keyboard,
        formats: keyboard,
        rowWrap: false,
      },
      Column: {
        x: 1365,
        y: 652,
        itemSpacing: 15,
        type: Column,
        items: [
          {
            type: Button,
            title: Language.translate('buttonConnect'),
            onEnter: () => {},
          },
          {
            type: Button,
            title: Language.translate('buttonErase'),
            onEnter: () => {},
          },
          {
            type: Button,
            title: Language.translate('buttonBack'),
            onEnter: () => {
              Router.navigate('welcome');
            },
          },
        ],
      },
    };
  }

  _init() {
    this._setState('Column');
  }

  static _states() {
    return [
      class Column extends this {
        _getFocused() {
          return this.tag('Column');
        }
        _handleLeft() {
          this._setState('Keyboard');
        }
      },
      class Keyboard extends this {
        _getFocused() {
          return this.tag('Keyboard');
        }
        _handleRight() {
          this._setState('Column');
        }
      },
    ];
  }
}
