import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './userSlice.ts'; 
import portfolioReducer from './portfolioSlice.ts'; 

const rootReducer = combineReducers({
    user: userReducer,
    portfolio: portfolioReducer,
});

const store = configureStore({
    reducer: rootReducer,
});


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
export default store;