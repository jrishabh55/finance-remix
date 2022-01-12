import { Account } from '@prisma/client';
import { TableColumn } from 'react-data-table-component';
import { LoaderFunction, useCatch, useLoaderData } from 'remix';
import Card from '~/components/Card';
import Modal from '~/components/Modal';
import Table from '~/components/Table';
import AddAccount from '~/modules/AddAccount';
import { getAccounts } from '~/query/accounts.server';
import { requireUserId } from '~/utils/session.server';

type LoaderData = {
  accounts: Account[];
};

export const loader: LoaderFunction = async ({ request }): Promise<LoaderData> => {
  const userId = await requireUserId(request);
  return { accounts: await getAccounts(userId) };
};

const columns: TableColumn<LoaderData['accounts'][0]>[] = [
  {
    name: 'Name',
    selector: (r) => r.name,
    sortable: true
  },
  {
    name: 'Account Type',
    selector: (r) => r.type,
    sortable: true
  },
  {
    name: 'Actions',
    selector: (r) => r.id
  }
];

function AddUserPage() {
  const { accounts } = useLoaderData<LoaderData>();

  return (
    <Card
      title="Accounts"
      action={
        <Modal title="Add Account">
          <AddAccount />
        </Modal>
      }
      className="w-1/2 mx-auto">
      <Table columns={columns} data={accounts} />
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

export default AddUserPage;
