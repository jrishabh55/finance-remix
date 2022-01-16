import { Account } from '@prisma/client';
import { noop } from 'lodash';
import { ChangeEventHandler, FC, FormEventHandler, useCallback, useMemo, useRef } from 'react';
import { Form, useSubmit, useTransition } from 'remix';
import Button from '~/components/Button';
import Card from '~/components/Card';
import Input from '~/components/form/Input';
import Select from '~/components/form/Select';
import hdfcTransactionsParser from '~/utils/parsers/hdfc.parse';
import pnbTransactionsParser from '~/utils/parsers/pnb.parse';

const accountOptions = [
  { id: 'HDFC BANK', name: 'HDFC BANK' },
  { id: 'PNB', name: 'Punjab National Bank' }
];

const UploadTransactions: FC<{ error?: string; accounts: Account[] }> = ({ error, accounts }) => {
  const currentFile = useRef<File>();
  const submit = useSubmit();
  const transition = useTransition();

  const $accounts = useMemo(() => {
    if (!accounts) return [];
    return accounts.map((account) => ({ id: account.id, name: account.name }));
  }, [accounts]);

  const handleTransactionFile: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    currentFile.current = e.target.files?.[0];
  }, []);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const file = currentFile.current;
    if (!file) return;

    let parser: Function = noop;
    switch (form.bankName.value) {
      case 'HDFC BANK':
        parser = hdfcTransactionsParser;

        break;
      case 'PNB':
        parser = pnbTransactionsParser;
        break;
    }

    if (parser === noop) return;

    const parsedFile = parser(await file.arrayBuffer());

    const formData = new FormData(form);
    formData.set('transactionFile', JSON.stringify(parsedFile));

    submit(formData, { method: 'post', action: '/transactions/upload' });
  };

  return (
    <Card
      title="Upload Transactions"
      footer={
        <div className="flex justify-end">
          <Button
            type="submit"
            form="upload-transactions"
            className="mr-10 ml-auto"
            disabled={transition.state === 'submitting'}>
            {transition.state === 'submitting' ? 'Uploading' : 'Upload'}
          </Button>
        </div>
      }>
      <div className="md:w-[35vw] p-4 pb-0">
        <Form
          id="upload-transactions"
          method="post"
          encType="multipart/form-data"
          onSubmit={handleSubmit}>
          <Select name="account" label="Account" options={$accounts} />
          <Input
            type="file"
            required
            label="Name"
            name="transactionFile"
            onChange={handleTransactionFile}
          />
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
