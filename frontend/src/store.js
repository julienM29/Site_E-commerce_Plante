import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Utiliser localStorage
import { combineReducers } from 'redux';
import myReducer from './mySlice'; // Ton slice où tu gères le panier, par exemple

// Configuration de redux-persist
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['myState'], // Choisis les reducers à persister
};

// Combine reducers si tu en as plusieurs
const rootReducer = combineReducers({
  myState: myReducer,
  // Ajoute d'autres reducers ici si nécessaire
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
