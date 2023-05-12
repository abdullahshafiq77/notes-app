import { configureStore } from '@reduxjs/toolkit';

import notesReducer from './slices/notesSlice';
const reducer = {
  notes: notesReducer,
};

export const store = configureStore({
  reducer: reducer,
});
