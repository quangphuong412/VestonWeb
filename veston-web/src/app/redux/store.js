import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
//State
import logger from 'redux-logger';
import authSlice from '@/app//redux/slice/authSlice';
import stateSlice from '@/app//redux/slice/stateSlice';
import branchSlice from './slice/scense/branch';
import employeeSlice from './slice/scense/employee';
// import apisSlice from "@/app/redux/slice/apis";
// import storage from "redux-persist/lib/storage";
import { persistReducer } from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
import materialSlice from './slice/scense/material';
const expireReducer = require('redux-persist-expire');

const rootReducer = combineReducers({
  app: stateSlice,
  auth: authSlice,
  branch: branchSlice,
  employee: employeeSlice,
  material: materialSlice,
});

const createNoopStorage = () => {
  return {
    getItem(_key) {
      return Promise.resolve(null);
    },
    setItem(_key, value) {
      return Promise.resolve(value);
    },
    removeItem(_key) {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== 'undefined'
    ? createWebStorage('local')
    : createNoopStorage();

const persistConfig = {
  key: 'root',
  storage: storage,
  // There is an issue in the source code of redux-persist (default setTimeout does not cleaning)
  timeout: null,
  version: 1,
  transforms: [expireReducer(rootReducer, { expireSeconds: 10 })],
  // stateReconciler: hardSet,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware = (getDefaultMiddleware) =>
  getDefaultMiddleware({ thunk: false, serializableCheck: false }).concat(
    logger
  );

export default configureStore({
  reducer: persistedReducer,
  middleware: middleware,
});
