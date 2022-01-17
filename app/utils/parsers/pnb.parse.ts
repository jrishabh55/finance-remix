import { TransactionType } from '@prisma/client';
import dayjs from 'dayjs';
import xlsx from 'node-xlsx';
import { StatementUpload } from './types';

const pnbTransactionsParser = (
  file: string | ArrayBuffer,
  options?: Record<string, any>
): StatementUpload[] => {
  // parse xlsx file
  const [sheet]: any = xlsx.parse(file, options);
  sheet.data.splice(0, 21); // remove header

  // return sheet.data;

  const data: Array<StatementUpload> = [];
  for (const row of sheet.data) {
    if (row.length < 9 || !row[1]) {
      continue;
    }

    const rawDate = row[1];

    const [DD, MM, YY] = rawDate.split('/').map(Number);

    const date = dayjs(new Date(+`20${YY}`, MM, DD));

    if (!date.isValid()) {
      console.log('Invalid', rawDate);
    }

    data.push({
      transactionDate: date,
      description: row[9] ?? '',
      referenceId: row[3] ?? '',
      amount: parseFloat(row[7] || row[5]),
      type: row[1] ? TransactionType.DEPOSIT : TransactionType.WITHDRAWAL
    });
  }

  return data;
};

export default pnbTransactionsParser;
