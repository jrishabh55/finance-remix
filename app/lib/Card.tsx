import { Disclosure as BaseDisclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/solid';
import { CSSProperties, FC, ReactNode } from 'react';
import { Title } from './Typography';

const { Button, Panel } = BaseDisclosure;

export type CardProps = {
  style?: CSSProperties;
  bodyStyle?: CSSProperties;
  small?: boolean;
  bg?: boolean;
  title?: ReactNode;
  action?: ReactNode;
  className?: string;
  footer?: ReactNode;
  defaultOpen?: boolean;
  collapsible?: boolean;
};

type CardHeaderProps = {
  title?: ReactNode;
  action?: ReactNode;
  open?: boolean;
  small?: boolean;
  collapsible?: boolean;
};

const CardHeader: FC<CardHeaderProps> = ({ title, action, small, open, collapsible }) => {
  if (!title && !action && !collapsible) return null;
  return (
    <header
      className={`flex w-full items-center justify-between border-b px-4 ${
        small ? 'py-2' : 'py-4'
      } border-background`}>
      {title && <Title>{title}</Title>}
      <div className="ml-auto min-h-[28px]">
        {action && action}
        {collapsible && (
          <ChevronUpIcon
            className={`${open ? 'rotate-180 transform' : ''} h-5 w-5 text-secondary`}
          />
        )}
      </div>
    </header>
  );
};

const Card: FC<CardProps> = ({
  children,
  title,
  bodyStyle,
  bg = true,
  className,
  style,
  small = false,
  action,
  footer = null,
  defaultOpen = true,
  collapsible = false
}) => {
  const header = (open: boolean) => (
    <CardHeader title={title} action={action} small={small} open={open} collapsible={collapsible} />
  );
  return (
    <BaseDisclosure defaultOpen={defaultOpen}>
      {({ open }) => (
        <section
          className={`${
            bg ? `${open && 'h-full'} rounded-lg bg-primary/50 shadow-xl dark:bg-black` : ''
          } ${className ?? ''}`}
          style={style}>
          {collapsible && <Button className="w-full">{header(open)}</Button>}
          {!collapsible && header(true)}
          <Panel
            className={small ? 'w-full flex-grow p-1 sm:p-1' : ' w-full flex-grow p-4 sm:p-6'}
            style={bodyStyle}>
            {children}
          </Panel>
          {footer && <footer className={`px-4 ${small ? 'py-2' : 'py-4'}`}>{footer}</footer>}
        </section>
      )}
    </BaseDisclosure>
  );
};

export default Card;
