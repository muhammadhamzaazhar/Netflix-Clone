import { configureStore } from '@reduxjs/toolkit';

import useReducer from './user/userSlice';

export default configureStore({
    reducer: {
        user: useReducer
    }
});