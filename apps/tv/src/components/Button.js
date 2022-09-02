import { Button, withStyles } from '@lightningjs/ui-components';

const style = {
  w: 275,
  h: 65,
  padding: 10,
  radius: 5,
  background: {
    color: 0xff66535e,
  },
  text: {
    color: 0xffede9eb,
    fontSize: 26,
    fontFace: 'Bold',
  },
  focused: {
    background: {
      color: 0xffdb1c2d,
    },
    text: {
      color: 0xffede9eb,
    },
  },
};

export default withStyles(Button, style);
