import numeral from 'numeral';
import { FC, memo } from 'react';
import { Bar, BarChart, LabelList, Legend, ResponsiveContainer, Tooltip } from 'recharts';
import { chartColors } from '~/utils/color';
import Axis from './Axis';
import CustomTooltip from './CustomTooltip';
import { BarChartProps } from './types';

const BarComponent: FC<BarChartProps> = ({ containerProps, series, axis, data }) => (
  <ResponsiveContainer width="100%" height="100%" {...containerProps}>
    <BarChart
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}>
      {axis?.map(Axis)}

      <Tooltip cursor={false} content={<CustomTooltip />} />
      <Legend />
      {series.map(({ ref, ...s }, i) => (
        <Bar
          key={s.dataKey as string}
          fill={chartColors[i] ?? chartColors[0]}
          barSize={40}
          {...s}
          ref={ref as any}>
          <LabelList
            dataKey={s.dataKey as string}
            position="top"
            fill="#FFFFFF"
            formatter={(value: number) => numeral(value).format('0.0a')}
          />
        </Bar>
      ))}
    </BarChart>
  </ResponsiveContainer>
);

export default memo(BarComponent);
