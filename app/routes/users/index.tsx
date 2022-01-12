import dayjs from 'dayjs';
import { TableColumn } from 'react-data-table-component';
import { PaginationChangeRowsPerPage } from 'react-data-table-component/dist/src/DataTable/types';
import {
  ActionFunction,
  json,
  LoaderFunction,
  useActionData,
  useCatch,
  useLoaderData,
  useSubmit
} from 'remix';
import Card from '~/components/Card';
import Table from '~/components/Table';
import { getUsers, getUsersCount, GetUsersValue } from '~/query/users.server';
import { requireUserId } from '~/utils/session.server';

type LoaderData = {
  users: GetUsersValue[];
  usersCount: number;
};

type ActionData = Pick<LoaderData, 'users'>;

export const action: ActionFunction = async ({ request }): Promise<ActionData | Response> => {
  await requireUserId(request);
  const body = await request.formData();
  const page: number = parseInt(body.get('page')?.toString() || '1');

  const transactions = await getUsers({ take: 10, skip: 10 * page, where: {} });

  return json({ transactions });
};

export const loader: LoaderFunction = async ({ request }): Promise<LoaderData> => {
  await requireUserId(request);
  const users = await getUsers({ where: {} });
  const usersCount = await getUsersCount({});
  return { users, usersCount };
};

const columns: TableColumn<LoaderData['users'][0]>[] = [
  {
    name: 'Name',
    selector: (r) => r.name,
    width: '150px'
  },
  {
    name: 'email',
    cell: (r) => (
      <p className="text-ellipsis overflow-hidden" title={r.email}>
        {r.email}
      </p>
    ),
    sortable: true,
    width: '200px'
  },
  {
    name: 'Role',
    selector: (r) => r.role,
    sortable: true,
    width: '150px'
  },
  {
    name: 'Accounts',
    cell: (r) => (
      <p className="text-ellipsis overflow-hidden" title={r.email}>
        {r.accounts.map((account) => (
          <p key={account.id}>{account.name}</p>
        ))}
      </p>
    ),
    width: '250px'
  },
  {
    name: 'Joining Date',
    selector: (r) => dayjs(r.createdAt).format('MMM DD, YYYY'),
    sortable: true,
    width: '150px'
  },
  {
    name: 'Actions',
    selector: (r) => r.id
  }
];

function Users() {
  const { users: transactions, usersCount: transactionsCount } = useLoaderData<LoaderData>();
  const actionData = useActionData<ActionData>();
  const submit = useSubmit();

  const handlePageChange: PaginationChangeRowsPerPage = (page) => {
    const formData = new FormData();
    formData.set('page', page + '');
    submit(formData, { method: 'post' });
  };

  return (
    <Card title="Transactions" className="mx-auto w-9/12">
      <Table
        columns={columns}
        data={actionData?.users || transactions}
        pagination={true}
        paginationPerPage={10}
        paginationRowsPerPageOptions={[10]}
        paginationTotalRows={transactionsCount}
        onChangePage={handlePageChange}
      />
    </Card>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  switch (caught.status) {
    default: {
      throw new Error(`Unhandled error: ${caught.status}`);
    }
  }
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);
  return <div className="error-container">{`There was an error . Sorry.`}</div>;
}

export default Users;