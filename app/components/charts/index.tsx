import merge from 'lodash/merge';
import { CSSProperties, FC, memo, useMemo } from 'react';
import Card from '../Card';
import Bar from './Bar';
import { ChartProps } from './types';

const wrapperStyle: CSSProperties = {
  height: 400,
  minHeight: 400
};

const defaultSettings = {
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
  bar: Bar
};

const Chart: FC<ChartProps> = ({ wrapperStyle, title, ...props }) => {
  const settings = useMemo<ChartProps>(() => {
    const data = {};
    return merge({ data }, defaultSettings, props);
  }, [props]);

  const Component = ComponentMap[props.type] as any;

  return (
    <Card>
      {title && <div className="text-lg border-b pb-2 border-background">{title}</div>}
      <div className="pt-2  " style={wrapperStyle}>
        <Component {...settings} />
      </div>
    </Card>
  );
};

Chart.defaultProps = { wrapperStyle };

export default memo(Chart);
