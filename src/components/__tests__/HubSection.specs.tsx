import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { createMemoryHistory } from 'history';
import { HistoryRouter } from 'redux-first-history/rr6';

import '@testing-library/jest-dom';
import HubSection, { HubSectionProps } from '../HubSection';
import MainLayout from '../MainLayout';
import { MockedProvider } from '@apollo/client/testing';
import { GET_LIBRARIES } from '../LibraryList';

expect.extend(toHaveNoViolations);

const mocks = [
  {
    request: {
      query: GET_LIBRARIES,
    },
    result: {
      data: {},
    },
  },
];

const sectionProps: HubSectionProps = {
  section: {
    __typename: 'LatestResult',
    library: {
      __typename: 'Library',
      id: '1',
      name: 'Lorem Ipsum',
      type: 'movie',
    },
    items: [
      {
        __typename: 'Movie',
        id: '0',
        title: 'Dolor Sit',
        releaseDate: 1403136000,
        thumb: '/image/transcode?url=/metadata/1/thumb',
      },
    ],
  },
  children: 'Recently added to Lorem Ipsum',
};

describe.skip('ItemCard', () => {
  it('should have no axe violations', async () => {
    const history = createMemoryHistory();
    const { container } = render(
      <HistoryRouter history={history}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <MainLayout>
            <HubSection {...sectionProps} />
          </MainLayout>
        </MockedProvider>
      </HistoryRouter>,
    );

    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  it('should display the name of the library', () => {
    const history = createMemoryHistory();
    render(
      <HistoryRouter history={history}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <MainLayout>
            <HubSection {...sectionProps} />
          </MainLayout>
        </MockedProvider>
      </HistoryRouter>,
    );

    expect(screen.getByText('Lorem Ipsum')).toBeDefined();
  });

  it('should display the items in the library', () => {
    const history = createMemoryHistory();
    render(
      <HistoryRouter history={history}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <MainLayout>
            <HubSection {...sectionProps} />
          </MainLayout>
        </MockedProvider>
      </HistoryRouter>,
    );

    expect(screen.getByAltText('Dolor Sit')).toBeDefined();
  });
});
