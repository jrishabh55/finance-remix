import { TransactionType } from '@prisma/client';
import dayjs from 'dayjs';
import xlsx from 'node-xlsx';
import { StatementUpload } from './types';

const defaultTransactionsParser = (
  file: string | ArrayBuffer,
  options?: Record<string, any>
): StatementUpload[] => {
  // parse xlsx file
  const [sheet]: any = xlsx.parse(file, options);
  sheet.data.splice(0, 1); // remove header

  const data: Array<StatementUpload> = [];
  for (const row of sheet.data) {
    if (row.length !== 5 || !row[0]) {
      console.log('Invalid Row', row.length, row);
      continue;
    }

    const rawDate = row[0];

    const [DD, MM, YY] = rawDate.split('/').map(Number);

    const date = dayjs(new Date(+`20${YY}`, MM, DD));

    if (!date.isValid()) {
      console.log('Invalid', rawDate);
    }

    data.push({
      transactionDate: date,
      amount: parseFloat(row[1] || row[2]),
      referenceId: row[3] ?? '',
      description: row[4] ?? '',
      type: row[1] ? TransactionType.DEPOSIT : TransactionType.WITHDRAWAL
    });
  }

  return data;
};

export default defaultTransactionsParser;
