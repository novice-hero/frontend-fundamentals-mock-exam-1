import { useEffect, useState } from 'react';
import { http, type HttpError } from 'tosslib';
import { SavingsProduct } from '../types';

const useGetSavingProducts = () => {
  const [savingsProducts, setSavingsProducts] = useState<SavingsProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<HttpError | undefined>(undefined);

  const getSavingsProducts = async () => {
    setIsLoading(true);
    try {
      const response = await http.get<SavingsProduct[]>('/api/savings-products');
      setSavingsProducts(response);
    } catch (error) {
      setError(error as HttpError);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getSavingsProducts();
  }, []);

  return { savingsProducts, isLoading, error };
};

export default useGetSavingProducts;
