import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../api/client';

export const usePosts = () => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const response = await apiClient.get('/posts/');
      return response.data.data;
    },
    enabled: !!localStorage.getItem('token'),
    retry: false,
  });
};

export const usePost = (id) => {
  return useQuery({
    queryKey: ['posts', id],
    queryFn: async () => {
      const response = await apiClient.get(`/posts/${id}`);
      return response.data.data;
    },
    enabled: !!id && !!localStorage.getItem('token'),
    retry: false,
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (postData) => {
      const response = await apiClient.post('/posts/', postData);
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};

export const useLikePost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (postId) => {
      const response = await apiClient.post(`/posts/${postId}/like`);
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};

export const useCommentPost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ postId, text }) => {
      const response = await apiClient.post(`/posts/${postId}/comment`, { text });
      return response.data.data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ postId, content }) => {
      const response = await apiClient.put(`/posts/${postId}`, { content });
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (postId) => {
      const response = await apiClient.delete(`/posts/${postId}`);
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};
