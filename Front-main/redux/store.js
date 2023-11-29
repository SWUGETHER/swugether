import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import userReducer from "./reducers/userReducer";
import settingReducer from "./reducers/settingReducer";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};
const rootReducer = combineReducers({ userReducer, settingReducer });
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export const persistor = persistStore(store);
export const AppDispatch = store.dispatch;
