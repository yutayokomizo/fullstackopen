import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons';

const create = (newPerson) => {
  return axios.post(baseUrl, newPerson).then((response) => response.data);
};

const getAll = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

const deleteOne = (id) => {
  return axios.delete(`${baseUrl}/${id}`).then((response) => response.data);
};

const update = (id, updateObject) => {
  return axios
    .put(`${baseUrl}/${id}`, updateObject)
    .then((response) => response.data);
};

const operations = { create, getAll, deleteOne, update };

export default operations;
