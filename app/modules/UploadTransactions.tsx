import { Account } from '@prisma/client';
import { FC, useMemo } from 'react';
import { Form } from 'remix';
import Button from '~/components/Button';
import Card from '~/components/Card';
import Input from '~/components/form/Input';
import Select from '~/components/form/Select';

const accountOptions = [{ id: 'HDFC BANK', name: 'HDFC BANK' }];

const UploadTransactions: FC<{ error?: string; accounts?: Account[] }> = ({ error, accounts }) => {
  const $accounts = useMemo(() => {
    if (!accounts) return [];
    return accounts.map((account) => ({ id: account.id, name: account.name }));
  }, [accounts]);
  return (
    <Card
      title="Upload Transactions"
      className="col-span-4 col-start-5"
      footer={
        <div className="flex justify-end">
          <Button type="submit" form="upload-transactions" className="mr-5">
            Upload
          </Button>
        </div>
      }>
      <div className="">
        <Form id="upload-transactions" method="post" encType="multipart/form-data">
          <Select name="account" label="Account" options={$accounts} />
          <Input type="file" required label="Name" name="transactionFile" />
          <Select name="bankName" label="Bank Name" options={accountOptions} />
          {error && (
            <div className="text-error text-center">
              <p>{error}</p>
            </div>
          )}
        </Form>
      </div>
    </Card>
  );
};

UploadTransactions.defaultProps = {
  accounts: []
};

export default UploadTransactions;
