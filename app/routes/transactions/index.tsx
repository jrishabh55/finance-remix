import dayjs from 'dayjs';
import { TableColumn } from 'react-data-table-component';
import { PaginationChangeRowsPerPage } from 'react-data-table-component/dist/src/DataTable/types';
import { LoaderFunction, useCatch, useLoaderData } from 'remix';
import Card from '~/components/Card';
import Table from '~/components/Table';
import UserLayout from '~/containers/UserLayout';
import { getTransactions, GetTransactionsValue } from '~/query/transactions.server';
import { requireUserId } from '~/utils/session.server';

type LoaderData = {
  transactions: GetTransactionsValue[];
};

export const loader: LoaderFunction = async ({ request }): Promise<LoaderData> => {
  const userId = await requireUserId(request);
  return { transactions: await getTransactions({ userId: userId }) };
};

const columns: TableColumn<LoaderData['transactions'][0]>[] = [
  {
    name: 'Date',
    selector: (r) => dayjs(r.transactionDate).format('MMM DD, YYYY'),
    sortable: true,
    width: '150px'
  },
  {
    name: 'Description',
    cell: (r) => (
      <p className="text-ellipsis overflow-hidden" title={r.description}>
        {r.description}
      </p>
    ),
    sortable: true,
    width: '350px'
  },
  {
    name: 'Account',
    selector: (r) => r.account.name,
    width: '250px'
  },
  {
    name: 'Category',
    selector: (r) => r.category.name,
    sortable: true,
    width: '250px'
  },
  {
    name: 'Amount',
    selector: (r) => r.amount,
    sortable: true,
    width: '150px'
  },
  {
    name: 'Actions',
    selector: (r) => r.id,
    width: '150px'
  }
];

function Transactions() {
  const { transactions } = useLoaderData<LoaderData>();

  const handlePageChange: PaginationChangeRowsPerPage = (page) => {};

  return (
    <UserLayout>
      <Card title="Transactions" className="mx-auto">
        <Table
          columns={columns}
          data={transactions}
          pagination={true}
          paginationPerPage={10}
          onChangePage={handlePageChange}
        />
      </Card>
    </UserLayout>
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

export default Transactions;
