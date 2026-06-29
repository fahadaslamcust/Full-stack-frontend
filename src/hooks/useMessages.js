import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../api/client';

export const useInbox = () => {
  return useQuery({
    queryKey: ['messages', 'inbox'],
    queryFn: async () => {
      const response = await apiClient.get('/messages/inbox');
      return response.data.data;
    },
    enabled: !!localStorage.getItem('token'),
    retry: false,
  });
};

export const useChat = (targetUserId) => {
  return useQuery({
    queryKey: ['messages', targetUserId],
    queryFn: async () => {
      const response = await apiClient.get(`/messages/${targetUserId}`);
      return response.data.data;
    },
    enabled: !!targetUserId && !!localStorage.getItem('token'),
    retry: false,
    refetchInterval: 5000, // Poll for new messages every 5 seconds
  });
};

export const useSendMessage = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ receiverId, content }) => {
      const response = await apiClient.post(`/messages/send/${receiverId}`, { content });
      return response.data.data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['messages', variables.receiverId] });
      queryClient.invalidateQueries({ queryKey: ['messages', 'inbox'] });
    },
  });
};
