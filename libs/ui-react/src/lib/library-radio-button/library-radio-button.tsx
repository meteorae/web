import { Box, Flex, UseRadioProps, useRadio } from '@chakra-ui/react';

/* eslint-disable-next-line */
export interface LibraryRadioButtonProps {
  children: React.ReactNode;
}

export function LibraryRadioButton(
  props: LibraryRadioButtonProps & UseRadioProps,
) {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as='label' maxHeight={'106px'}>
      <input {...input} />
      <Flex
        {...checkbox}
        cursor='pointer'
        direction={'column'}
        alignItems={'center'}
        justify={'center'}
        borderWidth='1px'
        borderRadius='md'
        _checked={{
          bg: 'red.500',
          color: 'white',
        }}
        _focus={{
          boxShadow: 'outline',
        }}
        px={5}
        py={3}>
        {props.children}
      </Flex>
    </Box>
  );
}

export default LibraryRadioButton;
