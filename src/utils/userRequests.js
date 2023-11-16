import axios from 'axios';

const request = axios.create({
    baseURL: process.env.REACT_APP_API_URL + '/api/user/',
});

export const axiosJWT = axios.create({
    baseURL: process.env.REACT_APP_API_URL + '/api/user/',
});

export const get = async (path, options = {}) => {
    const response = await axiosJWT.get(path, options);
    return response.data;
};

export const post = async (path, options = {}) => {
    const response = await request.post(path, options);
    return response;
};

export const put = async (path, options = {}) => {
    const response = await request.put(path, options);
    return response.data;
};

export default request;
