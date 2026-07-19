import { useMutation } from '@tanstack/react-query';
import apiClient from '../api/client';

export const useGoogleAuth = () => {
  return useMutation({
    mutationFn: async (googleToken) => {
      // Send the Google token to your backend for verification
      const response = await apiClient.post('/auth/google', {
        token: googleToken,
      });
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
    },
  });
};