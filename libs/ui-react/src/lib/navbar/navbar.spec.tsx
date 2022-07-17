/* eslint-disable @typescript-eslint/no-empty-function */
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { MemoryRouter } from 'react-router-dom';

import Navbar from './navbar';

describe('Navbar', () => {
  it('should render successfully', () => {
    const route = '/some-route';

    const { baseElement } = render(
      <MemoryRouter initialEntries={[route]}>
        <Navbar toggleCollapsed={() => {}} />
      </MemoryRouter>,
    );

    expect(baseElement).toBeTruthy();
  });

  it('should render without any accesibility issues', async () => {
    const route = '/some-route';

    const { baseElement } = render(
      <MemoryRouter initialEntries={[route]}>
        <Navbar toggleCollapsed={() => {}} />
      </MemoryRouter>,
    );

    expect(await axe(baseElement)).toHaveNoViolations();
  });
});
/* eslint-enable @typescript-eslint/no-empty-function */
