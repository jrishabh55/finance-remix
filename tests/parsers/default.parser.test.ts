import fs from 'fs';
import path from 'path';
import defaultTransactionsParser from '~/utils/parsers/default.parse';
import { validateTransactions } from '~/utils/validateParsedTransaction';

test('Should parse Default File ', () => {
  const file = fs.readFileSync(path.join(__dirname, '..', 'files', 'default.transactions.xls'));

  const data = defaultTransactionsParser(file);

  fs.writeFileSync(
    path.join(__dirname, '..', 'files', 'default.transactions.snapshot.json'),
    JSON.stringify(data, null, 2)
  );

  expect(data).toHaveLength(63);
  expect(validateTransactions(data)).toBeTruthy();
});

export {};
