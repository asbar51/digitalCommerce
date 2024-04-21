import { configureStore } from "@reduxjs/toolkit";
import { postApi } from "./services/postApi";
import { profileApi } from "./services/profileApi";

export const store = configureStore({
    reducer: {
        [postApi.reducerPath]: postApi.reducer,
        [profileApi.reducerPath]: profileApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(postApi.middleware, profileApi.middleware)
})