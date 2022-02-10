import { FC } from 'react';
import List from '~/lib/List';
import { GetAccountsWithSum } from '~/query/accounts.server';
import { formatNumber } from '~/utils/formatNumber';

type AccountListProps = {
  accounts: Awaited<ReturnType<GetAccountsWithSum>>;
};
export const renderListItem = (item: AccountListProps['accounts'][0]) => (
  <div className="flex flex-row items-center">
    <div className="flex-grow">{item.name}</div>
    <div className="flex flex-col text-xs leading-4">
      <span className="text-primary">{formatNumber(item.sum.deposit)}</span>
      <span className="text-error">{formatNumber(item.sum.expense)}</span>
    </div>
  </div>
);
const AccountList: FC<AccountListProps> = ({ accounts }) => {
  return <List items={accounts} renderItem={renderListItem} />;
};

export default AccountList;
