// src/filterSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  text: null,
  color: null,
  minPrice: null,
  maxPrice: null,
  exposition: null,
  arrosage: null,
  emplacement: null,
  floraison: null,
  recolte: null,
  persistant: false,
  type: null,
  promotion: false,
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    // Set a specific filter value
    setFilter: (state, action) => {
      const { name, value } = action.payload;
      state[name] = value; // Update the specific filter
    },
    // Reset all filters to their initial state
    resetFilters: () => initialState,

    // Set all filters at once
    setAllFilters: (state, action) => {
      // On s'assure que l'action contient un objet sérialisé
      return { ...state, ...action.payload }; // Merge the new filters with the current state
    },
  },
});

// Export actions
export const { setFilter, resetFilters, setAllFilters } = filterSlice.actions;

// Export reducer
export default filterSlice.reducer;
