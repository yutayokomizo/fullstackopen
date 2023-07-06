import { createSlice } from '@reduxjs/toolkit';
import anecdotesService from '../services/anecdotes';

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

export const { setAnecdotes, create, vote } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createNew = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdotesService.createNew(content);
    dispatch(create(newAnecdote));
  };
};

export const registerVote = (id) => {
  return async (dispatch) => {
    await anecdotesService.voteRequest(id);
    dispatch(vote(id));
  };
};
