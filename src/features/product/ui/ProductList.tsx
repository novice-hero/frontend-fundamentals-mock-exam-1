import { commaizeNumber } from 'common/utils';
import useGetSavingProducts from 'entities/products/queries/useGetSavingProducts';
import type { SavingsProduct } from 'entities/products/types';
import { Fragment } from 'react';
import { Assets, colors, ListRow, Text } from 'tosslib';

interface ProductListProps {
  monthlyPayment: number;
  selectedTerm: number;
  selectedProduct: SavingsProduct | null;
  onSelectProduct: (product: SavingsProduct) => void;
}

const ProductList = ({ monthlyPayment, selectedTerm, selectedProduct, onSelectProduct }: ProductListProps) => {
  const { savingsProducts, isLoading, error } = useGetSavingProducts();

  const checkMonthlyPaymentRange = (product: SavingsProduct) => {
    return product.minMonthlyAmount <= monthlyPayment && product.maxMonthlyAmount >= monthlyPayment;
  };

  const checkAvailableTerms = (product: SavingsProduct) => {
    return product.availableTerms === selectedTerm;
  };

  const filteredProducts = savingsProducts.filter(
    product => checkMonthlyPaymentRange(product) && checkAvailableTerms(product)
  );

  if (filteredProducts.length === 0) {
    return <Text>적금 상품을 찾을 수 없어요. 월 납입액과 저축 기간을 다시 확인해주세요.</Text>;
  }

  if (error) {
    return <Text>정보를 불러오는 데 실패했어요. 잠시 후 다시 시도해주세요.</Text>;
  }

  return (
    <Fragment>
      {filteredProducts.map(product => (
        <ListRow
          key={product.id}
          contents={
            <ListRow.Texts
              type="3RowTypeA"
              top={product.name}
              topProps={{ fontSize: 16, fontWeight: 'bold', color: colors.grey900 }}
              middle={`연 이자율: ${product.annualRate}%`}
              middleProps={{ fontSize: 14, color: colors.blue600, fontWeight: 'medium' }}
              bottom={`${commaizeNumber(product.minMonthlyAmount)}원 ~ ${commaizeNumber(product.maxMonthlyAmount)}원 | ${product.availableTerms}개월`}
              bottomProps={{ fontSize: 13, color: colors.grey600 }}
            />
          }
          right={selectedProduct?.id === product.id ? <Assets.Icon name="icon-check-circle-green" /> : null}
          onClick={() => onSelectProduct(product)}
        />
      ))}
    </Fragment>
  );
};

export default ProductList;
