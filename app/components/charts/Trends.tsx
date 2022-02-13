import numeral from 'numeral';
import { FC, useMemo } from 'react';
import Chart from '~/lib/chart';
import { Series } from '~/lib/chart/types';
import { borderColors } from '~/utils/color';

export type TrendsData = { deposit: number; withdrawal: number; name: string }[];

export type TrendsProps = {
  data?: TrendsData;
  title?: string;
  type?: 'bar' | 'line';
  small?: boolean;
  legend?: boolean;
  stack?: boolean;
};

const Trends: FC<TrendsProps> = ({
  title,
  type = 'bar',
  data = [],
  small = false,
  legend = true,
  stack = true
}) => {
  const series = useMemo(() => {
    const s: Series[] = [
      {
        sType: type,
        barSize: small || !stack ? 15 : 25,
        stackId: stack ? 'a-1' : undefined,
        dataKey: 'deposit'
      },
      {
        sType: type,
        barSize: small || !stack ? 15 : 25,
        stackId: stack ? 'a-1' : undefined,
        dataKey: 'withdrawal'
      }
    ];

    if (stack && type !== 'line') {
      s.push({ sType: 'line', stroke: borderColors.white, labelList: false, dataKey: 'average' });
    }
    return s;
  }, [small, type, stack]);
  return (
    <Chart
      id="bar-chart"
      cardProps={{ small, bg: true }}
      title={title}
      legend={{ show: legend }}
      wrapperStyle={small ? { height: 250, minHeight: 250 } : undefined}
      axis={[
        { aType: 'x', dataKey: 'name' },
        {
          aType: 'y',
          tickFormatter: (value: number) => numeral(value).format('0.0a')
        }
      ]}
      series={series}
      data={data}
    />
  );
};

export default Trends;
