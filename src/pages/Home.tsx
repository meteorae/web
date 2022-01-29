import { gql, useQuery } from '@apollo/client';
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Heading,
  Stack,
} from '@chakra-ui/react';
import map from 'lodash/map';
import ItemCarousel from '../components/ItemCarousel';
import { GetLatest, GetLatestVariables } from './__generated__/GetLatest';

const GET_LATEST = gql`
  query GetLatest($limit: Int) {
    latest(limit: $limit) {
      library {
        id
        name
        type
      }
      items {
        id
        title
        releaseDate
        thumb
      }
    }
  }
`;

function Home() {
  const { data } = useQuery<GetLatest, GetLatestVariables>(GET_LATEST, {
    variables: { limit: 24 },
  });

  return (
    <Stack h='100%' w='100%' direction='column'>
      <Flex align='center' h='3rem' px={8}>
        <Breadcrumb>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href='#'>Home</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </Flex>
      <Flex h='100%' w='100%' flexDirection='column'>
        {map(data?.latest, (section) => (
          <Box key={section?.library.id} boxSizing='border-box'>
            <Flex
              alignItems='center'
              justify='space-between'
              px={8}
              h='2rem'
              my={3}>
              <Heading key={section?.library.id} size='sm'>
                Recently added to {section?.library.name}
              </Heading>
            </Flex>
            <Box boxSizing='border-box' overflow='hidden'>
              <Box px={8} overflow='hidden'>
                <ItemCarousel items={section?.items} />
              </Box>
            </Box>
          </Box>
        ))}
      </Flex>
    </Stack>
  );
}

export default Home;
