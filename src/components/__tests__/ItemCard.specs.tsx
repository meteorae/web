import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { GetItems_allItems_items } from '../../pages/__generated__/GetItems';
import ItemCard from '../ItemCard';

expect.extend(toHaveNoViolations);

const item: GetItems_allItems_items = {
  __typename: 'Item',
  id: 0,
  title: 'Lorem Ipsum',
  releaseDate: new Date('2020-01-01'),
  thumb: '',
  art: '',
};

describe('ItemCard', () => {
  it('should have no axe violations', async () => {
    const { container } = render(<ItemCard item={item} />);

    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  it('should display the name and release year of the item', () => {
    render(<ItemCard item={item} />);

    expect(screen.getByText('Lorem Ipsum')).toBeDefined();
    expect(screen.getByText('2020')).toBeDefined();
  });
});
