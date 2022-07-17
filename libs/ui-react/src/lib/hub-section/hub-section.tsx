import { Box, Flex, Heading, IconButton } from '@chakra-ui/react';
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js';
import Icon from '@mdi/react';
import React, { useRef } from 'react';

import { CardScroller } from '@meteorae/ui-react';

export interface HubSectionProps {
  section: any;
  cardWidth: number;
  children?: React.ReactNode;
}

function HubSection({ section, cardWidth, children }: HubSectionProps) {
  const navigationPrevRef = useRef<HTMLButtonElement>(null);
  const navigationNextRef = useRef<HTMLButtonElement>(null);

  return (
    <Box boxSizing='border-box'>
      <Flex alignItems='center' justify='space-between' px={8} h='2rem' my={3}>
        <Box
          flexGrow={1}
          maxW='100%'
          minW='0'
          overflow='hidden'
          whiteSpace='nowrap'>
          <Heading key={section?.library.id} size='sm' lineHeight={1}>
            {children}
          </Heading>
        </Box>
        <Box flexShrink={0}>
          <IconButton
            ref={navigationPrevRef}
            variant='unstyled'
            aria-label='Previous page'
            _focus={{
              boxShadow: 'none',
            }}
            _disabled={{
              opacity: 0.25,
              cursor: 'default',
            }}
            icon={<Icon path={mdiChevronLeft} size={1.5} />}
          />
          <IconButton
            ref={navigationNextRef}
            variant='unstyled'
            aria-label='Next page'
            _focus={{
              boxShadow: 'none',
            }}
            _disabled={{
              opacity: 0.25,
              cursor: 'default',
            }}
            icon={<Icon path={mdiChevronRight} size={1.5} />}
          />
        </Box>
      </Flex>
      <Box boxSizing='border-box' overflow='hidden'>
        <Box px={8} overflow='hidden'>
          <CardScroller
            items={section?.items}
            cardWidth={cardWidth}
            prevBtn={navigationPrevRef}
            nextBtn={navigationNextRef}
            onBeforeInit={(swiper) => {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              //@ts-expect-error
              swiper.params.navigation.prevEl = navigationPrevRef.current;
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              //@ts-expect-error
              swiper.params.navigation.nextEl = navigationNextRef.current;
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default HubSection;
