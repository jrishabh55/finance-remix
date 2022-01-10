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
        name: 'Add User',
        to: '/user/add'
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
  }
];

export default routes;
