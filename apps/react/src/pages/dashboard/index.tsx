import { gql, useQuery, useSubscription } from '@apollo/client';
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Stack,
  useToast,
} from '@chakra-ui/react';
import debounce from 'lodash-es/debounce';
import map from 'lodash-es/map';

import { CardSizeSlider, HubSection } from '@meteorae/ui-react';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import MainLayout from '../../components/main-layout';
import { setCardSize } from '../../features/settings/settingsSlice';
import {
  GetLatestDocument,
  GetLatestQuery,
  OnItemUpdatedDocument,
  OnItemUpdatedSubscription,
  OnLatestHubAddedDocument,
  OnLatestHubAddedSubscription,
} from '../../generated';

function Dashboard() {
  const toast = useToast();

  const { subscribeToMore, data } = useQuery<GetLatestQuery>(
    GetLatestDocument,
    {
      variables: { limit: 24 },
    },
  );

  useSubscription<OnItemUpdatedSubscription>(OnItemUpdatedDocument, {
    onSubscriptionData: ({ subscriptionData }) => {
      toast({
        title: 'Item updated',
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        description: `${subscriptionData?.data?.onItemUpdated.title}`,
        status: 'info',
        duration: 2500,
        isClosable: true,
      });
    },
  });

  const dispatch = useAppDispatch();
  const cardWidth = useAppSelector((state) => state.settings.cardSize);

  subscribeToMore<OnLatestHubAddedSubscription>({
    document: OnLatestHubAddedDocument,
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data) return prev;

      let latestHubs = prev.latest ?? [];

      for (const newLatestHub of subscriptionData.data.onLatestItemAdded ??
        []) {
        const newHub = latestHubs.find(
          (hub) => hub?.library.id === newLatestHub?.library.id,
        );

        if (newHub) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          latestHubs = latestHubs.map((hub) => {
            if (hub?.library.id === newLatestHub?.library.id) {
              return newLatestHub;
            }
            return hub;
          });
        } else {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          latestHubs = [...latestHubs, newLatestHub];
        }
      }

      return Object.assign({}, prev, {
        latest: latestHubs,
      });
    },
  });

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
