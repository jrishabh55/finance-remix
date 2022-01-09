import { Account } from '@prisma/client';
import { TableColumn } from 'react-data-table-component';
import { LoaderFunction, useCatch, useLoaderData } from 'remix';
import Card from '~/components/Card';
import Table from '~/components/Table';
import UserLayout from '~/containers/UserLayout';
import { db } from '~/utils/db.server';

type LoaderData = {
  accounts: Account[];
};

export const loader: LoaderFunction = async (): Promise<LoaderData> => {
  const accounts = await db.user.findMany({
    where: { id: 1 },
    include: { accounts: true }
  });

  return { accounts: accounts[0].accounts };
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
    <UserLayout>
      <Card title="Accounts" className="w-1/2 mx-auto">
        <Table columns={columns} data={accounts} />
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

export default AddUserPage;
