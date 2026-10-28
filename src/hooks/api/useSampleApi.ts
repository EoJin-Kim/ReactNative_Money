import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/src/api/queryKeys';
import { LoginRequest, sampleApi } from '@/src/services/sample/sampleApi';

/**
 * 인증 관련 React Query 훅
 */
export function useGetSample() {
  return useQuery({
    queryKey: queryKeys.sampleGet,
    queryFn: async () => {
      const response = await sampleApi.sampleGet();
      return response.data;
    },
  });
}

export function usePostSample() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LoginRequest) => sampleApi.samplePost(data),
    onSuccess: (response) => {
        console.log(response);
    },
  });
}



