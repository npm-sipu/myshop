import axios, {AxiosInstance} from 'axios';

const instance: AxiosInstance = axios.create({
  baseURL: 'http://localhost:5000/',
  withCredentials: true,
  headers: {
            "Content-Type": "application/json",
          },
});

export default instance;