import React from 'react';
import {
  BarProps as BarPropsOriginal,
  LineProps as LinePropsOriginal,
  ResponsiveContainer,
  XAxisProps as XAxisPropsOriginal,
  YAxisProps as YAxisPropsOriginal
} from 'recharts';
import { CategoricalChartProps } from 'recharts/types/chart/generateCategoricalChart';

export * from 'recharts';
export { default } from 'recharts';

export type ChartType = 'bar'; // 'line' | 'pie' | 'doughnut' | 'polarArea' | 'radar';

export type ChartData = CategoricalChartProps['data'];
export type BarProps = BarPropsOriginal & { type: 'bar' };
export type LineProps = LinePropsOriginal & { type: 'line' };
export type XAxisProps = XAxisPropsOriginal & { aType: 'x'; dataType: string };
export type YAxisProps = YAxisPropsOriginal & { aType: 'y'; dataType: string };
export type Series = BarProps | LineProps;
export type Axis = XAxisProps | YAxisProps;

export interface ChartProps extends CategoricalChartProps {
  id: string;
  title?: string;
  wrapperStyle?: React.CSSProperties;
  type: ChartType;
  containerProps?: typeof ResponsiveContainer;
  series: Series[];
  axis: Axis[];
}

export type ChartSettings = Omit<ChartProps, 'wrapperStyle'>;

export interface BarChartProps extends ChartSettings {
  type: 'bar';
  series: BarProps[];
}
