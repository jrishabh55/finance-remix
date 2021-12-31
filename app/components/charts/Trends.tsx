import numeral from 'numeral';
import { FC } from 'react';
import Chart from '~/components/charts';

export type TrendsData = { deposit: number; withdrawal: number; name: string }[];

export type TrendsProps = {
  data?: TrendsData;
  title?: string;
  type?: 'bar' | 'line';
  small?: boolean;
  legend?: boolean;
};

const Trends: FC<TrendsProps> = ({
  title,
  type = 'bar',
  data = [],
  small = false,
  legend = true
}) => {
  return (
    <Chart
      id="bar-chart"
      type="bar"
      cardProps={{ small }}
      title={title}
      legend={{ show: legend }}
      axis={[
        { aType: 'x', dataKey: 'name' },
        {
          aType: 'y',
          tickFormatter: (value: number) => numeral(value).format('0.0a')
        }
      ]}
      series={[
        { sType: type, dataKey: 'deposit' },
        { sType: type, dataKey: 'withdrawal' }
      ]}
      data={data}
    />
  );
};

export default Trends;
