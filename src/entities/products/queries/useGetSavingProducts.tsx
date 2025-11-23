import { useSuspenseQuery } from '@tanstack/react-query';
import { http, type HttpError } from 'tosslib';
import { SavingsProduct } from '../types';

const useGetSavingProducts = () => {
  return useSuspenseQuery<SavingsProduct[], HttpError>({
    queryKey: ['savingsProducts'],
    queryFn: () => http.get<SavingsProduct[]>('/api/savings-products'),
  });
};

export default useGetSavingProducts;
