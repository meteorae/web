import { render } from '@testing-library/react';

import ModalLibraryCreate from './modal-library-create';

describe('ModalLibraryCreate', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ModalLibraryCreate />);
    expect(baseElement).toBeTruthy();
  });
});
