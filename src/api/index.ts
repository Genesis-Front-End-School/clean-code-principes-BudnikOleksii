import axios from 'axios';
import { getItemFromLocalStorage, setItemToLocalStorage } from '../utils/localstorage-helpers';

export const BASE_URL = 'https://api.wisey.app';
export const API_URL = BASE_URL + '/api/v1';

export const ENDPOINTS = {
  coursesPreview: '/core/preview-courses',
  coursePreview: (courseId: string) => `/core/preview-courses/${courseId}`,
  authorize: '/auth/anonymous?platform=subscriptions',
};

const UNAUTHORIZED = 401;

const $api = axios.create({
  baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
  if (config.headers) {
    config.headers.Authorization = `Bearer ${getItemFromLocalStorage('token')}`;
  }

  return config;
});

$api.interceptors.response.use(
  (config) => {
    return config.data;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === UNAUTHORIZED) {
      try {
        const response = await axios.get(API_URL + ENDPOINTS.authorize);

        setItemToLocalStorage('token', response.data.token);

        return $api.request(originalRequest);
      } catch (error) {
        console.error(error);
        window.localStorage.clear();
      }
    } else {
      throw error.response.data;
    }
  }
);

export default $api;
