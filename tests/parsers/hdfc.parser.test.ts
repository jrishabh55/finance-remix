import fs from 'fs';
import path from 'path';
import hdfcTransactionsParser from '~/utils/parsers/hdfc.parse';
import { validateTransactions } from '~/utils/validateParsedTransaction';

test('Should parse HDFC File ', () => {
  const file = fs.readFileSync(path.join(__dirname, '..', 'files', 'hdfc.transactions.xls'));

  const data = hdfcTransactionsParser(file);

  fs.writeFileSync(
    path.join(__dirname, '..', 'files', 'hdfc.transactions.snapshot.json'),
    JSON.stringify(data, null, 2)
  );

  expect(data).toHaveLength(7);
  expect(validateTransactions(data)).toBeTruthy();
});

export {};
