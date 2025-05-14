import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import authReducer from './authSlice';
import storage from './storage';

import { SppdApiSlice } from '@/services/sppd/base';
import { RecomendationApiSlice } from '@/services/recomendation/base';

import { BudgetApiSlice } from '@/services/budget/base';
import { GuestBookApiSlice } from '@/services/guest-book/base';
import { DivisionApiSlice } from '@/services/division/base';
import { InstitutionApiSlice } from '@/services/Institution/base';
import { PartnerApiSlice } from '@/services/partner/base';
import { RoleApiSlice } from '@/services/role/base';
import { StudentTransferApiSlice } from '@/services/student-transfer/base';
import { NewsApiSlice } from '@/services/news/base';
import { TransportationApiSlice } from '@/services/transportatition/base';
import { StaffApiSlice } from '@/services/staff/base';
import { PermissionApiSlice } from '@/services/permission/base';
import { CertificateApiSlice } from '@/services/cerificates/base';


const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ["auth", "services"]
};

const rootReducer = combineReducers({
  auth: authReducer,
  [SppdApiSlice.reducerPath]: SppdApiSlice.reducer,
  [RecomendationApiSlice.reducerPath]: RecomendationApiSlice.reducer,
  [BudgetApiSlice.reducerPath]: BudgetApiSlice.reducer,
  [GuestBookApiSlice.reducerPath]: GuestBookApiSlice.reducer,
  [DivisionApiSlice.reducerPath]: DivisionApiSlice.reducer,
  [InstitutionApiSlice.reducerPath]: InstitutionApiSlice.reducer,
  [PartnerApiSlice.reducerPath]: PartnerApiSlice.reducer,
  [RoleApiSlice.reducerPath]: RoleApiSlice.reducer,
  [StudentTransferApiSlice.reducerPath]: StudentTransferApiSlice.reducer,
  [NewsApiSlice.reducerPath]: NewsApiSlice.reducer,
  [TransportationApiSlice.reducerPath]: TransportationApiSlice.reducer,
  [StaffApiSlice.reducerPath]: StaffApiSlice.reducer,
  [PermissionApiSlice.reducerPath]: PermissionApiSlice.reducer,
  [CertificateApiSlice.reducerPath]: CertificateApiSlice.reducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      SppdApiSlice.middleware,
      RecomendationApiSlice.middleware,
      BudgetApiSlice.middleware,
      GuestBookApiSlice.middleware,
      DivisionApiSlice.middleware,
      InstitutionApiSlice.middleware,
      PartnerApiSlice.middleware,
      RoleApiSlice.middleware,
      StudentTransferApiSlice.middleware,
      NewsApiSlice.middleware,
      TransportationApiSlice.middleware,
      StaffApiSlice.middleware,
      PermissionApiSlice.middleware,
      CertificateApiSlice.middleware,
    ),
});

export const persistor = persistStore(store);

export interface storeType {
  auth: {
    user: {
      role: string[];
      [key: string]: any; // Adjust based on your user structure
    };
    token: string | null;
  };
  persistedApi: any; // Adjust based on your persistedApi structure
  // Other properties of the store
}