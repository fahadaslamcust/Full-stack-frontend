import { useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../api/client';

export const useLogin = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (credentials) => {
      const response = await apiClient.post('/auth/login', credentials);
      return response.data;
    },
    onSuccess: (responseBody) => {
      // The backend returns { success: true, data: { token: '...', user: {...} } }
      const token = responseBody?.data?.token;
      if (token) {
        localStorage.setItem('token', token);
        // Optionally save user info if needed
        if (responseBody?.data?.user) {
          localStorage.setItem('user', JSON.stringify(responseBody.data.user));
        }
      }
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
    },
  });
};

export const useRegister = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (userData) => {
      const response = await apiClient.post('/auth/register', userData);
      return response.data;
    },
    onSuccess: (responseBody) => {
      const token = responseBody?.data?.token;
      if (token) {
        localStorage.setItem('token', token);
        if (responseBody?.data?.user) {
          localStorage.setItem('user', JSON.stringify(responseBody.data.user));
        }
      }
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  
  return () => {
    localStorage.removeItem('token');
    queryClient.clear(); // Clear all queries from cache
  };
};
