import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

export const getAnecdotes = () => {
  return axios.get(baseUrl).then((res) => res.data);
};

export const createNew = (content) => {
  const data = {
    content,
    votes: 0,
  };

  return axios.post(baseUrl, data).then((res) => res.data);
};

export const vote = (updatedAnecdote) => {
  return axios
    .put(`${baseUrl}/${updatedAnecdote.id}`, updatedAnecdote)
    .then((res) => res.data);
};
