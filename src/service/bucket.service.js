// bucketService.js
import axiosInstance from '../axiosConfig';

const bucketService = {
  getAll: async () => {
    try {
      const response = await axiosInstance.get('/bucket');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const response = await axiosInstance.get(`/bucket/get-by-id/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getByType: async (type) => {
    try {
      const response = await axiosInstance.get(`/bucket/get-by-type/${type}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getSummary: async () => {
    try {
      const response = await axiosInstance.get(`/bucket/summary`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  create: async (dataForm) => {
    try {
      const response = await axiosInstance.post('/bucket/create', dataForm);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default bucketService;
