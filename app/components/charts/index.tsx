import merge from 'lodash/merge';
import { CSSProperties, FC, memo, useMemo } from 'react';
import Bar from './Bar';
import { ChartProps } from './types';

const wrapperStyle: CSSProperties = {
  width: '100%',
  height: 400,
  minHeight: 400,
  paddingTop: 20
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

const Chart: FC<ChartProps> = ({ wrapperStyle, ...props }) => {
  const settings = useMemo<ChartProps>(() => {
    const data = {};
    return merge({ data }, defaultSettings, props);
  }, [props]);

  const Component = ComponentMap[props.type] as any;

  return (
    <div className="shadow-lg bg-black rounded-lg" style={wrapperStyle}>
      <Component {...settings} />
    </div>
  );
};

Chart.defaultProps = { wrapperStyle };

export default memo(Chart);
