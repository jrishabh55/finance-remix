import { FC, memo } from 'react';

// const CustomTooltipWrapper = styled('div')(({ theme }) => ({
//   backgroundColor: theme.palette.background.paper,
//   color: theme.palette.text.primary,
//   borderRadius: theme.shape.borderRadius,
//   paddingRight: theme.spacing(1),
//   paddingLeft: theme.spacing(1)
// }));

const CustomTooltip: FC<any> = (props) => {
  const { active, payload, label } = props;

  if (active && payload && payload.length) {
    return (
      <div className="shadow border">
        <p className="label">
          <strong>{label}</strong>: ${payload[0].value}
        </p>
      </div>
    );
  }

  return null;
};

export default memo(CustomTooltip);
