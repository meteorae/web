import { Flex, useColorModeValue } from '@chakra-ui/react';
import { mdiHome } from '@mdi/js';
import LibraryList from '@/components/LibraryList';
import SidebarItem from '@/components/SidebarItem';

interface SidebarProps {
  collapsed: boolean;
}

function Sidebar({ collapsed }: SidebarProps) {
  const backgroundColor = useColorModeValue(
    'grayTransparent.50',
    'grayTransparent.800',
  );

  return (
    <Flex
      role='navigation'
      display={{ base: 'none', lg: 'flex' }}
      direction='column'
      maxW={collapsed ? '48px' : '16.25rem'}
      minW={collapsed ? '48px' : '16.25rem'}
      ml={2}
      mb={2}
      bg={collapsed ? 'initial' : backgroundColor}
      borderRadius='base'
      height='calc(100% - 8px)'>
      <SidebarItem to='/' icon={mdiHome}>
        Home
      </SidebarItem>
      <LibraryList />
    </Flex>
  );
}

export default Sidebar;
