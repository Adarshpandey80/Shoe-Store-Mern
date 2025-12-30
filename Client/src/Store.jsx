import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cartSlice'
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";


const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, cartReducer);

const store = configureStore({
  reducer: {
    cart: persistedReducer
  },
})

export default store
export const persistor = persistStore(store);
