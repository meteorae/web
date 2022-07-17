import { mdiHome } from '@mdi/js';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { MemoryRouter } from 'react-router-dom';

import SidebarItem from './sidebar-item';

describe('SidebarItem', () => {
  it('should render successfully', () => {
    const route = '/some-route';

    const { baseElement } = render(
      <MemoryRouter initialEntries={[route]}>
        <SidebarItem to={'/'} icon={mdiHome}>
          Home
        </SidebarItem>
      </MemoryRouter>,
    );

    expect(baseElement).toBeTruthy();
  });

  it('should render without any accesibility issues', async () => {
    const route = '/some-route';

    const { baseElement } = render(
      <MemoryRouter initialEntries={[route]}>
        <nav>
          <SidebarItem to={'/'} icon={mdiHome}>
            Home
          </SidebarItem>
        </nav>
      </MemoryRouter>,
    );

    expect(await axe(baseElement)).toHaveNoViolations();
  });

  it('should display the child as text', () => {
    const route = '/some-route';

    const { getByText } = render(
      <MemoryRouter initialEntries={[route]}>
        <SidebarItem to={'/'} icon={mdiHome}>
          Home
        </SidebarItem>
      </MemoryRouter>,
    );

    expect(getByText('Home')).toBeTruthy();
  });
});
