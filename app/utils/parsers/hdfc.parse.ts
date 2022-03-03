import { TransactionType } from '@prisma/client';
import dayjs from 'dayjs';
import xlsx from 'node-xlsx';
import { StatementUpload } from './types';

const findColumnIndex = (data: any[], key: string) => {
  return data.findIndex((d: string) => (d ?? '').toLowerCase().includes(key.toLowerCase()));
};

const hdfcTransactionsParser = (
  file: string | ArrayBuffer,
  options?: Record<string, any>
): StatementUpload[] => {
  // parse xlsx file
  const [sheet]: any = xlsx.parse(file, options);
  const columns = sheet.data[20];
  sheet.data.splice(0, 22);

  const dateColumn = findColumnIndex(columns, 'date');
  const depositCol = findColumnIndex(columns, 'deposit');
  const withdrawalColumn = findColumnIndex(columns, 'withdrawal');
  const refColumn = findColumnIndex(columns, 'ref');
  const descriptionColumn = findColumnIndex(columns, 'narration');

  const data: Array<StatementUpload> = [];
  for (const row of sheet.data) {
    if (row.length === 0 || row[dateColumn].includes('*')) {
      break;
    }

    const [DD, MM, YY] = row[dateColumn].split('/').map(Number);

    const date = dayjs(new Date(+`20${YY}`, MM, DD));

    if (!date.isValid()) {
      console.log('Invalid', row[dateColumn]);
    }

    data.push({
      transactionDate: date,
      description: row[descriptionColumn] ?? '',
      referenceId: row[refColumn] ?? '',
      amount: parseFloat(row[withdrawalColumn] || row[depositCol]),
      type: row[depositCol] ? TransactionType.DEPOSIT : TransactionType.WITHDRAWAL
    });
  }

  return data;
};

export default hdfcTransactionsParser;
