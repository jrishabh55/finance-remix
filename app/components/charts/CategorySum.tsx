import { FC } from 'react';
import { CardProps } from '~/lib/Card';
import Chart from '~/lib/chart';
import { FetchExpenseSumByCategories } from '~/query/charts.server';

export type CategorySumProps = {
  data: Awaited<ReturnType<FetchExpenseSumByCategories>>;
  cardProps: CardProps;
};

const CategorySum: FC<CategorySumProps> = ({ data, cardProps }) => {
  return (
    <Chart
      title="Cashflow"
      type="pie"
      data={data}
      id="category-sum"
      cardProps={cardProps}
      series={[
        {
          sType: 'pie',
          dataKey: 'sum',
          labelList: true
        }
      ]}
    />
  );
};

export default CategorySum;
