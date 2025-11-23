import { changeCommaizedNumber, checkNumber, commaizeNumber } from 'common/utils';
import useGetSavingProducts from 'entities/products/queries/useGetSavingProducts';
import type { SavingsProduct } from 'entities/products/types';
import ProductList from 'features/product/ui/ProductList';
import CalculateResult from 'module/product/ui/CalculateResult';
import { Suspense, useState } from 'react';
import { Border, NavigationBar, SelectBottomSheet, Spacing, Tab, Text, TextField } from 'tosslib';

export function SavingsCalculatorPage() {
  const [tab, setTab] = useState<string>('products');

  const [targetAmount, setTargetAmount] = useState<number>(0);
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const [selectedTerm, setSelectedTerm] = useState<number>(12);
  const [selectedProduct, setSelectedProduct] = useState<SavingsProduct | null>(null);

  const { data: savingsProducts } = useGetSavingProducts();

  const checkMonthlyPaymentRange = (product: SavingsProduct) => {
    return product.minMonthlyAmount <= monthlyPayment && product.maxMonthlyAmount >= monthlyPayment;
  };

  const checkAvailableTerms = (product: SavingsProduct) => {
    return product.availableTerms === selectedTerm;
  };

  const filteredProducts = savingsProducts?.filter(
    product => checkMonthlyPaymentRange(product) && checkAvailableTerms(product)
  );

  const changeTargetAmount = (value: number) => {
    if (checkNumber(value)) {
      setTargetAmount(value);
    }
  };

  const changeMonthlyPayment = (value: number) => {
    if (checkNumber(value)) {
      setMonthlyPayment(value);
    }
  };

  const changeSelectedTerm = (value: number) => {
    if (checkNumber(value)) {
      setSelectedTerm(value);
    }
  };

  const changeTab = (value: string) => {
    setTab(value);
  };

  const selectProduct = (product: SavingsProduct) => {
    setSelectedProduct(product);
  };

  return (
    <>
      <NavigationBar title="적금 계산기" />

      <Spacing size={16} />

      <TextField
        label="목표 금액"
        placeholder="목표 금액을 입력하세요"
        suffix="원"
        value={commaizeNumber(targetAmount)}
        onChange={e => changeTargetAmount(changeCommaizedNumber(e.target.value))}
      />
      <Spacing size={16} />
      <TextField
        label="월 납입액"
        placeholder="희망 월 납입액을 입력하세요"
        suffix="원"
        value={commaizeNumber(monthlyPayment)}
        onChange={e => changeMonthlyPayment(changeCommaizedNumber(e.target.value))}
      />
      <Spacing size={16} />
      <SelectBottomSheet
        label="저축 기간"
        title="저축 기간을 선택해주세요"
        value={selectedTerm}
        onChange={changeSelectedTerm}
      >
        <SelectBottomSheet.Option value={6}>6개월</SelectBottomSheet.Option>
        <SelectBottomSheet.Option value={12}>12개월</SelectBottomSheet.Option>
        <SelectBottomSheet.Option value={24}>24개월</SelectBottomSheet.Option>
      </SelectBottomSheet>

      <Spacing size={24} />
      <Border height={16} />
      <Spacing size={8} />

      <Tab onChange={changeTab}>
        <Tab.Item value="products" selected={tab === 'products'}>
          적금 상품
        </Tab.Item>
        <Tab.Item value="results" selected={tab === 'results'}>
          계산 결과
        </Tab.Item>
      </Tab>

      {tab === 'products' && (
        <Suspense fallback={<Text>적금 상품을 불러오는 중입니다...</Text>}>
          <ProductList products={filteredProducts} selectedProduct={selectedProduct} onSelectProduct={selectProduct} />
        </Suspense>
      )}
      {tab === 'results' && (
        <CalculateResult
          products={filteredProducts}
          targetAmount={targetAmount}
          monthlyPayment={monthlyPayment}
          selectedTerm={selectedTerm}
          selectedProduct={selectedProduct}
        />
      )}
    </>
  );
}
