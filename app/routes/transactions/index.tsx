import { Account } from '@prisma/client';
import dayjs from 'dayjs';
import { TableColumn } from 'react-data-table-component';
import { PaginationChangePage } from 'react-data-table-component/dist/src/DataTable/types';
import { LoaderFunction, useCatch, useFetcher, useLoaderData } from 'remix';
import Card from '~/lib/Card';
import Modal from '~/lib/Modal';
import Table from '~/lib/Table';
import UploadTransactions from '~/modules/UploadTransactions';
import { getAccounts } from '~/query/accounts.server';
import {
  getTransactions,
  getTransactionsCount,
  GetTransactionsValue
} from '~/query/transactions.server';
import { formatNumber } from '~/utils/formatNumber';
import { requireUserId } from '~/utils/session.server';

type LoaderData = {
  transactions: GetTransactionsValue[];
  transactionsCount: number;
  accounts: Account[];
};

export const loader: LoaderFunction = async ({ request }): Promise<LoaderData> => {
  const userId = await requireUserId(request);
  let url = new URL(request.url);
  let page = parseInt(url.searchParams.get('page') ?? '1', 10);

  const transactionsPromise = getTransactions({
    where: { userId },
    take: 10,
    skip: 10 * (page - 1)
  });

  if (page !== 1) {
    return { transactions: await transactionsPromise, transactionsCount: -1, accounts: [] };
  }

  const [transactions, accounts, transactionsCount] = await Promise.all([
    transactionsPromise,
    getAccounts(userId),
    getTransactionsCount({ where: { userId } })
  ]);

  return { transactions, transactionsCount, accounts };
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
      <p className="text-ellipsis overflow-hidden whitespace-nowrap" title={r.description}>
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
    cell: (r) => formatNumber(r.amount),
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
  const loaderData = useLoaderData<LoaderData>();
  const fetcher = useFetcher();

  const { transactionsCount, accounts } = loaderData;
  const { transactions } = fetcher.data ?? loaderData;

  const handlePageChange: PaginationChangePage = (page) => {
    fetcher.load(`/transactions?page=${page}`);
  };

  return (
    <Card
      title="Transactions"
      action={
        <Modal title="Upload Transactions">
          <UploadTransactions accounts={accounts} />
        </Modal>
      }
      className="mx-auto">
      <Table
        columns={columns}
        data={transactions}
        pagination={true}
        paginationDefaultPage={1}
        paginationPerPage={10}
        paginationServer={true}
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

export default Transactions;
