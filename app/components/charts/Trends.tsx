import numeral from 'numeral';
import { FC } from 'react';
import Chart from '~/components/charts';

export type TrendsData = { deposit: number; withdrawal: number; name: string }[];

const Trends: FC<{ data?: TrendsData; title?: string }> = ({ title, data = [] }) => {
  return (
    <Chart
      id="bar-chart"
      type="bar"
      title={title}
      axis={[
        { aType: 'x', dataKey: 'name' },
        {
          aType: 'y',
          tickFormatter: (value: number) => numeral(value).format('0.0a')
        }
      ]}
      series={[
        { type: 'bar', dataKey: 'deposit' },
        { type: 'bar', dataKey: 'withdrawal' }
      ]}
      data={data}
    />
  );
};

export default Trends;
