import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Utiliser localStorage
import { combineReducers } from 'redux';
import myReducer from './mySlice'; // Ton slice où tu gères le panier
import bottomSheetReducer from './bottomSheet'; // Importer le bottomSheetSlice
import filterReducer from './filterSlice';
// Configuration de redux-persist
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['myState', 'bottomSheet', 'filters'],
};

// Combine reducers
const rootReducer = combineReducers({
  myState: myReducer,
  bottomSheet: bottomSheetReducer,
  filters: filterReducer,
});

// Applique redux-persist sur ton reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Création du store
const store = configureStore({
  reducer: persistedReducer,
  // Désactive l'avertissement sur les actions non sérialisables
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

const persistor = persistStore(store);

export { persistor }; // export nommé
export default store; // export par défaut
