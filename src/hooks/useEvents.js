import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../api/client';

export const useEvents = () => {
  return useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const response = await apiClient.get('/events/');
      return response.data.data;
    },
    enabled: !!localStorage.getItem('token'),
    retry: false,
  });
};

export const useEvent = (id) => {
  return useQuery({
    queryKey: ['events', id],
    queryFn: async () => {
      const response = await apiClient.get(`/events/${id}`);
      return response.data.data;
    },
    enabled: !!id && !!localStorage.getItem('token'),
    retry: false,
  });
};

export const useCreateEvent = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (eventData) => {
      const response = await apiClient.post('/events/', eventData);
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
  });
};

export const useRsvpEvent = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (eventId) => {
      const response = await apiClient.post(`/events/${eventId}/rsvp`);
      return response.data.data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      queryClient.invalidateQueries({ queryKey: ['events', variables] });
    },
  });
};
