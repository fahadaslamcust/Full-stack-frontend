import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../api/client';

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: async () => {
      const response = await apiClient.get('/users/me');
      return response.data.data;
    },
    enabled: !!localStorage.getItem('token'),
    retry: false,
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  
  return useMutation({  
    mutationFn: async (userData) => {
      const response = await apiClient.put('/users/me', userData);
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
    },
  });
};

export const useUpdateAvatar = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (formData) => {
      const response = await apiClient.put('/users/me/avatar', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
    },
  });
};

export const useSearchUsers = (searchParams) => {
  return useQuery({
    queryKey: ['users', 'search', searchParams],
    queryFn: async () => {
      const response = await apiClient.get('/users/search', { params: searchParams });
      return response.data.data;
    },
    // Always enabled so it fetches all users initially
    enabled: true,
  });
};

export const useNetwork = () => {
  return useQuery({
    queryKey: ['users', 'network'],
    queryFn: async () => {
      const response = await apiClient.get('/users/network/me');
      return response.data.data;
    },
    enabled: !!localStorage.getItem('token'),
    retry: false,
  });
};

export const useFollowUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (targetId) => {
      const response = await apiClient.post(`/users/${targetId}/follow`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users', 'network'] });
    },
  });
};

export const useUnfollowUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (targetId) => {
      const response = await apiClient.delete(`/users/${targetId}/unfollow`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users', 'network'] });
    },
  });
};
