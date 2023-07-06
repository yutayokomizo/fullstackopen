import { createSlice } from '@reduxjs/toolkit';

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    vote(state, action) {
      const id = action.payload;
      const objectToChange = state.find((obj) => obj.id === id);
      const updatedObject = {
        ...objectToChange,
        votes: objectToChange.votes + 1,
      };
      const newState = state.map((obj) =>
        obj.id === id ? updatedObject : obj,
      );
      return newState.sort((a, b) => b.votes - a.votes);
    },
    create(state, action) {
      const newObject = action.payload;
      return [...state, newObject];
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { vote, create, setAnecdotes } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
