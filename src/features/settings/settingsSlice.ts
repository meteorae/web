import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

interface SettingsState {
  cardSize: number;
}

const initialState: SettingsState = {
  cardSize: 160,
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState: initialState,
  reducers: {
    setCardSize: (state, action: PayloadAction<{ cardSize: number }>) => {
      state.cardSize = action.payload.cardSize;
    },
  },
});

export const { setCardSize } = settingsSlice.actions;

export const selectCardSize = (state: RootState) => state.settings.cardSize;

export default settingsSlice.reducer;
