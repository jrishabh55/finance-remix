import merge from 'lodash/merge';
import { CSSProperties, FC, memo, useMemo } from 'react';
import Card from '../Card';
import Composite from './Composite';
import { ChartProps } from './types';

const wrapperStyle: CSSProperties = {
  height: 400,
  minHeight: 400
};

const defaultSettings: Partial<ChartProps> & Record<string, any> = {
  legend: {
    show: true,
    formatter: (value: string) => <span className="capitalize">{value}</span>,
    align: 'center',
    verticalAlign: 'top',
    margin: {
      left: 100
    }
  },
  options: {
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Custom Chart Title'
      }
    }
  },
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true
        }
      }
    ]
  }
};

const ComponentMap = {
  bar: Composite
};

const Chart: FC<ChartProps> = ({ wrapperStyle, cardProps, title, ...props }) => {
  const settings = useMemo<ChartProps>(() => {
    const data = {};
    return merge({ data }, defaultSettings, props);
  }, [props]);

  const Component = ComponentMap[props.type] as any;

  return (
    <Card {...cardProps}>
      {title && <div className="text-lg border-b pb-2 border-background">{title}</div>}
      <div style={wrapperStyle}>
        <Component {...settings} />
      </div>
    </Card>
  );
};

Chart.defaultProps = { wrapperStyle };

export default memo(Chart);
