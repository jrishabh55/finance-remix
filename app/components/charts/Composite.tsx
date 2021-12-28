import numeral from 'numeral';
import { FC, Fragment, memo } from 'react';
import {
  Bar,
  ComposedChart,
  LabelList,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { chartColors } from '~/utils/color';
import Axis from './Axis';
import CustomTooltip from './CustomTooltip';
import { ChartProps } from './types';

const CompositeComponent: FC<ChartProps> = ({ containerProps, legend, series, axis, data }) => (
  <ResponsiveContainer width="100%" height="100%" {...containerProps}>
    <ComposedChart
      data={data}
      margin={{
        top: 10
      }}>
      {axis?.map((a, i) => (
        <Fragment key={(a.dataKey as string) || i}>{Axis(a)}</Fragment>
      ))}

      <Tooltip cursor={false} content={<CustomTooltip />} />
      {legend?.show && <Legend {...(legend as any)} />}
      {series.map(({ ref, ...s }, i) => {
        if (s.sType === 'bar') {
          return (
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
          );
        }

        return (
          <Line
            key={s.dataKey as string}
            stroke={chartColors[i] ?? chartColors[0]}
            {...s}
            ref={ref as any}>
            <LabelList
              dataKey={s.dataKey as string}
              position="top"
              fill="#FFFFFF"
              formatter={(value: number) => numeral(value).format('0.0a')}
            />
          </Line>
        );
      })}
    </ComposedChart>
  </ResponsiveContainer>
);

export default memo(CompositeComponent);
