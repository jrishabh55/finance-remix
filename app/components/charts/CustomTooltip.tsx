import numeral from 'numeral';
import { FC, memo } from 'react';

// const CustomTooltipWrapper = styled('div')(({ theme }) => ({
//   backgroundColor: theme.palette.background.paper,
//   color: theme.palette.text.primary,
//   borderRadius: theme.shape.borderRadius,
//   paddingRight: theme.spacing(1),
//   paddingLeft: theme.spacing(1)
// }));

const CustomTooltip: FC<any> = (props) => {
  const { active, payload } = props;

  if (active && payload && payload.length) {
    return (
      <div className="shadow dark:border-black p-2 rounded-lg bg-primary dark:bg-background/80">
        {payload.map((val: any, i: number) => (
          <p key={i} className="label">
            <strong className="capitalize">{val.name}</strong>:
            <span className={`px-2 [color:${val.color}]`}>
              {typeof val.value === 'number' ? numeral(val.value).format('0.00a') : val.value}
            </span>
          </p>
        ))}
      </div>
    );
  }

  return null;
};

export default memo(CustomTooltip);
