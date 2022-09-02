import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { MemoryRouter } from 'react-router-dom';

import MediaCard from './media-card';

export const TEST_ITEM = {
  id: 1,
  title: 'Test Item',
  startDate: '2020-01-01',
  thumb: 'https://via.placeholder.com/260x390',
};

export const TEST_ITEM_NO_IMAGE = {
  ...TEST_ITEM,
  thumb: null,
};

describe('MediaCard', () => {
  it('should render successfully', () => {
    const route = '/some-route';

    const { baseElement } = render(
      <MemoryRouter initialEntries={[route]}>
        <MediaCard item={TEST_ITEM} width={260} />
      </MemoryRouter>,
    );

    expect(baseElement).toBeTruthy();
  });

  it('should render without any accesibility issues', async () => {
    const route = '/some-route';

    const { baseElement } = render(
      <MemoryRouter initialEntries={[route]}>
        <main>
          <MediaCard item={TEST_ITEM} width={260} />
        </main>
      </MemoryRouter>,
    );

    expect(await axe(baseElement)).toHaveNoViolations();
  });

  it('should render without a an image', () => {
    const route = '/some-route';

    const { baseElement } = render(
      <MemoryRouter initialEntries={[route]}>
        <MediaCard item={TEST_ITEM_NO_IMAGE} width={260} />
      </MemoryRouter>,
    );

    expect(baseElement).toBeTruthy();
  });

  it('should not render an image if there is no image', () => {
    const route = '/some-route';

    const { baseElement } = render(
      <MemoryRouter initialEntries={[route]}>
        <MediaCard item={TEST_ITEM_NO_IMAGE} width={260} />
      </MemoryRouter>,
    );

    const image = baseElement.getElementsByTagName('img');
    expect(image.length).toBe(0);
  });

  it('should display the item name and year', () => {
    const route = '/some-route';

    const { getByText, queryByText } = render(
      <MemoryRouter initialEntries={[route]}>
        <MediaCard item={TEST_ITEM} width={260} />
      </MemoryRouter>,
    );

    expect(getByText(TEST_ITEM.title)).toBeTruthy();
    expect(getByText('2020')).toBeTruthy();
    expect(queryByText(TEST_ITEM.startDate)).not.toBeInTheDocument();
  });
});
