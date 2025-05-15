// src/redux/bottomSheetSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false, // L'état d'ouverture du BottomSheet
};

const bottomSheetSlice = createSlice({
  name: 'bottomSheet',
  initialState,
  reducers: {
    openBottomSheet: (state) => {
      state.isOpen = true;
    },
    closeBottomSheet: (state) => {
      state.isOpen = false;
    },
    toggleBottomSheet: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { openBottomSheet, closeBottomSheet, toggleBottomSheet } = bottomSheetSlice.actions;

export default bottomSheetSlice.reducer;
