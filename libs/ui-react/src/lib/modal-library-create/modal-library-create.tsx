import { useMutation, useQuery } from '@apollo/client';
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
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

import {
  CreateLibraryDocument,
  CreateLibraryMutation,
  CreateLibraryMutationVariables,
  ScannersAndAgentsDocument,
  ScannersAndAgentsQuery,
  ScannersAndAgentsQueryVariables,
} from '@meteorae/graphql-types';

import LibraryRadioButton from '../library-radio-button/library-radio-button';

export interface ModalLibraryCreateProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ModalLibraryCreate({
  isOpen,
  onClose,
}: ModalLibraryCreateProps) {
  const [addLibrary] = useMutation<
    CreateLibraryMutation,
    CreateLibraryMutationVariables
  >(CreateLibraryDocument);

  const toast = useToast();

  const [tabIndex, setTabIndex] = useState(0);
  const [libraryName, setLibraryName] = useState('');
  const [libraryLanguage, setLibraryLanguage] = useState('en-US');
  const [libraryFolder, setLibraryFolder] = useState('');
  const [libraryType, setLibraryType] = useState('movie');
  const [libraryScanner, setLibraryScanner] = useState('');
  const [libraryAgent, setLibraryAgent] = useState('');

  const { data: scannersAndAgents, refetch: refetchScanners } = useQuery<
    ScannersAndAgentsQuery,
    ScannersAndAgentsQueryVariables
  >(ScannersAndAgentsDocument, {
    variables: {
      libraryType: libraryType,
    },
  });

  const options = [
    { name: 'Movie', icon: mdiMovie, value: 'movie' },
    { name: 'Series', icon: mdiTelevision, value: 'tv' },
    { name: 'Music', icon: mdiMusic, value: 'music' },
    { name: 'Photo', icon: mdiImage, value: 'photo' },
  ];

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'library-type',
    onChange: (event) => {
      setLibraryType(event);

      refetchScanners({ libraryType: event });

      const optionName = options.find((option) => option.value === event)?.name;

      setLibraryName(optionName ?? '');
    },
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
          scanner: libraryScanner
            ? libraryScanner
            : scannersAndAgents?.scanners?.[0].identifier ?? '',
          agent: libraryAgent
            ? libraryAgent
            : scannersAndAgents?.agents?.[0].identifier ?? '',
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

  const handleLibraryScannerChange = (event: any) => {
    setLibraryScanner(event.target?.value);
  };

  const handleLibraryAgentChange = (event: any) => {
    setLibraryAgent(event.target?.value);
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
                    <FormControl isRequired>
                      <FormLabel>Name</FormLabel>
                      <Input
                        required
                        variant='filled'
                        placeholder='Name'
                        value={libraryName}
                        onChange={handleLibraryNameChange}
                      />
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel>Language</FormLabel>
                      <Select
                        required
                        value={libraryLanguage}
                        onChange={handleLibraryLanguageChange}>
                        <option value='en-US'>English</option>
                      </Select>
                    </FormControl>
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
                <TabPanel
                  minHeight={'full'}
                  display={'flex'}
                  flexDirection={'column'}>
                  <FormControl isRequired>
                    <FormLabel>Scanner</FormLabel>
                    <Select
                      required
                      value={libraryScanner}
                      onChange={handleLibraryScannerChange}>
                      {scannersAndAgents?.scanners?.map((scanner) => (
                        <option
                          key={scanner.identifier}
                          value={scanner.identifier}>
                          {scanner.name}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Agent</FormLabel>
                    <Select
                      required
                      value={libraryAgent}
                      onChange={handleLibraryAgentChange}>
                      {scannersAndAgents?.agents?.map((agent) => (
                        <option key={agent.identifier} value={agent.identifier}>
                          {agent.name}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
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
