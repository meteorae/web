import { useAppSelector } from '@/app/hooks';
import ItemCard from '@/components/ItemCard';
import { GetLatestHubs_latest_items } from '@/graphql/__generated__/GetLatestHubs';
import { Box } from '@chakra-ui/react';
import map from 'lodash-es/map';
import { RefObject, useRef, useState } from 'react';
import { Navigation, Swiper as SwiperClass, Virtual } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// eslint-disable-next-line import/no-unresolved
interface ItemCarouselProps {
  items?: (GetLatestHubs_latest_items | null)[] | null;
  prevBtn: RefObject<HTMLButtonElement>;
  nextBtn: RefObject<HTMLButtonElement>;
  onBeforeInit: (swiper: SwiperClass) => void;
}

function ItemCarousel({
  items,
  prevBtn,
  nextBtn,
  onBeforeInit,
}: ItemCarouselProps) {
  const [slidesPerView, setSlidesPerView] = useState(2);
  const [slidesPerGroup, setSlidesPerGroup] = useState(2);
  const cardWidth = useAppSelector((state) => state.settings.cardSize);
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
        <SwiperSlide key={item?.id} virtualIndex={index}>
          <Box w={cardWidth}>
            <ItemCard item={item} />
          </Box>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default ItemCarousel;
