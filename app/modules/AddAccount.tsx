import { AccountType } from '@prisma/client';
import { FC } from 'react';
import { Form } from 'remix';
import Button from '~/components/Button';
import Card from '~/components/Card';
import Input from '~/components/form/Input';
import Select from '~/components/form/Select';

const accountOptions: { name: AccountType; id: AccountType }[] = [
  { id: 'BANK', name: 'BANK' },
  { id: 'CREDIT_CARD', name: 'CREDIT_CARD' },
  { id: 'INVESTMENT', name: 'INVESTMENT' },
  { id: 'TAX', name: 'TAX' },
  { id: 'TDS', name: 'TDS' }
];

const AddAccount: FC<{ error?: string }> = ({ error }) => {
  return (
    <Card
      title="Add Account"
      className="col-span-4 col-start-5"
      footer={
        <div className="flex justify-end">
          <Button type="submit" form="add-account" className="mr-5">
            Add Account
          </Button>
        </div>
      }>
      <div className="">
        <Form id="add-account" method="post">
          <Input autoComplete="none" required label="Name" name="name" />
          <Select name="type" label="Account Type" options={accountOptions} />
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

export default AddAccount;
