import { render } from '@testing-library/react';

import LibraryRadioButton from './library-radio-button';

describe('LibraryRadioButton', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LibraryRadioButton />);
    expect(baseElement).toBeTruthy();
  });
});
