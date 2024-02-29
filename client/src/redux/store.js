import {combineReducers, configureStore } from "@reduxjs/toolkit"
import storage from 'redux-persist/lib/storage'
import {persistReducer, persistStore} from "redux-persist"
import userReducer from "./slices/userSlice"
import pdfReducer from "./slices/pdfSlice"

const rootReducer = combineReducers({
    user:userReducer,
    pdf:pdfReducer
})

const persistConfig = {
    key:"root",
    storage,
    version:1,
    blacklist: ['pdf']
}

const persistedReducer = persistReducer(persistConfig,rootReducer);

 const  store = configureStore({
    reducer:persistedReducer,
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware({
        serializableCheck:false,
        immutableCheck:false
    }),
});

const persistor = persistStore(store);

export {store , persistor}