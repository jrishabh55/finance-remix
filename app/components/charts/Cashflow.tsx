import { FC } from 'react';
import Chart from '~/lib/chart';
import { Axis, Series } from '~/lib/chart/types';
import { borderColors } from '~/utils/color';
import { formatNumber } from '~/utils/formatNumber';

export type CashflowData = {
  inflow: number;
  outflow: number;
  'net-change': number;
  name: string;
}[];

export type CashflowProps = {
  data?: CashflowData;
  title?: string;
  legend?: boolean;
};
const series: Series[] = [
  {
    sType: 'bar',
    stackId: 'cashflow-1',
    dataKey: 'inflow'
  },
  {
    sType: 'bar',
    stackId: 'cashflow-1',
    dataKey: 'outflow'
  },
  {
    sType: 'line',
    stroke: borderColors.white,
    labelList: false,
    dataKey: 'net-change'
  }
];

const axis: Axis[] = [
  { aType: 'x', dataKey: 'name' },
  {
    aType: 'y',
    tickFormatter: (value: number) => formatNumber(value, { chart: true })
  }
];

const Cashflow: FC<CashflowProps> = ({ title, data = [], legend = true }) => {
  return <Chart id="bar-chart" title={title} axis={axis} series={series} data={data} />;
};

export default Cashflow;
