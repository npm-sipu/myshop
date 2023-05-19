import axios, {AxiosInstance, AxiosError} from 'axios';

const instance: AxiosInstance = axios.create({
  baseURL: 'http://localhost:5000/',
  withCredentials: true,
  headers: {
            "Content-Type": "application/json",
          },
});

// instance.interceptors.response.use(
//   (response) => response,
//   (error: AxiosError) => {
//     if (error.response?.status === 401) {
//       // Handle token expiration or unauthorized access here
//       // For example, you can dispatch a logout action
//       dispatch(logout());
//     }
//     return Promise.reject(error);
//   }
// );

export default instance;