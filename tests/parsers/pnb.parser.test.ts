import fs from 'fs';
import path from 'path';
import pnbTransactionsParser from '~/utils/parsers/pnb.parse';
import { validateTransactions } from '~/utils/validateParsedTransaction';

test('Should parse PNB File ', () => {
  const file = fs.readFileSync(path.join(__dirname, '..', 'files', 'pnb.transactions.xls'));

  const data = pnbTransactionsParser(file);

  fs.writeFileSync(
    path.join(__dirname, '..', 'files', 'pnb.transactions.snapshot.json'),
    JSON.stringify(data, null, 2)
  );

  expect(data).toHaveLength(63);
  expect(validateTransactions(data)).toBeTruthy();
});

export {};
