import { combineReducers, configureStore } from '@reduxjs/toolkit'  //step 1 make store 
import  userReducer  from '../user/userSlice';// Import user reducer (authentication-related state)
import {persistReducer,persistStore} from "redux-persist";// For saving Redux state in localStorage
import storage from "redux-persist/lib/storage";// Use localStorage as default storage


const rootReducer = combineReducers({user: userReducer});// Step 2: Combine all reducers (we have only one now: user)

const persistConfig = {// Step 3: Configuration for Redux Persis
  key: 'root',
  storage,
  version: 1,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)// Step 4: Create a persisted version of the root reducer

export const store = configureStore({ //Creates the global Redux store.
  reducer : persistedReducer,  // Use the persisted reducer here
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false, //Allows non-serializable values like cookies if used in actions.
  }),
})

export const persistor = persistStore(store)
