import React from 'react';
import {
  BarProps as BarPropsOriginal,
  LegendProps as LegendPropsOriginal,
  LineProps as LinePropsOriginal,
  ResponsiveContainer,
  XAxisProps as XAxisPropsOriginal,
  YAxisProps as YAxisPropsOriginal
} from 'recharts';
import { CategoricalChartProps } from 'recharts/types/chart/generateCategoricalChart';
import { CategoricalChartOptions } from 'recharts/types/util/types';
import { CardProps } from '../Card';

export * from 'recharts';
export { default } from 'recharts';

export type ChartType = 'bar'; // 'line' | 'pie' | 'doughnut' | 'polarArea' | 'radar';

export type ChartData = CategoricalChartProps['data'];
export type BarProps = BarPropsOriginal & { sType: 'bar' };
export type LineProps = LinePropsOriginal & { sType: 'line' };
export type XAxisProps = XAxisPropsOriginal & { aType: 'x' };
export type YAxisProps = YAxisPropsOriginal & { aType: 'y' };
export type Series = LineProps | BarProps;
export type Axis = XAxisProps | YAxisProps;

export type Legend = LegendPropsOriginal & { show: boolean };

export interface ChartProps extends CategoricalChartProps, CategoricalChartOptions {
  id: string;
  title?: string;
  cardProps?: CardProps;
  wrapperStyle?: React.CSSProperties;
  type: ChartType;
  containerProps?: typeof ResponsiveContainer;
  series: Series[];
  axis: Axis[];
  legend?: Legend;
}

export type ChartSettings = Omit<ChartProps, 'wrapperStyle'>;

// export interface BarChartProps extends ChartSettings {
//   type: 'bar';
//   series: Series[];
// }
