import { commaizeNumber } from 'common/utils';
import type { SavingsProduct } from 'entities/products/types';
import { Fragment } from 'react';
import { Assets, colors, ListHeader, ListRow, Spacing } from 'tosslib';

interface RecommendProductProps {
  products: SavingsProduct[];
  selectedProduct: SavingsProduct | null;
}

const RECOMMEND_COUNT = 2;

const RecommendProduct = ({ products, selectedProduct }: RecommendProductProps) => {
  const recommendedProducts = [...products].sort((a, b) => b.annualRate - a.annualRate).slice(0, RECOMMEND_COUNT);

  return (
    <Fragment>
      <ListHeader title={<ListHeader.TitleParagraph fontWeight="bold">추천 상품 목록</ListHeader.TitleParagraph>} />
      <Spacing size={12} />

      {recommendedProducts.map(product => (
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
        />
      ))}
    </Fragment>
  );
};

export default RecommendProduct;
