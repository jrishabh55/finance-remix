import { Account } from '@prisma/client';
import { noop } from 'lodash';
import {
  ChangeEventHandler,
  FC,
  FormEventHandler,
  useCallback,
  useMemo,
  useRef,
  useState
} from 'react';
import { Form, Link, useSubmit, useTransition } from 'remix';
import Button from '~/lib/Button';
import Card from '~/lib/Card';
import Input from '~/lib/form/Input';
import Select, { SelectOption } from '~/lib/form/Select';
import defaultTransactionsParser from '~/utils/parsers/default.parse';
import hdfcTransactionsParser from '~/utils/parsers/hdfc.parse';
import pnbTransactionsParser from '~/utils/parsers/pnb.parse';

const accountOptions: SelectOption[] = [
  { id: 'Default', name: 'DEFAULT STANDARD' },
  { id: 'HDFC BANK', name: 'HDFC BANK' },
  { id: 'PNB', name: 'PUNJAB NATIONAL BANK' }
];

const UploadTransactions: FC<{ error?: string; accounts: Account[] }> = ({ error, accounts }) => {
  const [bank, setBank] = useState(accountOptions[0]);
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

  const handleBankNameChange = (val: SelectOption) => {
    setBank(val);
  };

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
      case 'Default':
        parser = defaultTransactionsParser;
        break;
      default:
        throw new Error('Invalid bank name');
    }

    if (parser === noop) return;

    const parsedFile = parser(await file.arrayBuffer());

    const formData = new FormData(form);
    formData.set('transactionFile', JSON.stringify(parsedFile));

    submit(formData, { method: 'post', action: '/transactions/upload' });
  };

  console.log({ bank });

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
      <div className="p-4 pb-0 md:w-[35vw]">
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
          <Select
            name="bankName"
            label="Transaction Type"
            options={accountOptions}
            onChange={handleBankNameChange}
          />
          <div className="flex h-12 justify-end p-1">
            {bank.id === 'Default' && (
              <Link
                className="pointer ml-auto inline-block p-2 text-primary underline"
                to="/assets/default_transactions_template.xls"
                target="_blank">
                Download Sample
              </Link>
            )}
          </div>
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

UploadTransactions.defaultProps = {
  accounts: []
};

export default UploadTransactions;
