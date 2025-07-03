import { configureStore } from '@reduxjs/toolkit'  //step 1 make store 
import  userReducer  from '../user/userSlice'

export const store = configureStore({ //Creates the global Redux store.
  reducer: {user: userReducer}, // Manages authentication-related state (loading, user info, error).
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false, //Allows non-serializable values like cookies if used in actions.
  }),
})