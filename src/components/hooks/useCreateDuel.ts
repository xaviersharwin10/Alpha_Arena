import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

interface CreateDuelParams {
  tokenAddress: string;
  amount: string;
  duration: number;
}

export const useCreateDuel = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (params: CreateDuelParams) => {
      const { data } = await axios.post(`${API_BASE_URL}/duels`, {
        tokenAddress: params.tokenAddress,
        wagerAmount: params.amount,
        duration: params.duration,
      });
      console.log('Duel created:', data);
      return data;
    },
    onSuccess: (data) => {
      // Invalidate duels query to refresh the list
      queryClient.invalidateQueries({ queryKey: ['duels'] });
      
      // Navigate to the created duel
      if (data.data?.duelId) {
        navigate(`/duel/${data.data.duelId}`);
      }
    },
    onError: (error) => {
      console.error('Failed to create duel:', error);
      // You might want to show a toast notification here
    },
  });
};