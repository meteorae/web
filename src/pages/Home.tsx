import { useQuery } from '@apollo/client';
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Stack,
} from '@chakra-ui/react';
import map from 'lodash/map';
import CardSizeSlider from '@/components/CardSizeSlider';
import HubSection from '@/components/HubSection';
import GET_LATEST_HUBS from '@/graphql/GetLatestHubs.gql';
import { GetLatest, GetLatestVariables } from '@/pages/__generated__/GetLatest';

function Home() {
  const { data } = useQuery<GetLatest, GetLatestVariables>(GET_LATEST_HUBS, {
    variables: { limit: 24 },
  });

  return (
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
            <CardSizeSlider />
          </Box>
        </Flex>
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
