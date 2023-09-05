import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const request = await axios.get(baseUrl);
  return request.data;
};

const create = async (data) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const request = await axios.post(baseUrl, data, config);
  return request.data;
};

const update = async ({ blogId, data }) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };

  const request = await axios.put(`${baseUrl}/${blogId}`, data, config);
  return request.data;
};

const comment = async ({ blogId, comment }) => {
  const request = await axios.post(`${baseUrl}/${blogId}/comments`, {
    comment: comment,
  });

  return request.data;
};

const remove = async (blogId) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };

  const request = await axios.delete(`${baseUrl}/${blogId}`, config);
  return request.data;
};

export default { getAll, create, setToken, update, remove, comment };
