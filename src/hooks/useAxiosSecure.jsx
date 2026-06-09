import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from './useAuth';

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

const useAxiosSecure = () => {
  const { logOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ Request Interceptor — no token needed, cookies sent automatically
    const requestInterceptor = axiosSecure.interceptors.request.use(
      (config) => {
        console.log('request config', config);
        return config;
      },
      (error) => {
        console.log('request error', error);
        return Promise.reject(error);
      }
    );

    // ✅ Response Interceptor — handle auth errors globally
    const responseInterceptor = axiosSecure.interceptors.response.use(
      (res) => {
        console.log('before checking response..', res);
        return res;
      },
      async (error) => {
        console.log('after checking response..', error?.response);
        if (error?.response?.status === 401 || error?.response?.status === 403) {
          await logOut();
          navigate('/', { replace: true });
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [logOut, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
