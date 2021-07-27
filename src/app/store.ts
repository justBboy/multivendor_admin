import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import PageReducer from "../features/pageTransitions";
import VendorsReducer from "../features/vendors/VendorSlice";
import AdminsReducer from "../features/admins/AdminsSlice";
import AuthReducer from "../features/auth/AuthSlice";
import CategoryReducer from "../features/categories/CategorySlice";

export const store = configureStore({
  reducer: {
    page: PageReducer,
    vendors: VendorsReducer,
    admins: AdminsReducer,
    auth: AuthReducer,
    categories: CategoryReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
