import axios from 'axios';

const API_BASE_URL = 'http://192.168.1.64:5000'; // Change this to your backend URL

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const userAPI = {
  login: (email: string, password: string) => api.post('/api/loggedin', { email, password }),
  signup: (userData: any) => api.post('/api/register', userData),
  submitComplaint: (complaintData: any) => api.post('/api/complaint', complaintData),
  getNearbyPolice: (coordinates: [number, number]) =>
    api.get('/api/nearPolicePost', {
      params: { coordinates },
    }),
};

export const policeAPI = {
  login: (loginData: any) => api.post('/police/login', loginData),
  signup: (signupData: any) => api.post('/police/signup', signupData),
  logout: (userId: string, password: string) => api.post('/police/logout', { user_id: userId, password }),
};

export default api;
