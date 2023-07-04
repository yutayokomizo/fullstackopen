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

const update = async (blogId, data) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };

  const request = await axios.put(`${baseUrl}/${blogId}`, data, config);
  return request.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, setToken, update };
