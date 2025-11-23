import { useQuery } from '@tanstack/react-query';
import { http, type HttpError } from 'tosslib';
import { SavingsProduct } from '../types';

interface UseGetSavingProductsProps {
  enabled: boolean;
}

const useGetSavingProducts = ({ enabled }: UseGetSavingProductsProps) => {
  return useQuery<SavingsProduct[], HttpError>({
    queryKey: ['savingsProducts'],
    queryFn: () => http.get<SavingsProduct[]>('/api/savings-products'),
    enabled,
  });
};

export default useGetSavingProducts;
