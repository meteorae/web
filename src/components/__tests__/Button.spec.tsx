import { Button } from '../Button';
import { render, cleanup } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

describe('Button', () => {
  it('should have no axe violations', async () => {
    const { container } = render(<Button>Click here</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
    cleanup();
  });
});
