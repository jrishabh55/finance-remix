import { Account, TransactionCategory, TransactionType } from '@prisma/client';
import { FC, FormEventHandler } from 'react';
import { Form, useSubmit, useTransition } from 'remix';
import Button from '~/lib/Button';
import Card from '~/lib/Card';
import Input from '~/lib/form/Input';
import Select from '~/lib/form/Select';

const TRANSACTION_TYPE_OPTIONS = [
  { id: TransactionType.DEPOSIT, name: TransactionType.DEPOSIT },
  { id: TransactionType.WITHDRAWAL, name: TransactionType.WITHDRAWAL }
];

export type AddTransactionProps = {
  accounts: Account[];
  categories: TransactionCategory[];
  error?: string;
};

const AddTransaction: FC<AddTransactionProps> = ({ error, accounts, categories }) => {
  const submit = useSubmit();
  const transition = useTransition();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    submit(form, { method: 'post', action: '/transactions/add' });
  };

  return (
    <Card
      title="Add Transaction"
      footer={
        <div className="flex justify-end">
          <Button
            type="submit"
            form="createUser"
            className="mr-10 ml-auto"
            disabled={transition.state === 'submitting'}>
            {transition.state === 'submitting' ? 'Adding Transaction' : 'Add Transaction'}
          </Button>
        </div>
      }>
      <div className="max-w-full p-4 pb-0 md:w-[35vw]">
        <Form id="createUser" method="post" onSubmit={handleSubmit}>
          <Input autoComplete="none" required type="date" label="Amount" name="amount" />
          <Input autoComplete="none" required type="date" label="Transaction Date" name="date" />
          <Input
            autoComplete="none"
            required
            type="textarea"
            label="Description"
            name="description"
          />
          <Select
            label="Transaction Type"
            name="transactionType"
            options={TRANSACTION_TYPE_OPTIONS}
          />
          <Select label="Transaction Category" name="transactionCategory" options={categories} />
          <Select label="Account" name="account" options={accounts} />

          {error && (
            <div className="text-center text-error">
              <p>{error}</p>
            </div>
          )}
        </Form>
      </div>
    </Card>
  );
};

export default AddTransaction;
