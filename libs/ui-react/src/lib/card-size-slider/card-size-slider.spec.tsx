/* eslint-disable @typescript-eslint/no-empty-function */
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import CardSizeSlider from './card-size-slider';

describe('CardSizeSlider', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <CardSizeSlider defaultValue={170} onChange={() => {}} />,
    );

    expect(baseElement).toBeTruthy();
  });

  it('should render without any accesibility issues', async () => {
    const { baseElement } = render(
      <main>
        <CardSizeSlider defaultValue={170} onChange={() => {}} />
      </main>,
    );

    expect(await axe(baseElement)).toHaveNoViolations();
  });
});
/* eslint-enable @typescript-eslint/no-empty-function */
