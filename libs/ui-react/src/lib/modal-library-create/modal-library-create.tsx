import { gql, useMutation } from '@apollo/client';
import {
  Button,
  Flex,
  Grid,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorModeValue,
  useRadioGroup,
  useToast,
} from '@chakra-ui/react';
import { mdiImage, mdiMovie, mdiMusic, mdiPlus, mdiTelevision } from '@mdi/js';
import Icon from '@mdi/react';
import { useState } from 'react';

import LibraryRadioButton from '../library-radio-button/library-radio-button';

const CREATE_LIBRARY = gql`
  mutation CreateLibrary(
    $type: String!
    $name: String!
    $language: String!
    $locations: [String!]!
  ) {
    addLibrary(
      type: $type
      name: $name
      language: $language
      locations: $locations
    ) {
      name
    }
  }
`;

export interface ModalLibraryCreateProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ModalLibraryCreate({
  isOpen,
  onClose,
}: ModalLibraryCreateProps) {
  const [addLibrary] = useMutation(CREATE_LIBRARY);

  const toast = useToast();

  const [tabIndex, setTabIndex] = useState(0);
  const [libraryName, setLibraryName] = useState('');
  const [libraryLanguage, setLibraryLanguage] = useState('en-US');
  const [libraryFolder, setLibraryFolder] = useState('');
  const [libraryType, setLibraryType] = useState('movie');

  const options = [
    { name: 'Movie', icon: mdiMovie, value: 'movie' },
    { name: 'Series', icon: mdiTelevision, value: 'tv' },
    { name: 'Music', icon: mdiMusic, value: 'music' },
    { name: 'Photo', icon: mdiImage, value: 'photo' },
  ];

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'library-type',
    onChange: (event: any) => setLibraryType(event),
  });

  const group = getRootProps();

  const handleNextTab = () => {
    if (tabIndex < 1) {
      setTabIndex(tabIndex + 1);
    } else {
      addLibrary({
        variables: {
          type: libraryType,
          name: libraryName,
          language: libraryLanguage,
          locations: [libraryFolder],
        },
        onError: (error) => {
          toast({
            title: 'Library Creation Failed.',
            description: error.message,
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        },
        onCompleted: (data) => {
          toast({
            title: 'Library Created.',
            description: `The library ${data.addLibrary.name} has been created.`,
            status: 'success',
            duration: 5000,
            isClosable: true,
          });
          onClose();
        },
      });
    }
  };

  const handleTabsChange = (index: number) => {
    setTabIndex(index);
  };

  const handleLibraryNameChange = (event: any) => {
    setLibraryName(event.target?.value);
  };

  const handleLibraryLanguageChange = (event: any) => {
    setLibraryLanguage(event.target?.value);
  };

  const handleLibraryFolderChange = (event: any) => {
    setLibraryFolder(event.target?.value);
  };

  return (
    <Modal size={'2xl'} isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader
          backgroundColor={useColorModeValue('gray.100', 'gray.700')}
          borderBottomWidth={1}>
          <Flex alignItems='center'>
            <Icon size={1} path={mdiPlus} />
            <Text ml={2}>Add a library</Text>
          </Flex>
          <ModalCloseButton mt={2} />
        </ModalHeader>
        <ModalBody
          display={'flex'}
          p={0}
          minHeight='400px'
          backgroundColor={useColorModeValue('gray.200', 'gray.800')}>
          <Flex direction={'row'} minHeight={'full'} minWidth={'full'}>
            <Tabs
              index={tabIndex}
              onChange={handleTabsChange}
              orientation='vertical'
              colorScheme='red'
              minHeight={'full'}
              minWidth={'full'}>
              <TabList
                backgroundColor={useColorModeValue('gray.300', 'gray.900')}>
                <Tab>Type</Tab>
                <Tab>Folders</Tab>
                <Tab>Advanced</Tab>
              </TabList>
              <TabPanels minHeight={'full'}>
                <TabPanel
                  minHeight={'full'}
                  display={'flex'}
                  flexDirection={'column'}>
                  <Grid
                    flexGrow={1}
                    templateColumns='repeat(4, 1fr)'
                    gap={6}
                    {...group}>
                    {options.map((libraryType) => {
                      const radio = getRadioProps({
                        value: libraryType.value,
                      });
                      return (
                        <LibraryRadioButton key={libraryType.value} {...radio}>
                          <Icon size={2} path={libraryType.icon} />
                          <Text mt={2}>{libraryType.name}</Text>
                        </LibraryRadioButton>
                      );
                    })}
                  </Grid>
                  <HStack flexGrow={0} spacing={3}>
                    <Input
                      required
                      variant='filled'
                      placeholder='Name'
                      value={libraryName}
                      onChange={handleLibraryNameChange}
                    />
                    <Select
                      required
                      placeholder='Language'
                      value={libraryLanguage}
                      onChange={handleLibraryLanguageChange}>
                      <option value='en-US'>English</option>
                    </Select>
                  </HStack>
                </TabPanel>
                <TabPanel
                  minHeight={'full'}
                  display={'flex'}
                  flexDirection={'column'}>
                  <Text mb={2}>Add folders to your library.</Text>
                  <Input
                    required
                    variant='filled'
                    placeholder='Name'
                    value={libraryFolder}
                    onChange={handleLibraryFolderChange}
                  />
                  <Text mt={2} size={'xs'} style={{ opacity: '0.6' }}>
                    This is a temporary input for one folder path, pending
                    proper UI implementation.
                  </Text>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Flex>
        </ModalBody>
        <ModalFooter
          backgroundColor={useColorModeValue('gray.100', 'gray.700')}>
          <Button mr={3} onClick={onClose}>
            Close
          </Button>
          <Button colorScheme={'red'} onClick={handleNextTab}>
            {tabIndex < 1 ? 'Next' : 'Add Library'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ModalLibraryCreate;
