import { commaizeNumber } from 'common/utils';
import { Fragment } from 'react';
import { colors, ListRow } from 'tosslib';
import useGetCalculateProduct from '../hooks/useGetCalculateProduct';
import type { SavingsProduct } from 'entities/products/types';

interface ProductCalculateProps {
  targetAmount: number;
  monthlyPayment: number;
  selectedTerm: number;
  selectedProduct: SavingsProduct | null;
}

const ProductCalculate = ({ targetAmount, monthlyPayment, selectedTerm, selectedProduct }: ProductCalculateProps) => {
  const { expectedProfit, difference, recommendedMonthlyPayment } = useGetCalculateProduct({
    targetAmount,
    monthlyPayment,
    selectedTerm,
    selectedProduct,
  });

  return (
    <Fragment>
      <ListRow
        contents={
          <ListRow.Texts
            type="2RowTypeA"
            top="예상 수익 금액"
            topProps={{ color: colors.grey600 }}
            bottom={`${commaizeNumber(expectedProfit)}원`}
            bottomProps={{ fontWeight: 'bold', color: colors.blue600 }}
          />
        }
      />
      <ListRow
        contents={
          <ListRow.Texts
            type="2RowTypeA"
            top="목표 금액과의 차이"
            topProps={{ color: colors.grey600 }}
            bottom={`${commaizeNumber(difference)}원`}
            bottomProps={{ fontWeight: 'bold', color: colors.blue600 }}
          />
        }
      />
      <ListRow
        contents={
          <ListRow.Texts
            type="2RowTypeA"
            top="추천 월 납입 금액"
            topProps={{ color: colors.grey600 }}
            bottom={`${commaizeNumber(recommendedMonthlyPayment)}원`}
            bottomProps={{ fontWeight: 'bold', color: colors.blue600 }}
          />
        }
      />
    </Fragment>
  );
};

export default ProductCalculate;
