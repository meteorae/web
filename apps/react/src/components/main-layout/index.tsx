import { gql, useQuery } from '@apollo/client';
import { Flex } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/react';
import { Fragment, Suspense } from 'react';

import { Navbar, Sidebar } from '@meteorae/ui-react';

import useLocalStorage from '../../hooks/useLocalStorage';

type MainLayoutProps = {
  children: React.ReactNode;
};

const GET_LIBRARIES = gql`
  query GetLibraries {
    libraries {
      id
      name
      type
    }
  }
`;

function MainLayout({ children }: MainLayoutProps) {
  const [collapsed, setCollapsed] = useLocalStorage('sidebarCollapsed', false);
  const { loading, error, data } = useQuery(GET_LIBRARIES);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error :(</p>;

  return (
    <Fragment>
      <Navbar toggleCollapsed={toggleCollapsed} />
      <Flex position='relative' h='100%' flexGrow='1'>
        <Flex direction='row' w='100%'>
          <Sidebar collapsed={collapsed} libraries={data?.libraries} />

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
