// bucketService.js
import axiosInstance from '../axiosConfig';

const userService = {

  auth: async (dataForm) => {
    try {
      const response = await axiosInstance.post('/user/auth', dataForm);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default userService;
