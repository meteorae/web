import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import ItemCard, { Item } from '../ItemCard';
import { createMemoryHistory } from 'history';
import { HistoryRouter } from 'redux-first-history/rr6';

import '@testing-library/jest-dom';

expect.extend(toHaveNoViolations);

const item: Item = {
  __typename: 'Movie',
  id: '0',
  title: 'Lorem Ipsum',
  releaseDate: 1403136000,
  thumb: '/image/transcode?url=/metadata/1/thumb',
  art: '/image/transcode?url=/metadata/1/art',
};

describe('ItemCard', () => {
  it('should have no axe violations', async () => {
    const history = createMemoryHistory();
    const { container } = render(
      <HistoryRouter history={history}>
        <ItemCard item={item} />
      </HistoryRouter>,
    );

    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  it('should display the name and release year of the item', () => {
    const history = createMemoryHistory();
    render(
      <HistoryRouter history={history}>
        <ItemCard item={item} />
      </HistoryRouter>,
    );

    expect(screen.getByText('Lorem Ipsum')).toBeDefined();
    expect(screen.getByText('2014')).toBeDefined();
  });

  it("should use the item's title as the image's alt text", () => {
    const history = createMemoryHistory();
    render(
      <HistoryRouter history={history}>
        <ItemCard item={item} />
      </HistoryRouter>,
    );

    expect(screen.getByAltText('Lorem Ipsum')).toBeDefined();
  });
});
