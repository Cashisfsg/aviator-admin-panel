import { configureStore } from "@reduxjs/toolkit";

import { authReducer } from "./slices/authSlice";
import { adminReducer } from "./slices/adminSlice";
import { adminApi } from "./api";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        admin: adminReducer,
        [adminApi.reducerPath]: adminApi.reducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(adminApi.middleware)
});
