import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  notes: [],
};

export const NotesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    createNote(state, action) {
      state.notes = [
        { ...action.payload, id: Math.ceil(Math.random() * 1000) },
        ...state.notes,
      ];
    },
    updateNote(state, action) {
      state.notes = state.notes.map((note) => {
        if (note.id === action.payload.id) {
          return Object.assign({}, note, action.payload);
        }
        return note;
      });
    },
    deleteNote(state, action) {
      console.log('action.payload', action.payload);
      state.notes = state.notes.filter((note) => note.id !== action.payload);
    },
  },
});

export const { createNote, updateNote, deleteNote } = NotesSlice.actions;

export const selectNotes = (state) => state.notes.notes;

export default NotesSlice.reducer;
