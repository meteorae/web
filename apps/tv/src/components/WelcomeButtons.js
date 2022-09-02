import { Language, Lightning, Log, Router } from '@lightningjs/sdk';
import { Row } from '@lightningjs/ui-components';

import Button from './Button';

export default class WelcomeButtons extends Lightning.Component {
  static _template() {
    return {
      Row: {
        type: Row,
        itemSpacing: 30,
        neverScroll: true,
        items: [
          {
            type: Button,
            title: Language.translate('buttonLinkManually'),
            onEnter: () => {
              Router.navigate('link-manually');
            },
          },
          {
            type: Button,
            title: Language.translate('buttonLinkWithMeteorae'),
            onEnter: () => {
              Router.navigate('link-with-meteorae');
            },
          },
        ],
      },
    };
  }

  _getFocused() {
    return this.tag('Row');
  }
}
