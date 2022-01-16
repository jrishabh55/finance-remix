import { AccountType } from '@prisma/client';
import { FC, FormEventHandler } from 'react';
import { Form, useSubmit, useTransition } from 'remix';
import Button from '~/lib/Button';
import Card from '~/lib/Card';
import Input from '~/lib/form/Input';
import Select from '~/lib/form/Select';

const accountOptions: { name: AccountType; id: AccountType }[] = [
  { id: 'BANK', name: 'BANK' },
  { id: 'CREDIT_CARD', name: 'CREDIT_CARD' },
  { id: 'INVESTMENT', name: 'INVESTMENT' },
  { id: 'TAX', name: 'TAX' },
  { id: 'TDS', name: 'TDS' }
];

const AddAccount: FC<{ error?: string }> = ({ error }) => {
  const submit = useSubmit();
  const transition = useTransition();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    submit(form, { method: 'post', action: '/accounts/add' });
  };
  return (
    <Card
      title="Add Account"
      footer={
        <div className="flex justify-end">
          <Button
            type="submit"
            form="add-account"
            className="mr-10 ml-auto"
            disabled={transition.state === 'submitting'}>
            {transition.state === 'submitting' ? 'Adding Account' : 'Add Account'}
          </Button>
        </div>
      }>
      <div className="md:w-[35vw] p-4 pb-0">
        <Form id="add-account" method="post" onSubmit={handleSubmit}>
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
