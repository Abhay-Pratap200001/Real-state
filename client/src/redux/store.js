import { combineReducers, configureStore } from '@reduxjs/toolkit'// Allows combining multiple reducers into one root reducer.
import  userReducer  from '../user/userSlice';// Import user reducer (authentication-related state) by name userReducer
import {persistReducer,persistStore} from "redux-persist";//used to save Redux state to localStorage and restore it after page reload
import storage from "redux-persist/lib/storage";// Use localStorage as default storage


const rootReducer = combineReducers({user: userReducer});// Step 1: combine all reducers into a single rootReducer

const persistConfig = {// Step 2: Configuration for Redux Persis
  key: 'root', //key name under which all Redux state will be stored in
  storage, //Tells redux-persist to use localStorage
  version: 1,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)// Step 3: Make root reducer into persist to save data in localstorage

export const store = configureStore({ //Creates the global Redux store.

  reducer : persistedReducer,  // Use the persisted reducer here

  middleware: (getDefaultMiddleware) => getDefaultMiddleware({

  serializableCheck: false, //Allows non-serializable values like cookies, function etc if used in actions.
  
  }),
})

export const persistor = persistStore(store)// exporting redux store with loacl storage
