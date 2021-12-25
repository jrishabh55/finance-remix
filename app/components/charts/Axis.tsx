import { FC } from 'react';
import { XAxis, YAxis } from 'recharts';
import { Axis as AxisProps } from './types';

const yAxisDomain: AxisProps['domain'] = [0, (max: number) => max * 1.1];

const Axis: FC<AxisProps> = (props) => {
  console.log('axis props', { props });
  if (props.aType === 'x') {
    return <XAxis interval={0} key={props.dataKey as string} {...props} />;
  }

  if (props.aType === 'y') {
    return <YAxis domain={yAxisDomain} key={props.dataKey as string} {...props} />;
  }

  return <div>Axis not supported</div>;
};

export default Axis;
