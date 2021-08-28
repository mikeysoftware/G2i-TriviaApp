import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Config
import { ENVIRONMENT } from "utils/contants/EnviromentVariables";

// Slices
import QuizSlice from "./Slices/Quiz.Slice";

// Persisting Store
const persistConfig = {
    key: "root",
    storage
}

const ROOT_REDUCER = combineReducers({
    quiz: QuizSlice.reducer
})

const PERSIST_REDUCER = persistReducer(persistConfig, ROOT_REDUCER);

// Configure Store
export const store = configureStore({
    reducer: PERSIST_REDUCER,
    // Disable Serializable Check
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
    // Only enable Redux Tools in development environments
    devTools: ENVIRONMENT === "development"
});

export const persistor = persistStore(store);
export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof ROOT_REDUCER>;
export type StoreDispatch = typeof store.dispatch;