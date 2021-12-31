import { FC } from 'react';
import { XAxis, YAxis } from 'recharts';
import { Axis as AxisProps } from './types';

const yAxisDomain: AxisProps['domain'] = [
  (min: number) => (min < 0 ? min * 1.2 : min),
  (max: number) => max * 1.2
];

const Axis: FC<AxisProps> = (props) => {
  if (props.aType === 'x') {
    return <XAxis interval={0} key={props.dataKey as string} {...props} />;
  }

  if (props.aType === 'y') {
    return (
      <YAxis
        interval="preserveStartEnd"
        scale="linear"
        domain={yAxisDomain}
        key={props.dataKey as string}
        {...props}
      />
    );
  }

  return <div>Axis not supported</div>;
};

export default Axis;
