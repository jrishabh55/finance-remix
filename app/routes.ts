export type RouteType = {
  name: string;
  child?: Required<Omit<RouteType, 'child'>>[];
  to?: string;
};

const routes: RouteType[] = [
  {
    name: 'home',
    to: '/'
  },
  {
    name: 'User',
    child: [
      {
        name: 'Users',
        to: '/users'
      },
      {
        name: 'Add User',
        to: '/users/add'
      }
    ]
  },
  {
    name: 'Account',
    child: [
      {
        name: 'Accounts',
        to: '/accounts'
      },
      {
        name: 'Add Account',
        to: '/accounts/add'
      }
    ]
  },
  {
    name: 'Transaction',
    child: [
      {
        name: 'Transactions',
        to: '/transactions'
      },
      {
        name: 'Upload Transactions',
        to: '/transactions/upload'
      }
    ]
  }
];

export default routes;
