// transactionService.js
import axiosInstance from '../axiosConfig';

const transactionService = {
  getAll: async () => {
    try {
      const response = await axiosInstance.get('/transaction');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const response = await axiosInstance.get(`/transaction/get-by-id/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getByBucketId: async (id) => {
    try {
      const response = await axiosInstance.get(`/transaction/get-by-bucket-id/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  create: async (dataForm) => {
    try {
      const response = await axiosInstance.post('/transaction/create', dataForm);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteById: async (id) => {
    try {
      const response = await axiosInstance.delete(`/transaction/delete-by-id/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default transactionService;
