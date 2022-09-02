import { useQuery, useSubscription } from '@apollo/client';
import { Flex } from '@chakra-ui/layout';
import { Spinner, useToast } from '@chakra-ui/react';
import { Fragment, Suspense } from 'react';

import {
  GetLibrariesDocument,
  GetLibrariesQuery,
  OnItemUpdatedDocument,
  OnItemUpdatedSubscription,
  OnLibraryAddedDocument,
  OnLibraryAddedSubscription,
} from '@meteorae/graphql-types';
import { Navbar, Sidebar } from '@meteorae/ui-react';

import useLocalStorage from '../../hooks/useLocalStorage';

type MainLayoutProps = {
  children: React.ReactNode;
};

function MainLayout({ children }: MainLayoutProps) {
  const toast = useToast();

  const [collapsed, setCollapsed] = useLocalStorage('sidebarCollapsed', false);
  const { subscribeToMore, data } = useQuery<GetLibrariesQuery>(
    GetLibrariesDocument,
    {
      onError: (error) => {
        toast({
          title: 'Failed to get libraries',
          description: error.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      },
    },
  );

  useSubscription<OnItemUpdatedSubscription>(OnItemUpdatedDocument, {});

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Fragment>
      <Navbar toggleCollapsed={toggleCollapsed} />
      <Flex position='relative' h='100%' flexGrow='1'>
        <Flex direction='row' w='100%'>
          <Sidebar
            collapsed={collapsed}
            libraries={data?.libraries ?? []}
            subscribeToNewLibraries={() =>
              subscribeToMore<OnLibraryAddedSubscription>({
                document: OnLibraryAddedDocument,
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                updateQuery: (prev, { subscriptionData }) => {
                  if (!subscriptionData.data) return prev;

                  let libraries = prev.libraries ?? [];
                  const newLibraryItem = subscriptionData.data.onLibraryAdded;

                  const newLibrary = libraries.find(
                    (library) => library?.id === newLibraryItem.id,
                  );

                  if (newLibrary) {
                    libraries = libraries.map((library) => {
                      if (library?.id === newLibraryItem.id) {
                        return newLibraryItem;
                      }
                      return library;
                    });
                  } else {
                    libraries = [...libraries, newLibraryItem];
                  }

                  return Object.assign({}, prev, {
                    libraries,
                  });
                },
              })
            }
          />

          <Flex
            role='main'
            direction='column'
            grow='1'
            height='100%'
            pos='relative'
            overflowX='hidden'>
            <Suspense fallback={<Spinner size='xl' />}>{children}</Suspense>
          </Flex>
        </Flex>
      </Flex>
    </Fragment>
  );
}

export default MainLayout;
