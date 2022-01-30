import { gql, useQuery } from '@apollo/client';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Stack,
} from '@chakra-ui/react';
import map from 'lodash/map';
import HubSection from '../components/HubSection';
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
          <HubSection section={section} key={section?.library.id}>
            Recently added to {section?.library.name}
          </HubSection>
        ))}
      </Flex>
    </Stack>
  );
}

export default Home;
