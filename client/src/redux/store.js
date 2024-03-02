import {combineReducers, configureStore } from "@reduxjs/toolkit"
import storage from 'redux-persist/lib/storage'
import {persistReducer, persistStore} from "redux-persist"
import userReducer from "./slices/userSlice"
import pdfReducer from "./slices/pdfSlice"

/*
    store:
        * Create a root reducer to combine all reducers 
        * conifgure persist configuratoins and create a persisted reducer
        * from persisted reducer create a store and persist it
        * balcklist 'pdf' reducer to persistance
*/
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