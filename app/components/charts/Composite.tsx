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
import colors, { chartColors } from '~/utils/color';
import Axis from './Axis';
import CustomTooltip from './CustomTooltip';
import { ChartProps } from './types';

const margin = {
  right: 25
};

const CompositeComponent: FC<ChartProps> = ({ containerProps, legend, series, axis, data }) => (
  <ResponsiveContainer width="100%" height="100%" {...containerProps}>
    <ComposedChart data={data} margin={margin} stackOffset="sign">
      {axis?.map((a, i) => (
        <Fragment key={(a.dataKey as string) || i}>{Axis(a)}</Fragment>
      ))}

      <Tooltip cursor={false} content={<CustomTooltip />} />
      {legend?.show && <Legend {...(legend as any)} />}
      {series.map(({ ref, labelList = true, ...s }, i) => {
        if (s.sType === 'bar') {
          return (
            <Bar
              key={s.dataKey as string}
              fill={chartColors[i] ?? chartColors[0]}
              barSize={40}
              {...s}
              ref={ref as any}>
              {labelList && (
                <LabelList
                  dataKey={s.dataKey as string}
                  position="top"
                  fill={colors.white}
                  formatter={(value: number) => numeral(value).format('0.0a')}
                />
              )}
            </Bar>
          );
        }

        return (
          <Line
            key={s.dataKey as string}
            stroke={chartColors[i] ?? chartColors[0]}
            type="monotone"
            {...s}
            ref={ref as any}>
            {labelList && (
              <LabelList
                dataKey={s.dataKey as string}
                position="top"
                fill={colors.white}
                formatter={(value: number) => numeral(value).format('0.0a')}
              />
            )}
          </Line>
        );
      })}
    </ComposedChart>
  </ResponsiveContainer>
);

export default memo(CompositeComponent);
