import * as request from '../utils/productRequests';

export const productCreate = async (formData) => {
    try {
        const response = await request.post(`sign-up`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        alert(error.message);
    }
};

export const productGetAll = async (access_token) => {
    try {
        const response = await request.get('get-all');
        return response.data;
    } catch (error) {
        alert(error.message);
    }
};

export const productGetDetails = async (id, access_token) => {
    try {
        const response = await request.get(`details/${id}`, {
            headers: {
                token: `Bearer ${access_token}`,
            },
        });
        return response.data;
    } catch (error) {
        alert(error.message);
    }
};

export const productUpdate = async (id, formData) => {
    try {
        const response = await request.post(`update/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        alert(error.message);
    }
};
