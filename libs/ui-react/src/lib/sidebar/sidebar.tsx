import { Flex, useColorModeValue } from '@chakra-ui/react';
import {
  mdiHelp,
  mdiHome,
  mdiImage,
  mdiMovie,
  mdiMusic,
  mdiTelevision,
} from '@mdi/js';

import { SidebarItem } from '@meteorae/ui-react';

// TODO: Replace with GraphQL type.
interface Library {
  id: string;
  name: string;
  type: string;
}

interface SidebarProps {
  collapsed: boolean;
  libraries: Library[];
}

export function getIconFromLibrary(library: Library | null) {
  switch (library?.type) {
    case 'movie':
      return mdiMovie;
    case 'image':
      return mdiImage;
    case 'music':
      return mdiMusic;
    case 'tv':
      return mdiTelevision;
    default:
      return mdiHelp;
  }
}

function Sidebar({ collapsed, libraries }: SidebarProps) {
  const backgroundColor = useColorModeValue('gray.200', 'gray.800');

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
      height='calc(100% - 8px)'
      overflow={'hidden'}>
      <SidebarItem to='/' icon={mdiHome}>
        Home
      </SidebarItem>
      {libraries.map((library) => (
        <SidebarItem
          to={`/library/${library?.id}`}
          icon={getIconFromLibrary(library)}
          key={library?.id}>
          {library?.name || ''}
        </SidebarItem>
      ))}
    </Flex>
  );
}

export default Sidebar;
