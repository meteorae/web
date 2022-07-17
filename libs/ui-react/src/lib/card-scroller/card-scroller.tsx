import { Box } from '@chakra-ui/react';
import map from 'lodash-es/map';
import { RefObject, useRef, useState } from 'react';
import { Navigation, Swiper as SwiperClass, Virtual } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
// eslint-disable-next-line import/no-unresolved
import 'swiper/scss';

import { MediaCard } from '@meteorae/ui-react';

// eslint-disable-next-line import/no-unresolved
interface ItemCarouselProps {
  items?: any;
  prevBtn: RefObject<HTMLButtonElement>;
  nextBtn: RefObject<HTMLButtonElement>;
  cardWidth: number;
  onBeforeInit: (swiper: SwiperClass) => void;
}

function CardScroller({
  items,
  prevBtn,
  nextBtn,
  cardWidth,
  onBeforeInit,
}: ItemCarouselProps) {
  const [slidesPerView, setSlidesPerView] = useState(2);
  const [slidesPerGroup, setSlidesPerGroup] = useState(2);
  const swiper = useRef<SwiperClass | null>(null);

  function onResize({ width }: { width: number }) {
    // Some weird maths to get similar alignment to the ItemGrid
    setSlidesPerView((width - 16 * 2) / (cardWidth + 13.5));
    setSlidesPerGroup(Math.floor((width - 16 * 2) / (cardWidth + 13)));

    swiper.current?.update();
  }

  function onInit(swiperInstance: SwiperClass) {
    swiper.current = swiperInstance;
    swiperInstance.emit('resize');
  }

  return (
    <Swiper
      modules={[Virtual, Navigation]}
      slidesPerView={slidesPerView}
      slidesPerGroup={slidesPerGroup}
      onResize={onResize}
      onInit={onInit}
      height={cardWidth + 52}
      style={{ overflow: 'visible' }}
      allowTouchMove={false}
      virtual={{
        enabled: true,
        addSlidesAfter: 2,
        addSlidesBefore: 2,
      }}
      navigation={{
        prevEl: prevBtn.current,
        nextEl: nextBtn.current,
      }}
      onBeforeInit={onBeforeInit}>
      {map(items, (item, index) => (
        <SwiperSlide key={item?.id} virtualIndex={parseInt(index, 10)}>
          <Box w={cardWidth}>
            <MediaCard width={cardWidth} item={item} />
          </Box>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default CardScroller;
