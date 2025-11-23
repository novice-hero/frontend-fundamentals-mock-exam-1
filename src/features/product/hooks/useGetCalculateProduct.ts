import type { SavingsProduct } from 'entities/products/types';
import { useEffect, useState } from 'react';
import { roundToThousands } from 'common/utils';

interface UseGetCalculateProductProps {
  targetAmount: number;
  monthlyPayment: number;
  selectedTerm: number;
  selectedProduct: SavingsProduct | null;
}

const useGetCalculateProduct = ({
  targetAmount,
  monthlyPayment,
  selectedTerm,
  selectedProduct,
}: UseGetCalculateProductProps) => {
  if (!selectedProduct) {
    throw new Error('selectedProduct is required');
  }

  const [expectedProfit, setExpectedProfit] = useState<number>(0);
  const [difference, setDifference] = useState<number>(0);
  const [recommendedMonthlyPayment, setRecommendedMonthlyPayment] = useState<number>(0);

  const getExpectedProfit = (monthlyPayment: number, selectedTerm: number, annualRate: number) => {
    // 월 납입액 * 저축 기간 * (1 + 연이자율 * 0.5)
    return monthlyPayment * selectedTerm * (1 + annualRate * 0.5);
  };

  const getDifference = (targetAmount: number, expectedProfit: number) => {
    // 목표 금액 - 예상 수익 금액)
    return targetAmount - expectedProfit;
  };

  const getRecommendedMonthlyPayment = (targetAmount: number, selectedTerm: number, annualRate: number) => {
    // 목표 금액 ÷ (저축 기간 * (1 + 연이자율 * 0.5))
    const result = targetAmount / (selectedTerm * (1 + annualRate * 0.5));
    return roundToThousands(result);
  };

  useEffect(() => {
    setExpectedProfit(getExpectedProfit(monthlyPayment, selectedTerm, selectedProduct.annualRate));
    setDifference(getDifference(targetAmount, expectedProfit));
    setRecommendedMonthlyPayment(getRecommendedMonthlyPayment(targetAmount, selectedTerm, selectedProduct.annualRate));
  }, [targetAmount, monthlyPayment, selectedTerm, selectedProduct.annualRate, expectedProfit]);

  return { expectedProfit, difference, recommendedMonthlyPayment };
};

export default useGetCalculateProduct;
