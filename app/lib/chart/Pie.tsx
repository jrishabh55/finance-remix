import { FC, memo, useCallback, useState } from 'react';
import { Cell, Pie, PieChart as PieChartOriginal, ResponsiveContainer, Sector } from 'recharts';
import colors, { chartColors } from '~/utils/color';
import { formatNumber } from '~/utils/formatNumber';
import { ChartProps } from './types';

const margin = {
  right: 25
};

const RADIAN = Math.PI / 180;

const renderActiveShape = (props: any) => {
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 10) * cos;
  const my = cy + (outerRadius + 10) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={colors.white}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill={fill}>{`${formatNumber(value)}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        fontSize="10"
        textAnchor={textAnchor}
        fill={colors.white}>
        {`(${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

const PieChart: FC<ChartProps> = ({ containerProps, legend, series, axis, data }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  return (
    <ResponsiveContainer width="100%" height="100%" {...containerProps}>
      <PieChartOriginal data={data} margin={margin} stackOffset="sign">
        {console.log({ data, series })}
        {/* {axis?.map((a, i) => (
          <Fragment key={(a.dataKey as string) || i}>{Axis(a)}</Fragment>
        ))} */}

        {/* <Tooltip cursor={false} content={<CustomTooltip />} /> */}
        {/* {legend?.show && <Legend {...(legend as any)} />} */}
        {series.map(({ ref, labelList = false, ...s }, i) => {
          if (s.sType === 'pie') {
            const fillColor = s.color ?? chartColors[i] ?? chartColors[0];

            return (
              <Pie
                key={s.dataKey as string}
                fill={fillColor}
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                {...s}
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                onMouseEnter={onPieEnter}
                ref={ref as any}>
                {data?.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={chartColors[index] ?? chartColors[0]} />
                ))}
              </Pie>
            );
          }

          return null;
        })}
      </PieChartOriginal>
    </ResponsiveContainer>
  );
};

export default memo(PieChart);
