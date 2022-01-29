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
  const [columnCount, setColumnCount] = useState(2);

  function onResize({ width }: { width: number }) {
    // Some weird maths to get similar alignment to the ItemGrid
    setColumnCount(Math.floor((width - 16 * 2) / (160 + 13)));
  }

  function onInit(swiper: SwiperClass) {
    swiper.emit('resize');
  }

  return (
    <Swiper
      slidesPerView={columnCount}
      slidesPerGroup={columnCount}
      onResize={onResize}
      onInit={onInit}
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
