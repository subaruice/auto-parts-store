import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import ordersReducer from "../features/ordersSlice";
import adminReducer from "../features/adminSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        orders: ordersReducer,
        admin: adminReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
