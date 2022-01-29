import { Box } from '@chakra-ui/react';
import map from 'lodash-es/map';
// eslint-disable-next-line import/no-unresolved
import { Swiper, SwiperSlide } from 'swiper/react';
import ItemCard, { Item } from './ItemCard';
import { Swiper as SwiperClass } from 'swiper';
import { useState } from 'react';

interface ItemCarouselProps {
  items?: (Item | null)[] | null;
}

function ItemCarousel({ items }: ItemCarouselProps) {
  const [slidesPerView, setSlidesPerView] = useState(2);
  const [slidesPerGroup, setSlidesPerGroup] = useState(2);

  function onResize({ width }: { width: number }) {
    // Some weird maths to get similar alignment to the ItemGrid
    setSlidesPerView((width - 16 * 2) / (160 + 13.5));
    setSlidesPerGroup(Math.floor((width - 16 * 2) / (160 + 13)));
  }

  function onInit(swiper: SwiperClass) {
    swiper.emit('resize');
  }

  return (
    <Swiper
      slidesPerView={slidesPerView}
      slidesPerGroup={slidesPerGroup}
      onResize={onResize}
      onInit={onInit}
      centerInsufficientSlides
      style={{ overflow: 'visible' }}>
      {map(items, (item) => (
        <SwiperSlide key={item?.id}>
          <Box w='160px'>
            <ItemCard item={item} />
          </Box>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default ItemCarousel;
