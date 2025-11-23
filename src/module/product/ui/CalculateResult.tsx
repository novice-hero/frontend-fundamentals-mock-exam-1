import type { SavingsProduct } from 'entities/products/types';
import ProductCalculate from 'features/product/ui/ProductCalculate';
import RecommendProduct from 'features/product/ui/RecommendProduct';
import { Fragment } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Border, ListRow, Spacing } from 'tosslib';

interface CalculateResultProps {
  targetAmount: number;
  monthlyPayment: number;
  selectedTerm: number;
  selectedProduct: SavingsProduct | null;
  products: SavingsProduct[];
}

const CalculateResult = ({
  targetAmount,
  monthlyPayment,
  selectedTerm,
  selectedProduct,
  products,
}: CalculateResultProps) => {
  return (
    <Fragment>
      <Spacing size={8} />

      <ErrorBoundary
        FallbackComponent={() => <ListRow contents={<ListRow.Texts type="1RowTypeA" top="상품을 선택해주세요." />} />}
      >
        <ProductCalculate
          targetAmount={targetAmount}
          monthlyPayment={monthlyPayment}
          selectedTerm={selectedTerm}
          selectedProduct={selectedProduct}
        />
      </ErrorBoundary>

      <Spacing size={8} />
      <Border height={16} />
      <Spacing size={8} />

      <RecommendProduct products={products} selectedProduct={selectedProduct} />

      <Spacing size={40} />
    </Fragment>
  );
};

export default CalculateResult;
