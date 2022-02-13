import { FC, useMemo } from 'react';
import Chart from '~/lib/chart';
import { Axis, Series } from '~/lib/chart/types';
import colors from '~/utils/color';
import { formatNumber } from '~/utils/formatNumber';

export type MonthlyTrendsData = { deposit: number; withdrawal: number; name: string }[];

export type MonthlyTrendsProps = {
  data?: MonthlyTrendsData;
  title?: string;
  deposit?: boolean;
  withdrawal?: boolean;
};

const axis: Axis[] = [
  { aType: 'x', dataKey: 'name' },
  {
    aType: 'y',
    tickFormatter: (value: number) => formatNumber(value, { chart: true })
  }
];

console.log({ axis: axis[1].tickFormatter?.(1, 1) });

const MonthlyTrends: FC<MonthlyTrendsProps> = ({
  title,
  data = [],
  deposit = true,
  withdrawal = true
}) => {
  const series = useMemo(() => {
    const s: Series[] = [];

    if (deposit) {
      s.push({
        sType: 'bar',
        dataKey: 'deposit'
      });
    }

    if (withdrawal) {
      s.push({
        sType: 'bar',
        dataKey: 'withdrawal',
        color: colors.red
      });
    }

    return s;
  }, [deposit, withdrawal]);

  if (!deposit && !withdrawal) {
    throw new Error('MonthlyTrends: at least one of deposit or withdrawal must be true');
  }

  return <Chart id="bar-chart" title={title} axis={axis} series={series} data={data} />;
};

export default MonthlyTrends;
