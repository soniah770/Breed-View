import useSWR from 'swr';
import axios from 'axios';

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export const useFetchBreeds = (page: number = 1, limit: number = 12) => {
  const { data, error } = useSWR(`/api/breeds?page=${page}&limit=${limit}`, fetcher);

  return {
    data: data?.breeds || [],  
    total: data?.totalBreeds || 0,  
    error,
    isLoading: !error && !data,  
  };
};
