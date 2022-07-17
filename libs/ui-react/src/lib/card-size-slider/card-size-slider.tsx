import {
  Box,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from '@chakra-ui/react';

interface ItemCardOptions {
  defaultValue: number;
  onChange: (value: number) => void;
}

function CardSizeSlider({ defaultValue, onChange }: ItemCardOptions) {
  return (
    <Box display='inline-block' minW='72px' ml={2}>
      <Slider
        colorScheme='gray'
        aria-label='Card size'
        min={100}
        defaultValue={defaultValue}
        max={240}
        onChange={onChange}>
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
    </Box>
  );
}

export default CardSizeSlider;
