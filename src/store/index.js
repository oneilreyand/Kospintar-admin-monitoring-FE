import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducer/auth_reducer';
import monitoringReducer from './reducer/monitoringReducer';
import sidebarReducer from './reducer/sidebar_reducer';
import snackbarReducer from './reducer/snackbar_reducer';

const store = configureStore({
  reducer: {
    authReducers: authReducer,
    monitoring: monitoringReducer,
    sidebar: sidebarReducer,
    snackbar: snackbarReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: import.meta.env.MODE !== 'production',
});

export default store;
