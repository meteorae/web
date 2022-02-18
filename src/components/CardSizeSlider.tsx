import {
  Box,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from '@chakra-ui/react';
import throttle from 'lodash/throttle';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { setCardSize } from '@/features/settings/settingsSlice';

function CardSizeSlider() {
  const dispatch = useAppDispatch();
  const cardSize = useAppSelector((state) => state.settings.cardSize);

  return (
    <Box display='inline-block' minW='72px' ml={2}>
      <Slider
        colorScheme='gray'
        aria-label='Card size'
        min={100}
        defaultValue={cardSize}
        max={240}
        onChange={throttle((value) => {
          dispatch(setCardSize({ cardSize: Math.round(value) }));
        }, 1000)}>
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
    </Box>
  );
}

export default CardSizeSlider;
