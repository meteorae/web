import { Box, Flex, FlexProps, Link, Text } from '@chakra-ui/layout';
import { useColorModeValue } from '@chakra-ui/react';
import Icon from '@mdi/react';
import {
  Link as ReactRouterLink,
  To,
  useMatch,
  useResolvedPath,
} from 'react-router-dom';

interface SidebarItemProps extends FlexProps {
  children?: React.ReactNode;
  to: To;
  icon: string;
}

const SidebarItem = ({ children, to, icon, ...rest }: SidebarItemProps) => {
  const resolved = useResolvedPath(to);
  const active = useMatch({ path: resolved.pathname, end: true });

  let color = 'red.500';
  const colorInactive = useColorModeValue('gray.900', 'white');
  let opacity = 1;
  let borderLeftColor = 'red.500';
  let borderLeftColorActive = useColorModeValue('gray.600', 'white');
  if (!active) {
    opacity = 0.6;
    color = colorInactive;
    borderLeftColor = 'transparent';
    borderLeftColorActive = 'transparent';
  }

  return (
    <Link
      as={ReactRouterLink}
      to={to}
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}>
      <Flex
        align='center'
        role='group'
        cursor='pointer'
        transitionProperty='opacity color'
        transitionDuration='150ms'
        transitionTimingFunction='ease-in'
        px='2'
        py='1'
        color={color}
        opacity={opacity}
        _hover={{
          color: useColorModeValue('gray.600', 'white'),
          borderLeftColor: borderLeftColorActive,
          opacity: 1,
        }}
        borderLeftWidth='4px'
        borderLeftColor={borderLeftColor}
        {...rest}>
        <Box mr={3}>
          <Icon path={icon} size={1.25} />
        </Box>
        <Text lineHeight='1' whiteSpace={'nowrap'} pt={1}>
          {children}
        </Text>
      </Flex>
    </Link>
  );
};

export default SidebarItem;
