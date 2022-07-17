import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { MemoryRouter } from 'react-router-dom';

import Sidebar from './sidebar';

const TEST_LIBRARIES = [
  { id: '1', name: 'Library 1', type: 'movie' },
  { id: '2', name: 'Library 2', type: 'image' },
  { id: '3', name: 'Library 3', type: 'music' },
  { id: '4', name: 'Library 4', type: 'tv' },
];

describe('Sidebar', () => {
  it('should render successfully', () => {
    const route = '/some-route';

    const { baseElement } = render(
      <MemoryRouter initialEntries={[route]}>
        <Sidebar collapsed={false} libraries={TEST_LIBRARIES} />
      </MemoryRouter>,
    );

    expect(baseElement).toBeTruthy();
  });

  it('should render without any accesibility issues', async () => {
    const route = '/some-route';

    const { baseElement } = render(
      <MemoryRouter initialEntries={[route]}>
        <Sidebar collapsed={false} libraries={TEST_LIBRARIES} />
      </MemoryRouter>,
    );

    expect(await axe(baseElement)).toHaveNoViolations();
  });

  it('should render collpased without any accesibility issues', async () => {
    const route = '/some-route';

    const { baseElement } = render(
      <MemoryRouter initialEntries={[route]}>
        <Sidebar collapsed={true} libraries={TEST_LIBRARIES} />
      </MemoryRouter>,
    );

    expect(await axe(baseElement)).toHaveNoViolations();
  });
});
