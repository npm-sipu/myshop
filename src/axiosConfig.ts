// import axios from 'axios';
// import { logout } from './store/slices/authSlice';
// import { useDispatch } from "react-redux";
// const dispatch = useDispatch();

// axios.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// axios.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response.status === 401) {
//       localStorage.removeItem('token');
//       dispatch(logout());
//     }
//     return Promise.reject(error);
//   }
// );