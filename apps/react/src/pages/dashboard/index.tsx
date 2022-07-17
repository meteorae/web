import { gql, useQuery } from '@apollo/client';
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Stack,
} from '@chakra-ui/react';
import debounce from 'lodash-es/debounce';
import map from 'lodash-es/map';

import { CardSizeSlider, HubSection } from '@meteorae/ui-react';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import MainLayout from '../../components/main-layout';
import { setCardSize } from '../../features/settings/settingsSlice';

const GET_LATEST_HUBS = gql`
  query GetLatest {
    latest {
      library {
        id
        name
      }
      items {
        id
        ... on Movie {
          title
          thumb
          releaseDate
        }
        ... on MusicAlbum {
          title
          thumb
          artist {
            id
            name
          }
        }
        ... on PhotoAlbum {
          title
          thumb
          releaseDate
        }
      }
    }
  }
`;

function Dashboard() {
  const { data } = useQuery(GET_LATEST_HUBS, {
    variables: { limit: 24 },
  });

  const dispatch = useAppDispatch();
  const cardWidth = useAppSelector((state) => state.settings.cardSize);

  return (
    <MainLayout>
      <Stack h='100%' w='100%' direction='column'>
        <Flex
          flexShrink='0'
          justifyContent='space-between'
          align='center'
          h='3rem'
          px={8}>
          <Flex whiteSpace='nowrap' flexGrow='1' flexShrink='1' flexBasis='25%'>
            <Breadcrumb>
              <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink href='#'>Home</BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
          </Flex>
          <Flex justifyContent='flex-end'>
            <Box flexShrink='0'>
              <CardSizeSlider
                defaultValue={cardWidth}
                onChange={debounce((value) => {
                  dispatch(setCardSize({ cardSize: Math.round(value) }));
                }, 250)}
              />
            </Box>
          </Flex>
        </Flex>
        <Flex h='100%' w='100%' flexDirection='column'>
          {map(data?.latest, (section) => (
            <HubSection
              cardWidth={cardWidth}
              section={section}
              key={section?.library.id}>
              Recently added to {section?.library.name}
            </HubSection>
          ))}
        </Flex>
      </Stack>
    </MainLayout>
  );
}

export default Dashboard;
