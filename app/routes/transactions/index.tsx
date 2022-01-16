import { Account } from '@prisma/client';
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
import Modal from '~/components/Modal';
import Table from '~/components/Table';
import UploadTransactions from '~/modules/UploadTransactions';
import { getAccounts } from '~/query/accounts.server';
import {
  getTransactions,
  getTransactionsCount,
  GetTransactionsValue
} from '~/query/transactions.server';
import { requireUserId } from '~/utils/session.server';

type LoaderData = {
  transactions: GetTransactionsValue[];
  transactionsCount: number;
  accounts: Account[];
};

type ActionData = Pick<LoaderData, 'transactions'>;

export const action: ActionFunction = async ({ request }): Promise<ActionData | Response> => {
  const userId = await requireUserId(request);
  const body = await request.formData();
  const page: number = parseInt(body.get('page')?.toString() || '1');

  const transactions = await getTransactions({ take: 10, skip: 10 * page, where: { userId } });
  console.log('Action called on GET', request.method);

  return json<ActionData>({ transactions });
};

export const loader: LoaderFunction = async ({ request }): Promise<LoaderData> => {
  const userId = await requireUserId(request);
  const transactions = await getTransactions({ where: { userId } });
  const accounts = await getAccounts(userId);
  const transactionsCount = await getTransactionsCount({ where: { userId } });
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
  const { transactions, transactionsCount, accounts } = useLoaderData<LoaderData>();
  const actionData = useActionData<ActionData>();
  const submit = useSubmit();

  const handlePageChange: PaginationChangeRowsPerPage = (page) => {
    const formData = new FormData();
    formData.set('page', page + '');
    submit(formData, { method: 'post' });
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
        data={actionData?.transactions || transactions}
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

export default Transactions;
